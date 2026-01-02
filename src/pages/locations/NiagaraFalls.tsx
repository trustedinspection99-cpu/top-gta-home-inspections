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
        <title>Niagara Falls Property Inspection | Income Properties</title>
        <meta name="description" content="Expert property inspections in Niagara Falls for rental, short-term, and residential income properties." />
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