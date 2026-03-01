import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_URL, getCanonicalUrl, normalizePath } from "@/lib/seo";
import {
  Home,
  CheckCircle,
  Phone,
  Calendar,
  Clock,
  FileText,
  Shield,
  ArrowRight,
  MapPin,
  Building,
  Thermometer,
  DollarSign,
  ClipboardCheck,
  Users,
  Star,
  Award,
  BadgeCheck,
  ThumbsUp,
  BookOpen,
  PhoneCall,
  Mail,
} from "lucide-react";

// ============================================================================
// Types
// ============================================================================
interface Service {
  title: string;
  href: string;
  description: string;
  icon: ReactNode;
  anchorText: string;
}

interface Neighborhood {
  name: string;
  service: string;
}

interface ExpertisePoint {
  text: string;
}

interface Benefit {
  text: string;
}

interface FAQ {
  question: string;
  answer: ReactNode; // JSX content
}

interface Testimonial {
  name: string;
  location: string;
  content: string;
  rating: 5;
}

// ============================================================================
// Constants
// ============================================================================
const SITE_PHONE = "+16478019311";
const SITE_EMAIL = "info@asads.ca";

const metaTitle = "Home Inspection Scarborough | Certified Inspectors & Trusted Reports";
const metaDescription =
  "Looking for the best home inspection in Scarborough? Certified inspectors, pre‑purchase & pre‑listing services, detailed reports, and competitive pricing. Get answers to all your questions here.";

const primaryKeyword = "home inspection scarborough";
const secondaryKeywords = [
  "home inspection scarborough on",
  "best home inspection companies in Scarborough",
  "top-rated home inspectors near Scarborough",
  "certified home inspectors Scarborough area",
  "cost of home inspection in Scarborough",
  "reliable home inspection services with warranty Scarborough",
  "what does a pre-purchase home inspection include Scarborough",
  "how much does a home inspection cost in Scarborough",
  "home inspection scams",
  "red flags in a home inspection",
  "how long does a house inspection take in Ontario",
];

const priceRange = {
  condo: "$300+",
  house: "$350-$600",
};
const duration = "2-3 Hours (depends on size/complexity)";

// ============================================================================
// Data Arrays (typed)
// ============================================================================
const allServices: Service[] = [
  {
    title: "Pre-Purchase Home Inspection",
    href: "/services/pre-purchase",
    description:
      "Complete evaluation before buying a home in Scarborough – uncover hidden defects and negotiate with confidence.",
    icon: <Home className="h-6 w-6" aria-hidden="true" />,
    anchorText: "pre-purchase home inspection in Scarborough",
  },
  {
    title: "Pre-Listing Home Inspection",
    href: "/services/pre-listing",
    description:
      "Sell your Scarborough property faster with a professional pre‑listing inspection that builds buyer trust.",
    icon: <FileText className="h-6 w-6" aria-hidden="true" />,
    anchorText: "pre-listing home inspection Scarborough",
  },
  {
    title: "New Construction Inspection",
    href: "/services/new-construction",
    description:
      "Ensure your newly built Scarborough home meets all codes and standards before you move in.",
    icon: <Award className="h-6 w-6" aria-hidden="true" />,
    anchorText: "new construction inspection Scarborough",
  },
];

const scarboroughNeighborhoods: Neighborhood[] = [
  { name: "Agincourt", service: "Home Inspection" },
  { name: "Birch Cliff", service: "Home Inspection" },
  { name: "Cliffside", service: "Home Inspection" },
  { name: "Guildwood", service: "Home Inspection" },
  { name: "Malvern", service: "Home Inspection" },
  { name: "Port Union", service: "Home Inspection" },
  { name: "Rouge", service: "Home Inspection" },
  { name: "West Hill", service: "Home Inspection" },
  { name: "Woburn", service: "Home Inspection" },
];

const expertisePoints: ExpertisePoint[] = [
  { text: "Certified Home Inspectors (Ontario Licensed)" },
  { text: "Top‑rated & Trusted in Scarborough" },
  { text: "10+ Years Local Experience" },
  { text: "Pre‑Purchase, Pre‑Listing & New Construction Specialists" },
  { text: "Thermal Imaging & Moisture Detection Available" },
  { text: "Radon Measurement Certified" },
  { text: "WETT Certified for Wood‑Burning Appliances" },
  { text: "OAHI & InterNACHI Members" },
  { text: "Reliable Services with Warranty" },
  { text: "Detailed Digital Reports with Photos" },
];

