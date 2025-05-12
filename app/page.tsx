"use client"

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Star, 
  FileText,
  Users,
  CheckCircle,
  Zap,
  Truck,
  Car,
  HardHat,
  Brush,
  ShieldCheck,
  CreditCard,
  HeadphonesIcon,
  ThumbsUp,
  Droplet
} from "lucide-react";
import { Header, Footer } from "@/components/common";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full bg-zinc-50 py-12 md:py-20 lg:py-24">
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="flex flex-col gap-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 leading-tight">
                Find Trusted Local Workers in Minutes
              </h1>
              <p className="text-lg md:text-xl text-zinc-700">
                Connect with verified professionals for all your home and business needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <Button size="lg" className="bg-zinc-900 hover:bg-zinc-800">Post a Job</Button>
                <Button size="lg" variant="outline">Find Work</Button>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="flex flex-col items-center sm:items-start">
                  <p className="text-xl font-bold text-zinc-900">1000+</p>
                  <p className="text-sm text-zinc-600">Verified Workers</p>
                </div>
                <div className="flex flex-col items-center sm:items-start">
                  <p className="text-xl font-bold text-zinc-900">4.8/5</p>
                  <p className="text-sm text-zinc-600">Average Rating</p>
                </div>
                <div className="flex flex-col items-center sm:items-start">
                  <p className="text-xl font-bold text-zinc-900">100%</p>
                  <p className="text-sm text-zinc-600">Secure Payments</p>
                </div>
              </div>
            </div>
            <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
              <Image 
                src="/images/hero.png" 
                alt="Local workers" 
                fill
                className="object-contain rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="w-full py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center gap-4 text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900">Simple. Fast. Reliable.</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Step 1 */}
              <Card className="border-zinc-200 shadow-sm">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 mb-4 mx-auto flex items-center justify-center bg-zinc-100 rounded-full">
                    <FileText className="w-8 h-8 text-zinc-900" />
                  </div>
                  <CardTitle className="text-xl text-center">Post Your Job</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-zinc-600 text-center">
                    Describe your needs and set your budget
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Step 2 */}
              <Card className="border-zinc-200 shadow-sm">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 mb-4 mx-auto flex items-center justify-center bg-zinc-100 rounded-full">
                    <Users className="w-8 h-8 text-zinc-900" />
                  </div>
                  <CardTitle className="text-xl text-center">Get Matched</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-zinc-600 text-center">
                    Review bids from verified professionals
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Step 3 */}
              <Card className="border-zinc-200 shadow-sm">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 mb-4 mx-auto flex items-center justify-center bg-zinc-100 rounded-full">
                    <CheckCircle className="w-8 h-8 text-zinc-900" />
                  </div>
                  <CardTitle className="text-xl text-center">Complete Work</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-zinc-600 text-center">
                    Hire and pay securely through platform
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Popular Services */}
        <section id="services" className="w-full py-16 md:py-24 bg-zinc-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center gap-4 text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900">Browse Popular Services</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Electrical */}
              <Card className="border-zinc-200 shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="w-16 h-16 mb-4 flex items-center justify-center bg-zinc-100 rounded-full">
                    <Zap className="w-8 h-8 text-zinc-900" />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">Electrical</h3>
                  <p className="text-zinc-600 text-sm">245 available workers</p>
                </div>
              </Card>

              {/* Plumbing */}
              <Card className="border-zinc-200 shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="w-16 h-16 mb-4 flex items-center justify-center bg-zinc-100 rounded-full">
                    <Droplet className="w-8 h-8 text-zinc-900" />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">Plumbing</h3>
                  <p className="text-zinc-600 text-sm">189 available workers</p>
                </div>
              </Card>

              {/* Moving */}
              <Card className="border-zinc-200 shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="w-16 h-16 mb-4 flex items-center justify-center bg-zinc-100 rounded-full">
                    <Truck className="w-8 h-8 text-zinc-900" />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">Moving</h3>
                  <p className="text-zinc-600 text-sm">167 available workers</p>
                </div>
              </Card>

              {/* Driving */}
              <Card className="border-zinc-200 shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="w-16 h-16 mb-4 flex items-center justify-center bg-zinc-100 rounded-full">
                    <Car className="w-8 h-8 text-zinc-900" />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">Driving</h3>
                  <p className="text-zinc-600 text-sm">203 available workers</p>
                </div>
              </Card>

              {/* Construction */}
              <Card className="border-zinc-200 shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="w-16 h-16 mb-4 flex items-center justify-center bg-zinc-100 rounded-full">
                    <HardHat className="w-8 h-8 text-zinc-900" />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">Construction</h3>
                  <p className="text-zinc-600 text-sm">156 available workers</p>
                </div>
              </Card>

              {/* Cleaning */}
              <Card className="border-zinc-200 shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="w-16 h-16 mb-4 flex items-center justify-center bg-zinc-100 rounded-full">
                    <Brush className="w-8 h-8 text-zinc-900" />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">Cleaning</h3>
                  <p className="text-zinc-600 text-sm">178 available workers</p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section id="about-us" className="w-full py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-6">
              {/* Feature 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 mb-4 flex items-center justify-center bg-zinc-100 rounded-full">
                  <ShieldCheck className="w-8 h-8 text-zinc-900" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 mb-2">Verified Professionals</h3>
                <p className="text-zinc-600 text-sm">All workers are thoroughly vetted</p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 mb-4 flex items-center justify-center bg-zinc-100 rounded-full">
                  <CreditCard className="w-8 h-8 text-zinc-900" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 mb-2">Secure Payments</h3>
                <p className="text-zinc-600 text-sm">Your money is safe with us</p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 mb-4 flex items-center justify-center bg-zinc-100 rounded-full">
                  <HeadphonesIcon className="w-8 h-8 text-zinc-900" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 mb-2">24/7 Support</h3>
                <p className="text-zinc-600 text-sm">We&apos;re here when you need us</p>
              </div>

              {/* Feature 4 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 mb-4 flex items-center justify-center bg-zinc-100 rounded-full">
                  <ThumbsUp className="w-8 h-8 text-zinc-900" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 mb-2">Satisfaction Guaranteed</h3>
                <p className="text-zinc-600 text-sm">Love the service or get your money back</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="w-full py-16 md:py-24 bg-zinc-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center gap-4 text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900">What Our Users Say</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Testimonial 1 */}
              <Card className="border-zinc-200 shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src="/images/user1.jpg" alt="Sarah Johnson" className="absolute inset-0 w-full h-full object-cover" />
                        <AvatarFallback>SJ</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Sarah Johnson</p>
                        <p className="text-sm text-zinc-500">Homeowner</p>
                      </div>
                    </div>
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="text-zinc-900 mr-1 w-4 h-4" 
                          fill="transparent" 
                        />
                      ))}
                    </div>
                    <p className="text-zinc-600">&quot;Found an amazing electrician within hours. The whole process was seamless.&quot;</p>
                  </div>
                </CardContent>
              </Card>

              {/* Testimonial 2 */}
              <Card className="border-zinc-200 shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src="/images/user2.jpg" alt="Michael Chen" className="absolute inset-0 w-full h-full object-cover" />
                        <AvatarFallback>MC</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Michael Chen</p>
                        <p className="text-sm text-zinc-500">Business Owner</p>
                      </div>
                    </div>
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="text-zinc-900 mr-1 w-4 h-4" 
                          fill="transparent" 
                        />
                      ))}
                    </div>
                    <p className="text-zinc-600">&quot;WorkConnect has transformed how we hire contractors. Highly recommended!&quot;</p>
                  </div>
                </CardContent>
              </Card>

              {/* Testimonial 3 */}
              <Card className="border-zinc-200 shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src="/images/user3.jpg" alt="Emily Rodriguez" className="absolute inset-0 w-full h-full object-cover" />
                        <AvatarFallback>ER</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Emily Rodriguez</p>
                        <p className="text-sm text-zinc-500">Property Manager</p>
                      </div>
                    </div>
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="text-zinc-900 mr-1 w-4 h-4" 
                          fill="transparent" 
                        />
                      ))}
                    </div>
                    <p className="text-zinc-600">&quot;The quality of workers and the platform&apos;s ease of use are outstanding.&quot;</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-16 md:py-24 bg-zinc-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-zinc-600 mb-8 max-w-2xl mx-auto">Join thousands of satisfied customers</p>
            <Button size="lg" className="bg-zinc-900 hover:bg-zinc-800 py-6 px-8 text-lg">
              Post Your First Job
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
