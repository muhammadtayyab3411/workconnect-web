"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { 
  ChevronDown, 
  FileText, 
  Users, 
  ShieldCheck, 
  UserX, 
  DollarSign, 
  Scale, 
  Lock, 
  FileEdit,
  Download,
  Headphones
} from 'lucide-react';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';

export default function TermsPage() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const termsRef = useRef<HTMLDivElement>(null);

  const toggleSection = (sectionId: string) => {
    setOpenSection(openSection === sectionId ? null : sectionId);
  };

  const downloadTerms = () => {
    // Create a new window for printing just the terms content
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    // Create HTML content for the print window
    let content = `
      <html>
      <head>
        <title>WorkConnect - Terms and Conditions</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { font-size: 24px; margin-bottom: 15px; }
          h2 { font-size: 18px; margin-top: 30px; margin-bottom: 10px; }
          p { margin-bottom: 10px; }
          .section { margin-bottom: 20px; }
          ul, ol { margin-left: 20px; margin-bottom: 15px; }
          li { margin-bottom: 5px; }
        </style>
      </head>
      <body>
        <h1>Terms & Conditions</h1>
        <p><em>Last Updated: January 2024</em></p>
        
        <div class="section">
          <h2>Overview</h2>
          <p>By using our platform, you agree to the following terms that help protect you, your data, and your experience. These terms are designed to create a fair and transparent marketplace for both service providers and clients. We recommend reading them carefully to understand your rights and responsibilities.</p>
        </div>
    `;
    
    // Add content from all sections
    const sections = [
      { id: 'definitions', title: 'Definitions' },
      { id: 'user-responsibilities', title: 'User Responsibilities' },
      { id: 'platform-usage-rules', title: 'Platform Usage Rules' },
      { id: 'account-termination', title: 'Account Termination' },
      { id: 'payment-terms', title: 'Payment Terms' },
      { id: 'dispute-resolution', title: 'Dispute Resolution' },
      { id: 'privacy-data-handling', title: 'Privacy & Data Handling' },
      { id: 'changes-to-terms', title: 'Changes to Terms' }
    ];
    
    sections.forEach(section => {
      const sectionElement = document.getElementById(`${section.id}-content`);
      if (sectionElement) {
        content += `<div class="section"><h2>${section.title}</h2>${sectionElement.innerHTML}</div>`;
      }
    });
    
    content += `
      </body>
      </html>
    `;
    
    // Write content to the new window
    printWindow.document.write(content);
    printWindow.document.close();
    
    // Print and close the window
    setTimeout(() => {
      printWindow.print();
      // Close after printing
      printWindow.onafterprint = function() {
        printWindow.close();
      };
    }, 500);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-white py-12 border-b border-zinc-200">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="w-full md:w-1/2 space-y-4">
                <h1 className="text-4xl font-bold">Terms & Conditions</h1>
                <p className="text-zinc-600 text-lg">
                  Understand how we protect your rights and ensure fair use for all.
                </p>
                <p className="text-zinc-500 text-sm">Last Updated: January 2024</p>
              </div>
              <div className="w-full md:w-1/2">
                <div className="rounded-lg overflow-hidden">
                  <Image 
                    src="/images/hero-image.jpg" 
                    alt="Terms and Conditions" 
                    width={600} 
                    height={400} 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="border-b border-zinc-200 pb-6">
              <div className="mb-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-zinc-900" />
                  <h2 className="text-xl font-semibold">Overview</h2>
                </div>
                <p className="text-zinc-600 ml-9">
                  By using our platform, you agree to the following terms that help protect you, your data, and your experience. These terms are designed to create a fair and transparent marketplace for both service providers and clients. We recommend reading them carefully to understand your rights and responsibilities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Terms Sections */}
        <section className="py-8" id="terms-content" ref={termsRef}>
          <div className="container mx-auto px-4">
            <div className="space-y-0">
              {/* Definitions */}
              <div className="border-b border-zinc-200 terms-section" data-section="definitions">
                <button 
                  className="w-full text-left py-5 flex items-center justify-between bg-white"
                  aria-expanded={openSection === 'definitions'}
                  aria-controls="definitions-content"
                  onClick={() => toggleSection('definitions')}
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-zinc-900" />
                    <h3 className="text-lg font-medium">Definitions</h3>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform ${openSection === 'definitions' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openSection === 'definitions' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      id="definitions-content" 
                      className="bg-white terms-section-content overflow-hidden"
                    >
                      <div className="pb-5 space-y-4 text-zinc-600 ml-9">
                        <p><strong>&quot;Platform&quot;</strong> refers to WorkConnect&apos;s website, mobile application, and all related services.</p>
                        <p><strong>&quot;User&quot;</strong> refers to any individual who accesses, browses, or registers on the Platform.</p>
                        <p><strong>&quot;Service Provider&quot;</strong> refers to individuals or businesses who offer their professional services through the Platform.</p>
                        <p><strong>&quot;Client&quot;</strong> refers to individuals or businesses who seek services through the Platform.</p>
                        <p><strong>&quot;Job&quot;</strong> refers to any service request posted by Clients on the Platform.</p>
                        <p><strong>&quot;Content&quot;</strong> refers to any information, text, graphics, photos, or other materials uploaded, downloaded, or appearing on the Platform.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User Responsibilities */}
              <div className="border-b border-zinc-200 terms-section" data-section="user-responsibilities">
                <button 
                  className="w-full text-left py-5 flex items-center justify-between bg-white"
                  aria-expanded={openSection === 'user-responsibilities'}
                  aria-controls="user-responsibilities-content"
                  onClick={() => toggleSection('user-responsibilities')}
                >
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-zinc-900" />
                    <h3 className="text-lg font-medium">User Responsibilities</h3>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform ${openSection === 'user-responsibilities' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openSection === 'user-responsibilities' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      id="user-responsibilities-content" 
                      className="bg-white terms-section-content overflow-hidden"
                    >
                      <div className="pb-5 space-y-4 text-zinc-600 ml-9">
                        <p>As a user of WorkConnect, you are responsible for:</p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Providing accurate and truthful information during registration and while using the Platform.</li>
                          <li>Maintaining the confidentiality of your account credentials and notifying us of any unauthorized access.</li>
                          <li>Ensuring that your activities on the Platform comply with applicable laws and regulations.</li>
                          <li>Treating other users with respect and professionalism in all communications and interactions.</li>
                          <li>Providing services (if you are a Service Provider) or payment (if you are a Client) as agreed upon through the Platform.</li>
                          <li>Resolving disputes in good faith through our official dispute resolution channels.</li>
                        </ul>
                        <p>Failure to meet these responsibilities may result in temporary or permanent restriction of your access to the Platform.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Platform Usage Rules */}
              <div className="border-b border-zinc-200 terms-section" data-section="platform-usage-rules">
                <button 
                  className="w-full text-left py-5 flex items-center justify-between bg-white"
                  aria-expanded={openSection === 'platform-usage-rules'}
                  aria-controls="platform-usage-rules-content"
                  onClick={() => toggleSection('platform-usage-rules')}
                >
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-zinc-900" />
                    <h3 className="text-lg font-medium">Platform Usage Rules</h3>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform ${openSection === 'platform-usage-rules' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openSection === 'platform-usage-rules' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      id="platform-usage-rules-content" 
                      className="bg-white terms-section-content overflow-hidden"
                    >
                      <div className="pb-5 space-y-4 text-zinc-600 ml-9">
                        <p>When using WorkConnect, you agree not to:</p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Use the Platform to engage in illegal, fraudulent, or deceptive activities.</li>
                          <li>Circumvent, disable, or interfere with security-related features of the Platform.</li>
                          <li>Post or share content that is harmful, abusive, harassing, or offensive to others.</li>
                          <li>Attempt to access areas of the Platform that you are not authorized to use.</li>
                          <li>Use automated systems or software to extract data from the Platform (scraping) without prior written consent.</li>
                          <li>Impersonate another person or entity, or falsely state or misrepresent your affiliation with a person or entity.</li>
                          <li>Conduct transactions outside of the Platform to avoid fees or for any other reason.</li>
                        </ul>
                        <p>WorkConnect reserves the right to investigate and take appropriate legal action against anyone who violates these rules, including removing prohibited content and terminating accounts.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Account Termination */}
              <div className="border-b border-zinc-200 terms-section" data-section="account-termination">
                <button 
                  className="w-full text-left py-5 flex items-center justify-between bg-white"
                  aria-expanded={openSection === 'account-termination'}
                  aria-controls="account-termination-content"
                  onClick={() => toggleSection('account-termination')}
                >
                  <div className="flex items-center gap-3">
                    <UserX className="w-6 h-6 text-zinc-900" />
                    <h3 className="text-lg font-medium">Account Termination</h3>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform ${openSection === 'account-termination' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openSection === 'account-termination' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      id="account-termination-content" 
                      className="bg-white terms-section-content overflow-hidden"
                    >
                      <div className="pb-5 space-y-4 text-zinc-600 ml-9">
                        <p>WorkConnect may terminate or suspend your account and access to the Platform in the following circumstances:</p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Violation of these Terms or any other policies referenced herein.</li>
                          <li>Engaging in fraudulent, illegal, or harmful activities on the Platform.</li>
                          <li>Providing false or misleading information during registration or while using the Platform.</li>
                          <li>Failure to pay any fees or charges associated with your use of the Platform.</li>
                          <li>Extended periods of account inactivity (over 12 months).</li>
                        </ul>
                        <p>If we terminate your account for policy violations, you may not register a new account without our prior written permission. You may appeal a termination decision through our support team within 30 days of the termination notice.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Payment Terms */}
              <div className="border-b border-zinc-200 terms-section" data-section="payment-terms">
                <button 
                  className="w-full text-left py-5 flex items-center justify-between bg-white"
                  aria-expanded={openSection === 'payment-terms'}
                  aria-controls="payment-terms-content"
                  onClick={() => toggleSection('payment-terms')}
                >
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-6 h-6 text-zinc-900" />
                    <h3 className="text-lg font-medium">Payment Terms</h3>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform ${openSection === 'payment-terms' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openSection === 'payment-terms' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      id="payment-terms-content" 
                      className="bg-white terms-section-content overflow-hidden"
                    >
                      <div className="pb-5 space-y-4 text-zinc-600 ml-9">
                        <p>The following terms govern all payment transactions on the WorkConnect platform:</p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>All fees are listed in local currency and are subject to applicable taxes.</li>
                          <li>Service Providers may set their own rates, but WorkConnect retains a service fee between 5-15% of the transaction value.</li>
                          <li>Payment for services is held in escrow until the service is completed and approved by the Client.</li>
                          <li>Clients must fund their jobs before a Service Provider begins work.</li>
                          <li>Refunds may be issued according to our Refund Policy in cases of service non-delivery or quality issues.</li>
                          <li>Service Providers can withdraw earnings once they clear the pending period (typically 7 business days after job completion).</li>
                        </ul>
                        <p>We use industry-standard security measures to protect payment information. Your financial data is encrypted and never stored on our servers.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Dispute Resolution */}
              <div className="border-b border-zinc-200 terms-section" data-section="dispute-resolution">
                <button 
                  className="w-full text-left py-5 flex items-center justify-between bg-white"
                  aria-expanded={openSection === 'dispute-resolution'}
                  aria-controls="dispute-resolution-content"
                  onClick={() => toggleSection('dispute-resolution')}
                >
                  <div className="flex items-center gap-3">
                    <Scale className="w-6 h-6 text-zinc-900" />
                    <h3 className="text-lg font-medium">Dispute Resolution</h3>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform ${openSection === 'dispute-resolution' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openSection === 'dispute-resolution' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      id="dispute-resolution-content" 
                      className="bg-white terms-section-content overflow-hidden"
                    >
                      <div className="pb-5 space-y-4 text-zinc-600 ml-9">
                        <p>When disputes arise between users on our platform, the following process applies:</p>
                        <ol className="list-decimal pl-5 space-y-2">
                          <li>Direct Resolution: Users should first attempt to resolve the issue directly through our messaging system.</li>
                          <li>Mediation: If direct resolution fails, either party may request mediation through our Support Team within 14 days of the incident.</li>
                          <li>Platform Decision: If mediation is unsuccessful, WorkConnect will review evidence from both parties and make a binding decision.</li>
                          <li>Arbitration: For disputes exceeding $1,000, users may request third-party arbitration. The cost of arbitration is shared equally unless otherwise determined.</li>
                        </ol>
                        <p>WorkConnect&apos;s decisions are based on our policies, communication records, work history, and transaction details. Our primary goal is to ensure fair treatment for all parties while maintaining the integrity of our marketplace.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Privacy & Data Handling */}
              <div className="border-b border-zinc-200 terms-section" data-section="privacy-data-handling">
                <button 
                  className="w-full text-left py-5 flex items-center justify-between bg-white"
                  aria-expanded={openSection === 'privacy-data-handling'}
                  aria-controls="privacy-data-handling-content"
                  onClick={() => toggleSection('privacy-data-handling')}
                >
                  <div className="flex items-center gap-3">
                    <Lock className="w-6 h-6 text-zinc-900" />
                    <h3 className="text-lg font-medium">Privacy & Data Handling</h3>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform ${openSection === 'privacy-data-handling' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openSection === 'privacy-data-handling' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      id="privacy-data-handling-content" 
                      className="bg-white terms-section-content overflow-hidden"
                    >
                      <div className="pb-5 space-y-4 text-zinc-600 ml-9">
                        <p>WorkConnect takes your privacy seriously. Our data handling practices include:</p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>We collect only the information necessary to provide our services, including personal details, payment information, and service history.</li>
                          <li>Your data is encrypted and stored securely using industry-standard protocols.</li>
                          <li>We do not sell your personal information to third parties.</li>
                          <li>We may share limited data with service providers who help us operate our platform.</li>
                          <li>You can request access to, correction of, or deletion of your personal information through your account settings or by contacting our privacy team.</li>
                        </ul>
                        <p>For complete information about how we collect, use, and protect your data, please refer to our <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Changes to Terms */}
              <div className="border-b border-zinc-200 terms-section" data-section="changes-to-terms">
                <button 
                  className="w-full text-left py-5 flex items-center justify-between bg-white"
                  aria-expanded={openSection === 'changes-to-terms'} 
                  aria-controls="changes-to-terms-content"
                  onClick={() => toggleSection('changes-to-terms')}
                >
                  <div className="flex items-center gap-3">
                    <FileEdit className="w-6 h-6 text-zinc-900" />
                    <h3 className="text-lg font-medium">Changes to Terms</h3>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform ${openSection === 'changes-to-terms' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openSection === 'changes-to-terms' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      id="changes-to-terms-content" 
                      className="bg-white terms-section-content overflow-hidden"
                    >
                      <div className="pb-5 space-y-4 text-zinc-600 ml-9">
                        <p>WorkConnect may modify these Terms at any time. When we make changes:</p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>We will notify you of significant changes via email and/or through an in-app notification.</li>
                          <li>For minor updates, we may only update the &quot;Last Updated&quot; date at the top of these Terms.</li>
                          <li>You will be asked to acknowledge and accept material changes before continuing to use the Platform.</li>
                          <li>If you do not agree with the revised Terms, you should discontinue using the Platform.</li>
                        </ul>
                        <p>We encourage you to review these Terms periodically to stay informed about our legal requirements and policies. Your continued use of the Platform after changes take effect constitutes your acceptance of the revised Terms.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* Download PDF Section */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-6 shadow-sm">
              <div className="flex flex-col items-center md:flex-row md:justify-between gap-6">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-center md:text-left">Need a copy for your records?</h2>
                  <p className="text-zinc-600 text-sm text-center md:text-left">Download the complete Terms & Conditions document</p>
                </div>
                <Button 
                  className="bg-zinc-900 hover:bg-zinc-800 flex items-center gap-2"
                  onClick={downloadTerms}
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Help Section */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="border border-zinc-200 rounded-lg p-8 shadow-sm text-center">
              <div className="flex justify-center mb-6">
                <Headphones className="w-12 h-12 text-zinc-900" />
              </div>
              <h2 className="text-2xl font-semibold mb-3">Need Help Understanding?</h2>
              <p className="text-zinc-600 mb-6 max-w-xl mx-auto">
                Our support team is here to help you understand any section of our terms. Don&apos;t hesitate to reach out with questions.
              </p>
              <Button className="bg-zinc-900 hover:bg-zinc-800">Talk to Support</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 