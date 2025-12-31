import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function NiagaraFalls() {
  const neighborhoods = [
    "Downtown Niagara Falls", "Lundy's Lane", "Clifton Hill", "Chippawa", "Fallsview",
    "Drummond", "Stamford", "Willoughby", "Queenston", "Mount Carmel"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Niagara Falls | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Niagara Falls. Certified inspectors, same-day reports. Call (647) 801-9311!" />
        <link rel="canonical" href="https://asads.ca/locations/niagara-falls" />
      </Helmet>
      <LocationPageTemplate
        city="Niagara Falls"
        region="Ontario"
        description="Niagara Falls' dependable home inspection service. We serve all Niagara Falls neighborhoods with comprehensive property inspections."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}