const benefits: Benefit[] = [
  { text: "Same‑Day Digital Reports" },
  { text: "Thorough Photo Documentation" },
  { text: "Thermal Imaging Option" },
  { text: "24/7 Online Report Access" },
  { text: "Lifetime Technical Support" },
  { text: "Flexible Scheduling" },
  { text: "Pre‑Inspection Consultation" },
  { text: "Post‑Inspection Review" },
  { text: "E&O Insurance Coverage" },
  { text: "Free Follow‑up Questions" },
];

const whatWeInspect: string[] = [
  "Structural Components & Foundation",
  "Roofing, Flashings & Attic Ventilation",
  "Plumbing Systems & Water Heater",
  "Electrical Systems & Panel",
  "HVAC Equipment & Ductwork",
  "Interior Finishes & Windows",
  "Exterior Envelope & Grading",
  "Basement & Crawl Space",
  "Insulation & Vapor Barrier",
  "Garage & Outbuildings",
];

const checklistDetails: Record<string, string> = {
  "Structural Components & Foundation":
    "We examine the foundation for cracks, settlement, or water damage; check for proper drainage; and assess the structural integrity of load‑bearing walls, columns, and beams. Any signs of movement or instability are noted.",
  "Roofing, Flashings & Attic Ventilation":
    "Our inspectors evaluate the roof covering (shingles, tiles, etc.) for wear, leaks, or missing components; inspect flashings around chimneys and vents; and check attic ventilation and insulation to prevent moisture buildup and ice dams.",
  "Plumbing Systems & Water Heater":
    "We test water pressure, check for leaks in visible pipes, evaluate the condition of fixtures, and inspect the water heater (age, tank condition, T&P valve). We also note any signs of corrosion or improper installation.",
  "Electrical Systems & Panel":
    "The electrical panel is examined for proper breakers, aluminum wiring, or double‑tapping. We test a representative number of outlets and switches, and look for any hazardous DIY modifications.",
  "HVAC Equipment & Ductwork":
    "We inspect the heating and cooling systems (furnace, A/C, heat pump) for age, maintenance, and safe operation. Ductwork is checked for leaks or disconnections, and we note any carbon monoxide or gas line concerns.",
  "Interior Finishes & Windows":
    "Walls, ceilings, and floors are examined for cracks, water stains, or uneven surfaces. Windows are checked for proper operation, seal failures (fogging), and signs of rot or moisture intrusion.",
  "Exterior Envelope & Grading":
    "We assess siding, brickwork, and trim for damage or deterioration; check that grading slopes away from the foundation; and inspect walkways, decks, and porches for safety issues.",
  "Basement & Crawl Space":
    "The basement or crawl space is inspected for moisture, mold, sump pump operation, and foundation condition. We also look for signs of past flooding or inadequate ventilation.",
  "Insulation & Vapor Barrier":
    "We evaluate insulation levels in the attic and walls (where visible) and check for a proper vapor barrier in crawl spaces. Inadequate insulation can lead to energy loss and ice dams.",
  "Garage & Outbuildings":
    "Garages and detached structures are inspected for structural soundness, electrical safety, fire separation from the house, and operation of overhead doors and openers.",
};

