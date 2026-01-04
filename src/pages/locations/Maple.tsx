import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Maple() {
  const neighborhoods = [
    "Historic Maple", "Maple Downs", "Crestwood", "Eagles Landing", "Maple Village",
    "Rutherford", "Carrville", "Vellore Woods", "Maple Creek", "Mackenzie Glen"
  ];

  return (
    <>
      <Helmet>
        <title>Maple Home Inspector | North Vaughan | ASADS</title>
        <meta name="description" content="Maple & North Vaughan home inspections. New construction & resale specialists. Book today: (647) 801-9311." />
      </Helmet>
      <LocationPageTemplate
        city="Maple"
        region="Vaughan"
        description="Maple's home inspection specialists. Serving North Vaughan's growing communities—from new construction along Teston Road to established neighborhoods in Carrville and Rutherford. We understand the builder standards and common issues in this rapidly developing area."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}
