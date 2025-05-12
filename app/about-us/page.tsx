import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header, Footer } from "@/components/common";
import { 
  ArrowRight, 
  Users, 
  Briefcase, 
  Building, 
  Smile,
  User
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-32 text-white overflow-hidden">
          <div 
            className="absolute inset-0 z-0 bg-zinc-900" 
            style={{ 
              backgroundImage: "url('/images/about/about-hero.png')", 
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          ></div>
          <div className="absolute inset-0 bg-zinc-900/70 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Empowering Local Workers, Building Stronger Communities
              </h1>
              <p className="text-lg md:text-xl text-zinc-200 max-w-2xl mx-auto">
                Connecting skilled professionals with local opportunities since 2020
              </p>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 bg-zinc-50">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold text-black mb-6">Our Story</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Card 1 */}
              <div className="bg-white p-8 rounded-lg border border-zinc-200 shadow-sm">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-black" />
                    </div>
                  </div>
                  <div className="text-zinc-900 font-semibold text-lg">2020</div>
                  <h3 className="text-xl font-semibold text-zinc-900">The Beginning</h3>
                  <p className="text-zinc-500">
                    Started with a vision to transform how local communities connect with skilled professionals.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-8 rounded-lg border border-zinc-200 shadow-sm">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-black" />
                    </div>
                  </div>
                  <div className="text-zinc-900 font-semibold text-lg">2021</div>
                  <h3 className="text-xl font-semibold text-zinc-900">Rapid Growth</h3>
                  <p className="text-zinc-500">
                    Expanded to 50+ cities, helping thousands of workers find meaningful opportunities.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-8 rounded-lg border border-zinc-200 shadow-sm">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-black" />
                    </div>
                  </div>
                  <div className="text-zinc-900 font-semibold text-lg">2022</div>
                  <h3 className="text-xl font-semibold text-zinc-900">Community Impact</h3>
                  <p className="text-zinc-500">
                    Launched worker training programs and community support initiatives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Mission */}
              <div className="bg-white p-8 rounded-lg border border-zinc-200 shadow-sm">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-center w-16 h-16 bg-zinc-100 rounded-full">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-black" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-900">Our Mission</h3>
                  <p className="text-zinc-500">
                    To create economic opportunities for every skilled worker by building the most trusted platform for local hiring.
                  </p>
                </div>
              </div>

              {/* Vision */}
              <div className="bg-white p-8 rounded-lg border border-zinc-200 shadow-sm">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-center w-16 h-16 bg-zinc-100 rounded-full">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-black" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-900">Our Vision</h3>
                  <p className="text-zinc-500">
                    A world where every skilled professional has access to dignified work opportunities in their local community.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Stats Section */}
        <section className="py-20 bg-zinc-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {/* Stat 1 */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-zinc-200 rounded-full flex items-center justify-center">
                  <Briefcase className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-4xl font-bold text-black">10K+</h3>
                <p className="text-zinc-500 text-center">Jobs Posted</p>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-zinc-200 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-4xl font-bold text-black">5K+</h3>
                <p className="text-zinc-500 text-center">Active Workers</p>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-zinc-200 rounded-full flex items-center justify-center">
                  <Smile className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-4xl font-bold text-black">98%</h3>
                <p className="text-zinc-500 text-center">Satisfaction Rate</p>
              </div>

              {/* Stat 4 */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-zinc-200 rounded-full flex items-center justify-center">
                  <Building className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-4xl font-bold text-black">100+</h3>
                <p className="text-zinc-500 text-center">Cities Covered</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold text-black mb-6">Meet Our Team</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {/* Team Member 1 */}
              <div className="border border-zinc-200 rounded-lg p-6 flex flex-col items-center">
                <div className="w-40 h-40 rounded-full overflow-hidden mb-6">
                  <Avatar className="w-full h-full"> 
                    <AvatarImage src="/images/user1.jpg" className="w-full h-full object-cover" />
                    <AvatarFallback>
                      <User className="w-10 h-10" />
                    </AvatarFallback>
                  </Avatar>
                </div>
                <h3 className="text-lg font-semibold text-zinc-900">Sarah Johnson</h3>
                <p className="text-zinc-500 text-sm">CEO & Founder</p>
              </div>

              {/* Team Member 2 */}
              <div className="border border-zinc-200 rounded-lg p-6 flex flex-col items-center">
                <div className="w-40 h-40 rounded-full overflow-hidden mb-6">
                  <Avatar className="w-full h-full"> 
                    <AvatarImage src="/images/user2.jpg" className="w-full h-full object-cover" />
                    <AvatarFallback>
                      <User className="w-10 h-10" />
                    </AvatarFallback>
                  </Avatar>
                </div>
                <h3 className="text-lg font-semibold text-zinc-900">Michael Chen</h3>
                <p className="text-zinc-500 text-sm">Head of Operations</p>
              </div>

              {/* Team Member 3 */}
              <div className="border border-zinc-200 rounded-lg p-6 flex flex-col items-center">
                <div className="w-40 h-40 rounded-full overflow-hidden mb-6">
                  <Avatar className="w-full h-full"> 
                    <AvatarImage src="/images/user3.jpg" className="w-full h-full object-cover" />
                    <AvatarFallback>
                      <User className="w-10 h-10" />
                    </AvatarFallback>
                  </Avatar>
                </div>
                <h3 className="text-lg font-semibold text-zinc-900">Emily Rodriguez</h3>
                <p className="text-zinc-500 text-sm">Community Director</p>
              </div>

              {/* Team Member 4 */}
              <div className="border border-zinc-200 rounded-lg p-6 flex flex-col items-center">
                <div className="w-40 h-40 rounded-full overflow-hidden mb-6">
                  <Avatar className="w-full h-full"> 
                    <AvatarImage src="/images/user4.jpg" className="w-full h-full object-cover" />
                    <AvatarFallback>
                      <User className="w-10 h-10" />
                    </AvatarFallback>
                  </Avatar>
                </div>
                <h3 className="text-lg font-semibold text-zinc-900">David Kim</h3>
                <p className="text-zinc-500 text-sm">Tech Lead</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-zinc-100">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl font-bold text-black">Join Our Growing Community</h2>
              <p className="text-zinc-500">Be part of the revolution in local hiring</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button className="bg-zinc-900 hover:bg-zinc-800 px-6">
                  <Link href="/post-job" className="flex items-center gap-2">
                    Post a Job 
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="outline" className="border-zinc-300 text-zinc-900 hover:bg-zinc-100 px-6">
                  <Link href="/find-work" className="flex items-center gap-2">
                    Find Work
                    <ArrowRight className="w-4 h-4" />
                  </Link>
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