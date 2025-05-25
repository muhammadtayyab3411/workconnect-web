'use client'

import { useState, useRef, useEffect, useCallback } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import mapboxgl from 'mapbox-gl';

// Import Mapbox CSS
import 'mapbox-gl/dist/mapbox-gl.css';

// Initialize Mapbox
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

interface LocationData {
  address: string;
  city: string;
  latitude: number;
  longitude: number;
}

interface LocationPickerProps {
  onLocationChange: (location: LocationData) => void;
  initialLocation?: LocationData;
}

interface MapboxFeature {
  place_name: string;
  geometry: {
    coordinates: [number, number];
  };
  context?: Array<{
    id: string;
    text: string;
  }>;
}

interface MapboxContext {
  id: string;
  text: string;
}

export default function LocationPicker({ onLocationChange, initialLocation }: LocationPickerProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  
  const [address, setAddress] = useState(initialLocation?.address || '');
  const [city, setCity] = useState(initialLocation?.city || '');
  const [suggestions, setSuggestions] = useState<MapboxFeature[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  const updateMarker = useCallback((lng: number, lat: number) => {
    if (!map.current || !mapboxgl.accessToken || !mapLoaded) {
      console.log('Cannot update marker:', { 
        hasMap: !!map.current, 
        hasToken: !!mapboxgl.accessToken, 
        mapLoaded 
      });
      return;
    }

    try {
      // Remove existing marker
      if (marker.current) {
        marker.current.remove();
      }

      // Add new marker
      marker.current = new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(map.current);

      // Center map on location
      map.current.flyTo({
        center: [lng, lat],
        zoom: 15
      });
    } catch (error) {
      console.error('Error updating marker:', error);
    }
  }, [mapLoaded]);

  const updateLocation = useCallback(async (lng: number, lat: number) => {
    updateMarker(lng, lat);

    // Reverse geocode to get address
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        const feature = data.features[0];
        const newAddress = feature.place_name;
        const cityContext = feature.context?.find((c: MapboxContext) => c.id.includes('place'));
        const newCity = cityContext?.text || '';

        setAddress(newAddress);
        setCity(newCity);

        onLocationChange({
          address: newAddress,
          city: newCity,
          latitude: lat,
          longitude: lng
        });
      }
    } catch (error) {
      console.error('Error reverse geocoding:', error);
    }
  }, [onLocationChange, updateMarker]);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;
    
    if (!mapboxgl.accessToken) {
      setMapError('Mapbox access token not found');
      return;
    }

    try {
      console.log('Initializing map...');
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [initialLocation?.longitude || -74.006, initialLocation?.latitude || 40.7128],
        zoom: 13
      });

      // Handle map load
      map.current.on('load', () => {
        console.log('Map loaded successfully');
        setMapLoaded(true);
        setMapError(null);
        
        if (!map.current) return;

        // Add click handler for map
        map.current.on('click', (e) => {
          const { lng, lat } = e.lngLat;
          updateLocation(lng, lat);
        });

        // If we have initial location, set marker
        if (initialLocation?.latitude && initialLocation?.longitude) {
          updateMarker(initialLocation.longitude, initialLocation.latitude);
        }
      });

      // Handle map errors
      map.current.on('error', (e) => {
        console.error('Map error:', e);
        setMapError('Failed to load map');
        setMapLoaded(false);
      });

    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError('Failed to initialize map');
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      setMapLoaded(false);
    };
  }, []); // Remove dependencies to prevent re-initialization

  // Handle initial location updates separately
  useEffect(() => {
    if (mapLoaded && initialLocation?.latitude && initialLocation?.longitude) {
      updateMarker(initialLocation.longitude, initialLocation.latitude);
    }
  }, [mapLoaded, initialLocation?.latitude, initialLocation?.longitude, updateMarker]);

  const searchLocations = useCallback(async (query: string) => {
    if (!query.trim() || query.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxgl.accessToken}&country=US&types=address,poi&limit=5`
      );
      const data = await response.json();
      
      if (data.features) {
        setSuggestions(data.features);
        setShowSuggestions(true);
      }
    } catch (error) {
      console.error('Error searching locations:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleAddressChange = (value: string) => {
    setAddress(value);
    searchLocations(value);
  };

  const handleSuggestionClick = (feature: MapboxFeature) => {
    const [lng, lat] = feature.geometry.coordinates;
    const cityContext = feature.context?.find((c: MapboxContext) => c.id.includes('place'));
    const newCity = cityContext?.text || '';

    setAddress(feature.place_name);
    setCity(newCity);
    setShowSuggestions(false);
    updateLocation(lng, lat);
  };

  const handleCityChange = (newCity: string) => {
    setCity(newCity);
    if (address) {
      onLocationChange({
        address,
        city: newCity,
        latitude: initialLocation?.latitude || 40.7128,
        longitude: initialLocation?.longitude || -74.006
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="address" className="text-sm font-medium text-zinc-900">
          Address
        </Label>
        <div className="relative">
          <Input
            id="address"
            placeholder="Enter job location"
            className="w-full mt-2"
            value={address}
            onChange={(e) => handleAddressChange(e.target.value)}
            onFocus={() => {
              if (suggestions.length > 0) setShowSuggestions(true);
            }}
          />
          
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-50 w-full bg-white border border-zinc-200 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  className="w-full text-left px-4 py-3 hover:bg-zinc-50 border-b border-zinc-100 last:border-b-0 text-sm"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <div className="font-medium text-zinc-900">
                    {suggestion.place_name.split(',')[0]}
                  </div>
                  <div className="text-zinc-500 text-xs mt-1">
                    {suggestion.place_name}
                  </div>
                </button>
              ))}
            </div>
          )}
          
          {isLoading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="w-4 h-4 border-2 border-zinc-300 border-t-zinc-600 rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="city" className="text-sm font-medium text-zinc-900">
          City/Area
        </Label>
        <Select value={city} onValueChange={handleCityChange}>
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Select city" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="New York">New York</SelectItem>
            <SelectItem value="Los Angeles">Los Angeles</SelectItem>
            <SelectItem value="Chicago">Chicago</SelectItem>
            <SelectItem value="Houston">Houston</SelectItem>
            <SelectItem value="Phoenix">Phoenix</SelectItem>
            <SelectItem value="Philadelphia">Philadelphia</SelectItem>
            <SelectItem value="San Antonio">San Antonio</SelectItem>
            <SelectItem value="San Diego">San Diego</SelectItem>
            {city && !['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego'].includes(city) && (
              <SelectItem value={city}>{city}</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>

      {/* Map Container - keeping exact same styling */}
      <div 
        ref={mapContainer}
        className="bg-zinc-100 h-[200px] rounded-md"
        style={{ 
          background: !mapboxgl.accessToken ? '#f4f4f5' : 'transparent' 
        }}
      >
        {!mapboxgl.accessToken && (
          <div className="flex items-center justify-center h-full">
            <p className="text-zinc-500 text-sm">
              Map location selector will appear here
            </p>
          </div>
        )}
        {mapboxgl.accessToken && mapError && (
          <div className="flex items-center justify-center h-full">
            <p className="text-red-500 text-sm">
              {mapError}
            </p>
          </div>
        )}
        {mapboxgl.accessToken && !mapLoaded && !mapError && (
          <div className="flex items-center justify-center h-full">
            <p className="text-zinc-500 text-sm">
              Loading map...
            </p>
          </div>
        )}
      </div>

      {mapboxgl.accessToken && mapLoaded && (
        <p className="text-xs text-zinc-500 mt-2">
          Click on the map to set the exact job location
        </p>
      )}
    </div>
  );
} 