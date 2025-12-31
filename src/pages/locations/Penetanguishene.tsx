import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Penetanguishene() {
  const neighborhoods = [
    "Downtown Penetang", "Main Street", "Champlain Park", "Georgian Bay Shores",
    "Discovery Harbour", "Midland Point", "Tiny Township", "Lafontaine", "Perkinsfield"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Penetanguishene | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Penetanguishene. Georgian Bay specialists. Call (647) 801-9311!" />
        <link rel="canonical" href="https://asads.ca/locations/penetanguishene" />
      </Helmet>
      <LocationPageTemplate
        city="Penetanguishene"
        region="Ontario"
        description="Penetanguishene's trusted home inspection professionals. We serve Penetang and all Georgian Bay waterfront communities."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}