// FAQ answers – now detailed
const faqs: FAQ[] = [
  {
    question: "How much does a home inspection cost in Scarborough?",
    answer: (
      <>
        <p>
          In Scarborough, home inspection prices are based on property type, size, and age.
          Condominiums typically start at <strong>$300</strong>, while single‑family homes range
          from <strong>$350 to $600</strong>. Larger or older homes may be at the higher end due to
          additional systems (e.g., knob‑and‑tube wiring, multiple HVAC units). We provide a
          detailed quote after a quick conversation about your property – no hidden fees.
        </p>
        <p className="mt-2">
          Remember, the cheapest inspection isn’t always the best value. A thorough inspection can
          uncover issues that save you thousands in future repairs and give you negotiating power.
        </p>
      </>
    ),
  },
  {
    question: "What does a pre‑purchase home inspection include in Scarborough?",
    answer: (
      <>
        <p>
          A pre‑purchase inspection in Scarborough covers all major systems and components:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Structure & Foundation:</strong> checking for cracks, settlement, or moisture.</li>
          <li><strong>Roof & Attic:</strong> examining shingles, flashings, ventilation, and insulation.</li>
          <li><strong>Plumbing:</strong> testing water pressure, looking for leaks, and inspecting the water heater.</li>
          <li><strong>Electrical:</strong> evaluating the panel, wiring, outlets, and safety.</li>
          <li><strong>HVAC:</strong> assessing the furnace/AC, ductwork, and thermostat.</li>
          <li><strong>Interior & Exterior:</strong> windows, doors, walls, floors, grading, and decks.</li>
        </ul>
        <p className="mt-2">
          You’ll receive a detailed report with photos and prioritized repair recommendations,
          helping you decide whether to move forward, negotiate, or walk away.
        </p>
      </>
    ),
  },
  {
    question: "How long does a home inspection take in Scarborough?",
    answer: (
      <>
        <p>
          A typical home inspection in Scarborough takes <strong>2 to 3 hours</strong>, but the
          exact time depends on the property’s size, age, and condition. For example:
        </p>
        <ul className="list-disc pl-5 mt-2">
          <li>A 1‑bedroom condo may take 1.5–2 hours.</li>
          <li>A 3‑bedroom detached house might take 2.5–3 hours.</li>
          <li>Larger homes (over 3,000 sq. ft.) or those with multiple outbuildings could take 4 hours.</li>
        </ul>
        <p className="mt-2">
          We never rush – we allocate enough time to inspect every accessible area thoroughly.
        </p>
      </>
    ),
  },
  {
    question: "What are the most common home inspection scams?",
    answer: (
      <>
        <p>
          Unfortunately, some “inspectors” cut corners or use deceptive tactics. Common scams include:
        </p>
        <ul className="list-disc pl-5 mt-2">
          <li><strong>Unlicensed or uncertified inspectors</strong> – In Ontario, anyone can call themselves a home inspector. Always verify credentials (OAHI, InterNACHI).</li>
          <li><strong>Missing major defects</strong> – Some inspectors gloss over serious issues to keep the deal moving. Always ask for references and sample reports.</li>
          <li><strong>Offering repairs</strong> – An inspector who also offers to fix problems has a conflict of interest. ASADS provides unbiased, third‑party evaluations only.</li>
          <li><strong>Bait‑and‑switch pricing</strong> – A very low quote may lead to upselling during the inspection. We’re transparent about our fees.</li>
        </ul>
        <p className="mt-2">
          With ASADS, you get a certified, experienced professional who follows Ontario’s Standards
          of Practice.
        </p>
      </>
    ),
  },
  {
    question: "What are the biggest red flags in a home inspection?",
    answer: (
      <>
        <p>
          During a Scarborough home inspection, we pay special attention to these red flags:
        </p>
        <ul className="list-disc pl-5 mt-2">
          <li><strong>Foundation cracks</strong> – Horizontal or stair‑step cracks can indicate structural movement.</li>
          <li><strong>Water damage / mold</strong> – Stains on ceilings, walls, or in the basement suggest leaks or poor drainage.</li>
          <li><strong>Outdated electrical</strong> – Knob‑and‑tube wiring, aluminum wiring, or Federal Pacific panels are fire hazards.</li>
          <li><strong>Roof age / condition</strong> – Missing shingles, curling, or multiple layers can mean a replacement is imminent.</li>
          <li><strong>HVAC age</strong> – Furnaces or AC units over 15–20 years old are nearing the end of their service life.</li>
          <li><strong>DIY renovations</strong> – Unpermitted work often hides code violations and safety issues.</li>
        </ul>
        <p className="mt-2">
          If we spot any of these, we’ll explain the severity and what it might cost to address them.
        </p>
      </>
    ),
  },
  {
    question: "What's the worst thing a home inspector can find?",
    answer: (
      <>
        <p>
          The most serious findings are those that affect safety, structural integrity, or cost a
          fortune to fix. Examples include:
        </p>
        <ul className="list-disc pl-5 mt-2">
          <li><strong>Major foundation issues</strong> – Repairs can run $10,000–$50,000+.</li>
          <li><strong>Extensive knob‑and‑tube wiring</strong> – Rewiring an entire house costs $8,000–$15,000.</li>
          <li><strong>Significant mold or water damage</strong> – Remediation and repairs may exceed $10,000.</li>
          <li><strong>Structural rot or termite damage</strong> – Can compromise the whole building.</li>
        </ul>
        <p className="mt-2">
          The good news: discovering these before you buy gives you the power to negotiate repairs,
          a price reduction, or even walk away.
        </p>
      </>
    ),
  },
  {
    question: "What is the most common home inspection fail?",
    answer: (
      <>
        <p>
          Based on our experience in Scarborough, the most common issues we uncover are:
        </p>
        <ul className="list-disc pl-5 mt-2">
          <li><strong>Roof problems</strong> – Aging shingles, poor flashing, or inadequate attic ventilation.</li>
          <li><strong>Plumbing leaks</strong> – Dripping faucets, corroded pipes, or outdated galvanized supply lines.</li>
          <li><strong>HVAC inefficiencies</strong> – Dirty filters, failing components, or systems past their expected life.</li>
          <li><strong>Electrical panel issues</strong> – Double‑tapped breakers, amateur additions, or obsolete panels.</li>
          <li><strong>Moisture in basements</strong> – Often due to poor grading or missing downspout extensions.</li>
        </ul>
        <p className="mt-2">
          Most of these are fixable, but knowing about them upfront helps you budget and plan.
        </p>
      </>
    ),
  },
  {
    question: "Is the seller present during a home inspection in Canada?",
    answer: (
      <>
        <p>
          In Ontario, sellers are generally <strong>not present</strong> during the inspection.
          This allows the buyer and their inspector to speak freely and ask questions without
          feeling awkward. However, the buyer’s real estate agent often attends, and we encourage
          buyers to be there too – it’s the best way to learn about the property’s systems and
          maintenance needs.
        </p>
        <p className="mt-2">
          If the seller or their agent insists on being present, we still conduct a thorough,
          objective inspection and note any concerns.
        </p>
      </>
    ),
  },
  {
    question: "What is the most expensive part of a house to fix?",
    answer: (
      <>
        <p>
          The costliest repairs typically involve:
        </p>
        <ul className="list-disc pl-5 mt-2">
          <li><strong>Foundation repair</strong> – $5,000–$50,000 depending on the extent.</li>
          <li><strong>Roof replacement</strong> – $5,000–$15,000 for an average home.</li>
          <li><strong>HVAC system replacement</strong> – $4,000–$12,000 for furnace + AC.</li>
          <li><strong>Rewiring an old house</strong> – $8,000–$15,000.</li>
          <li><strong>Plumbing re-pipe</strong> – $5,000–$15,000 if replacing all supply lines.</li>
          <li><strong>Mold remediation</strong> – $2,000–$10,000+ for extensive contamination.</li>
        </ul>
        <p className="mt-2">
          Our inspections highlight these big‑ticket items so you can make an informed decision.
        </p>
      </>
    ),
  },
  {
    question: "Are home inspections required in Scarborough?",
    answer: (
      <>
        <p>
          No, home inspections are <strong>not legally required</strong> in Ontario, including
          Scarborough. However, they are highly recommended by real estate professionals. Most
          purchase agreements include an “inspection condition” that gives the buyer a set number
          of days (typically 5–7) to have the property inspected. If major issues are found, the
          buyer can negotiate repairs, a price adjustment, or withdraw without penalty.
        </p>
        <p className="mt-2">
          Skipping an inspection might save a few hundred dollars upfront, but it can lead to
          expensive surprises after closing – a risk most buyers aren’t willing to take.
        </p>
      </>
    ),
  },
  {
    question: "What are 5 red flag symptoms in a home inspection?",
    answer: (
      <>
        <p>
          Here are five symptoms that often point to bigger problems:
        </p>
        <ol className="list-decimal pl-5 mt-2 space-y-1">
          <li><strong>Water stains or musty odours</strong> – Indicates leaks, poor drainage, or mould.</li>
          <li><strong>Large foundation cracks</strong> – Especially if they’re horizontal or widening.</li>
          <li><strong>Mismatched or DIY electrical work</strong> – Exposed junction boxes, wrong wire sizes, etc.</li>
          <li><strong>Sagging roof lines</strong> – Could mean structural issues or inadequate framing.</li>
          <li><strong>Signs of pest infestation</strong> – Termite mud tubes, carpenter ant frass, or rodent droppings.</li>
        </ol>
        <p className="mt-2">
          If you notice any of these during a showing, point them out to your inspector so they can
          investigate more closely.
        </p>
      </>
    ),
  },
  {
    question: "Do you offer reliable home inspection services with warranty?",
    answer: (
      <>
        <p>
          Yes, we stand behind every inspection we perform. All ASADS inspections include:
        </p>
        <ul className="list-disc pl-5 mt-2">
          <li>A <strong>satisfaction guarantee</strong> – if you’re not happy, we’ll address your concerns.</li>
          <li><strong>Errors & Omissions (E&O) insurance</strong> – protects you in the unlikely event we miss something.</li>
          <li>Optional <strong>warranty programs</strong> through third‑party providers that cover certain systems after closing.</li>
        </ul>
        <p className="mt-2">
          Our reputation is built on thorough, unbiased reports and excellent customer service.
          Read our testimonials to see why Scarborough homeowners trust us.
        </p>
      </>
    ),
  },
];

