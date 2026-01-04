import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Woodbridge() {
  const neighborhoods = [
    "Woodbridge Core", "Weston Downs", "Sonoma Heights", "Vellore", "Elder Mills",
    "Kipling Heights", "Islington Woods", "Chancellor", "Napa Valley", "Market Lane"
  ];

  return (
    <>
      <Helmet>
        <title>Woodbridge Home Inspector | Vaughan Expert | ASADS</title>
        <meta name="description" content="Woodbridge home inspections in Vaughan's established communities. Vellore to Weston Downs coverage. Call (647) 801-9311." />
      </Helmet>
      <LocationPageTemplate
        city="Woodbridge"
        region="Vaughan"
        description="Woodbridge's trusted home inspection experts. From established Weston Downs and Islington Woods to new developments in Vellore, we provide thorough inspections across Vaughan's most sought-after communities. Our local knowledge ensures nothing is overlooked."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}
