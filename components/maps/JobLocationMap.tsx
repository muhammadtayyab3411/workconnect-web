'use client'

import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

// Import Mapbox CSS
import 'mapbox-gl/dist/mapbox-gl.css';

// Initialize Mapbox
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

interface JobLocationMapProps {
  latitude: number;
  longitude: number;
  address: string;
  className?: string;
}

export default function JobLocationMap({ 
  latitude, 
  longitude, 
  address, 
  className = "w-full h-[200px] rounded-md"
}: JobLocationMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    if (map.current) {
      return;
    }

    // Only initialize if we have a valid token
    if (!mapboxgl.accessToken) {
      setMapError('Mapbox access token not found');
      return;
    }

    // Validate coordinates
    if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
      setMapError('Invalid coordinates');
      return;
    }

    // Check if coordinates are reasonable (not 0,0 or extreme values)
    if (Math.abs(latitude) > 90 || Math.abs(longitude) > 180) {
      setMapError('Coordinates out of range');
      return;
    }

    if (latitude === 0 && longitude === 0) {
      setMapError('Invalid location coordinates');
      return;
    }

    // Wait for container to be available with a retry limit
    let retryCount = 0;
    const maxRetries = 50; // 5 seconds total (50 * 100ms)

    const initializeMap = () => {
      if (!mapContainer.current) {
        retryCount++;
        if (retryCount >= maxRetries) {
          setMapError('Map container not available');
          return;
        }
        setTimeout(initializeMap, 100);
        return;
      }

      try {
        // Add a timeout to detect if map doesn't load
        const loadTimeout = setTimeout(() => {
          setMapError('Map loading timeout');
          setMapLoaded(false);
        }, 10000);
        
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [longitude, latitude],
          zoom: 15,
          interactive: true // Make it interactive so users can zoom/pan
        });

        // Handle map load
        map.current.on('load', () => {
          clearTimeout(loadTimeout);
          setMapLoaded(true);
          setMapError(null);
          
          if (!map.current) return;

          try {
            // Add marker for job location
            new mapboxgl.Marker()
              .setLngLat([longitude, latitude])
              .addTo(map.current);
          } catch (markerError) {
            console.error('Error adding marker:', markerError);
          }
        });

        // Handle map errors
        map.current.on('error', (e) => {
          clearTimeout(loadTimeout);
          console.error('JobLocationMap error:', e);
          setMapError('Failed to load map');
          setMapLoaded(false);
        });

        // Handle style load (sometimes load event doesn't fire but styledata does)
        map.current.on('styledata', () => {
          if (!mapLoaded) {
            clearTimeout(loadTimeout);
            setMapLoaded(true);
            setMapError(null);
            
            if (!map.current) return;

            try {
              // Add marker for job location
              new mapboxgl.Marker()
                .setLngLat([longitude, latitude])
                .addTo(map.current);
            } catch (markerError) {
              console.error('Error adding marker (styledata):', markerError);
            }
          }
        });

      } catch (error) {
        console.error('Error initializing JobLocationMap:', error);
        setMapError('Failed to initialize map');
      }
    };

    // Start the initialization process
    initializeMap();

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      setMapLoaded(false);
    };
  }, [latitude, longitude, address]);

  // Always render the map container div
  return (
    <div 
      ref={mapContainer}
      className={`${className} bg-zinc-100`}
      style={{ 
        background: !mapboxgl.accessToken ? '#f4f4f5' : 'transparent' 
      }}
    >
      {/* Show loading/error states inside the container */}
      {!mapboxgl.accessToken && (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <p className="text-zinc-500 text-sm font-medium">{address}</p>
            <p className="text-zinc-400 text-xs mt-1">Map unavailable</p>
          </div>
        </div>
      )}
      
      {mapboxgl.accessToken && mapError && (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <p className="text-red-500 text-sm font-medium">{mapError}</p>
            <p className="text-zinc-500 text-xs mt-1">{address}</p>
          </div>
        </div>
      )}
      
      {mapboxgl.accessToken && !mapLoaded && !mapError && (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <p className="text-zinc-500 text-sm">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  );
} 