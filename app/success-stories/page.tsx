"use client"

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header, Footer } from "@/components/common";
import { Star, MapPin, Quote } from "lucide-react";

export default function SuccessStories() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-24 md:py-32 bg-cover bg-center relative" style={{ backgroundImage: "url(/images/testimonials/hero-bg.jpg)" }}>
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-50/95 to-zinc-50/40"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 mb-4">Real Stories. Real Impact.</h1>
              <p className="text-lg md:text-xl text-zinc-600 mb-8">
                Discover how our platform is changing lives – one job at a time. Join thousands of professionals and clients creating success stories every day.
              </p>
              <div>
                <Button size="lg" className="bg-zinc-900 hover:bg-zinc-800">Join Our Community</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 border-b border-zinc-200">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div className="flex flex-col items-center">
                <h3 className="text-3xl md:text-4xl font-bold text-zinc-900">12,000+</h3>
                <p className="text-zinc-600 font-medium">Jobs Completed</p>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-3xl md:text-4xl font-bold text-zinc-900">5,000+</h3>
                <p className="text-zinc-600 font-medium">Active Professionals</p>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-3xl md:text-4xl font-bold text-zinc-900">98%</h3>
                <p className="text-zinc-600 font-medium">Satisfaction Rate</p>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-3xl md:text-4xl font-bold text-zinc-900">₹50M+</h3>
                <p className="text-zinc-600 font-medium">Earned by Workers</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Success Stories */}
        <section className="w-full py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-zinc-900 mb-12">Featured Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
              {/* Story 1 */}
              <Card className="border-zinc-100 shadow-sm overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="w-20 h-20 rounded-lg shrink-0 overflow-hidden relative">
                      <Image 
                        src="/images/testimonials/michael-chen.jpg" 
                        alt="Michael Chen" 
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-xl font-semibold text-zinc-900 mb-1">Michael Chen</h3>
                      <div className="flex items-center gap-2 text-zinc-500 mb-3">
                        <span>Electrician</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          San Francisco
                        </span>
                      </div>
                      <div className="flex mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 fill-transparent text-yellow-500" />
                        ))}
                      </div>
                      <p className="text-zinc-500 text-base">
                        I&apos;ve transformed my small electrical business into a thriving enterprise. The platform&apos;s reliability and steady stream of clients have helped me grow my team from just myself to five skilled electricians.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Story 2 */}
              <Card className="border-zinc-100 shadow-sm overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="w-20 h-20 rounded-lg shrink-0 overflow-hidden relative">
                      <Image 
                        src="/images/testimonials/sarah-johnson.jpg" 
                        alt="Sarah Johnson" 
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-xl font-semibold text-zinc-900 mb-1">Sarah Johnson</h3>
                      <div className="flex items-center gap-2 text-zinc-500 mb-3">
                        <span>Home Owner</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          Chicago
                        </span>
                      </div>
                      <div className="flex mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 fill-transparent text-yellow-500" />
                        ))}
                      </div>
                      <p className="text-zinc-500 text-base">
                        Finding reliable contractors used to be a nightmare. Now, I can easily connect with verified professionals and get my home repairs done with confidence. The quality of service has been consistently excellent.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Community Testimonials */}
        <section className="w-full py-16 md:py-24 bg-zinc-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-zinc-900 mb-12">What Our Community Says</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <Card className="border-zinc-100 shadow-sm">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <Quote className="w-8 h-8 text-zinc-200" />
                  </div>
                  <p className="text-zinc-600 mb-8">
                    The platform has revolutionized how I find work. I&apos;m now earning 40% more than before while having complete control over my schedule.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-md overflow-hidden relative">
                      <Image 
                        src="/images/testimonials/david-martinez.jpg" 
                        alt="David Martinez" 
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-zinc-900">David Martinez</h4>
                      <p className="text-zinc-600 text-sm">Plumber</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Testimonial 2 */}
              <Card className="border-zinc-100 shadow-sm">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <Quote className="w-8 h-8 text-zinc-200" />
                  </div>
                  <p className="text-zinc-600 mb-8">
                    What I love most is the professional community. I&apos;ve connected with other designers and even collaborated on larger projects.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-md overflow-hidden relative">
                      <Image 
                        src="/images/testimonials/emma-wilson.jpg" 
                        alt="Emma Wilson" 
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-zinc-900">Emma Wilson</h4>
                      <p className="text-zinc-600 text-sm">Interior Designer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Testimonial 3 */}
              <Card className="border-zinc-100 shadow-sm">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <Quote className="w-8 h-8 text-zinc-200" />
                  </div>
                  <p className="text-zinc-600 mb-8">
                    The platform&apos;s rating system has helped me build trust with clients and get more work. My craftsmanship speaks for itself through reviews.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-md overflow-hidden relative">
                      <Image 
                        src="/images/testimonials/james-taylor.jpg" 
                        alt="James Taylor" 
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-zinc-900">James Taylor</h4>
                      <p className="text-zinc-600 text-sm">Carpenter</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Impact Metrics */}
        <section className="w-full py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-zinc-900 mb-8">Making a Real Difference</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-3xl font-bold text-zinc-900">85%</h3>
                    <p className="text-zinc-600">Increase in worker earnings</p>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-zinc-900">45min</h3>
                    <p className="text-zinc-600">Average response time</p>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-zinc-900">4.8/5</h3>
                    <p className="text-zinc-600">Average rating</p>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-zinc-900">92%</h3>
                    <p className="text-zinc-600">Repeat customers</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg overflow-hidden relative h-80">
                  <Image 
                    src="/images/testimonials/worker-image1.jpg" 
                    alt="Worker" 
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="rounded-lg overflow-hidden relative h-80">
                  <Image 
                    src="/images/testimonials/worker-image2.jpg" 
                    alt="Worker" 
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-16 md:py-24 bg-zinc-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-zinc-900 mb-4">Ready to Write Your Success Story?</h2>
              <p className="text-lg text-zinc-600 mb-8">
                Join thousands of professionals who are growing their businesses and delighting customers every day.
              </p>
              <Button size="lg" className="bg-zinc-900 hover:bg-zinc-800">Get Started Today</Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
} 