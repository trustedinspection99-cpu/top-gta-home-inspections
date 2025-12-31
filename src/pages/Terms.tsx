import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";

export default function Terms() {
  return (
    <Layout>
      <Helmet>
        <title>Terms of Service | ASADS Home Inspection Toronto</title>
        <meta 
          name="description" 
          content="Terms of Service for ASADS Home Inspection. Read our terms and conditions for home inspection services in Toronto and the GTA."
        />
        <link rel="canonical" href="https://asads.ca/terms" />
      </Helmet>

      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-8">
            Terms of Service
          </h1>
          <p className="text-muted-foreground mb-8">
            Last updated: December 24, 2024
          </p>

          <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="font-heading text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing our website or engaging our home inspection services, you agree to be bound 
                by these Terms of Service and all applicable laws and regulations. If you do not agree 
                with any of these terms, you are prohibited from using or accessing our services.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mb-4">2. Services Description</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                ASADS Home Inspection provides residential and commercial property inspection services 
                in the Greater Toronto Area, including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Pre-purchase home inspections</li>
                <li>Pre-listing inspections</li>
                <li>New construction inspections</li>
                <li>Condo and commercial inspections</li>
                <li>Specialty testing (radon, mold, asbestos, lead paint, etc.)</li>
                <li>Thermal imaging inspections</li>
                <li>WETT inspections for wood-burning appliances</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mb-4">3. Scope of Inspection</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our home inspections are visual, non-invasive examinations of the accessible areas of 
                a property. The inspection is performed in accordance with the Standards of Practice 
                established by applicable home inspection associations.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong>The inspection does NOT include:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Areas that are concealed, inaccessible, or obstructed</li>
                <li>Cosmetic defects or conditions</li>
                <li>Environmental hazards (unless specifically contracted)</li>
                <li>Code compliance verification</li>
                <li>Future predictions or lifespan estimates</li>
                <li>Items requiring specialized testing unless specifically ordered</li>
                <li>Underground systems, wells, or septic (unless specifically contracted)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mb-4">4. Booking and Scheduling</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When booking an inspection, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Provide accurate property information and access details</li>
                <li>Ensure legal access to the property at the scheduled time</li>
                <li>Notify us of any known hazards or access limitations</li>
                <li>Ensure utilities (water, gas, electricity) are operational</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mb-4">5. Cancellation and Rescheduling</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our cancellation policy is as follows:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>More than 24 hours notice:</strong> Full refund or free rescheduling</li>
                <li><strong>Less than 24 hours notice:</strong> 50% cancellation fee may apply</li>
                <li><strong>No-show or same-day cancellation:</strong> Full inspection fee may be charged</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Weather-related cancellations for roof or exterior inspections may be rescheduled at 
                no additional cost.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mb-4">6. Payment Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                Payment is due at the time of service unless otherwise arranged. We accept major credit 
                cards, debit cards, and e-transfer. Inspection reports will be delivered upon receipt 
                of payment. Prices are subject to change without notice, but quoted prices will be 
                honored for scheduled inspections.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mb-4">7. Inspection Reports</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Inspection reports are prepared for the exclusive use of the client who contracted 
                the inspection. The report:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Is confidential and should not be shared without authorization</li>
                <li>Represents conditions observed at the time of inspection only</li>
                <li>Is the intellectual property of ASADS Home Inspection</li>
                <li>Will be delivered electronically, typically within 24 hours</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our liability is limited to the fee paid for the inspection service. We are not liable for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Conditions that were concealed or not accessible during inspection</li>
                <li>Conditions that developed after the inspection</li>
                <li>Damages resulting from repairs made by others based on our recommendations</li>
                <li>Consequential, incidental, or special damages of any kind</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Any claim must be made in writing within 14 days of discovering an alleged deficiency. 
                We must be given the opportunity to re-inspect the property before any repairs are made.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mb-4">9. Client Responsibilities</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                As the client, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Read and understand the inspection report in its entirety</li>
                <li>Seek clarification on any items you don't understand</li>
                <li>Consult qualified specialists for further evaluation when recommended</li>
                <li>Make your own decisions regarding the property transaction</li>
                <li>Understand that the inspection is not a warranty or guarantee</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mb-4">10. Dispute Resolution</h2>
              <p className="text-muted-foreground leading-relaxed">
                Any disputes arising from our services shall first be addressed through direct 
                communication. If a resolution cannot be reached, disputes shall be resolved through 
                mediation or arbitration in the Province of Ontario, in accordance with Ontario law.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mb-4">11. Insurance and Qualifications</h2>
              <p className="text-muted-foreground leading-relaxed">
                ASADS Home Inspection maintains Errors and Omissions (E&O) insurance and General 
                Liability insurance. Our inspectors are certified professionals who maintain current 
                training and certifications in the home inspection industry.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mb-4">12. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content on our website, including text, graphics, logos, and images, is the 
                property of ASADS Home Inspection and is protected by copyright and trademark laws. 
                You may not reproduce, distribute, or use our content without written permission.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mb-4">13. Website Use</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When using our website, you agree not to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Use the website for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Transmit any malicious code or harmful content</li>
                <li>Interfere with the proper functioning of the website</li>
                <li>Collect or harvest any personal information from other users</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mb-4">14. Modifications to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these Terms of Service at any time. Changes will be 
                effective immediately upon posting to our website. Your continued use of our services 
                after any modifications constitutes acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mb-4">15. Severability</h2>
              <p className="text-muted-foreground leading-relaxed">
                If any provision of these Terms is found to be unenforceable or invalid, that provision 
                shall be limited or eliminated to the minimum extent necessary, and the remaining 
                provisions shall remain in full force and effect.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mb-4">16. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about these Terms of Service, please contact us:
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
