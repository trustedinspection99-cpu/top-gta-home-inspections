import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Milton() {
  const neighborhoods = [
    "Dempsey", "Clarke", "Beaty", "Coates", "Willmott", "Harrison", "Scott", 
    "Ford", "Walker", "Cobban", "Timberlea", "Dorset Park", "Old Milton", 
    "Mountain View", "Bronte Meadows", "Campbellville", "Nassagaweya", 
    "Kelso", "Brookville", "Milton Heights"
  ];

  const localInsights = [
    {
      title: "New Construction Specialist",
      content: "As Canada's fastest-growing community, Milton has unique 'builder rush' challenges. We specialize in Tarion Warranty inspections (30-day and 1-year) to identify common subdivision defects like improper foundation grading on former farmland and HVAC undersizing."
    },
    {
      title: "Escarpment & Rural Expertise",
      content: "For properties in Campbellville and near the Niagara Escarpment, we assess specific risks including radon gas potential, slope stability, and complex lot drainage. We also provide specialized testing for private wells and septic systems."
    },
    {
      title: "Multi-Generational Home Safety",
      content: "With the rise of multi-generational living in Milton, we verify legal basement suite requirements, including proper fire separation, egress window compliance, and independent utility safety."
    }
  ];

  return (
    <>
      <Helmet>
        <title>#1 Home Inspector Milton | New Build & Tarion Warranty Expert</title>
        <meta name="description" content="Certified Milton home inspections specializing in new construction, Tarion warranty reports, and Escarpment properties. Same-day digital reports. Call (647) 801-9311." />
        <meta name="geo.placename" content="Milton, Ontario" />
        <meta name="geo.region" content="CA-ON" />
      </Helmet>
      <LocationPageTemplate
        city="Milton"
        region="Halton Region"
        description="Expert home inspection services for Canada's fastest-growing community. From rapid-growth new builds in South Milton to historic estates in Old Milton and rural properties in Campbellville, we provide the technical local knowledge you need."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
        localInsights={localInsights}
      />
    </>
  );
}
