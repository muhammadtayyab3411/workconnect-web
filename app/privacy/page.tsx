"use client";

import React, { useState, useRef } from 'react';
import { 
  ChevronDown, 
  Shield, 
  Database,
  Globe,
  Download,
  Lock,
  Mail,
  Trash2,
  BadgeCheck,
  User,
  Search,
  Users,
  ShieldCheck,
  UserX,
  Baby,
  RefreshCw
} from 'lucide-react';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';

export default function PrivacyPage() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const privacyRef = useRef<HTMLDivElement>(null);

  const toggleSection = (sectionId: string) => {
    setOpenSection(openSection === sectionId ? null : sectionId);
  };

  const downloadPrivacyPolicy = () => {
    // Create a new window for printing just the privacy policy content
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    // Create HTML content for the print window
    let content = `
      <html>
      <head>
        <title>WorkConnect - Privacy Policy</title>
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
        <h1>Privacy Policy</h1>
        <p><em>Last Updated: February 15, 2024</em></p>
        
        <div class="section">
          <h2>Overview</h2>
          <p>At WorkConnect, we believe in complete transparency about how we handle your data. This privacy policy explains our practices regarding the collection, use, and protection of your information.</p>
          <p>We only collect what we need and never share your data without your consent.</p>
        </div>
    `;
    
    // Add content from all sections
    const sections = [
      { id: 'data-collect', title: 'What Data We Collect' },
      { id: 'data-use', title: 'How We Use Your Data' },
      { id: 'third-party', title: 'Third-Party Sharing' },
      { id: 'data-storage', title: 'Data Storage and Retention' },
      { id: 'security', title: 'Security Measures' },
      { id: 'rights', title: 'Your Rights & Choices' },
      { id: 'children', title: 'Children\'s Privacy' },
      { id: 'international', title: 'International Data Transfers' },
      { id: 'updates', title: 'Updates to Policy' }
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
        <section className="bg-white py-16 border-b border-zinc-200">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <Shield className="w-16 h-16 text-zinc-900" />
            </div>
            <h1 className="text-3xl font-bold mb-5">We Value Your Privacy</h1>
            <p className="text-zinc-600 max-w-2xl mx-auto">
              Learn how we collect, use, and protect your personal data while using our
              platform.
            </p>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="border border-zinc-200 rounded-lg p-6 pb-8">
              <p className="text-zinc-800 mb-4">
                At WorkConnect, we believe in complete transparency about how we handle your data. This privacy policy explains our practices
                regarding the collection, use, and protection of your information.
              </p>
              <p className="text-zinc-600">
                We only collect what we need and never share your data without your consent.
              </p>
            </div>
          </div>
        </section>

        {/* Privacy Policy Sections */}
        <section className="py-8" id="privacy-content" ref={privacyRef}>
          <div className="container mx-auto px-4">
            <div className="space-y-0">
              {/* What Data We Collect */}
              <div className="border-b border-zinc-200 terms-section" data-section="data-collect">
                <button 
                  className="w-full text-left py-5 flex items-center justify-between bg-white"
                  aria-expanded={openSection === 'data-collect'}
                  aria-controls="data-collect-content"
                  onClick={() => toggleSection('data-collect')}
                >
                  <div className="flex items-center gap-3">
                  <User className="w-6 h-6 text-zinc-900" />
                    <h3 className="text-lg font-medium">What Data We Collect</h3>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform ${openSection === 'data-collect' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openSection === 'data-collect' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      id="data-collect-content" 
                      className="bg-white terms-section-content overflow-hidden"
                    >
                      <div className="pb-5 space-y-4 text-zinc-600 ml-9">
                        <p>We collect the following types of information:</p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li><strong>Account Information:</strong> Name, email address, phone number, profile photo, and professional details when you create an account.</li>
                          <li><strong>Profile Information:</strong> Skills, experience, education, portfolio items, and other professional qualifications you choose to share.</li>
                          <li><strong>Communication Data:</strong> Messages, proposals, and reviews exchanged between users on the platform.</li>
                          <li><strong>Payment Information:</strong> Bank account details, payment card information, billing address, and transaction history.</li>
                          <li><strong>Usage Data:</strong> How you interact with our platform, including pages visited, features used, and time spent on the platform.</li>
                          <li><strong>Device Information:</strong> IP address, browser type, operating system, and device identifiers.</li>
                        </ul>
                        <p>We collect this information when you:</p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Create or update your account</li>
                          <li>Complete your profile</li>
                          <li>Post or apply for jobs</li>
                          <li>Communicate with other users</li>
                          <li>Make or receive payments</li>
                          <li>Use the WorkConnect platform</li>
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* How We Use Your Data */}
              <div className="border-b border-zinc-200 terms-section" data-section="data-use">
                <button 
                  className="w-full text-left py-5 flex items-center justify-between bg-white"
                  aria-expanded={openSection === 'data-use'}
                  aria-controls="data-use-content"
                  onClick={() => toggleSection('data-use')}
                >
                  <div className="flex items-center gap-3">
                  <Search className="w-6 h-6 text-zinc-900" />
                    <h3 className="text-lg font-medium">How We Use Your Data</h3>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform ${openSection === 'data-use' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openSection === 'data-use' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      id="data-use-content" 
                      className="bg-white terms-section-content overflow-hidden"
                    >
                      <div className="pb-5 space-y-4 text-zinc-600 ml-9">
                        <p>We use your information for the following purposes:</p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li><strong>Providing Our Services:</strong> To operate the platform, match freelancers with clients, facilitate payments, and enable communications.</li>
                          <li><strong>Personalization:</strong> To customize your experience, recommend relevant jobs or freelancers, and improve your search results.</li>
                          <li><strong>Communication:</strong> To send service updates, administrative messages, and marketing communications you&apos;ve opted into.</li>
                          <li><strong>Security:</strong> To verify your identity, prevent fraud, and ensure the safety and security of the platform.</li>
                          <li><strong>Support:</strong> To provide customer support, respond to your inquiries, and resolve disputes.</li>
                          <li><strong>Improvement:</strong> To analyze usage patterns, conduct research, and improve the functionality of our platform.</li>
                          <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, legal processes, or enforceable governmental requests.</li>
                        </ul>
                        <p>We process your data based on the following legal grounds:</p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Performance of our contract with you</li>
                          <li>Your consent (where specifically requested)</li>
                          <li>Legitimate interests (such as security and platform improvement)</li>
                          <li>Legal obligations</li>
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Third-Party Sharing */}
              <div className="border-b border-zinc-200 terms-section" data-section="third-party">
                <button 
                  className="w-full text-left py-5 flex items-center justify-between bg-white"
                  aria-expanded={openSection === 'third-party'}
                  aria-controls="third-party-content"
                  onClick={() => toggleSection('third-party')}
                >
                  <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-zinc-900" />
                    <h3 className="text-lg font-medium">Third-Party Sharing</h3>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform ${openSection === 'third-party' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openSection === 'third-party' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      id="third-party-content" 
                      className="bg-white terms-section-content overflow-hidden"
                    >
                      <div className="pb-5 space-y-4 text-zinc-600 ml-9">
                        <p>WorkConnect only shares your information with third parties in the following circumstances:</p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li><strong>With Other Users:</strong> Information shared in your public profile, job postings, proposals, and direct communications with other platform users.</li>
                          <li><strong>Service Providers:</strong> Companies that provide services on our behalf, such as payment processing, data analysis, email delivery, hosting, and customer support. These providers are contractually obligated to protect your data.</li>
                          <li><strong>Business Transfers:</strong> If WorkConnect is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
                          <li><strong>Legal Requirements:</strong> When required by law, subpoena, or other legal process, or to protect the rights, property, or safety of WorkConnect, our users, or others.</li>
                        </ul>
                        <p>We do not sell your personal information to third parties for marketing purposes. Any third parties who receive your data are required to maintain the confidentiality and security of your information.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Data Storage and Retention */}
              <div className="border-b border-zinc-200 terms-section" data-section="data-storage">
                <button 
                  className="w-full text-left py-5 flex items-center justify-between bg-white"
                  aria-expanded={openSection === 'data-storage'}
                  aria-controls="data-storage-content"
                  onClick={() => toggleSection('data-storage')}
                >
                  <div className="flex items-center gap-3">
                  <Database className="w-6 h-6 text-zinc-900" />
                    <h3 className="text-lg font-medium">Data Storage and Retention</h3>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform ${openSection === 'data-storage' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openSection === 'data-storage' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      id="data-storage-content" 
                      className="bg-white terms-section-content overflow-hidden"
                    >
                      <div className="pb-5 space-y-4 text-zinc-600 ml-9">
                        <p>Our data storage and retention practices include:</p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li><strong>Storage Location:</strong> Your information is stored in secure data centers located in the United States and the European Union.</li>
                          <li><strong>Retention Period:</strong> We retain your personal information for as long as your account is active or as needed to provide you services, comply with legal obligations, resolve disputes, and enforce our agreements.</li>
                          <li><strong>Account Deletion:</strong> If you delete your account, we will delete or anonymize your personal information within 30 days, except for information that we must retain for legitimate business or legal purposes.</li>
                          <li><strong>Transaction Records:</strong> We retain records of financial transactions for up to 7 years to comply with tax and financial regulations.</li>
                          <li><strong>Communications:</strong> Messages between users are retained to protect against fraud, support dispute resolution, and ensure platform safety.</li>
                        </ul>
                        <p>You can request a copy of your data or account deletion through your account settings or by contacting our privacy team.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Security Measures */}
              <div className="border-b border-zinc-200 terms-section" data-section="security">
                <button 
                  className="w-full text-left py-5 flex items-center justify-between bg-white"
                  aria-expanded={openSection === 'security'}
                  aria-controls="security-content"
                  onClick={() => toggleSection('security')}
                >
                  <div className="flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-zinc-900" />
                    <h3 className="text-lg font-medium">Security Measures</h3>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform ${openSection === 'security' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openSection === 'security' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      id="security-content" 
                      className="bg-white terms-section-content overflow-hidden"
                    >
                      <div className="pb-5 space-y-4 text-zinc-600 ml-9">
                        <p>WorkConnect implements comprehensive security measures to protect your data:</p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li><strong>Encryption:</strong> All data transmitted between your devices and our servers is encrypted using industry-standard SSL/TLS protocols. Sensitive personal information is also encrypted at rest.</li>
                          <li><strong>Access Controls:</strong> We restrict access to personal information to WorkConnect employees, contractors, and agents who need that information to process it. These individuals are bound by confidentiality obligations.</li>
                          <li><strong>Secure Infrastructure:</strong> Our systems are hosted in secure data centers with physical and technical safeguards.</li>
                          <li><strong>Regular Security Audits:</strong> We conduct regular security assessments and penetration testing to identify and address potential vulnerabilities.</li>
                          <li><strong>Payment Security:</strong> Payment information is processed through PCI-DSS compliant service providers.</li>
                          <li><strong>Account Protection:</strong> We offer features like two-factor authentication to help you protect your account.</li>
                        </ul>
                        <p>While we implement strong security measures, no system is completely immune to security threats. We continuously work to enhance our security protocols to protect your data.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Your Rights & Choices */}
              <div className="border-b border-zinc-200 terms-section" data-section="rights">
                <button 
                  className="w-full text-left py-5 flex items-center justify-between bg-white"
                  aria-expanded={openSection === 'rights'}
                  aria-controls="rights-content"
                  onClick={() => toggleSection('rights')}
                >
                  <div className="flex items-center gap-3">
                  <UserX className="w-6 h-6 text-zinc-900" />
                    <h3 className="text-lg font-medium">Your Rights & Choices</h3>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform ${openSection === 'rights' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openSection === 'rights' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      id="rights-content" 
                      className="bg-white terms-section-content overflow-hidden"
                    >
                      <div className="pb-5 space-y-4 text-zinc-600 ml-9">
                        <p>Depending on your location, you may have the following rights regarding your personal information:</p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li><strong>Access:</strong> Request a copy of the personal information we hold about you.</li>
                          <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information.</li>
                          <li><strong>Deletion:</strong> Request deletion of your personal information in certain circumstances.</li>
                          <li><strong>Restriction:</strong> Request that we limit how we use your personal data.</li>
                          <li><strong>Portability:</strong> Request a copy of your data in a structured, commonly used, and machine-readable format.</li>
                          <li><strong>Objection:</strong> Object to our processing of your personal information in certain circumstances.</li>
                          <li><strong>Withdraw Consent:</strong> Withdraw consent previously provided for processing your information.</li>
                        </ul>
                        <p>You can exercise these rights through:</p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Your account settings</li>
                          <li>Contacting our Privacy Team at privacy@workconnect.com</li>
                          <li>Submitting a request through our Help Center</li>
                        </ul>
                        <p>We will respond to your request within 30 days. There may be circumstances where we cannot fulfill some requests, but we will explain any limitations and the reasons for them.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Children's Privacy */}
              <div className="border-b border-zinc-200 terms-section" data-section="children">
                <button 
                  className="w-full text-left py-5 flex items-center justify-between bg-white"
                  aria-expanded={openSection === 'children'}
                  aria-controls="children-content"
                  onClick={() => toggleSection('children')}
                >
                  <div className="flex items-center gap-3">
                  <Baby className="w-6 h-6 text-zinc-900" />
                    <h3 className="text-lg font-medium">Children&apos;s Privacy</h3>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform ${openSection === 'children' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openSection === 'children' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      id="children-content" 
                      className="bg-white terms-section-content overflow-hidden"
                    >
                      <div className="pb-5 space-y-4 text-zinc-600 ml-9">
                        <p>WorkConnect services are designed for adults and are not directed to children under the age of 18.</p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>We do not knowingly collect personal information from children under 18.</li>
                          <li>Users must be at least 18 years old to create an account and use our services.</li>
                          <li>If we become aware that we have inadvertently collected personal information from a child under 18, we will take steps to delete that information as soon as possible.</li>
                          <li>If you believe a child under 18 has provided personal information to WorkConnect, please contact our Privacy Team immediately.</li>
                        </ul>
                        <p>Parents and guardians should supervise their children&apos;s online activities and consider using parental control tools available from online services and software providers.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* International Data Transfers */}
              <div className="border-b border-zinc-200 terms-section" data-section="international">
                <button 
                  className="w-full text-left py-5 flex items-center justify-between bg-white"
                  aria-expanded={openSection === 'international'}
                  aria-controls="international-content"
                  onClick={() => toggleSection('international')}
                >
                  <div className="flex items-center gap-3">
                    <Globe className="w-6 h-6 text-zinc-900" />
                    <h3 className="text-lg font-medium">International Data Transfers</h3>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform ${openSection === 'international' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openSection === 'international' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      id="international-content" 
                      className="bg-white terms-section-content overflow-hidden"
                    >
                      <div className="pb-5 space-y-4 text-zinc-600 ml-9">
                        <p>As a global platform, WorkConnect processes and transfers data internationally:</p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Your information may be transferred to and processed in countries other than your country of residence.</li>
                          <li>These countries may have data protection laws that differ from those in your country.</li>
                          <li>When we transfer personal data outside of the European Economic Area or other regions with data protection laws, we ensure adequate safeguards are in place to protect your information.</li>
                          <li>These safeguards may include data transfer agreements incorporating Standard Contractual Clauses approved by the European Commission, or verification that recipients are certified under frameworks like the EU-US Privacy Shield.</li>
                        </ul>
                        <p>By using our services, you acknowledge and consent to the transfer of your information to countries outside your country of residence, including the United States, where different data protection standards may apply.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Updates to Policy */}
              <div className="border-b border-zinc-200 terms-section" data-section="updates">
                <button 
                  className="w-full text-left py-5 flex items-center justify-between bg-white"
                  aria-expanded={openSection === 'updates'}
                  aria-controls="updates-content"
                  onClick={() => toggleSection('updates')}
                >
                  <div className="flex items-center gap-3">
                  <RefreshCw className="w-6 h-6 text-zinc-900" />
                    <h3 className="text-lg font-medium">Updates to Policy</h3>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform ${openSection === 'updates' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openSection === 'updates' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      id="updates-content" 
                      className="bg-white terms-section-content overflow-hidden"
                    >
                      <div className="pb-5 space-y-4 text-zinc-600 ml-9">
                        <p>We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons:</p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>We will notify you of material changes through email or a prominent notice on our website before the changes become effective.</li>
                          <li>For less significant changes, we will update the &quot;Last Updated&quot; date at the top of this policy.</li>
                          <li>We encourage you to periodically review this page to stay informed about our privacy practices.</li>
                          <li>Continued use of our services after the changes become effective constitutes acceptance of the revised policy.</li>
                        </ul>
                        <p>If you disagree with the revised policy, you should stop using our services and close your account. If you have questions about these changes, please contact our Privacy Team.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy Features Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="bg-white border border-zinc-200 bg-zinc-100 rounded-lg p-6 shadow-sm">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    <Lock className="w-10 h-10 text-zinc-900" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">We Do Not Sell Your Data</h3>
                  <p className="text-zinc-600 text-sm">
                    Your personal information is never sold to third parties.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white border border-zinc-200 bg-zinc-100 rounded-lg p-6 shadow-sm">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                  <Trash2 className="w-10 h-10 text-zinc-900" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Delete Your Data Anytime</h3>
                  <p className="text-zinc-600 text-sm">
                    You have full control over your personal information.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white border border-zinc-200 bg-zinc-100 rounded-lg p-6 shadow-sm">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                  <BadgeCheck className="w-10 h-10 text-zinc-900" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Bank-Level Security</h3>
                  <p className="text-zinc-600 text-sm">
                    Your data is protected with enterprise-grade security.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Download PDF Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="bg-white border border-zinc-200 bg-zinc-100 rounded-lg p-8 text-center">
              <div className="flex justify-center mb-6">
                <Download className="w-10 h-10 text-zinc-900" />
              </div>
              <h2 className="text-xl font-semibold mb-3">Need a copy of our privacy policy?</h2>
              <p className="text-zinc-600 text-sm mb-6 max-w-md mx-auto">
                Download the complete Privacy Policy document for your records.
              </p>
              <Button 
                className="bg-zinc-900 hover:bg-zinc-800 flex items-center gap-2 mx-auto"
                onClick={downloadPrivacyPolicy}
              >
                <Download className="w-4 h-4" />
                <span>Download Privacy Policy (PDF)</span>
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="border border-zinc-200 rounded-lg p-8 shadow-sm text-center">
              <div className="flex justify-center mb-6">
                <Mail className="w-12 h-12 text-zinc-900" />
              </div>
              <h2 className="text-2xl font-semibold mb-3">Questions about your privacy?</h2>
              <p className="text-zinc-600 mb-6 max-w-xl mx-auto">
                Our privacy team is here to help you understand how we protect your data. Get
                in touch with any questions or concerns.
              </p>
              <Button className="bg-zinc-900 hover:bg-zinc-800">Contact Our Privacy Team</Button>
            </div>
          </div>
        </section>

        {/* Last Updated Section */}
        <section className="py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="text-zinc-500 text-sm">Last updated: February 15, 2024</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 