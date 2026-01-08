/**
 * Centralized Location SEO Data
 * 
 * This file contains all city-specific SEO metadata for location landing pages.
 * To update SEO data for a location, edit this file - changes will automatically
 * propagate to the corresponding location page.
 * 
 * Structure:
 * - slug: URL-friendly city name (lowercase, hyphens)
 * - city: Display name of the city
 * - region: Regional grouping (e.g., "York Region", "Peel Region")
 * - metaTitle: Page title (max 60 chars recommended)
 * - metaDescription: Meta description (max 160 chars recommended)
 * - description: Hero section description
 * - neighborhoods: List of neighborhoods/areas served
 * - localInsights: Optional array of location-specific insights for content differentiation
 */

export interface LocalInsight {
  title: string;
  content: string;
}

export interface LocationData {
  slug: string;
  city: string;
  region: string;
  metaTitle: string;
  metaDescription: string;
  description: string;
  neighborhoods: string[];
  phoneNumber: string;
  localInsights?: LocalInsight[];
  latitude?: number;
  longitude?: number;
}

export const locationData: LocationData[] = [
  // ============================================
  // GREATER TORONTO AREA (GTA)
  // ============================================
  {
    slug: "toronto",
    city: "Toronto",
    region: "Greater Toronto Area",
    metaTitle: "Home Inspection Toronto | Certified Condo & House Inspectors",
    metaDescription: "Certified home inspection services in Toronto. We inspect condos, houses, and century homes for plumbing, electrical, HVAC, and moisture issues. Same-day reports.",
    description: "Certified home inspection services in Toronto for buyers, sellers, and homeowners. We specialize in condo inspections, older Toronto houses, and modern builds—delivering clear, unbiased reports with same-day turnaround.",
    neighborhoods: [
      "Downtown Toronto", "North York", "Scarborough", "Etobicoke", "East York",
      "York", "The Beaches", "Yorkville", "Liberty Village", "The Annex",
      "Rosedale", "Forest Hill", "High Park", "Leslieville", "Danforth",
      "Queen West", "King West", "Midtown", "Bloor West Village", "Junction"
    ],
    phoneNumber: "(647) 801-9311",
    latitude: 43.653226,
    longitude: -79.383184,
    localInsights: [
      {
        title: "Condo Fan Coil & HVAC Issues in Toronto High-Rises",
        content: "Toronto condos—especially in Liberty Village, CityPlace, and King West—commonly experience fan coil leaks, blocked condensate drains, and mold growth inside insulation. We inspect HVAC systems for moisture damage, air quality concerns, and maintenance red flags."
      },
      {
        title: "Kitec & Aging Plumbing Systems",
        content: "Many Toronto homes and condos built or renovated between 1995 and 2007 may contain Kitec plumbing. These systems are known for premature failure and insurance complications. Our inspections identify Kitec and other aging supply lines before they become costly emergencies."
      },
      {
        title: "Knob-and-Tube Wiring in Older Toronto Homes",
        content: "Century homes in areas like The Annex, High Park, Leslieville, and Riverdale often conceal knob-and-tube wiring behind finished walls. Using thermal imaging and visual inspection, we identify overheating risks and safety concerns common in older Toronto properties."
      },
      {
        title: "Foundation Movement & Basement Moisture",
        content: "Toronto's clay-heavy soil and freeze-thaw cycles can contribute to foundation cracking and basement moisture intrusion. We assess visible foundation movement, drainage conditions, and signs of past water entry in both older and newer homes."
      }
    ]
  },
  {
    slug: "north-york",
    city: "North York",
    region: "Greater Toronto Area",
    metaTitle: "North York Home Inspector | High-Rise & Ravine Home Specialist",
    metaDescription: "Certified home inspection services in North York, Toronto. Specializing in high-rise condos, ravine property slope stability, and mid-century home assessments. Same-day reports & thermal imaging.",
    description: "Providing specialized home inspections for North York's complex urban landscape. From Yonge-Sheppard high-rise condos with fan-coil systems to York Mills estates requiring ravine slope stability assessments, we deliver the technical expertise national brands miss.",
    neighborhoods: [
      "Willowdale", "Don Mills", "Bayview Village", "York Mills", "Lansing",
      "Newtonbrook", "Bathurst Manor", "Downsview", "Lawrence Manor", "Bedford Park",
      "Hoggs Hollow", "The Bridle Path", "Armour Heights", "Parkwoods", "Henry Farm"
    ],
    phoneNumber: "(647) 801-9311",
    latitude: 43.7615,
    longitude: -79.4111,
    localInsights: [
      {
        title: "High-Rise Condo Fan-Coil Systems",
        content: "North York's Yonge-Sheppard corridor features high-rise condos with fan-coil HVAC units. We inspect actuators, valves, and condensation pans that are commonly overlooked in standard condo inspections."
      },
      {
        title: "Ravine Property Slope Stability",
        content: "York Mills and Don Mills estates often sit on ravine lots with unique erosion and retaining wall concerns. Our inspections assess slope stability and drainage to protect your investment."
      },
      {
        title: "Mid-Century Aluminum Wiring",
        content: "Homes built in the 1960s-70s in Willowdale and Bathurst Manor frequently contain aluminum wiring. We perform thermal imaging to identify overheating connections."
      }
    ]
  },
  {
    slug: "scarborough",
    city: "Scarborough",
    region: "Greater Toronto Area",
    metaTitle: "Scarborough Home Inspector | GTA East Property Specialist",
    metaDescription: "Certified Scarborough home inspections for houses and condos. Expertise in older homes, townhouses, and waterfront properties. Same-day reports.",
    description: "Professional home inspections across Scarborough covering diverse housing stock from Bluffs waterfront properties to established family homes and modern condos.",
    neighborhoods: [
      "Scarborough Town Centre", "Agincourt", "Malvern", "Rouge", "Guildwood",
      "Cliffcrest", "West Hill", "Highland Creek", "Woburn", "Dorset Park",
      "Eglinton East", "Wexford", "Birch Cliff", "Clairlea", "Golden Mile"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "etobicoke",
    city: "Etobicoke",
    region: "Greater Toronto Area",
    metaTitle: "Etobicoke Home Inspector | Waterfront & Suburb Specialist",
    metaDescription: "Certified Etobicoke home inspections for houses and condos. Expertise in lakefront properties, established neighborhoods, and new developments. Same-day reports.",
    description: "Expert home inspections across Etobicoke from Humber Bay waterfront condos to established Kingsway homes and Rexdale family properties.",
    neighborhoods: [
      "The Kingsway", "Humber Bay", "Mimico", "Long Branch", "Alderwood",
      "Islington-City Centre West", "Rexdale", "Thistletown", "Richview", "Markland Wood",
      "Eatonville", "Princess Gardens", "Sunnylea", "Humber Heights", "Thorncrest Village"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "east-york",
    city: "East York",
    region: "Greater Toronto Area",
    metaTitle: "East York Home Inspector | Bungalow & Post-War Specialist",
    metaDescription: "Certified East York home inspections specializing in post-war bungalows, older homes, and renovated properties. Thermal imaging included.",
    description: "Specialized home inspections in East York focusing on post-war housing stock, bungalow renovations, and aging infrastructure common in established neighborhoods.",
    neighborhoods: [
      "Danforth Village", "Leaside", "Broadview North", "Pape Village", "Woodbine Heights",
      "O'Connor-Parkview", "Thorncliffe Park", "Flemingdon Park", "East Danforth", "Crescent Town"
    ],
    phoneNumber: "(647) 801-9311"
  },

  // ============================================
  // YORK REGION
  // ============================================
  {
    slug: "markham",
    city: "Markham",
    region: "York Region",
    metaTitle: "#1 Markham Home Inspector | Luxury & Investment Property Expert",
    metaDescription: "Certified Markham home inspections specializing in luxury estates, investment properties & new builds. Same-day thermal reports. Serving Unionville, Cachet & Cornell.",
    description: "Markham's premier inspection service for high-value real estate. From historic Unionville heritage homes to the modern, tech-integrated builds of Markham Centre, we provide the discreet, technical expertise required for York Region's most discerning buyers.",
    neighborhoods: [
      "Unionville", "Markham Village", "Cornell", "Berczy Village", "Cathedraltown",
      "Milliken Mills", "Thornhill", "Angus Glen", "Wismer", "Rouge River Estates",
      "Box Grove", "Greensborough", "Cachet", "Victoria Square", "Buttonville",
      "Innovation District", "Legacy", "Sherwood-Amarinth"
    ],
    phoneNumber: "(647) 801-9311",
    localInsights: [
      {
        title: "Luxury Estate Infrastructure",
        content: "Markham's premium markets like Cachet and Angus Glen feature complex systems including multi-zone HVAC, professional-grade appliance integration, and intricate rooflines. We use advanced thermal imaging to verify the performance of these high-value installations."
      },
      {
        title: "Municipal Code & Backwater Valves",
        content: "Markham enforces strict building standards, including mandatory backwater valves in newer developments to prevent basement flooding. We verify these installations and check for R50+ attic insulation levels, which exceed standard provincial requirements."
      },
      {
        title: "Investment & Infill Specialization",
        content: "With the rise of 'tear-down' rebuilds in Unionville and Markham Village, we specialize in assessing how new foundations integrate with older municipal sewer lines and ensuring proper lot grading to prevent drainage issues with neighboring properties."
      }
    ]
  },
  {
    slug: "vaughan",
    city: "Vaughan",
    region: "York Region",
    metaTitle: "Vaughan Home Inspector | New Build & Custom Home Expert",
    metaDescription: "Professional home inspections in Vaughan for new construction, custom homes, and established neighborhoods. Serving Woodbridge, Kleinburg & Maple.",
    description: "Comprehensive home inspections across Vaughan from new Kleinburg custom builds to established Woodbridge communities and modern Vaughan Metropolitan Centre condos.",
    neighborhoods: [
      "Woodbridge", "Kleinburg", "Maple", "Concord", "Thornhill Woods",
      "Vellore Village", "Patterson", "Weston Downs", "West Woodbridge", "Elder Mills"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "richmond-hill",
    city: "Richmond Hill",
    region: "York Region",
    metaTitle: "Richmond Hill Home Inspector | Estate & New Build Expert",
    metaDescription: "Certified Richmond Hill home inspections for luxury estates, new builds, and established homes. Same-day thermal imaging reports.",
    description: "Professional home inspections in Richmond Hill covering luxury estates, modern developments, and established family neighborhoods across York Region.",
    neighborhoods: [
      "Oak Ridges", "Jefferson", "Bayview Hill", "Mill Pond", "Langstaff",
      "Westbrook", "Crosby", "Rouge Woods", "Observatory Hill", "Richvale"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "aurora",
    city: "Aurora",
    region: "York Region",
    metaTitle: "Aurora Home Inspector | Heritage & New Build Specialist",
    metaDescription: "Professional Aurora home inspections for heritage homes, new construction, and established neighborhoods. Certified same-day reports.",
    description: "Expert home inspections in Aurora covering heritage properties in the downtown core to modern developments in the town's growing communities.",
    neighborhoods: [
      "Downtown Aurora", "Bayview Northeast", "Bayview Southeast", "Aurora Heights",
      "Aurora Grove", "Industrial Parkway", "St. Andrew's", "Aurora Highlands"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "newmarket",
    city: "Newmarket",
    region: "York Region",
    metaTitle: "Newmarket Home Inspector | Certified Property Expert",
    metaDescription: "Certified Newmarket home inspections for all property types. Same-day reports with thermal imaging. Serving York Region.",
    description: "Comprehensive home inspection services in Newmarket for buyers and sellers. We inspect heritage homes, modern builds, and everything in between.",
    neighborhoods: [
      "Downtown Newmarket", "Stonehaven", "Glenway Estates", "Armitage",
      "Bristol-London", "Summerhill Estates", "Upper Canada Mall Area", "Woodland Hills"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "stouffville",
    city: "Stouffville",
    region: "York Region",
    metaTitle: "Stouffville Home Inspector | Rural & Estate Specialist",
    metaDescription: "Professional Stouffville home inspections for rural properties, estates, and new developments. Well and septic expertise included.",
    description: "Expert home inspections in Stouffville covering rural properties with wells and septics, estate homes, and new community developments.",
    neighborhoods: [
      "Downtown Stouffville", "Ballantrae", "Musselman's Lake", "Ringwood",
      "Bethesda", "Bloomington", "Vandorf", "Wesley Corners"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "thornhill",
    city: "Thornhill",
    region: "York Region",
    metaTitle: "Thornhill Home Inspector | Established Neighborhood Expert",
    metaDescription: "Certified Thornhill home inspections for established homes and modern condos. Serving Vaughan and Markham. Same-day reports.",
    description: "Professional home inspections in Thornhill covering established residential neighborhoods across both Vaughan and Markham portions of the community.",
    neighborhoods: [
      "Thornhill Village", "Thornhill Woods", "German Mills", "Henderson Avenue",
      "Royal Orchard", "Steeles", "Carrville", "Westminster-Branson"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "king-city",
    city: "King City",
    region: "York Region",
    metaTitle: "King City Home Inspector | Estate & Rural Property Expert",
    metaDescription: "Professional King City home inspections for estates, hobby farms, and rural properties. Well, septic, and outbuilding expertise.",
    description: "Specialized home inspections in King City for luxury estates, rural properties, and equestrian facilities requiring comprehensive system assessments.",
    neighborhoods: [
      "King City", "Nobleton", "Schomberg", "Pottageville", "Kettleby",
      "Snowball", "Laskay", "Strange"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "georgina",
    city: "Georgina",
    region: "York Region",
    metaTitle: "Georgina Home Inspector | Waterfront & Rural Specialist",
    metaDescription: "Certified Georgina home inspections for Lake Simcoe waterfront properties and rural homes. Well and septic expertise included.",
    description: "Expert home inspections in Georgina covering Lake Simcoe waterfront properties, rural homes, and seasonal cottages with specialized system assessments.",
    neighborhoods: [
      "Keswick", "Sutton", "Jackson's Point", "Pefferlaw", "Udora",
      "Virginia", "Baldwin", "Egypt"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "keswick",
    city: "Keswick",
    region: "York Region",
    metaTitle: "Keswick Home Inspector | Lake Simcoe Property Expert",
    metaDescription: "Professional Keswick home inspections for lakefront and residential properties. Moisture and dock inspection expertise.",
    description: "Comprehensive home inspections in Keswick for Lake Simcoe properties and residential homes, focusing on waterfront-specific concerns.",
    neighborhoods: [
      "Downtown Keswick", "Keswick Beach", "Willow Beach", "Roches Point",
      "Maskinonge", "Metro Road North", "The Queensway"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "sutton",
    city: "Sutton",
    region: "York Region",
    metaTitle: "Sutton Home Inspector | Waterfront & Cottage Specialist",
    metaDescription: "Certified Sutton home inspections for Lake Simcoe waterfront homes and cottages. Dock and boathouse assessments included.",
    description: "Expert home inspections in Sutton for Lake Simcoe waterfront properties, seasonal cottages, and year-round homes.",
    neighborhoods: [
      "Sutton West", "Sutton", "Jackson's Point", "Virginia", "Black River"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "east-gwillimbury",
    city: "East Gwillimbury",
    region: "York Region",
    metaTitle: "East Gwillimbury Home Inspector | Rural & New Build Expert",
    metaDescription: "Professional East Gwillimbury home inspections for rural properties and new developments. Well and septic expertise.",
    description: "Comprehensive home inspections in East Gwillimbury covering rural properties with private systems and growing new communities.",
    neighborhoods: [
      "Holland Landing", "Mount Albert", "Sharon", "Queensville", "River Drive Park"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "unionville",
    city: "Unionville",
    region: "York Region",
    metaTitle: "Unionville Home Inspector | Heritage & Modern Home Expert",
    metaDescription: "Certified Unionville home inspections for heritage properties and modern homes. Serving Main Street and surrounding areas.",
    description: "Professional home inspections in Unionville covering heritage homes on Main Street and modern developments in surrounding communities.",
    neighborhoods: [
      "Unionville Main Street", "Old Unionville", "Unionville South", "Unionville North",
      "Commerce Valley", "Enterprise Boulevard"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "kleinburg",
    city: "Kleinburg",
    region: "York Region",
    metaTitle: "Kleinburg Home Inspector | Custom Estate Specialist",
    metaDescription: "Professional Kleinburg home inspections for custom estates and luxury properties. Comprehensive system assessments.",
    description: "Specialized home inspections in Kleinburg for custom-built estates and luxury homes requiring detailed technical assessments.",
    neighborhoods: [
      "Kleinburg Village", "Nashville", "Elder Mills", "Copper Creek"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "maple",
    city: "Maple",
    region: "York Region",
    metaTitle: "Maple Home Inspector | Family Home & New Build Expert",
    metaDescription: "Certified Maple home inspections for family homes and new developments. Serving Vaughan's growing community.",
    description: "Comprehensive home inspections in Maple for established family homes and new construction in Vaughan's growing northern community.",
    neighborhoods: [
      "Maple Village", "Carrville", "Vellore", "Beverley Glen", "Maple Grove"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "woodbridge",
    city: "Woodbridge",
    region: "York Region",
    metaTitle: "Woodbridge Home Inspector | Established & Custom Home Expert",
    metaDescription: "Professional Woodbridge home inspections for established homes and custom builds. Same-day reports with thermal imaging.",
    description: "Expert home inspections in Woodbridge covering established residential areas and custom-built homes in Vaughan's largest community.",
    neighborhoods: [
      "Woodbridge Village", "Pine Grove", "Weston Downs", "Sonoma Heights",
      "Patterson", "West Woodbridge", "Islington Woods"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "concord",
    city: "Concord",
    region: "York Region",
    metaTitle: "Concord Home Inspector | Residential & Commercial Expert",
    metaDescription: "Professional Concord home inspections for residential and mixed-use properties. Serving Vaughan's central community.",
    description: "Comprehensive home inspections in Concord for residential properties in Vaughan's central commercial and residential hub.",
    neighborhoods: [
      "Concord", "Thornhill Woods", "Brownridge", "Crestwood-Springfarm-Yorkhill"
    ],
    phoneNumber: "(647) 801-9311"
  },

  // ============================================
  // PEEL REGION
  // ============================================
  {
    slug: "mississauga",
    city: "Mississauga",
    region: "Peel Region",
    metaTitle: "Home Inspection Mississauga | Certified Condo & House Inspectors",
    metaDescription: "Certified home inspection services in Mississauga. We inspect condos, houses, and suburban properties for electrical, plumbing, HVAC, and moisture issues. Same-day reports.",
    description: "Certified home inspection services in Mississauga for buyers, sellers, and homeowners. We inspect condos, waterfront homes, and suburban properties with clear reporting and same-day turnaround.",
    neighborhoods: [
      "Port Credit", "Streetsville", "Clarkson", "Lorne Park", "Meadowvale",
      "Erin Mills", "Cooksville", "Malton", "Dixie", "Mississauga City Centre",
      "Square One", "Hurontario", "Lisgar", "Churchill Meadows", "Creditview"
    ],
    phoneNumber: "(647) 801-9311",
    localInsights: [
      {
        title: "Condo & High-Rise Inspections in Mississauga",
        content: "Condos around Square One, City Centre, and Hurontario commonly experience fan coil leaks, HVAC drainage issues, and moisture buildup. We inspect in-suite systems and visible common elements for defects that impact safety and comfort."
      },
      {
        title: "Flood & Moisture Risks Near the Credit River",
        content: "Homes in Port Credit, Creditview, and areas near the Credit River may be vulnerable to basement moisture and past flooding. Our inspections focus on drainage, foundation conditions, and signs of previous water intrusion."
      },
      {
        title: "Older Electrical & Plumbing Systems",
        content: "Established neighborhoods like Streetsville and Clarkson often contain aging electrical panels, aluminum wiring, or outdated plumbing. We identify safety risks and components that may affect insurance or future renovations."
      },
      {
        title: "Suburban Homes & Newer Developments",
        content: "In growing areas like Erin Mills, Meadowvale, and Churchill Meadows, we inspect newer homes for grading issues, builder deficiencies, and early wear concerns common in modern construction."
      }
    ]
  },
  {
    slug: "brampton",
    city: "Brampton",
    region: "Peel Region",
    metaTitle: "Home Inspection Brampton | Certified Inspectors | ASADS",
    metaDescription: "Professional home inspection in Brampton. Serving all neighborhoods with same-day reports. Call (647) 801-9311!",
    description: "Brampton's trusted home inspection service. We serve all Brampton communities with thorough inspections and same-day digital reports.",
    neighborhoods: [
      "Downtown Brampton", "Heart Lake", "Bramalea", "Springdale", "Castlemore",
      "Gore Meadows", "Sandalwood", "Mount Pleasant", "Fletchers Creek", "Snelgrove"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "caledon",
    city: "Caledon",
    region: "Peel Region",
    metaTitle: "Caledon Home Inspector | Rural & Estate Property Expert",
    metaDescription: "Professional Caledon home inspections for rural properties, estates, and new developments. Well, septic, and outbuilding expertise.",
    description: "Specialized home inspections in Caledon for rural estates, horse farms, and growing communities requiring comprehensive property assessments.",
    neighborhoods: [
      "Bolton", "Caledon East", "Caledon Village", "Inglewood", "Alton",
      "Palgrave", "Mono Mills", "Belfountain", "Terra Cotta", "Cheltenham"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "bolton",
    city: "Bolton",
    region: "Peel Region",
    metaTitle: "Bolton Home Inspector | Small Town & New Build Expert",
    metaDescription: "Certified Bolton home inspections for established homes and new developments. Serving Caledon's largest community.",
    description: "Comprehensive home inspections in Bolton for established family homes and new construction in Caledon's growing downtown community.",
    neighborhoods: [
      "Downtown Bolton", "South Hill", "Humber Station", "North Hill",
      "Bolton Heights", "Queen Street Area"
    ],
    phoneNumber: "(647) 801-9311"
  },

  // ============================================
  // HALTON REGION
  // ============================================
  {
    slug: "oakville",
    city: "Oakville",
    region: "Halton Region",
    metaTitle: "Oakville Home Inspector | Luxury & Lakefront Specialist",
    metaDescription: "Professional Oakville home inspections for luxury estates, lakefront properties, and established neighborhoods. Same-day reports.",
    description: "Premier home inspection services in Oakville for discerning buyers of luxury estates, lakefront properties, and established family homes.",
    neighborhoods: [
      "Downtown Oakville", "Bronte", "Old Oakville", "Glen Abbey", "River Oaks",
      "Clearview", "Iroquois Ridge", "Joshua Creek", "Eastlake", "Falgarwood"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "burlington",
    city: "Burlington",
    region: "Halton Region",
    metaTitle: "Burlington Home Inspector | Lakefront & Family Home Expert",
    metaDescription: "Certified Burlington home inspections for lakefront properties, established homes, and new developments. Same-day reports.",
    description: "Comprehensive home inspections in Burlington covering Lake Ontario waterfront properties, established neighborhoods, and growing communities.",
    neighborhoods: [
      "Downtown Burlington", "Aldershot", "Tyandaga", "Roseland", "Orchard",
      "Brant Hills", "Headon Forest", "Millcroft", "Palmer", "Shoreacres"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "milton",
    city: "Milton",
    region: "Halton Region",
    metaTitle: "Milton Home Inspector | New Construction & Rural Expert",
    metaDescription: "Professional Milton home inspections for new builds, rural properties, and established homes. Serving Halton Hills.",
    description: "Expert home inspections in Milton covering new construction in growing communities and rural properties with private systems.",
    neighborhoods: [
      "Downtown Milton", "Beaty", "Timberlea", "Harrison", "Willmott",
      "Clarke", "Campbellville", "Brookville", "Old Milton", "Scott"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "halton-hills",
    city: "Halton Hills",
    region: "Halton Region",
    metaTitle: "Halton Hills Home Inspector | Modern Home Experts",
    metaDescription: "Professional inspections in Halton Hills for modern housing and growing communities. Same-day reports included.",
    description: "Professional inspections in Halton Hills for modern housing and growing communities. Same-day reports included.",
    neighborhoods: [
      "Georgetown", "Acton", "Glen Williams", "Limehouse", "Norval",
      "Stewarttown", "Hornby", "Ballinafad", "Silver Creek", "Speyside"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "georgetown",
    city: "Georgetown",
    region: "Halton Region",
    metaTitle: "Georgetown Home Inspector | Heritage & New Build Expert",
    metaDescription: "Certified Georgetown home inspections for heritage homes and new developments. Serving Halton Hills.",
    description: "Professional home inspections in Georgetown covering heritage properties and new developments in Halton Hills.",
    neighborhoods: [
      "Downtown Georgetown", "Cedarvale", "Glen Williams", "Hungry Hollow",
      "Mountainview", "Delrex", "Park", "Silver Creek"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "acton",
    city: "Acton",
    region: "Halton Region",
    metaTitle: "Acton Home Inspector | Small Town Property Expert",
    metaDescription: "Professional Acton home inspections for established homes and rural properties. Serving Halton Hills.",
    description: "Comprehensive home inspections in Acton for established family homes and rural properties in Halton Hills.",
    neighborhoods: [
      "Downtown Acton", "Churchill", "Fairy Lake", "Prospect Park", "Blue Springs"
    ],
    phoneNumber: "(647) 801-9311"
  },

  // ============================================
  // DURHAM REGION
  // ============================================
  {
    slug: "oshawa",
    city: "Oshawa",
    region: "Durham Region",
    metaTitle: "Oshawa Home Inspector | Durham Property Specialist",
    metaDescription: "Certified Oshawa home inspections for all property types. Same-day reports with thermal imaging. Serving Durham Region.",
    description: "Comprehensive home inspection services in Oshawa for buyers and sellers across Durham Region's diverse housing market.",
    neighborhoods: [
      "Downtown Oshawa", "Lakeview", "Pinecrest", "O'Neill", "Taunton",
      "Windfields", "Kedron", "Northglen", "Eastdale", "Westmount"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "whitby",
    city: "Whitby",
    region: "Durham Region",
    metaTitle: "Whitby Home Inspector | Family Home & Waterfront Expert",
    metaDescription: "Professional Whitby home inspections for family homes and waterfront properties. Same-day reports.",
    description: "Expert home inspections in Whitby covering established family neighborhoods and Lake Ontario waterfront properties.",
    neighborhoods: [
      "Downtown Whitby", "Brooklin", "Blue Grass Meadows", "Williamsburg",
      "Port Whitby", "Thickson Point", "Pringle Creek", "Rolling Acres"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "pickering",
    city: "Pickering",
    region: "Durham Region",
    metaTitle: "Pickering Home Inspector | GTA East Property Specialist",
    metaDescription: "Certified Pickering home inspections for houses and condos. Same-day reports with thermal imaging.",
    description: "Professional home inspection services in Pickering covering diverse housing stock from waterfront properties to modern developments.",
    neighborhoods: [
      "Pickering Town Centre", "Liverpool", "Dunbarton", "Highbush", "Brock Ridge",
      "Village East", "Rougemount", "Amberlea", "Bay Ridges"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "ajax",
    city: "Ajax",
    region: "Durham Region",
    metaTitle: "Ajax Home Inspector | Durham Waterfront Specialist",
    metaDescription: "Professional Ajax home inspections for waterfront homes and family properties. Same-day reports.",
    description: "Comprehensive home inspections in Ajax covering Lake Ontario waterfront properties and established family neighborhoods.",
    neighborhoods: [
      "Downtown Ajax", "Lake Driveway West", "Pickering Beach", "South Ajax",
      "Central Ajax", "Audley", "Carruthers Creek", "McLean"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "clarington",
    city: "Clarington",
    region: "Durham Region",
    metaTitle: "Clarington Home Inspector | Rural & Well Specialist",
    metaDescription: "Inspections in Clarington for rural homes, wells, and septic systems. Comprehensive reporting for detached properties.",
    description: "Inspections in Clarington for rural homes, wells, and septic systems. Comprehensive reporting for detached properties.",
    neighborhoods: [
      "Bowmanville", "Courtice", "Newcastle", "Orono", "Enniskillen",
      "Tyrone", "Hampton", "Kirby", "Kendal", "Newtonville"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "bowmanville",
    city: "Bowmanville",
    region: "Durham Region",
    metaTitle: "Bowmanville Home Inspector | Heritage & New Build Expert",
    metaDescription: "Certified Bowmanville home inspections for heritage homes and new construction. Serving Clarington.",
    description: "Professional home inspections in Bowmanville covering heritage downtown properties and new developments across Clarington.",
    neighborhoods: [
      "Downtown Bowmanville", "Liberty Street", "Soper Creek", "South Bowmanville",
      "Westside", "The Orchard"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "scugog",
    city: "Scugog",
    region: "Durham Region",
    metaTitle: "Home Inspection Scugog | Certified Inspectors | ASADS",
    metaDescription: "Professional home inspection in Scugog. Serving Port Perry & Lake Scugog communities. Call (647) 801-9311!",
    description: "Scugog's trusted home inspection experts. We serve Port Perry, Lake Scugog waterfront properties, and all Scugog Township communities.",
    neighborhoods: [
      "Port Perry", "Seagrave", "Greenbank", "Caesarea", "Blackstock",
      "Prince Albert", "Utica", "Manchester", "Epsom", "Nestleton"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "port-perry",
    city: "Port Perry",
    region: "Durham Region",
    metaTitle: "Port Perry Home Inspector | Waterfront & Heritage Specialist",
    metaDescription: "Professional Port Perry home inspections for Lake Scugog waterfront and heritage properties. Same-day reports.",
    description: "Expert home inspections in Port Perry covering Lake Scugog waterfront properties and heritage homes in Scugog Township.",
    neighborhoods: [
      "Downtown Port Perry", "Palmer Park", "Canterbury Common", "Lake Scugog",
      "Scugog Shores"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "brock",
    city: "Brock",
    region: "Durham Region",
    metaTitle: "Brock Township Home Inspector | Rural Property Specialist",
    metaDescription: "Certified Brock Township home inspections for rural properties with wells and septic systems.",
    description: "Specialized home inspections in Brock Township for rural properties requiring well, septic, and outbuilding assessments.",
    neighborhoods: [
      "Cannington", "Beaverton", "Sunderland", "Wilfrid", "Gamebridge",
      "Vroomanton", "Manilla"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "uxbridge",
    city: "Uxbridge",
    region: "Durham Region",
    metaTitle: "Uxbridge Home Inspector | Rural & Private Systems",
    metaDescription: "Specialized inspections in Uxbridge for rural homes, acreage properties, and private septic/well systems.",
    description: "Specialized inspections in Uxbridge for rural homes, acreage properties, and private septic/well systems.",
    neighborhoods: [
      "Downtown Uxbridge", "Quaker Village", "Zephyr", "Udora", "Leaskdale",
      "Siloam", "Goodwood", "Sandford", "Altona", "Coppins Corners"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "beaverton",
    city: "Beaverton",
    region: "Durham Region",
    metaTitle: "Beaverton Home Inspector | Lake Simcoe Property Expert",
    metaDescription: "Professional Beaverton home inspections for Lake Simcoe properties and rural homes.",
    description: "Comprehensive home inspections in Beaverton for Lake Simcoe waterfront properties and rural homes in Brock Township.",
    neighborhoods: [
      "Downtown Beaverton", "Thorah Beach", "Gamebridge", "Cannington"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "cannington",
    city: "Cannington",
    region: "Durham Region",
    metaTitle: "Cannington Home Inspector | Rural Property Specialist",
    metaDescription: "Certified Cannington home inspections for rural properties and small-town homes. Well and septic expertise.",
    description: "Professional home inspections in Cannington for rural properties and established homes in Brock Township.",
    neighborhoods: [
      "Downtown Cannington", "West Cannington", "East Cannington"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "cobourg",
    city: "Cobourg",
    region: "Durham Region",
    metaTitle: "Cobourg Home Inspector | Heritage & Waterfront Expert",
    metaDescription: "Professional Cobourg home inspections for heritage homes and Lake Ontario waterfront properties.",
    description: "Expert home inspections in Cobourg covering heritage downtown properties and Lake Ontario waterfront homes.",
    neighborhoods: [
      "Downtown Cobourg", "Victoria Beach", "Brookside", "Elgin", "Hesperus"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "peterborough",
    city: "Peterborough",
    region: "Peterborough County",
    metaTitle: "Peterborough Home Inspector | Kawarthas Property Expert",
    metaDescription: "Certified Peterborough home inspections for all property types. Same-day reports with thermal imaging.",
    description: "Comprehensive home inspection services in Peterborough for buyers and sellers across the Kawarthas region.",
    neighborhoods: [
      "Downtown Peterborough", "East City", "Otonabee", "Monaghan", "Northcrest",
      "Chemong", "Stewart", "Kawartha Heights", "Brookdale"
    ],
    phoneNumber: "(647) 801-9311"
  },

  // ============================================
  // SIMCOE COUNTY
  // ============================================
  {
    slug: "barrie",
    city: "Barrie",
    region: "Simcoe County",
    metaTitle: "Barrie Home Inspection | Expert Local Property Audit",
    metaDescription: "Certified inspections for Barrie homes and investments. Same-day reporting helps you close the deal faster.",
    description: "Certified inspections for Barrie homes and investments. Same-day reporting helps you close the deal faster.",
    neighborhoods: [
      "Downtown Barrie", "South Barrie", "Holly", "Ardagh Bluffs", "East Bayfield",
      "Painswick", "Letitia Heights", "Georgian Drive", "Sunnidale", "Allandale"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "innisfil",
    city: "Innisfil",
    region: "Simcoe County",
    metaTitle: "Innisfil Home Inspector | Rural & Waterfront Audit",
    metaDescription: "Home inspections in Innisfil for detached homes, acreage properties, and waterfront seasonal residences.",
    description: "Home inspections in Innisfil for detached homes, acreage properties, and waterfront seasonal residences.",
    neighborhoods: [
      "Alcona", "Lefroy", "Gilford", "Stroud", "Big Bay Point",
      "Belle Ewart", "Churchill", "Cookstown", "Sandy Cove", "Innisfil Beach"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "orillia",
    city: "Orillia",
    region: "Simcoe County",
    metaTitle: "Orillia Home Inspector | Waterfront & Cottage Specialist",
    metaDescription: "Professional Orillia home inspections for Lake Simcoe and Lake Couchiching properties. Same-day reports.",
    description: "Expert home inspections in Orillia covering Lake Simcoe and Lake Couchiching waterfront properties and established neighborhoods.",
    neighborhoods: [
      "Downtown Orillia", "West Orillia", "Orchard Point", "Couchiching",
      "Bayview", "University", "Uhthoff", "Severn Bridge"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "collingwood",
    city: "Collingwood",
    region: "Simcoe County",
    metaTitle: "Collingwood Home Inspector | Ski Chalet & Waterfront Expert",
    metaDescription: "Professional Collingwood home inspections for ski chalets, waterfront properties, and year-round homes.",
    description: "Specialized home inspections in Collingwood for ski chalets, Georgian Bay waterfront properties, and year-round residential homes.",
    neighborhoods: [
      "Downtown Collingwood", "Blue Mountain", "Craigleith", "Georgian Bay",
      "Pretty River", "Silver Creek", "Thornbury"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "wasaga-beach",
    city: "Wasaga Beach",
    region: "Simcoe County",
    metaTitle: "Wasaga Beach Home Inspector | Beachfront Property Expert",
    metaDescription: "Certified Wasaga Beach home inspections for beachfront properties and seasonal cottages. Moisture expertise.",
    description: "Professional home inspections in Wasaga Beach for beachfront properties, seasonal cottages, and year-round homes.",
    neighborhoods: [
      "Beach Area 1", "Beach Area 2", "Beach Area 3", "Beach Area 4",
      "Beach Area 5", "Beach Area 6", "Allenwood", "Sunnidale"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "midland",
    city: "Midland",
    region: "Simcoe County",
    metaTitle: "Midland Home Inspector | Georgian Bay Property Expert",
    metaDescription: "Professional Midland home inspections for Georgian Bay waterfront and established homes. Same-day reports.",
    description: "Comprehensive home inspections in Midland covering Georgian Bay waterfront properties and established residential neighborhoods.",
    neighborhoods: [
      "Downtown Midland", "Bayshore", "Tiffin", "Hugel", "Hillcrest"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "penetanguishene",
    city: "Penetanguishene",
    region: "Simcoe County",
    metaTitle: "Penetanguishene Home Inspector | Waterfront Specialist",
    metaDescription: "Certified Penetanguishene home inspections for Georgian Bay waterfront and heritage properties.",
    description: "Expert home inspections in Penetanguishene for Georgian Bay waterfront properties and heritage homes.",
    neighborhoods: [
      "Downtown Penetanguishene", "Midland Point", "Georgian Bay Estates",
      "Lafontaine", "Perkinsfield"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "springwater",
    city: "Springwater",
    region: "Simcoe County",
    metaTitle: "Springwater Home Inspector | Rural Property Expert",
    metaDescription: "Professional Springwater home inspections for rural properties with wells and septic systems.",
    description: "Specialized home inspections in Springwater Township for rural properties requiring private system assessments.",
    neighborhoods: [
      "Midhurst", "Minesing", "Anten Mills", "Snow Valley", "Elmvale",
      "Hillsdale", "Phelpston"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "new-tecumseth",
    city: "New Tecumseth",
    region: "Simcoe County",
    metaTitle: "New Tecumseth Home Inspector | Alliston & Area Expert",
    metaDescription: "Professional New Tecumseth home inspections for Alliston, Tottenham, and Beeton. Same-day reports.",
    description: "Comprehensive home inspections in New Tecumseth covering Alliston, Tottenham, Beeton, and surrounding rural areas.",
    neighborhoods: [
      "Alliston", "Tottenham", "Beeton", "Cookstown", "Newton Robinson",
      "Thornton", "Nicolston"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "alliston",
    city: "Alliston",
    region: "Simcoe County",
    metaTitle: "Home Inspection Alliston | Certified Inspectors | ASADS",
    metaDescription: "Professional home inspection in Alliston & New Tecumseth. Same-day reports. Call (647) 801-9311!",
    description: "Alliston's trusted home inspection service. We serve Alliston, Tottenham, Beeton, and all New Tecumseth communities.",
    neighborhoods: [
      "Downtown Alliston", "Tottenham", "Beeton", "Cookstown", "Everett",
      "Lisle", "Rosemont", "Thornton", "Newton Robinson", "Nottawasaga"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "bradford",
    city: "Bradford",
    region: "Simcoe County",
    metaTitle: "Bradford Home Inspector | Holland Marsh Area Expert",
    metaDescription: "Professional Bradford home inspections for established homes and new developments. Serving BWG.",
    description: "Comprehensive home inspections in Bradford West Gwillimbury for established homes and growing new communities.",
    neighborhoods: [
      "Downtown Bradford", "Bond Head", "Newton Robinson", "Holland Landing",
      "Holland Marsh"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "essa",
    city: "Essa",
    region: "Simcoe County",
    metaTitle: "Home Inspection Essa Township | Certified Inspectors | ASADS",
    metaDescription: "Professional home inspection in Essa Township. Serving Angus, Thornton & rural properties. Call (647) 801-9311!",
    description: "Essa Township's trusted home inspection service. We serve Angus, Thornton, and all Essa communities with comprehensive inspections.",
    neighborhoods: [
      "Angus", "Thornton", "Utopia", "Baxter", "Egbert",
      "Ivy", "Colwell", "Glen Huron", "Sinclair Point", "New Lowell"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "clearview",
    city: "Clearview",
    region: "Simcoe County",
    metaTitle: "Home Inspection Clearview | Certified Inspectors | ASADS",
    metaDescription: "Professional home inspection in Clearview Township. Serving Stayner, Creemore & area. Call (647) 801-9311!",
    description: "Clearview Township's trusted home inspection service. We serve Stayner, Creemore, and all Clearview communities.",
    neighborhoods: [
      "Stayner", "Creemore", "New Lowell", "Nottawa", "Singhampton",
      "Duntroon", "Sunnidale Corners", "Batteaux", "Avening", "Glen Huron"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "stayner",
    city: "Stayner",
    region: "Simcoe County",
    metaTitle: "Stayner Home Inspector | Small Town Property Expert",
    metaDescription: "Professional Stayner home inspections for established homes and rural properties in Clearview.",
    description: "Comprehensive home inspections in Stayner for established family homes and rural properties in Clearview Township.",
    neighborhoods: [
      "Downtown Stayner", "Creemore Road", "Highway 26 Corridor", "Sunnidale"
    ],
    phoneNumber: "(647) 801-9311"
  },

  // ============================================
  // HAMILTON-NIAGARA REGION
  // ============================================
  {
    slug: "hamilton",
    city: "Hamilton",
    region: "Hamilton-Wentworth",
    metaTitle: "Hamilton Home Inspector | Steel City Property Expert",
    metaDescription: "Certified Hamilton home inspections for all property types. Same-day reports with thermal imaging.",
    description: "Comprehensive home inspection services in Hamilton for buyers and sellers across the diverse Steel City housing market.",
    neighborhoods: [
      "Downtown Hamilton", "Westdale", "Dundas", "Ancaster", "Stoney Creek",
      "Waterdown", "Flamborough", "Mount Hope", "Binbrook", "Locke Street"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "stoney-creek",
    city: "Stoney Creek",
    region: "Hamilton-Wentworth",
    metaTitle: "Stoney Creek Home Inspector | Escarpment Property Expert",
    metaDescription: "Professional Stoney Creek home inspections for escarpment and waterfront properties. Same-day reports.",
    description: "Expert home inspections in Stoney Creek covering escarpment properties, waterfront homes, and established neighborhoods.",
    neighborhoods: [
      "Downtown Stoney Creek", "Winona", "Fruitland", "Upper Stoney Creek",
      "Battlefield", "Confederation Park"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "ancaster",
    city: "Ancaster",
    region: "Hamilton-Wentworth",
    metaTitle: "Ancaster Home Inspector | Heritage & Estate Specialist",
    metaDescription: "Certified Ancaster home inspections for heritage homes and luxury estates. Same-day thermal reports.",
    description: "Professional home inspections in Ancaster covering heritage properties, luxury estates, and established family homes.",
    neighborhoods: [
      "Ancaster Village", "Meadowlands", "Wilson Street", "Fiddler's Green",
      "Sulphur Springs"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "dundas",
    city: "Dundas",
    region: "Hamilton-Wentworth",
    metaTitle: "Dundas Home Inspector | Valley Town Property Expert",
    metaDescription: "Professional Dundas home inspections for heritage homes and established properties. Same-day reports.",
    description: "Comprehensive home inspections in Dundas covering heritage downtown properties and established residential neighborhoods.",
    neighborhoods: [
      "Downtown Dundas", "Valley", "Creighton Heights", "University Gardens",
      "Dundas Peak Area"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "flamborough",
    city: "Flamborough",
    region: "Hamilton-Wentworth",
    metaTitle: "Flamborough Home Inspector | Rural & Estate Specialist",
    metaDescription: "Certified Flamborough home inspections for rural properties and estates. Well and septic expertise.",
    description: "Specialized home inspections in Flamborough for rural properties, hobby farms, and estate homes requiring comprehensive assessments.",
    neighborhoods: [
      "Waterdown", "Carlisle", "Freelton", "Greensville", "Rockton",
      "Sheffield", "Troy", "Westover"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "grimsby",
    city: "Grimsby",
    region: "Niagara Region",
    metaTitle: "Grimsby Home Inspector | Escarpment & Waterfront Expert",
    metaDescription: "Professional Grimsby home inspections for escarpment and Lake Ontario waterfront properties.",
    description: "Expert home inspections in Grimsby covering escarpment properties, Lake Ontario waterfront homes, and established neighborhoods.",
    neighborhoods: [
      "Downtown Grimsby", "Grimsby Beach", "Casablanca", "Winston Road",
      "Bartlett", "Mountain"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "st-catharines",
    city: "St. Catharines",
    region: "Niagara Region",
    metaTitle: "St. Catharines Home Inspector | Garden City Expert",
    metaDescription: "Certified St. Catharines home inspections for all property types. Same-day reports with thermal imaging.",
    description: "Comprehensive home inspection services in St. Catharines for buyers and sellers across the Garden City.",
    neighborhoods: [
      "Downtown St. Catharines", "Port Dalhousie", "Grantham", "Martindale",
      "Merritton", "Western Hill", "Lakeshore", "QEW Corridor"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "niagara-falls",
    city: "Niagara Falls",
    region: "Niagara Region",
    metaTitle: "Niagara Falls Home Inspector | Tourism Area Specialist",
    metaDescription: "Professional Niagara Falls home inspections for residential and tourism properties. Same-day reports.",
    description: "Expert home inspections in Niagara Falls covering residential neighborhoods and unique tourism-area properties.",
    neighborhoods: [
      "Downtown Niagara Falls", "Fallsview", "Clifton Hill", "Chippawa",
      "Lundy's Lane", "Stamford", "Stanley Avenue"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "niagara-on-the-lake",
    city: "Niagara-on-the-Lake",
    region: "Niagara Region",
    metaTitle: "Niagara-on-the-Lake Home Inspector | Heritage Expert",
    metaDescription: "Certified NOTL home inspections for heritage homes and wine country estates. Same-day reports.",
    description: "Specialized home inspections in Niagara-on-the-Lake for heritage properties, wine country estates, and waterfront homes.",
    neighborhoods: [
      "Old Town", "Virgil", "St. Davids", "Queenston", "Glendale"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "welland",
    city: "Welland",
    region: "Niagara Region",
    metaTitle: "Welland Home Inspector | Certified System Audits",
    metaDescription: "Home inspections in Welland emphasizing aging homes, building systems, and structural integrity.",
    description: "Home inspections in Welland emphasizing aging homes, building systems, and structural integrity.",
    neighborhoods: [
      "Downtown Welland", "Dain City", "Crowland", "Cooks Mills", "Humberstone",
      "River Road", "Quaker Road", "Niagara Street", "Division Street", "Prince Charles"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "thorold",
    city: "Thorold",
    region: "Niagara Region",
    metaTitle: "Thorold Home Inspector | Canal City Property Expert",
    metaDescription: "Professional Thorold home inspections for established homes and new developments. Same-day reports.",
    description: "Comprehensive home inspections in Thorold covering established neighborhoods and new developments in the Canal City.",
    neighborhoods: [
      "Downtown Thorold", "Port Robinson", "Allanburg", "Beaverdams",
      "Rolling Meadows", "Confederation Heights"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "fort-erie",
    city: "Fort Erie",
    region: "Niagara Region",
    metaTitle: "Fort Erie Home Inspector | Border Town Property Expert",
    metaDescription: "Certified Fort Erie home inspections for waterfront and established properties. Same-day reports.",
    description: "Expert home inspections in Fort Erie covering Lake Erie waterfront properties and established border town neighborhoods.",
    neighborhoods: [
      "Downtown Fort Erie", "Ridgeway", "Crystal Beach", "Stevensville",
      "Point Abino", "Crescent Beach"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "port-colborne",
    city: "Port Colborne",
    region: "Niagara Region",
    metaTitle: "Port Colborne Home Inspector | Canal Town Specialist",
    metaDescription: "Professional Port Colborne home inspections for waterfront and established homes. Same-day reports.",
    description: "Comprehensive home inspections in Port Colborne covering Welland Canal waterfront and established residential neighborhoods.",
    neighborhoods: [
      "Downtown Port Colborne", "Sherkston", "Humberstone", "Nickel Beach",
      "Lorraine Road"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "lincoln",
    city: "Lincoln",
    region: "Niagara Region",
    metaTitle: "Lincoln Home Inspector | Wine Country Property Expert",
    metaDescription: "Certified Lincoln home inspections for wine country estates and established homes. Same-day reports.",
    description: "Expert home inspections in Lincoln covering wine country estates, rural properties, and established neighborhoods.",
    neighborhoods: [
      "Beamsville", "Vineland", "Jordan", "Campden", "Rockway"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "beamsville",
    city: "Beamsville",
    region: "Niagara Region",
    metaTitle: "Beamsville Home Inspector | Escarpment Property Expert",
    metaDescription: "Professional Beamsville home inspections for escarpment and wine country properties. Same-day reports.",
    description: "Comprehensive home inspections in Beamsville covering escarpment properties and wine country homes in Lincoln.",
    neighborhoods: [
      "Downtown Beamsville", "Mountain View", "Escarpment", "Highway 8 Corridor"
    ],
    phoneNumber: "(647) 801-9311"
  },

  // ============================================
  // WATERLOO REGION
  // ============================================
  {
    slug: "kitchener",
    city: "Kitchener",
    region: "Waterloo Region",
    metaTitle: "Kitchener Home Inspector | Tech Hub Property Expert",
    metaDescription: "Certified Kitchener home inspections for all property types. Same-day reports with thermal imaging.",
    description: "Comprehensive home inspection services in Kitchener for buyers and sellers across the growing tech hub.",
    neighborhoods: [
      "Downtown Kitchener", "Victoria Park", "Forest Heights", "Stanley Park",
      "Country Hills", "Doon", "Pioneer Park", "Laurentian", "Grand River South"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "waterloo",
    city: "Waterloo",
    region: "Waterloo Region",
    metaTitle: "Waterloo Home Inspector | University Area Specialist",
    metaDescription: "Professional Waterloo home inspections for all property types. Same-day reports with thermal imaging.",
    description: "Expert home inspection services in Waterloo for buyers and sellers in the university city and surrounding communities.",
    neighborhoods: [
      "Uptown Waterloo", "Laurelwood", "Beechwood", "Lincoln Village",
      "Westmount", "University District", "Lakeshore North", "Columbia Forest"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "cambridge",
    city: "Cambridge",
    region: "Waterloo Region",
    metaTitle: "Home Inspection Cambridge | Certified Inspectors | ASADS",
    metaDescription: "Professional home inspection in Cambridge. Serving Galt, Preston & Hespeler. Call (647) 801-9311!",
    description: "Cambridge's reliable home inspection experts. We serve Galt, Preston, Hespeler, and all Cambridge communities.",
    neighborhoods: [
      "Downtown Galt", "Preston", "Hespeler", "Blair", "Ayr",
      "Southwood", "Coronation", "Shades Mills", "Pinebush", "Lang's Farm"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "guelph",
    city: "Guelph",
    region: "Wellington County",
    metaTitle: "Guelph Home Inspector | Royal City Property Expert",
    metaDescription: "Certified Guelph home inspections for all property types. Same-day reports with thermal imaging.",
    description: "Comprehensive home inspection services in Guelph for buyers and sellers across the Royal City.",
    neighborhoods: [
      "Downtown Guelph", "The Ward", "St. Patrick's Ward", "Old University",
      "Kortright East", "Onward Willow", "South End", "Clairfield"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "brantford",
    city: "Brantford",
    region: "Brant County",
    metaTitle: "Home Inspection Brantford | Certified Inspectors | ASADS",
    metaDescription: "Professional home inspection in Brantford & Brant County. Same-day reports. Call (647) 801-9311!",
    description: "Brantford's reliable home inspection experts. We serve Brantford, Paris, and all Brant County communities.",
    neighborhoods: [
      "Downtown Brantford", "Eagle Place", "West Brant", "Holmedale", "Terrace Hill",
      "Paris", "St. George", "Burford", "Scotland", "Mount Pleasant"
    ],
    phoneNumber: "(647) 801-9311"
  },
  {
    slug: "orangeville",
    city: "Orangeville",
    region: "Dufferin County",
    metaTitle: "Orangeville Home Inspector | Headwaters Property Expert",
    metaDescription: "Professional Orangeville home inspections for all property types. Same-day reports with thermal imaging.",
    description: "Comprehensive home inspection services in Orangeville for buyers and sellers in the Headwaters region.",
    neighborhoods: [
      "Downtown Orangeville", "Montgomery Village", "Mono", "Grand Valley",
      "Shelburne", "Amaranth"
    ],
    phoneNumber: "(647) 801-9311"
  }
];

/**
 * Get location data by slug
 */
export function getLocationBySlug(slug: string): LocationData | undefined {
  return locationData.find(loc => loc.slug === slug);
}

/**
 * Get all locations for a specific region
 */
export function getLocationsByRegion(region: string): LocationData[] {
  return locationData.filter(loc => loc.region === region);
}

/**
 * Get all unique regions
 */
export function getAllRegions(): string[] {
  return [...new Set(locationData.map(loc => loc.region))];
}

/**
 * Get nearby locations (for internal linking)
 * Returns locations in the same region
 */
export function getNearbyLocations(currentSlug: string, limit: number = 6): LocationData[] {
  const current = getLocationBySlug(currentSlug);
  if (!current) return [];
  
  return locationData
    .filter(loc => loc.slug !== currentSlug && loc.region === current.region)
    .slice(0, limit);
}
