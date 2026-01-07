import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Mississauga() {
  const neighborhoods = [
    "Port Credit", "Streetsville", "Clarkson", "Lorne Park", "Meadowvale",
    "Erin Mills", "Cooksville", "Malton", "Dixie", "Mississauga City Centre",
    "Square One", "Hurontario", "Lisgar", "Churchill Meadows", "Creditview"
  ];

  const pageSpecificContent = {
    heroTitle: "Expert Home Inspection for All of Mississauga",
    heroSubtitle: "Peel Region specialists for waterfront condos, heritage homes, and suburban estates. Get same-day digital reports with every inspection.",
    trustStats: {
      rating: "4.9/5",
      reviewCount: "250+",
      specialty: "Waterfront & Condo Specialist"
    },
    // Adding Mississauga-specific regional risks for better local SEO
    localExpertise: [
      {
        title: "Condo & High-Rise Expertise",
        description: "Specialized assessments for Square One and City Centre units, focusing on HVAC fan coils and common element interfaces."
      },
      {
        title: "Credit River & Lakeview Flood Risks",
        description: "Advanced moisture detection for properties in Port Credit and near the Credit River floodplain."
      },
      {
        title: "Heritage Home Systems",
        description: "Expert evaluation of older electrical and plumbing systems common in Streetsville and Clarkson."
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>🏆 #1 Mississauga Home Inspector | ASADS | 4.9★ Rated Specialist</title>
        <meta name="description" content="Expert home inspections in Mississauga, Port Credit, & Streetsville. Thermal imaging included. Same-day reports for houses & condos. Call (647) 801-9311." />
        <link rel="canonical" href="https://asads.ca/services/home-inspection-mississauga" />
        
        {/* Open Graph / Social Meta */}
        <meta property="og:title" content="Home Inspection Mississauga | Certified Master Inspectors" />
        <meta property="og:description" content="Professional Mississauga home assessments. We specialize in waterfront properties and Square One condos." />
        <meta property="og:type" content="website" />
      </Helmet>

      <LocationPageTemplate
        city="Mississauga"
        region="Ontario"
        description={pageSpecificContent.heroSubtitle}
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
        // Assuming your template accepts these enhanced props:
        customHeroTitle={pageSpecificContent.heroTitle}
        stats={pageSpecificContent.trustStats}
        localHighlights={pageSpecificContent.localExpertise}
        year={2026} 
      />
    </>
  );
}