const testimonials: Testimonial[] = [
  {
    name: "Jennifer Lee",
    location: "Agincourt, Scarborough",
    content:
      "The ASADS home inspection in Scarborough was incredibly thorough. The inspector spent over 3 hours examining every detail and identified several issues we would have missed. The same‑day report helped us negotiate $10,000 in repairs. Highly recommend!",
    rating: 5,
  },
  {
    name: "Mark Williams",
    location: "Birch Cliff, Scarborough",
    content:
      "As first‑time home buyers in Scarborough, we were nervous about the inspection process. ASADS made it easy to understand and provided exceptional service. Their knowledge of older homes was invaluable.",
    rating: 5,
  },
  {
    name: "Susan Chen",
    location: "Guildwood, Scarborough",
    content:
      "We've used ASADS for multiple property inspections in the GTA. Their attention to detail is unmatched, especially with Scarborough's diverse housing stock. The thermal imaging service identified hidden moisture issues that saved us from a major repair.",
    rating: 5,
  },
];

// ============================================================================
// Reusable Components
// ============================================================================

interface ChecklistItemProps {
  item: string;
  detail: string;
}

function ChecklistItem({ item, detail }: ChecklistItemProps) {
  return (
    <div className="flex items-start gap-4 p-5 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors">
      <div className="bg-primary/10 p-2 rounded-lg">
        <ClipboardCheck className="h-6 w-6 text-primary" aria-hidden="true" />
      </div>
      <div>
        <h3 className="font-semibold text-foreground mb-2">{item}</h3>
        <p className="text-sm text-muted-foreground">{detail}</p>
      </div>
    </div>
  );
}

