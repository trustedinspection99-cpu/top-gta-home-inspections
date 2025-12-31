import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Cambridge() {
  const neighborhoods = [
    "Downtown Galt", "Preston", "Hespeler", "Blair", "Ayr",
    "Southwood", "Coronation", "Shades Mills", "Pinebush", "Lang's Farm"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Cambridge | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Cambridge. Serving Galt, Preston & Hespeler. Call (647) 801-9311!" />
        <link rel="canonical" href="https://asads.ca/locations/cambridge" />
      </Helmet>
      <LocationPageTemplate
        city="Cambridge"
        region="Ontario"
        description="Cambridge's reliable home inspection experts. We serve Galt, Preston, Hespeler, and all Cambridge communities."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}