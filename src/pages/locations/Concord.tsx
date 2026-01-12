import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Concord() {
  const neighborhoods = [
    "Concord West", "Concord East", "Vaughan Metropolitan Centre", "Keele-Rutherford",
    "Highway 7 Corridor", "Interchange Way", "Edgeley", "Dufferin-Rutherford", "Bass Pro Mills"
  ];

  return (
    <>
      <Helmet>
        <title>Concord Home Inspector | Vaughan Specialist | ASADS</title>
        <meta name="description" content="Concord & Vaughan home inspections. Industrial loft conversions to new builds—we cover it all. Call (647) 801-9311." />
      </Helmet>
      <LocationPageTemplate
        city="Concord"
        region="Vaughan"
        description="Concord's trusted home inspection service. We specialize in Vaughan's diverse property types—from converted industrial lofts along Highway 7 to new construction near Vaughan Metropolitan Centre. Our inspectors understand the unique considerations of properties in this rapidly developing area."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}