interface NeighborhoodCardProps {
  name: string;
  service: string;
}

function NeighborhoodCard({ name, service }: NeighborhoodCardProps) {
  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-card border border-border text-center">
      <MapPin className="h-5 w-5 text-primary mb-2" aria-hidden="true" />
      <span className="text-sm font-medium text-foreground">{name}</span>
      <span className="text-xs text-muted-foreground mt-1">{service}</span>
    </div>
  );
}

interface BenefitItemProps {
  text: string;
}

function BenefitItem({ text }: BenefitItemProps) {
  return (
    <li className="flex items-start gap-3">
      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
      <span className="text-foreground">{text}</span>
    </li>
  );
}

interface ExpertisePointProps {
  text: string;
}

function ExpertisePoint({ text }: ExpertisePointProps) {
  return (
    <li className="flex items-start gap-3">
      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
      <span className="text-foreground">{text}</span>
    </li>
  );
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="border-border/50">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" aria-hidden="true" />
          ))}
        </div>
        <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
        <div>
          <p className="font-semibold text-foreground">{testimonial.name}</p>
          <p className="text-sm text-muted-foreground">{testimonial.location}</p>
        </div>
      </CardContent>
    </Card>
  );
}

interface FAQItemProps {
  faq: FAQ;
}

function FAQItem({ faq }: FAQItemProps) {
  return (
    <div className="border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
      <h3 className="font-heading font-semibold text-xl text-foreground mb-3">{faq.question}</h3>
      <div className="text-muted-foreground">{faq.answer}</div>
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================
export default function Scarborough() {
  const location = useLocation();
  const pageUrl = getCanonicalUrl(location.pathname);

  // Plain‑text answers for FAQ schema (stripped of HTML)
  const faqPlainTextAnswers = [
    "In Scarborough, home inspection prices are based on property type, size, and age. Condominiums typically start at $300, while single‑family homes range from $350 to $600. Larger or older homes may be at the higher end due to additional systems. We provide a detailed quote after a quick conversation about your property – no hidden fees. Remember, the cheapest inspection isn’t always the best value. A thorough inspection can uncover issues that save you thousands in future repairs and give you negotiating power.",
    "A pre‑purchase inspection in Scarborough covers all major systems and components: Structure & Foundation: checking for cracks, settlement, or moisture. Roof & Attic: examining shingles, flashings, ventilation, and insulation. Plumbing: testing water pressure, looking for leaks, and inspecting the water heater. Electrical: evaluating the panel, wiring, outlets, and safety. HVAC: assessing the furnace/AC, ductwork, and thermostat. Interior & Exterior: windows, doors, walls, floors, grading, and decks. You’ll receive a detailed report with photos and prioritized repair recommendations, helping you decide whether to move forward, negotiate, or walk away.",
    "A typical home inspection in Scarborough takes 2 to 3 hours, but the exact time depends on the property’s size, age, and condition. For example: A 1‑bedroom condo may take 1.5–2 hours. A 3‑bedroom detached house might take 2.5–3 hours. Larger homes (over 3,000 sq. ft.) or those with multiple outbuildings could take 4 hours. We never rush – we allocate enough time to inspect every accessible area thoroughly.",
    "Unfortunately, some “inspectors” cut corners or use deceptive tactics. Common scams include: Unlicensed or uncertified inspectors – In Ontario, anyone can call themselves a home inspector. Always verify credentials (OAHI, InterNACHI). Missing major defects – Some inspectors gloss over serious issues to keep the deal moving. Always ask for references and sample reports. Offering repairs – An inspector who also offers to fix problems has a conflict of interest. ASADS provides unbiased, third‑party evaluations only. Bait‑and‑switch pricing – A very low quote may lead to upselling during the inspection. We’re transparent about our fees. With ASADS, you get a certified, experienced professional who follows Ontario’s Standards of Practice.",
    "During a Scarborough home inspection, we pay special attention to these red flags: Foundation cracks – Horizontal or stair‑step cracks can indicate structural movement. Water damage / mold – Stains on ceilings, walls, or in the basement suggest leaks or poor drainage. Outdated electrical – Knob‑and‑tube wiring, aluminum wiring, or Federal Pacific panels are fire hazards. Roof age / condition – Missing shingles, curling, or multiple layers can mean a replacement is imminent. HVAC age – Furnaces or AC units over 15–20 years old are nearing the end of their service life. DIY renovations – Unpermitted work often hides code violations and safety issues. If we spot any of these, we’ll explain the severity and what it might cost to address them.",
    "The most serious findings are those that affect safety, structural integrity, or cost a fortune to fix. Examples include: Major foundation issues – Repairs can run $10,000–$50,000+. Extensive knob‑and‑tube wiring – Rewiring an entire house costs $8,000–$15,000. Significant mold or water damage – Remediation and repairs may exceed $10,000. Structural rot or termite damage – Can compromise the whole building. The good news: discovering these before you buy gives you the power to negotiate repairs, a price reduction, or even walk away.",
    "Based on our experience in Scarborough, the most common issues we uncover are: Roof problems – Aging shingles, poor flashing, or inadequate attic ventilation. Plumbing leaks – Dripping faucets, corroded pipes, or outdated galvanized supply lines. HVAC inefficiencies – Dirty filters, failing components, or systems past their expected life. Electrical panel issues – Double‑tapped breakers, amateur additions, or obsolete panels. Moisture in basements – Often due to poor grading or missing downspout extensions. Most of these are fixable, but knowing about them upfront helps you budget and plan.",
    "In Ontario, sellers are generally not present during the inspection. This allows the buyer and their inspector to speak freely and ask questions without feeling awkward. However, the buyer’s real estate agent often attends, and we encourage buyers to be there too – it’s the best way to learn about the property’s systems and maintenance needs. If the seller or their agent insists on being present, we still conduct a thorough, objective inspection and note any concerns.",
    "The costliest repairs typically involve: Foundation repair – $5,000–$50,000 depending on the extent. Roof replacement – $5,000–$15,000 for an average home. HVAC system replacement – $4,000–$12,000 for furnace + AC. Rewiring an old house – $8,000–$15,000. Plumbing re-pipe – $5,000–$15,000 if replacing all supply lines. Mold remediation – $2,000–$10,000+ for extensive contamination. Our inspections highlight these big‑ticket items so you can make an informed decision.",
    "No, home inspections are not legally required in Ontario, including Scarborough. However, they are highly recommended by real estate professionals. Most purchase agreements include an “inspection condition” that gives the buyer a set number of days (typically 5–7) to have the property inspected. If major issues are found, the buyer can negotiate repairs, a price adjustment, or withdraw without penalty. Skipping an inspection might save a few hundred dollars upfront, but it can lead to expensive surprises after closing – a risk most buyers aren’t willing to take.",
    "Here are five symptoms that often point to bigger problems: 1. Water stains or musty odours – Indicates leaks, poor drainage, or mould. 2. Large foundation cracks – Especially if they’re horizontal or widening. 3. Mismatched or DIY electrical work – Exposed junction boxes, wrong wire sizes, etc. 4. Sagging roof lines – Could mean structural issues or inadequate framing. 5. Signs of pest infestation – Termite mud tubes, carpenter ant frass, or rodent droppings. If you notice any of these during a showing, point them out to your inspector so they can investigate more closely.",
    "Yes, we stand behind every inspection we perform. All ASADS inspections include: A satisfaction guarantee – if you’re not happy, we’ll address your concerns. Errors & Omissions (E&O) insurance – protects you in the unlikely event we miss something. Optional warranty programs through third‑party providers that cover certain systems after closing. Our reputation is built on thorough, unbiased reports and excellent customer service. Read our testimonials to see why Scarborough homeowners trust us.",
  ];

  // Schema Markup
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "ASADS Home Inspection",
    image: `${SITE_URL}/images/logo.png`,
    "@id": SITE_URL,
    url: SITE_URL,
    telephone: SITE_PHONE,
    email: SITE_EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "",
      addressLocality: "Scarborough",
      addressRegion: "ON",
      postalCode: "",
      addressCountry: "CA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.7765,
      longitude: -79.2318,
    },
    areaServed: [
      { "@type": "City", name: "Scarborough" },
      { "@type": "City", name: "Toronto" },
      { "@type": "City", name: "Markham" },
      { "@type": "City", name: "Pickering" },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "07:00",
      closes: "22:00",
    },
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "247",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq, index) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faqPlainTextAnswers[index],
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: getCanonicalUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Locations",
        item: getCanonicalUrl("/locations"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Scarborough Home Inspection",
        item: pageUrl,
      },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: metaTitle,
    description: metaDescription,
    url: pageUrl,
    inLanguage: "en-CA",
    isPartOf: {
      "@type": "WebSite",
      name: "ASADS Home Inspection",
      url: SITE_URL,
    },
    breadcrumb: breadcrumbSchema,
    mainEntity: {
      "@type": "Service",
      serviceType: "Home Inspection",
    },
  };

  return (
    <Layout>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={pageUrl} />

        {/* Keywords (optional) */}
        <meta
          name="keywords"
          content={`${primaryKeyword}, ${secondaryKeywords.join(", ")}`}
        />

        {/* Open Graph */}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={`${SITE_URL}/images/og-scarborough-home-inspection.jpg`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_CA" />
        <meta property="og:site_name" content="ASADS Home Inspection" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AsadsInspection" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta
          name="twitter:image"
          content={`${SITE_URL}/images/twitter-scarborough-home-inspection.jpg`}
        />

        {/* Geo tags */}
        <meta name="geo.region" content="CA-ON" />
        <meta name="geo.placename" content="Scarborough" />
        <meta name="geo.position" content="43.7765;-79.2318" />
        <meta name="ICBM" content="43.7765, -79.2318" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/20 rounded-full text-sm font-medium">
                <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                Scarborough's Trusted Home Inspection Company
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Professional Home Inspection Services in{" "}
              <span className="text-secondary">Scarborough</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
              Looking for the <strong>best home inspection in Scarborough</strong>? ASADS provides
              certified inspectors, same‑day digital reports, and competitive pricing. We answer all
              your questions – from cost to red flags – so you can buy or sell with confidence.
            </p>

            <div className="flex flex-wrap gap-4 mb-8 justify-center">
              <div className="flex items-center gap-2 bg-primary-foreground/15 px-4 py-3 rounded-xl">
                <Clock className="h-5 w-5" aria-hidden="true" />
                <span>{duration}</span>
              </div>
              <div className="flex items-center gap-2 bg-primary-foreground/15 px-4 py-3 rounded-xl">
                <DollarSign className="h-5 w-5" aria-hidden="true" />
                <span>Condos {priceRange.condo} | Houses {priceRange.house}</span>
              </div>
              <div className="flex items-center gap-2 bg-primary-foreground/15 px-4 py-3 rounded-xl">
                <Shield className="h-5 w-5" aria-hidden="true" />
                <span>Certified Scarborough Inspectors</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="shadow-lg hover:shadow-xl transition-shadow">
                <Link to="/booking">
                  <Calendar className="mr-2 h-5 w-5" aria-hidden="true" />
                  Schedule Scarborough Inspection
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <a href={`tel:${SITE_PHONE}`}>
                  <Phone className="mr-2 h-5 w-5" aria-hidden="true" />
                  Call {SITE_PHONE}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="max-w-6xl mx-auto space-y-16">
            {/* Introduction */}
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground mb-6">
                When searching for <strong>home inspection companies in Scarborough</strong>,
                choosing certified professionals who know the local market is essential. ASADS
                Home Inspection provides comprehensive property assessments that answer your
                toughest questions and help you avoid costly surprises.
              </p>

              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                Your Trusted Partner for Home Inspections in Scarborough
              </h2>

              <p className="text-muted-foreground mb-6">
                Our{" "}
                <Link
                  to="/services/pre-purchase"
                  className="text-primary hover:underline font-medium"
                >
                  pre-purchase home inspection in Scarborough
                </Link>{" "}
                is designed to identify both obvious defects and hidden problems. From foundation
                assessments to roofing evaluations, our certified inspectors follow Ontario's
                Standards of Practice and give you the knowledge you need to negotiate with
                confidence.
              </p>

              <div className="bg-primary/5 p-6 rounded-xl border border-primary/10 mb-8">
                <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" aria-hidden="true" />
                  Scarborough Home Inspection Cost & Value
                </h3>
                <p className="text-muted-foreground">
                  The average <strong>home inspection cost in Scarborough</strong> starts at $300
                  for condominiums and ranges from $350 to $600 for houses, depending on size and
                  complexity. While price matters, the true value comes from a thorough inspection
                  that can save you thousands in unexpected repairs and give you leverage in
                  negotiations.
                </p>
              </div>
            </div>

            {/* What We Inspect */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8">
                Complete Scarborough Home Inspection Checklist
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {whatWeInspect.map((item) => (
                  <ChecklistItem key={item} item={item} detail={checklistDetails[item]} />
                ))}
              </div>
            </div>

            {/* Core Services Grid */}
            <div>
              <div className="text-center mb-10">
                <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                  Professional Home Inspection Services in Scarborough
                </h2>
                <p className="text-muted-foreground max-w-3xl mx-auto">
                  Whether you're buying, selling, or building, our core inspection services give you
                  the clarity and confidence you need.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {allServices.map((service, index) => (
                  <Card
                    key={index}
                    className="border-border/50 hover:border-primary hover:shadow-lg transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="bg-primary/10 p-3 rounded-lg">{service.icon}</div>
                        <div>
                          <h3 className="font-heading font-bold text-lg text-foreground mb-1">
                            {service.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                        </div>
                      </div>
                      <Link
                        to={normalizePath(service.href)}
                        className="inline-flex items-center gap-2 text-primary hover:underline font-medium text-sm"
                      >
                        Learn more about {service.anchorText} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-10">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  <BookOpen className="h-5 w-5" aria-hidden="true" />
                  Explore All Home Inspection Services
                </Link>
              </div>
            </div>

            {/* Why Choose ASADS */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">
                Why Choose ASADS for Home Inspection in Scarborough?
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" aria-hidden="true" />
                    Professional Expertise & Credentials
                  </h3>
                  <ul className="space-y-3">
                    {expertisePoints.slice(0, 5).map((point) => (
                      <ExpertisePoint key={point.text} text={point.text} />
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <ThumbsUp className="h-5 w-5 text-primary" aria-hidden="true" />
                    Customer Benefits & Value
                  </h3>
                  <ul className="space-y-3">
                    {benefits.slice(0, 5).map((benefit) => (
                      <BenefitItem key={benefit.text} text={benefit.text} />
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Local Service Areas */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">
                Scarborough Neighborhoods We Serve
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {scarboroughNeighborhoods.map((hood) => (
                  <NeighborhoodCard key={hood.name} name={hood.name} service={hood.service} />
                ))}
              </div>
              <div className="text-center mt-8">
                <p className="text-muted-foreground">
                  Also serving all GTA communities including Toronto, Markham, Pickering, Ajax, and
                  beyond.
                </p>
              </div>
            </div>

            {/* FAQ Section */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">
                Frequently Asked Questions About Home Inspection in Scarborough
              </h2>
              <div className="space-y-6 max-w-4xl mx-auto">
                {faqs.map((faq, index) => (
                  <FAQItem key={index} faq={faq} />
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">
                What Scarborough Homeowners Say About Our Inspections
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <TestimonialCard key={index} testimonial={testimonial} />
                ))}
              </div>
            </div>

            {/* Final CTA */}
            <div className="text-center">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                Ready to Schedule Your Scarborough Home Inspection?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Book your comprehensive home inspection today. Our certified inspectors provide
                detailed assessments, same‑day reports, and the answers you need to move forward
                with confidence.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-card border border-border rounded-xl p-6">
                  <PhoneCall className="h-10 w-10 text-primary mx-auto mb-4" aria-hidden="true" />
                  <h3 className="font-heading font-bold text-lg text-foreground mb-2">Call Us</h3>
                  <a href={`tel:${SITE_PHONE}`} className="text-primary hover:underline text-xl font-bold">
                    {SITE_PHONE}
                  </a>
                  <p className="text-sm text-muted-foreground mt-2">Available 7 days a week</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6">
                  <Mail className="h-10 w-10 text-primary mx-auto mb-4" aria-hidden="true" />
                  <h3 className="font-heading font-bold text-lg text-foreground mb-2">Email Us</h3>
                  <a href={`mailto:${SITE_EMAIL}`} className="text-primary hover:underline text-lg font-bold">
                    {SITE_EMAIL}
                  </a>
                  <p className="text-sm text-muted-foreground mt-2">Response within 2 hours</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6">
                  <Calendar className="h-10 w-10 text-primary mx-auto mb-4" aria-hidden="true" />
                  <h3 className="font-heading font-bold text-lg text-foreground mb-2">Book Online</h3>
                  <p className="text-muted-foreground">24/7 online booking available</p>
                  <Link
                    to="/booking"
                    className="inline-block mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Schedule Now
                  </Link>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="shadow-lg">
                  <Link to="/booking">
                    <Calendar className="mr-2 h-5 w-5" aria-hidden="true" />
                    Book Your Scarborough Inspection Online
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href={`tel:${SITE_PHONE}`}>
                    <Phone className="mr-2 h-5 w-5" aria-hidden="true" />
                    Call for Immediate Assistance
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
            }
