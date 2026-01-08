import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { MapPin, CheckCircle, ShieldCheck, Phone } from "lucide-react";
import { locationData } from "@/data/locationData";

export default function LocationDetail() {
  const { slug } = useParams<{ slug: string }>();

  // Find the specific city data based on the URL slug
  const data = locationData.find((loc) => loc.slug === slug);

  // If the slug doesn't exist, redirect to the main locations page
  if (!data) return <Navigate to="/locations" replace />;

  return (
    <Layout>
      <Helmet>
        <title>{data.metaTitle}</title>
        <meta name="description" content={data.metaDescription} />
        <link rel="canonical" href={`https://www.asads.ca/locations/${data.slug}/`} />
      </Helmet>

      {/* HERO SECTION */}
      <section className="bg-slate-50 py-20 border-b">
        <div className="container">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-primary font-semibold mb-4">
              <MapPin className="h-5 w-5" />
              <span>Certified Inspection in {data.city}, ON</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional Home Inspection {data.city}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              {data.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <a href="tel:6478019311">Book {data.city} Inspection</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#details">View Local Services</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* LOCAL INSIGHTS SECTION */}
      <section id="details" className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Left Column: Local Expertise */}
            <div className="lg:col-span-2 space-y-12">
              <h2 className="text-3xl font-bold">Expertise for {data.city} Homeowners</h2>
              <div className="grid gap-8">
                {data.localInsights?.map((insight, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl border shadow-sm">
                    <h3 className="text-xl font-bold mb-3 text-primary">{insight.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{insight.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Service Sidebar */}
            <div className="space-y-6">
              <div className="bg-primary text-white p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-4">Neighborhoods Served</h3>
                <ul className="grid grid-cols-1 gap-2">
                  {data.neighborhoods.map((n) => (
                    <li key={n} className="flex items-center gap-2 text-sm opacity-90">
                      <CheckCircle className="h-4 w-4 shrink-0" />
                      {n}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border p-8 rounded-2xl bg-muted/30">
                <ShieldCheck className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Licensed & Insured</h3>
                <p className="text-sm text-muted-foreground">
                  Our inspectors are fully certified to perform structural, electrical, and mold inspections in {data.city}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FINAL CTA */}
      <section className="bg-slate-900 text-white py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Inspect in {data.city}?</h2>
          <p className="mb-8 opacity-80">Get a same-day digital report with every inspection.</p>
          <Button variant="secondary" size="lg" asChild>
             <a href="tel:6478019311"><Phone className="mr-2 h-4 w-4"/> Call {data.phoneNumber}</a>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
