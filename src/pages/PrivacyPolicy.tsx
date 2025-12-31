import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";

export default function PrivacyPolicy() {
  return (
    <Layout>
      <Helmet>
        <title>Privacy Policy | ASADS Home Inspection Toronto</title>
        <meta 
          name="description" 
          content="Privacy Policy for ASADS Home Inspection. Learn how we collect, use, and protect your personal information."
        />
        <link rel="canonical" href="https://asads.ca/privacy-policy" />
      </Helmet>

      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-8">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground mb-8">
            Last updated: December 24, 2024
          </p>

          <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="font-heading text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                ASADS Home Inspection ("we," "our," or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                when you visit our website or use our home inspection services in the Greater Toronto Area.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mb-4">2. Information We Collect</h2>
              <h3 className="font-heading text-xl font-medium mb-3">Personal Information</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Book an inspection through our website or phone</li>
                <li>Fill out a contact form or request a quote</li>
                <li>Sign up for our newsletter or promotional emails</li>
                <li>Communicate with us via email, phone, or other channels</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                This information may include your name, email address, phone number, mailing address, 
                property address, and payment information.
              </p>

              <h3 className="font-heading text-xl font-medium mb-3 mt-6">Automatically Collected Information</h3>
              <p className="text-muted-foreground leading-relaxed">
                When you visit our website, we may automatically collect certain information, including 
                your IP address, browser type, operating system, referring URLs, and information about 
                how you interact with our website.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Providing and managing our home inspection services</li>
                <li>Processing your bookings and payments</li>
                <li>Sending you inspection reports and related documentation</li>
                <li>Communicating with you about appointments and services</li>
                <li>Responding to your inquiries and customer service requests</li>
                <li>Sending promotional communications (with your consent)</li>
                <li>Improving our website and services</li>
                <li>Complying with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mb-4">4. Information Sharing</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information to third parties. 
                We may share your information in the following situations:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Service Providers:</strong> We may share information with third-party vendors who perform services on our behalf, such as payment processing, email delivery, and website hosting.</li>
                <li><strong>Legal Requirements:</strong> We may disclose information if required by law or in response to valid requests by public authorities.</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
                <li><strong>With Your Consent:</strong> We may share information with third parties when you give us explicit consent to do so.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mb-4">5. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your 
                personal information against unauthorized access, alteration, disclosure, or destruction. 
                However, no method of transmission over the Internet or electronic storage is 100% secure, 
                and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mb-4">6. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your personal information for as long as necessary to fulfill the purposes 
                outlined in this Privacy Policy, unless a longer retention period is required or 
                permitted by law. Inspection reports are typically retained for 7 years.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mb-4">7. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Depending on your location, you may have certain rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Access and receive a copy of your personal information</li>
                <li>Correct inaccurate personal information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to or restrict the processing of your information</li>
                <li>Withdraw consent where processing is based on consent</li>
                <li>Data portability (receive your data in a structured format)</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                To exercise these rights, please contact us using the information provided below.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mb-4">8. Cookies and Tracking</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website may use cookies and similar tracking technologies to enhance your experience. 
                Cookies are small data files stored on your device. You can control cookies through your 
                browser settings, but disabling cookies may affect the functionality of our website.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mb-4">9. Third-Party Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website may contain links to third-party websites. We are not responsible for the 
                privacy practices or content of these external sites. We encourage you to read the 
                privacy policies of any third-party sites you visit.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mb-4">10. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our services are not directed to individuals under the age of 18. We do not knowingly 
                collect personal information from children. If you believe we have collected information 
                from a child, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mb-4">11. Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes 
                by posting the new Privacy Policy on this page and updating the "Last updated" date. 
                Your continued use of our services after any changes constitutes acceptance of the 
                updated policy.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mb-4">12. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions or concerns about this Privacy Policy or our privacy practices, 
                please contact us:
              </p>
              <div className="mt-4 p-6 bg-muted/50 rounded-lg">
                <p className="font-semibold">ASADS Home Inspection</p>
                <p className="text-muted-foreground">Toronto, Ontario, Canada</p>
                <p className="text-muted-foreground">Phone: (647) 801-9311</p>
                <p className="text-muted-foreground">Email: info@asads.ca</p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </Layout>
  );
}
