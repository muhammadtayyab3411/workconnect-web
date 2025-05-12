import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Header, Footer } from "@/components/common";
import { 
  Search, 
  MapPin, 
  ArrowRight,
  Wrench,
  Car,
  Trash,
  Hammer,
  Shield,
  CreditCard,
  Clock
} from "lucide-react";

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-zinc-200/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl space-y-6 mb-10">
              <h1 className="text-3xl md:text-5xl font-bold text-zinc-900">
                Find Local Services You Can Trust
              </h1>
              <p className="text-lg text-zinc-600">
                Connect with verified professionals in your neighborhood for any task
              </p>
              
              <div className="flex flex-col md:flex-row gap-4 max-w-3xl">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="What service are you looking for?"
                    className="w-full h-12 px-4 pr-10 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
                  />
                  <Search className="absolute right-3 top-3 text-zinc-400" size={20} />
                </div>
                
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Location"
                    className="w-full h-12 px-4 pr-10 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
                  />
                  <MapPin className="absolute right-3 top-3 text-zinc-400" size={20} />
                </div>
                
                <Button className="h-12 bg-zinc-900 hover:bg-zinc-800">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Browse Categories Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-zinc-900 mb-4">Browse Categories</h2>
              <p className="text-zinc-600">Explore our wide range of professional services</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Plumbing Services */}
              <div className="border border-zinc-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center">
                    <Image 
                      src="/images/services/plumbing-icon.svg" 
                      alt="Plumbing" 
                      width={32} 
                      height={32}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-900">Plumbing Services</h3>
                  <p className="text-zinc-600 text-sm">Expert plumbing solutions</p>
                  <Link href="#" className="inline-flex items-center text-sm font-medium text-zinc-900">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
              
              {/* Electrical Work */}
              <div className="border border-zinc-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center">
                    <Image 
                      src="/images/services/electrical-icon.svg" 
                      alt="Electrical" 
                      width={32} 
                      height={32}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-900">Electrical Work</h3>
                  <p className="text-zinc-600 text-sm">Licensed electrical services</p>
                  <Link href="#" className="inline-flex items-center text-sm font-medium text-zinc-900">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
              
              {/* Professional Drivers */}
              <div className="border border-zinc-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center">
                    <Car className="h-8 w-8 text-zinc-900" />
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-900">Professional Drivers</h3>
                  <p className="text-zinc-600 text-sm">Safe and reliable transport</p>
                  <Link href="#" className="inline-flex items-center text-sm font-medium text-zinc-900">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
              
              {/* Home Cleaning */}
              <div className="border border-zinc-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center">
                    <Trash className="h-8 w-8 text-zinc-900" />
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-900">Home Cleaning</h3>
                  <p className="text-zinc-600 text-sm">Thorough house cleaning</p>
                  <Link href="#" className="inline-flex items-center text-sm font-medium text-zinc-900">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
              
              {/* Auto Mechanics */}
              <div className="border border-zinc-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center">
                    <Wrench className="h-8 w-8 text-zinc-900" />
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-900">Auto Mechanics</h3>
                  <p className="text-zinc-600 text-sm">Vehicle repair & maintenance</p>
                  <Link href="#" className="inline-flex items-center text-sm font-medium text-zinc-900">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
              
              {/* General Labor */}
              <div className="border border-zinc-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center">
                    <Image 
                      src="/images/services/labor-icon.svg" 
                      alt="Labor" 
                      width={32} 
                      height={32}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-900">General Labor</h3>
                  <p className="text-zinc-600 text-sm">Various manual work tasks</p>
                  <Link href="#" className="inline-flex items-center text-sm font-medium text-zinc-900">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
              
              {/* Carpentry */}
              <div className="border border-zinc-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center">
                    <Hammer className="h-8 w-8 text-zinc-900" />
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-900">Carpentry</h3>
                  <p className="text-zinc-600 text-sm">Custom woodwork & repairs</p>
                  <Link href="#" className="inline-flex items-center text-sm font-medium text-zinc-900">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
              
              {/* Painting Services */}
              <div className="border border-zinc-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center">
                    <Image 
                      src="/images/services/painting-icon.svg" 
                      alt="Painting" 
                      width={32} 
                      height={32}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-900">Painting Services</h3>
                  <p className="text-zinc-600 text-sm">Interior & exterior painting</p>
                  <Link href="#" className="inline-flex items-center text-sm font-medium text-zinc-900">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
              
              {/* Security Services */}
              <div className="border border-zinc-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center">
                    <Image 
                      src="/images/services/security-icon.svg" 
                      alt="Security" 
                      width={32} 
                      height={32}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-900">Security Services</h3>
                  <p className="text-zinc-600 text-sm">Professional protection</p>
                  <Link href="#" className="inline-flex items-center text-sm font-medium text-zinc-900">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
              
              {/* Delivery Services */}
              <div className="border border-zinc-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center">
                    <Image 
                      src="/images/services/delivery-icon.svg" 
                      alt="Delivery" 
                      width={32} 
                      height={32}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-900">Delivery Services</h3>
                  <p className="text-zinc-600 text-sm">Quick local deliveries</p>
                  <Link href="#" className="inline-flex items-center text-sm font-medium text-zinc-900">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
              
              {/* Gardening */}
              <div className="border border-zinc-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center">
                    <Image 
                      src="/images/services/gardening-icon.svg" 
                      alt="Gardening" 
                      width={32} 
                      height={32}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-900">Gardening</h3>
                  <p className="text-zinc-600 text-sm">Landscape & garden care</p>
                  <Link href="#" className="inline-flex items-center text-sm font-medium text-zinc-900">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
              
              {/* Handyman */}
              <div className="border border-zinc-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center">
                    <Image 
                      src="/images/services/handyman-icon.svg" 
                      alt="Handyman" 
                      width={32} 
                      height={32}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-900">Handyman</h3>
                  <p className="text-zinc-600 text-sm">General repairs & fixes</p>
                  <Link href="#" className="inline-flex items-center text-sm font-medium text-zinc-900">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Why Choose Us Section */}
        <section className="py-16 bg-zinc-200/25">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-zinc-900 mb-6">Why Choose Us</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {/* Verified Professionals */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 mb-3">Verified Professionals</h3>
                <p className="text-zinc-600">Every service provider is thoroughly vetted and verified</p>
              </div>
              
              {/* Secure Payments */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-6">
                  <CreditCard className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 mb-3">Secure Payments</h3>
                <p className="text-zinc-600">Your transactions are protected and secure</p>
              </div>
              
              {/* Quick Response Time */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-6">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 mb-3">Quick Response Time</h3>
                <p className="text-zinc-600">Get connected with professionals within minutes</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-zinc-900 mb-6">Ready to Get Started?</h2>
              <p className="text-zinc-600 text-lg mb-8">Join thousands of satisfied customers who trust our platform</p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-zinc-900 hover:bg-zinc-800">
                  Find a Professional
                </Button>
                <Button variant="outline" className="border-zinc-200">
                  Post a Job
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
} 