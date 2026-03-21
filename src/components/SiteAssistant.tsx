import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Message { id: number; from: 'bot' | 'user'; text: string; }
interface QuickReply { label: string; value: string; }
interface Intent { patterns: RegExp[]; response: string; quickReplies?: QuickReply[]; }

let _nid = Date.now();
const nid = () => ++_nid;

// ─── Knowledge base ───────────────────────────────────────────────────────────
const INTENTS: Intent[] = [
  // ── Greeting ──────────────────────────────────────────────────────────────
  { patterns: [/\b(hi|hello|hey|good morning|good afternoon|good evening|howdy|sup)\b/i],
    response: "Hi! 🔍 I'm **Scout** — ASADS Home Inspection's assistant!\n\nI can help you understand our services, pricing, locations, or book an inspection. What do you need?",
    quickReplies: [
      { label: '🏠 Book Inspection', value: 'I want to book an inspection' },
      { label: '💰 See Pricing', value: 'show pricing page' },
      { label: '🔍 All Services', value: 'show me all services' },
      { label: '📍 Service Areas', value: 'What cities do you serve?' },
    ],
  },

  // ── Pre-Purchase ──────────────────────────────────────────────────────────
  { patterns: [/\b(pre.?purchase|buy(ing)?|before.*(buy|purchas)|purchas.*inspect|home inspect)\b/i],
    response: "🏠 **Pre-Purchase Inspection — 2025 Pricing:**\n\n• Condo/Apartment: **$349**\n• Up to 1,500 sq ft: **$399**\n• 1,500–2,500 sq ft: **$449**\n• 2,500–3,500 sq ft: **$499**\n• 3,500+ sq ft: **$549+**\n\n✅ Visual inspection of all accessible areas\n✅ Roof, attic, foundation, structure\n✅ Electrical, plumbing, HVAC\n✅ Same-day digital report with photos\n✅ 90-day warranty included",
    quickReplies: [
      { label: '📅 Book Now', value: 'I want to book an inspection' },
      { label: '💰 All Pricing', value: 'show pricing page' },
    ],
  },

  // ── Pre-Listing ───────────────────────────────────────────────────────────
  { patterns: [/\b(pre.?list(ing)?|sell(ing)?|before.*(sell|list)|vendor|listing.?inspect)\b/i],
    response: "📋 **Pre-Listing Inspection — 2025 Pricing:**\n\n• Condo/Apartment: **$299**\n• Up to 1,500 sq ft: **$349**\n• 1,500–2,500 sq ft: **$399**\n• 2,500–3,500 sq ft: **$449**\n• 3,500+ sq ft: **$499+**\n\n✅ Identify issues before listing\n✅ Avoid surprises during negotiations\n✅ Increase buyer confidence\n✅ Same-day report delivery",
    quickReplies: [
      { label: '📅 Book Now', value: 'I want to book an inspection' },
      { label: '💰 All Pricing', value: 'show pricing page' },
    ],
  },

  // ── New Construction / PDI ────────────────────────────────────────────────
  { patterns: [/\b(new.?construct|pdi|pre.?delivery|builder|tarion|new.?build|new.?home)\b/i],
    response: "🏗️ **New Construction Inspection — 2025 Pricing:**\n\n• Single inspection: **$399**\n• Pre-drywall + Final walkthrough: **$699**\n• 3-phase package: **$999**\n\n✅ Foundation & framing check\n✅ Pre-drywall inspection available\n✅ Builder deficiency documentation\n✅ Tarion warranty compliance\n✅ Detailed photo documentation",
    quickReplies: [
      { label: '📅 Book Now', value: 'I want to book an inspection' },
      { label: '💰 All Pricing', value: 'show pricing page' },
    ],
  },

  // ── Condo ─────────────────────────────────────────────────────────────────
  { patterns: [/\b(condo|apartment|townhouse|unit|stacked)\b/i],
    response: "🏢 **Condo Inspection — 2025 Pricing:**\n\n• Studio/1 Bedroom: **$299**\n• 2 Bedroom: **$349**\n• 3+ Bedroom: **$399**\n• Townhouse Condo: **$449**\n\n✅ Interior systems inspection\n✅ Appliance functionality check\n✅ Balcony/terrace assessment\n✅ Status certificate review tips\n✅ Same-day report",
    quickReplies: [
      { label: '📅 Book Now', value: 'I want to book an inspection' },
      { label: '💰 All Pricing', value: 'show pricing page' },
    ],
  },

  // ── Commercial ────────────────────────────────────────────────────────────
  { patterns: [/\b(commercial|office|retail|business.?(property|build)|industrial)\b/i],
    response: "🏭 **Commercial Inspection — 2025 Pricing:**\n\n• Up to 5,000 sq ft: **$599**\n• 5,000–10,000 sq ft: **$899**\n• 10,000+ sq ft: **Custom quote**\n\n✅ Building envelope assessment\n✅ Commercial HVAC evaluation\n✅ Electrical systems review\n✅ Life safety systems check\n✅ Detailed commercial report",
    quickReplies: [
      { label: '📅 Book Now', value: 'I want to book an inspection' },
      { label: '📞 Get Quote', value: 'call us' },
    ],
  },

  // ── Radon ─────────────────────────────────────────────────────────────────
  { patterns: [/\b(radon|gas.?test|radioactive)\b/i],
    response: "☢️ **Radon Testing — $199**\n\n48-hour short-term test to detect harmful radon gas. Radon is the #2 cause of lung cancer in Canada — colourless and odourless, only detectable by testing.\n\n✅ Health Canada certified test kit\n✅ Results within 48 hours\n✅ Mitigation recommendations if elevated\n✅ Can be bundled with any inspection",
    quickReplies: [
      { label: '📅 Book Radon Test', value: 'I want to book an inspection' },
      { label: '💰 All Pricing', value: 'show pricing page' },
    ],
  },

  // ── Mold ──────────────────────────────────────────────────────────────────
  { patterns: [/\b(mold|mould|fungi|spore|moisture.*(issue|problem)|musty)\b/i],
    response: "🔬 **Mold Inspection — $299+**\n\nVisual inspection + air sampling to identify mold and moisture sources.\n\n✅ Air quality sampling\n✅ Moisture source identification\n✅ Remediation recommendations\n✅ Lab-certified results\n\nCommon in basements, crawlspaces, and bathrooms. Early detection prevents costly damage.",
    quickReplies: [
      { label: '📅 Book Mold Inspection', value: 'I want to book an inspection' },
      { label: '💰 All Pricing', value: 'show pricing page' },
    ],
  },

  // ── Asbestos ──────────────────────────────────────────────────────────────
  { patterns: [/\b(asbestos|popcorn.?ceil|vermiculite|old.?(insul|tile))\b/i],
    response: "⚠️ **Asbestos Testing — $299**\n\nSafe identification of asbestos-containing materials — critical for homes built before 1990.\n\n✅ Sample collection by certified inspector\n✅ Accredited lab analysis\n✅ Results in 3–5 business days\n✅ Safe removal recommendations\n\nCommon in: popcorn ceilings, floor tiles, pipe wrap, old insulation.",
    quickReplies: [
      { label: '📅 Book Asbestos Test', value: 'I want to book an inspection' },
      { label: '💰 All Pricing', value: 'show pricing page' },
    ],
  },

  // ── WETT ──────────────────────────────────────────────────────────────────
  { patterns: [/\b(wett|fireplace|wood.?stove|wood.?burn|chimney|firebox)\b/i],
    response: "🔥 **WETT Inspection — $249**\n\nWood Energy Technology Transfer (WETT) certified inspection for fireplaces, wood stoves, and pellet appliances.\n\n✅ Required by most insurance companies\n✅ Safety compliance check\n✅ Clearance and installation verification\n✅ Written WETT certificate provided",
    quickReplies: [
      { label: '📅 Book WETT Inspection', value: 'I want to book an inspection' },
      { label: '💰 All Pricing', value: 'show pricing page' },
    ],
  },

  // ── Sewer Scope ───────────────────────────────────────────────────────────
  { patterns: [/\b(sewer|drain.?(camera|inspect|scope)|pipe.?(camera|inspect)|cctv.?inspect|lateral)\b/i],
    response: "🔧 **Sewer Scope Inspection — $299**\n\nVideo camera inspection of the main sewer line from the house to the municipal connection.\n\n✅ Identifies cracks, root intrusion, blockages\n✅ Detects sagging or offset pipes\n✅ Video recording provided\n✅ Prevents $5,000–$20,000 surprises after closing",
    quickReplies: [
      { label: '📅 Book Sewer Scope', value: 'I want to book an inspection' },
      { label: '💰 All Pricing', value: 'show pricing page' },
    ],
  },

  // ── Thermal Imaging ───────────────────────────────────────────────────────
  { patterns: [/\b(thermal|infrared|ir.?scan|heat.?loss|hidden.*(moisture|leak|issue))\b/i],
    response: "🌡️ **Thermal Imaging — $149 add-on**\n\nInfrared camera scan reveals hidden issues invisible to the naked eye.\n\n✅ Hidden moisture and water intrusion\n✅ Heat loss and insulation gaps\n✅ Electrical hot spots\n✅ HVAC distribution problems\n\nAdd to any inspection for maximum value.",
    quickReplies: [
      { label: '📅 Add to My Inspection', value: 'I want to book an inspection' },
      { label: '💰 All Pricing', value: 'show pricing page' },
    ],
  },

  // ── Other specialty ───────────────────────────────────────────────────────
  { patterns: [/\b(lead.?paint|lead.?test|lead.?hazard)\b/i],
    response: "⚠️ **Lead Paint Testing — $349**\n\nLab-certified testing for lead paint — critical for homes built before 1978.\n\n✅ Sample collection by certified inspector\n✅ Accredited lab results in 5–7 days\n✅ Safe remediation recommendations",
    quickReplies: [{ label: '📅 Book Now', value: 'I want to book an inspection' }],
  },
  { patterns: [/\b(well.?water|water.?test|drinking.?water|water.?quality)\b/i],
    response: "💧 **Well Water Testing — $199**\n\nComprehensive water quality panel for private wells — tests for bacteria, nitrates, heavy metals, and more.\n\n✅ Full bacterial & chemical panel\n✅ Results in 5–7 business days\n✅ Health Canada guidelines reference",
    quickReplies: [{ label: '📅 Book Now', value: 'I want to book an inspection' }],
  },
  { patterns: [/\b(air.?quality|voc|allergen|indoor.?air|pollutant)\b/i],
    response: "🌬️ **Air Quality Testing — $249+**\n\nTests for VOCs, allergens, and indoor air pollutants.\n\n✅ VOC analysis\n✅ Allergen screening\n✅ CO2 and humidity levels\n✅ Remediation recommendations",
    quickReplies: [{ label: '📅 Book Now', value: 'I want to book an inspection' }],
  },

  // ── General pricing ────────────────────────────────────────────────────────
  { patterns: [/\b(price|pricing|cost|how much|rate|fee|charge|quote|estimate|cheap|afford|expensive)\b/i],
    response: "💰 **ASADS Inspection Pricing:**\n\n🏠 Pre-Purchase: **$399–$549+** (by sq ft)\n📋 Pre-Listing: **$349–$499+** (by sq ft)\n🏗️ New Construction: **$399–$999**\n🏢 Condo: **$299–$449**\n🏭 Commercial: **$599–$899+**\n\n**Specialty Add-ons:**\n☢️ Radon: $199 | 🔬 Mold: $299+ | ⚠️ Asbestos: $299\n🔥 WETT: $249 | 🌡️ Thermal: $149 | 🔧 Sewer Scope: $299",
    quickReplies: [
      { label: '📊 Full Pricing Page', value: 'show pricing page' },
      { label: '📅 Book Inspection', value: 'I want to book an inspection' },
    ],
  },

  // ── Services overview ─────────────────────────────────────────────────────
  { patterns: [/\b(all services?|list.*(services?)|what.*(offer|provide|do you do|inspect)|types? of inspect)\b/i],
    response: "🔍 **ASADS Home Inspection Services:**\n\n**Main Inspections:**\n• Pre-Purchase | Pre-Listing | New Construction (PDI)\n• Condo | Commercial\n\n**Specialty Services:**\n• Radon Testing | Mold Inspection | Asbestos Testing\n• WETT Inspection | Sewer Scope | Thermal Imaging\n• Lead Paint | Well Water Testing | Air Quality\n\nAll inspections include same-day digital reports with photos and a 90-day warranty.",
    quickReplies: [
      { label: '🔍 All Services', value: 'show me all services' },
      { label: '💰 See Pricing', value: 'show pricing page' },
      { label: '📅 Book Now', value: 'I want to book an inspection' },
    ],
  },

  // ── Cities / Locations ────────────────────────────────────────────────────
  { patterns: [/\b(toronto|north york|scarborough|etobicoke|east york|downtown)\b/i],
    response: "📍 Yes, we serve all of Toronto — Downtown, North York, Scarborough, Etobicoke, East York, and all surrounding neighbourhoods. Same-day and next-day appointments available!",
    quickReplies: [{ label: '📅 Book in Toronto', value: 'I want to book an inspection' }],
  },
  { patterns: [/\b(mississauga|brampton|caledon|bolton)\b/i],
    response: "📍 Yes, we serve Mississauga, Brampton, Caledon & Bolton! One of our busiest service areas — fast scheduling available.",
    quickReplies: [{ label: '📅 Book Now', value: 'I want to book an inspection' }],
  },
  { patterns: [/\b(vaughan|woodbridge|maple|kleinburg|markham|richmond hill|stouffville|newmarket|aurora)\b/i],
    response: "📍 Yes, we serve York Region — Vaughan, Woodbridge, Markham, Richmond Hill, Newmarket, Aurora & more!",
    quickReplies: [{ label: '📅 Book Now', value: 'I want to book an inspection' }],
  },
  { patterns: [/\b(oakville|burlington|milton|halton|georgetown)\b/i],
    response: "📍 Yes, we serve Halton Region — Oakville, Burlington, Milton, Halton Hills & Georgetown!",
    quickReplies: [{ label: '📅 Book Now', value: 'I want to book an inspection' }],
  },
  { patterns: [/\b(hamilton|stoney creek|ancaster|dundas)\b/i],
    response: "📍 Yes, we serve Hamilton and area — Stoney Creek, Ancaster, Dundas & Flamborough!",
    quickReplies: [{ label: '📅 Book Now', value: 'I want to book an inspection' }],
  },
  { patterns: [/\b(oshawa|whitby|ajax|pickering|clarington|durham)\b/i],
    response: "📍 Yes, we serve Durham Region — Oshawa, Whitby, Ajax, Pickering & Clarington!",
    quickReplies: [{ label: '📅 Book Now', value: 'I want to book an inspection' }],
  },
  { patterns: [/\b(barrie|innisfil|collingwood|wasaga|orillia|simcoe)\b/i],
    response: "📍 Yes, we serve Simcoe County — Barrie, Innisfil, Collingwood, Wasaga Beach & Orillia!",
    quickReplies: [{ label: '📅 Book Now', value: 'I want to book an inspection' }],
  },
  { patterns: [/\b(kitchener|waterloo|cambridge|guelph)\b/i],
    response: "📍 Yes, we serve the Waterloo Region — Kitchener, Waterloo, Cambridge & Guelph!",
    quickReplies: [{ label: '📅 Book Now', value: 'I want to book an inspection' }],
  },
  { patterns: [/\b(cit(y|ies)|area|location|where|serv(e|ing)|cover|near me|my city|ontario)\b/i],
    response: "We serve **106 cities across Ontario!** 🗺️\n\n📍 GTA — Toronto, Mississauga, Brampton, Vaughan, Markham\n📍 West — Oakville, Burlington, Hamilton, Kitchener\n📍 East — Oshawa, Whitby, Ajax, Pickering\n📍 North — Barrie, Newmarket, Collingwood\n📍 Niagara — St. Catharines, Niagara Falls",
    quickReplies: [
      { label: '🗺️ View All Locations', value: 'show locations page' },
      { label: '📅 Book Inspection', value: 'I want to book an inspection' },
    ],
  },

  // ── Credentials & Trust ───────────────────────────────────────────────────
  { patterns: [/\b(licens|certif|credential|qualif|intern(achi|ational)|oahi|wsib|insur|background|verif|legit|trust)\b/i],
    response: "Every ASADS inspector is thoroughly certified:\n\n✅ **Licensed** — Ontario Home Inspection Act, 2017\n✅ **InterNACHI-certified** — ongoing education required\n✅ **WSIB covered** — protects you and our inspectors\n✅ **E&O Insurance** — errors & omissions coverage\n✅ **General liability insurance**\n✅ **Criminal background checked**\n\nCredentials available upon request before any inspection.",
    quickReplies: [
      { label: '📅 Book with Confidence', value: 'I want to book an inspection' },
      { label: '📖 About Us', value: 'show about page' },
    ],
  },

  // ── Report & Process ──────────────────────────────────────────────────────
  { patterns: [/\b(report|when.*(get|receive|deliver)|same.?day|how.*(long|soon)|after.*(inspect|done|finish))\b/i],
    response: "📄 **Your inspection report:**\n\n• Delivered **same day** in most cases (within 24 hours max)\n• Detailed digital report sent by email\n• Includes photos of every finding\n• Verbal walkthrough at end of inspection\n• Can be shared with your realtor or lawyer\n• Backed by our **90-day warranty**",
    quickReplies: [
      { label: '📅 Book Inspection', value: 'I want to book an inspection' },
      { label: '❓ FAQ', value: 'show faq page' },
    ],
  },
  { patterns: [/\b(how long|duration|how many hour|time|2\.5|3 hour|4 hour)\b/i],
    response: "⏱️ **Inspection Duration:**\n\n• Condo: ~1.5–2 hours\n• Small house (up to 1,500 sq ft): ~2.5 hours\n• Average house: ~3–3.5 hours\n• Large home (3,500+ sq ft): 4+ hours\n• Older homes may take longer\n\nWe recommend attending — you'll get a verbal walkthrough at the end!",
    quickReplies: [{ label: '📅 Book Now', value: 'I want to book an inspection' }],
  },

  // ── Booking & Scheduling ──────────────────────────────────────────────────
  { patterns: [/\b(book|schedule|appoint|available|same.?day|next.?day|urgent|when.*(availab|book))\b/i],
    response: "📅 **Booking an inspection is easy:**\n\n• Book online at /booking or call (647) 801-9311\n• Available **7 days a week**\n• **Same-day & next-day** appointments available\n• Cancellation free up to 24 hours before\n\nWe match you with a certified inspector near you!",
    quickReplies: [
      { label: '📅 Book Online', value: 'I want to book an inspection' },
      { label: '📞 Call Us', value: 'call us' },
    ],
  },

  // ── Warranty ──────────────────────────────────────────────────────────────
  { patterns: [/\b(warrant|guarant|miss(ed|ing)|mistake|wrong|not found|error)\b/i],
    response: "🛡️ **ASADS 90-Day Warranty:**\n\nEvery inspection comes with a 90-day warranty. If a covered defect is discovered after your inspection that was accessible and should have been reported, we will make it right.\n\nWe also carry **Errors & Omissions insurance** for additional peace of mind.",
    quickReplies: [
      { label: '📅 Book with Confidence', value: 'I want to book an inspection' },
      { label: '📞 Call Us', value: 'call us' },
    ],
  },

  // ── Contact ───────────────────────────────────────────────────────────────
  { patterns: [/\b(contact|phone|email|speak|talk|human|support|reach|call)\b/i],
    response: "📞 **Reach ASADS anytime:**\n\n📞 **(647) 801-9311**\n✉️ **info@asads.ca**\n\n🕐 Available 7 days a week\n📍 Serving 106 cities across Ontario",
    quickReplies: [
      { label: '📩 Contact Page', value: 'show contact page' },
      { label: '📞 Call Now', value: 'call us' },
    ],
  },

  // ── About / Stats ─────────────────────────────────────────────────────────
  { patterns: [/\b(about|who are you|company|asads|story|history|stats|numbers?)\b/i],
    response: "🔍 **About ASADS Home Inspection:**\n\nOntario's trusted home inspection company — licensed, certified, and fully insured.\n\n📊 **By the numbers:**\n• 106 cities across Ontario\n• 1,000+ inspections completed\n• 4.9★ average rating\n• Licensed under Ontario Home Inspection Act 2017\n• InterNACHI-certified inspectors\n• Same-day digital reports",
    quickReplies: [
      { label: '📖 About Page', value: 'show about page' },
      { label: '📅 Book Inspection', value: 'I want to book an inspection' },
    ],
  },
];

const NAV_ACTIONS: Record<string, string> = {
  'show me all services':                     '/services',
  'show pricing page':                        '/pricing',
  'show locations page':                      '/locations',
  'show contact page':                        '/contact',
  'show faq page':                            '/faq',
  'show about page':                          '/about',
  'show blog page':                           '/blog',
  'tell me about pre-purchase inspection':    '/services/pre-purchase',
  'tell me about pre-listing inspection':     '/services/pre-listing',
  'tell me about new construction inspection':'/services/new-construction',
  'tell me about condo inspection':           '/services/condo',
  'tell me about commercial inspection':      '/services/commercial',
  'tell me about radon testing':              '/services/radon-testing',
  'tell me about mold inspection':            '/services/mold-inspection',
  'tell me about asbestos testing':           '/services/asbestos-testing',
  'tell me about wett inspection':            '/services/wett',
  'tell me about sewer scope inspection':     '/services/sewer-scope',
  'tell me about thermal imaging':            '/services/thermal-imaging',
};

const FALLBACK = "I'm not sure about that, but our team can help!\n\n📞 (647) 801-9311\n✉️ info@asads.ca";
const FALLBACK_REPLIES: QuickReply[] = [
  { label: '🏠 Book Inspection', value: 'I want to book an inspection' },
  { label: '💰 Pricing', value: 'show pricing page' },
  { label: '🔍 Services', value: 'show me all services' },
  { label: '📞 Contact Us', value: 'call us' },
];
const WELCOME = "Hi! 🔍 I'm **Scout** — your ASADS home inspection guide!\n\nI can answer questions about our services, pricing, and locations, or help you book your inspection. What do you need?";
const WELCOME_REPLIES: QuickReply[] = [
  { label: '🏠 Book Inspection', value: 'I want to book an inspection' },
  { label: '💰 See Pricing', value: 'show pricing page' },
  { label: '🔍 All Services', value: 'show me all services' },
  { label: '📍 Service Areas', value: 'What cities do you serve?' },
];

// ─── Scout character image ────────────────────────────────────────────────────
type ScoutMood = 'idle' | 'happy' | 'excited' | 'curious' | 'fire';

interface ScoutProps { mood?: ScoutMood; blinking?: boolean; eyeX?: number; eyeY?: number; wingsOpen?: boolean; mini?: boolean; }

const ScoutSVG: React.FC<ScoutProps> = ({ mood = 'idle', blinking = false, eyeX = 0, eyeY = 0, mini = false }) => {
  const happy = mood === 'happy' || mood === 'excited';
  const w = mini ? 44 : 100;
  const h = mini ? 50 : 138;
  return (
    <svg width={w} height={h} viewBox="0 0 160 230" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sc-skin" cx="38%" cy="28%" r="70%">
          <stop offset="0%" stopColor="#fde8d0"/>
          <stop offset="55%" stopColor="#f9c49a"/>
          <stop offset="100%" stopColor="#e8a06a"/>
        </radialGradient>
        <radialGradient id="sc-skin-d" cx="38%" cy="28%" r="70%">
          <stop offset="0%" stopColor="#f9c49a"/>
          <stop offset="100%" stopColor="#d4845a"/>
        </radialGradient>
        <radialGradient id="sc-shirt" cx="40%" cy="25%" r="72%">
          <stop offset="0%" stopColor="#f0d08a"/>
          <stop offset="45%" stopColor="#d4a040"/>
          <stop offset="100%" stopColor="#a87828"/>
        </radialGradient>
        <radialGradient id="sc-shorts" cx="40%" cy="25%" r="72%">
          <stop offset="0%" stopColor="#4a9c5a"/>
          <stop offset="55%" stopColor="#2d7a3a"/>
          <stop offset="100%" stopColor="#1a5c28"/>
        </radialGradient>
        <radialGradient id="sc-hair" cx="42%" cy="30%" r="68%">
          <stop offset="0%" stopColor="#8b5c2a"/>
          <stop offset="50%" stopColor="#5c3a18"/>
          <stop offset="100%" stopColor="#3a2010"/>
        </radialGradient>
        <radialGradient id="sc-eye-l" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#6ab0e8"/>
          <stop offset="45%" stopColor="#2980c8"/>
          <stop offset="100%" stopColor="#1a5c9a"/>
        </radialGradient>
        <radialGradient id="sc-eye-r" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#6ab0e8"/>
          <stop offset="45%" stopColor="#2980c8"/>
          <stop offset="100%" stopColor="#1a5c9a"/>
        </radialGradient>
        <radialGradient id="sc-lens" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#d4f0e8" stopOpacity="0.85"/>
          <stop offset="60%" stopColor="#a8dfc8" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#70c0a0" stopOpacity="0.4"/>
        </radialGradient>
        <filter id="sc-drop" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#5c3a18" floodOpacity="0.22"/>
        </filter>
        <filter id="sc-soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3"/>
        </filter>
        <filter id="sc-glow-blue" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="72" cy="226" rx="44" ry="5" fill="#3a2010" opacity="0.14"/>

      {/* ── LEGS ── */}
      {/* Left leg skin */}
      <path d="M 58,175 Q 55,195 54,215 Q 53,222 60,222 Q 66,222 67,215 Q 68,195 68,175 Z" fill="url(#sc-skin)"/>
      {/* Right leg skin */}
      <path d="M 78,175 Q 77,195 77,215 Q 76,222 83,222 Q 89,222 89,215 Q 88,195 86,175 Z" fill="url(#sc-skin)"/>
      {/* Left shoe */}
      <path d="M 52,216 Q 48,222 50,226 Q 55,229 64,228 Q 69,227 70,223 Q 68,218 60,218 Z" fill="#2a1a0e"/>
      {/* Right shoe */}
      <path d="M 75,216 Q 73,222 75,226 Q 80,229 89,228 Q 94,227 94,223 Q 91,218 83,218 Z" fill="#2a1a0e"/>
      {/* Shoe shine */}
      <path d="M 53,220 Q 57,218 62,219" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.3"/>
      <path d="M 77,220 Q 81,218 86,219" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.3"/>

      {/* ── SHORTS - dark green ── */}
      <path d="M 46,148 Q 44,170 50,178 Q 58,182 68,180 Q 72,170 72,148 Z" fill="url(#sc-shorts)"/>
      <path d="M 90,148 Q 92,170 88,178 Q 80,182 72,180 Q 68,170 68,148 Z" fill="url(#sc-shorts)"/>
      {/* Shorts waistband */}
      <rect x="44" y="145" width="50" height="8" rx="3" fill="#1a5c28"/>
      <rect x="44" y="145" width="50" height="4" rx="2" fill="#235c30" opacity="0.5"/>

      {/* ── LEFT ARM (at side, slightly forward) ── */}
      <path d="M 46,100 Q 34,120 30,148 Q 29,155 35,156 Q 40,157 43,150 Q 47,132 54,112 Z" fill="url(#sc-shirt)"/>
      {/* Left hand */}
      <ellipse cx="34" cy="157" rx="7" ry="8" fill="url(#sc-skin)" filter="url(#sc-drop)"/>
      {/* Finger details */}
      <path d="M 29,155 Q 28,162 31,164" stroke="#e8a06a" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M 33,154 Q 31,162 33,165" stroke="#e8a06a" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M 37,154 Q 36,162 38,164" stroke="#e8a06a" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M 40,156 Q 40,162 41,163" stroke="#e8a06a" strokeWidth="1.5" strokeLinecap="round"/>

      {/* ── RIGHT ARM (raised high, holding magnifying glass) ── */}
      <path d="M 96,100 Q 112,80 122,55 Q 125,48 120,44 Q 115,41 112,48 Q 104,68 92,90 Z" fill="url(#sc-shirt)"/>
      {/* Right hand holding glass */}
      <ellipse cx="120" cy="42" rx="7" ry="8" fill="url(#sc-skin)" filter="url(#sc-drop)"/>

      {/* ── MAGNIFYING GLASS ── */}
      {/* Handle - green, angled */}
      <path d="M 122,48 L 148,18" stroke="#2d7a3a" strokeWidth="8" strokeLinecap="round"/>
      <path d="M 122,48 L 148,18" stroke="#3a9a4a" strokeWidth="4" strokeLinecap="round" opacity="0.5"/>
      {/* Handle grip rings */}
      <line x1="131" y1="40" x2="135" y2="36" stroke="#1a5c28" strokeWidth="2.5" opacity="0.6"/>
      <line x1="136" y1="34" x2="140" y2="30" stroke="#1a5c28" strokeWidth="2.5" opacity="0.6"/>
      {/* Lens outer ring */}
      <circle cx="110" cy="52" r="22" fill="none" stroke="#2d7a3a" strokeWidth="5"/>
      <circle cx="110" cy="52" r="22" fill="none" stroke="#4aaa5a" strokeWidth="2" opacity="0.5"/>
      {/* Lens glass */}
      <circle cx="110" cy="52" r="18" fill="url(#sc-lens)"/>
      {/* Lens highlight */}
      <ellipse cx="104" cy="44" rx="6" ry="4" fill="white" opacity="0.35" transform="rotate(-20,104,44)"/>
      {/* Home icon */}
      {/* Roof */}
      <path d="M 110,40 L 101,50 L 119,50 Z" fill="#1a5c28" opacity="0.9"/>
      <path d="M 110,40 L 102,49 L 118,49 Z" fill="#2d7a3a" opacity="0.5"/>
      {/* Walls */}
      <rect x="102" y="49" width="16" height="11" rx="1" fill="#1a5c28" opacity="0.85"/>
      {/* Door */}
      <rect x="107" y="53" width="6" height="7" rx="1" fill="#4aaa5a" opacity="0.9"/>
      {/* Door knob */}
      <circle cx="112" cy="57" r="1" fill="#2d7a3a"/>
      {/* Compass rose overlay */}
      <path d="M 110,38 L 108,43 L 110,41 L 112,43 Z" fill="#1a5c28" opacity="0.7"/>
      <path d="M 110,66 L 108,61 L 110,63 L 112,61 Z" fill="#1a5c28" opacity="0.7"/>
      <path d="M 96,52 L 101,50 L 99,52 L 101,54 Z" fill="#1a5c28" opacity="0.7"/>
      <path d="M 124,52 L 119,50 L 121,52 L 119,54 Z" fill="#1a5c28" opacity="0.7"/>
      <circle cx="110" cy="52" r="2.5" fill="#2d7a3a" opacity="0.6"/>

      {/* ── SHIRT BODY - tan/khaki ── */}
      <path d="M 44,100 Q 40,125 42,148 L 94,148 Q 96,125 98,100 Q 88,88 72,86 Q 54,88 44,100 Z"
        fill="url(#sc-shirt)" filter="url(#sc-drop)"/>
      {/* Shirt button placket */}
      <line x1="72" y1="90" x2="72" y2="148" stroke="#b88820" strokeWidth="1.5" opacity="0.5"/>
      {[100,114,128,142].map((y, i) => (
        <circle key={i} cx="72" cy={y} r="2" fill="#8a6010" opacity="0.6"/>
      ))}
      {/* Shirt collar */}
      <path d="M 60,90 Q 66,98 72,94 Q 78,98 84,90 Q 78,84 72,82 Q 66,84 60,90 Z" fill="#e8c06a"/>
      {/* Shirt sleeve cuffs */}
      <path d="M 46,110 Q 38,114 36,120" stroke="#c89030" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <path d="M 96,108 Q 106,96 110,86" stroke="#c89030" strokeWidth="4" strokeLinecap="round" fill="none"/>

      {/* ── MERIT BADGE SASH (diagonal, left shoulder to right hip) ── */}
      <path d="M 50,95 Q 75,125 94,148" stroke="#8B4513" strokeWidth="11" strokeLinecap="round" fill="none" opacity="0.9"/>
      <path d="M 50,95 Q 75,125 94,148" stroke="#a0522d" strokeWidth="7" strokeLinecap="round" fill="none" opacity="0.6"/>
      {/* Merit badges - colorful rectangles/circles on sash */}
      {[
        { cx: 57, cy: 102, c: '#e74c3c' }, { cx: 63, cy: 110, c: '#f39c12' },
        { cx: 69, cy: 118, c: '#27ae60' }, { cx: 75, cy: 126, c: '#3498db' },
        { cx: 81, cy: 134, c: '#9b59b6' }, { cx: 87, cy: 142, c: '#e74c3c' },
      ].map(({ cx, cy, c }, i) => (
        <rect key={i} x={cx-4} y={cy-4} width="8" height="8" rx="1.5"
          fill={c} stroke="white" strokeWidth="0.8" opacity="0.9"
          transform={`rotate(-35,${cx},${cy})`}/>
      ))}

      {/* ── NECK ── */}
      <path d="M 65,85 Q 63,76 65,68 Q 72,62 80,62 Q 88,62 79,68 Q 80,76 79,85 Z" fill="url(#sc-skin)"/>

      {/* ── ORANGE NECKERCHIEF ── */}
      <path d="M 58,90 Q 72,115 72,122 Q 72,115 86,90 Q 80,82 72,80 Q 64,82 58,90 Z"
        fill="#f57c00" opacity="0.95"/>
      <path d="M 58,90 Q 72,115 72,122 Q 72,115 86,90 Q 80,82 72,80 Q 64,82 58,90 Z"
        fill="none" stroke="#e65c00" strokeWidth="1" opacity="0.4"/>
      {/* Neckerchief fold sheen */}
      <path d="M 62,88 Q 70,108 72,116" stroke="#ffaa44" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
      {/* Woggle ring */}
      <ellipse cx="72" cy="96" rx="6" ry="4" fill="none" stroke="#5c3a18" strokeWidth="3"/>
      <ellipse cx="72" cy="96" rx="6" ry="4" fill="none" stroke="#8B6040" strokeWidth="1.5" opacity="0.5"/>

      {/* ── HEAD ── */}
      <ellipse cx="72" cy="50" rx="30" ry="32" fill="url(#sc-skin)" filter="url(#sc-drop)"/>
      {/* Jaw highlight */}
      <ellipse cx="72" cy="65" rx="18" ry="10" fill="white" opacity="0.08"/>

      {/* ── EARS ── */}
      <ellipse cx="42" cy="52" rx="7" ry="9" fill="url(#sc-skin)"/>
      <ellipse cx="43" cy="52" rx="4" ry="6" fill="url(#sc-skin-d)" opacity="0.5"/>
      <ellipse cx="102" cy="52" rx="7" ry="9" fill="url(#sc-skin)"/>
      <ellipse cx="101" cy="52" rx="4" ry="6" fill="url(#sc-skin-d)" opacity="0.5"/>

      {/* ── HAIR (short brown, styled) ── */}
      {/* Back hair mass */}
      <path d="M 43,44 Q 44,18 72,14 Q 100,18 101,44 Q 96,28 72,26 Q 48,28 43,44 Z"
        fill="url(#sc-hair)"/>
      {/* Side hair tufts */}
      <path d="M 44,42 Q 40,50 43,58" stroke="#5c3a18" strokeWidth="5" strokeLinecap="round" fill="none"/>
      <path d="M 100,42 Q 104,50 101,58" stroke="#5c3a18" strokeWidth="5" strokeLinecap="round" fill="none"/>
      {/* Hair front part and styling */}
      <path d="M 55,22 Q 65,18 72,20 Q 78,18 82,20 Q 88,22 92,28 Q 84,24 72,24 Q 60,24 55,22 Z"
        fill="#5c3a18"/>
      {/* Hair highlight */}
      <path d="M 58,20 Q 68,17 76,19" stroke="#a07850" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>

      {/* ── EYES ── */}
      {/* Eye whites */}
      <ellipse cx="61" cy="46" rx="11" ry={blinking ? 2 : 12} fill="white" stroke="#d4a060" strokeWidth="0.5"/>
      <ellipse cx="83" cy="46" rx="11" ry={blinking ? 2 : 12} fill="white" stroke="#d4a060" strokeWidth="0.5"/>
      {!blinking && <>
        {/* Blue irises */}
        <circle cx={61 + eyeX * 2} cy={46 + eyeY * 2} r={7.5} fill="url(#sc-eye-l)" filter="url(#sc-glow-blue)"/>
        <circle cx={83 + eyeX * 2} cy={46 + eyeY * 2} r={7.5} fill="url(#sc-eye-r)" filter="url(#sc-glow-blue)"/>
        {/* Pupils */}
        <circle cx={61 + eyeX * 2} cy={46 + eyeY * 2} r={4} fill="#0a1a2e"/>
        <circle cx={83 + eyeX * 2} cy={46 + eyeY * 2} r={4} fill="#0a1a2e"/>
        {/* Eye sparkles */}
        <circle cx={58 + eyeX * 2} cy={43 + eyeY * 2} r={2.2} fill="white" opacity="0.95"/>
        <circle cx={80 + eyeX * 2} cy={43 + eyeY * 2} r={2.2} fill="white" opacity="0.95"/>
        <circle cx={63 + eyeX * 2} cy={48 + eyeY * 2} r={1} fill="white" opacity="0.5"/>
        <circle cx={85 + eyeX * 2} cy={48 + eyeY * 2} r={1} fill="white" opacity="0.5"/>
      </>}
      {/* Eye lashes/outline */}
      <ellipse cx="61" cy="46" rx="11" ry={blinking ? 2 : 12} fill="none" stroke="#5c3a18" strokeWidth="1.5"/>
      <ellipse cx="83" cy="46" rx="11" ry={blinking ? 2 : 12} fill="none" stroke="#5c3a18" strokeWidth="1.5"/>

      {/* ── EYEBROWS (expressive) ── */}
      <path d={happy ? "M 51,33 Q 61,29 71,32" : "M 51,34 Q 61,31 71,33"}
        stroke="#5c3a18" strokeWidth="2.8" strokeLinecap="round" fill="none"/>
      <path d={happy ? "M 73,32 Q 83,29 93,33" : "M 73,33 Q 83,31 93,34"}
        stroke="#5c3a18" strokeWidth="2.8" strokeLinecap="round" fill="none"/>

      {/* ── NOSE ── */}
      <path d="M 68,60 Q 72,64 76,60" stroke="#d4845a" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <circle cx="68" cy="60" r="2.5" fill="#d4845a" opacity="0.5"/>
      <circle cx="76" cy="60" r="2.5" fill="#d4845a" opacity="0.5"/>

      {/* ── SMILE ── */}
      <path d={happy
        ? "M 58,70 Q 72,82 86,70"
        : "M 60,70 Q 72,78 84,70"}
        stroke="#c47850" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      {/* Teeth */}
      <path d={happy
        ? "M 60,71 Q 72,80 84,71 L 82,73 Q 72,82 62,73 Z"
        : "M 62,70 Q 72,77 82,70 L 80,72 Q 72,78 64,72 Z"}
        fill="white" opacity="0.9"/>
      {/* Tooth line */}
      {happy && <line x1="72" y1="71" x2="72" y2="79" stroke="#e0c0a0" strokeWidth="1" opacity="0.4"/>}
      {/* Rosy cheeks */}
      <ellipse cx="51" cy="64" rx="9" ry="6" fill="#ff8888" opacity="0.28"/>
      <ellipse cx="93" cy="64" rx="9" ry="6" fill="#ff8888" opacity="0.28"/>

      {/* Head shine */}
      <ellipse cx="62" cy="36" rx="12" ry="7" fill="white" opacity="0.1" transform="rotate(-15,62,36)"/>
    </svg>
  );
};

// ─── Magnifying glass icon (inspector theme) ─────────────────────────────────
const MagnifyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

// ─── Helpers ──────────────────────────────────────────────────────────────────
type LifeState = 'hidden' | 'peek' | 'idle' | 'walk' | 'flap' | 'fire' | 'curious';

// ─── Main Component ───────────────────────────────────────────────────────────
const SiteAssistant: React.FC = () => {
  const navigate = useNavigate();

  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>(WELCOME_REPLIES);
  const [greeted, setGreeted] = useState(false);

  // ── Booking flow ────────────────────────────────────────────────────────────
  type BookingStep = null | 'service' | 'city' | 'name' | 'phone' | 'notes' | 'confirm' | 'submitting';
  interface BookingData { service: string; city: string; name: string; phone: string; notes: string; }
  const [bookingStep, setBookingStep] = useState<BookingStep>(null);
  const [bookingData, setBookingData] = useState<BookingData>({ service: '', city: '', name: '', phone: '', notes: '' });

  const BOOKING_SERVICES: QuickReply[] = [
    { label: '🏠 Pre-Purchase', value: 'Pre-Purchase Inspection' },
    { label: '📋 Pre-Listing', value: 'Pre-Listing Inspection' },
    { label: '🏗️ New Construction', value: 'New Construction / PDI' },
    { label: '🏢 Condo', value: 'Condo Inspection' },
    { label: '🏭 Commercial', value: 'Commercial Inspection' },
    { label: '☢️ Radon Testing', value: 'Radon Testing' },
    { label: '🔬 Mold Inspection', value: 'Mold Inspection' },
    { label: '🔧 Sewer Scope', value: 'Sewer Scope Inspection' },
  ];

  const botSay = (text: string, replies: QuickReply[] = []) => {
    setMessages(prev => [...prev, { id: nid(), from: 'bot', text }]);
    setQuickReplies(replies);
  };

  const startBookingFlow = () => {
    setBookingStep('service');
    setBookingData({ service: '', city: '', name: '', phone: '', notes: '' });
    setTimeout(() => botSay("Let's book your inspection! 🔍\n\nWhat type of inspection do you need?", BOOKING_SERVICES), 300);
  };

  const handleBookingStep = async (t: string) => {
    switch (bookingStep) {
      case 'service': {
        const d = { ...bookingData, service: t };
        setBookingData(d); setBookingStep('city');
        botSay(`Great — **${t}**! 📍\n\nWhich city is the property in?`);
        break;
      }
      case 'city': {
        const d = { ...bookingData, city: t };
        setBookingData(d); setBookingStep('name');
        botSay(`Got it — **${t}**. 👤\n\nWhat's your full name?`);
        break;
      }
      case 'name': {
        const d = { ...bookingData, name: t };
        setBookingData(d); setBookingStep('phone');
        botSay(`Hi **${t}**! 📞\n\nWhat's the best phone number to reach you?`);
        break;
      }
      case 'phone': {
        const d = { ...bookingData, phone: t };
        setBookingData(d); setBookingStep('notes');
        botSay(`Got it! Any details? (e.g. property address, preferred date/time, or special requests)`, [{ label: '⏭️ Skip', value: '__skip__' }]);
        break;
      }
      case 'notes': {
        const notes = t === '__skip__' ? '' : t;
        const d = { ...bookingData, notes };
        setBookingData(d); setBookingStep('confirm');
        botSay(`Here's your booking request:\n\n🔍 **Service:** ${d.service}\n📍 **City:** ${d.city}\n👤 **Name:** ${d.name}\n📞 **Phone:** ${d.phone}${d.notes ? `\n📝 **Notes:** ${d.notes}` : ''}\n\nShall I send this to our team?`,
          [{ label: '✅ Confirm Booking', value: '__confirm__' }, { label: '✏️ Start Over', value: '__restart__' }]);
        break;
      }
      case 'confirm': {
        if (t === '__restart__') {
          setBookingStep(null);
          setBookingData({ service: '', city: '', name: '', phone: '', notes: '' });
          botSay("No problem! Let's start fresh. 🔍", WELCOME_REPLIES);
          return;
        }
        if (t === '__confirm__') {
          setBookingStep('submitting'); setTyping(true);
          try {
            const res = await fetch('/api/book-chat-asads', {
              method: 'POST', headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(bookingData),
            });
            const data = await res.json();
            setTyping(false);
            if (data.ok) {
              setBookingStep(null);
              botSay(`✅ **Booking Request Sent!**\n\nWe've received your request for a **${bookingData.service}** in **${bookingData.city}**.\n\n📞 We'll call **${bookingData.phone}** shortly to confirm your appointment.\n\nThank you, ${bookingData.name}! 🔍`,
                [{ label: '🔍 View Services', value: 'show me all services' }, { label: '💰 View Pricing', value: 'show pricing page' }]);
            } else throw new Error('failed');
          } catch {
            setTyping(false); setBookingStep('confirm');
            botSay(`Something went wrong. Please try again or call us:\n\n📞 **(647) 801-9311**`,
              [{ label: '✅ Try Again', value: '__confirm__' }, { label: '📞 Call Us', value: 'call us' }]);
          }
        }
        break;
      }
    }
  };

  const [life, setLife] = useState<LifeState>('hidden');
  const [catX, setCatX] = useState(60);
  const [facingRight, setFacingRight] = useState(true);
  const [blinking, setBlinking] = useState(false);
  const [eyeX, setEyeX] = useState(0);
  const [eyeY, setEyeY] = useState(0);
  const [showBubble, setShowBubble] = useState(false);
  const [mood, setMood] = useState<ScoutMood>('idle');
  const [wingsOpen, setWingsOpen] = useState(false);
  const [walkClass, setWalkClass] = useState('');

  const ref = useRef<HTMLDivElement>(null);
  const behaviorTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const posRef = useRef(catX);
  posRef.current = catX;

  const clearBT = () => { if (behaviorTimer.current) clearTimeout(behaviorTimer.current); };

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const loop = () => { t = setTimeout(() => { setBlinking(true); setTimeout(() => setBlinking(false), 150); loop(); }, 2500 + Math.random() * 4000); };
    loop();
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      const d = Math.sqrt(dx * dx + dy * dy);
      setEyeX(d < 10 ? 0 : (dx / d) * Math.min(2.5, d / 55));
      setEyeY(d < 10 ? 0 : (dy / d) * Math.min(2.5, d / 55));
    };
    window.addEventListener('mousemove', fn);
    return () => window.removeEventListener('mousemove', fn);
  }, []);

  const walkTo = (tx: number) => {
    setFacingRight(tx > posRef.current);
    setLife('walk'); setMood('idle');
    setWalkClass('scout-walk');
    setCatX(tx);
    setTimeout(() => { setLife('idle'); setWalkClass(''); }, 2000);
  };

  const scheduleBehavior = () => {
    clearBT();
    behaviorTimer.current = setTimeout(() => {
      const roll = Math.random();
      const vw = Math.max(380, window.innerWidth);
      if (roll < 0.28) {
        walkTo(20 + Math.floor(Math.random() * (vw - 200)));
        setTimeout(scheduleBehavior, 2800);
      } else if (roll < 0.45) {
        setWingsOpen(true); setLife('flap'); setMood('happy');
        setTimeout(() => { setWingsOpen(false); setLife('idle'); setMood('idle'); scheduleBehavior(); }, 1800);
      } else if (roll < 0.58) {
        setMood('fire'); setLife('fire');
        setTimeout(() => { setMood('idle'); setLife('idle'); scheduleBehavior(); }, 1600);
      } else if (roll < 0.72) {
        setMood('curious'); setLife('curious');
        setEyeX(-2.5);
        setTimeout(() => { setEyeX(2.5); setEyeY(-0.5); }, 700);
        setTimeout(() => { setEyeX(0); setEyeY(0); setMood('idle'); setLife('idle'); scheduleBehavior(); }, 1600);
      } else {
        setMood('happy'); setTimeout(() => { setMood('idle'); scheduleBehavior(); }, 1400);
      }
    }, 5000 + Math.random() * 6000);
  };

  useEffect(() => {
    const vw = Math.max(380, window.innerWidth);
    setCatX(50 + Math.floor(Math.random() * (vw - 220)));
    const t1 = setTimeout(() => setLife('peek'), 800);
    const t2 = setTimeout(() => {
      setLife('idle');
      setTimeout(() => {
        setShowBubble(true); setMood('happy'); setWingsOpen(true);
        setTimeout(() => { setWingsOpen(false); setMood('idle'); scheduleBehavior(); }, 1200);
        setTimeout(() => setShowBubble(false), 10000);
      }, 600);
    }, 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearBT(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { if (chatOpen) setShowBubble(false); }, [chatOpen]);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'auto' }); }, [messages, typing]);

  useEffect(() => {
    if (chatOpen && !greeted) {
      setGreeted(true); setMood('excited'); setWingsOpen(true);
      setTimeout(() => { setWingsOpen(false); setMood('idle'); }, 1400);
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMessages([{ id: nid(), from: 'bot', text: WELCOME }]);
        setQuickReplies(WELCOME_REPLIES);
      }, 900);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [chatOpen, greeted]);

  const handleSend = async (text: string) => {
    const t = text.trim(); if (!t) return;
    setInput(''); setQuickReplies([]);
    setMessages(prev => [...prev, { id: nid(), from: 'user', text: t }]);

    if (t === 'call us') { setTimeout(() => { window.location.href = 'tel:6478019311'; }, 300); return; }

    // Active booking flow
    if (bookingStep !== null) { await handleBookingStep(t); return; }

    // Start in-chat booking — exact trigger or scheduling/availability questions
    if (
      t === 'I want to book an inspection' ||
      /\b(book|schedul|appoint|availab|avail\w*|earliest|when can|when do|when are|next.?(open|slot|time)|come out|send.*inspector|inspector.*available|can i get|get an inspect)\b/i.test(t)
    ) { startBookingFlow(); return; }

    // Internal navigation
    const nav = NAV_ACTIONS[t.toLowerCase()] ?? NAV_ACTIONS[t];
    if (nav) {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMessages(prev => [...prev, { id: nid(), from: 'bot', text: 'On my way! 🔍' }]);
        setTimeout(() => { navigate(nav); setChatOpen(false); }, 600);
      }, 500);
      return;
    }

    setTyping(true);

    // Build Claude conversation history
    const history = messages
      .concat({ id: 0, from: 'user', text: t })
      .map(m => ({ role: m.from === 'user' ? 'user' : 'assistant', content: m.text }));
    const firstUserIdx = history.findIndex(m => m.role === 'user');
    const cleanHistory = firstUserIdx >= 0 ? history.slice(firstUserIdx) : history;

    try {
      const res = await fetch('/api/chat-asads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: cleanHistory }),
      });
      const data = await res.json();
      setTyping(false);
      if (data.reply) {
        setMessages(prev => [...prev, { id: nid(), from: 'bot', text: data.reply }]);
        setQuickReplies(data.quickReplies ?? FALLBACK_REPLIES);
      } else {
        // Fallback to local INTENTS
        const matched = INTENTS.find(i => i.patterns.some(p => p.test(t)));
        if (matched) {
          setMessages(prev => [...prev, { id: nid(), from: 'bot', text: matched.response }]);
          setQuickReplies(matched.quickReplies ?? FALLBACK_REPLIES);
        } else {
          setMessages(prev => [...prev, { id: nid(), from: 'bot', text: FALLBACK }]);
          setQuickReplies(FALLBACK_REPLIES);
        }
      }
    } catch {
      setTyping(false);
      const matched = INTENTS.find(i => i.patterns.some(p => p.test(t)));
      if (matched) {
        setMessages(prev => [...prev, { id: nid(), from: 'bot', text: matched.response }]);
        setQuickReplies(matched.quickReplies ?? FALLBACK_REPLIES);
      } else {
        setMessages(prev => [...prev, { id: nid(), from: 'bot', text: FALLBACK }]);
        setQuickReplies(FALLBACK_REPLIES);
      }
    }
  };

  const bottomOffset = life === 'hidden' ? -145 : life === 'peek' ? -85 : 0;

  // ── Render bold (**text**) ─────────────────────────────────────────────────
  const renderText = (text: string) => {
    return text.split('\n').map((line, i) => {
      const parts = line.split(/(\*\*[^*]+\*\*)/g).map((p, j) =>
        p.startsWith('**') && p.endsWith('**')
          ? <strong key={j}>{p.slice(2, -2)}</strong>
          : p
      );
      return <React.Fragment key={i}>{parts}{i < text.split('\n').length - 1 && <br/>}</React.Fragment>;
    });
  };

  return (
    <>
      <style>{`
        @keyframes scout-float {
          0%,100% { transform: translateY(0) rotate(-0.5deg); }
          50%      { transform: translateY(-8px) rotate(0.5deg); }
        }
        @keyframes scout-walk {
          0%,100% { transform: translateY(0) rotate(-1deg); }
          25%      { transform: translateY(-6px) rotate(0.5deg); }
          75%      { transform: translateY(-3px) rotate(1.5deg); }
        }

        @keyframes scout-excited {
          0%,100% { transform: scale(1) rotate(0); }
          25%     { transform: scale(1.1) rotate(-6deg) translateY(-8px); }
          50%     { transform: scale(1.12) rotate(6deg) translateY(-12px); }
          75%     { transform: scale(1.06) rotate(-3deg) translateY(-6px); }
        }
        @keyframes scout-bubble-pop {
          0%   { opacity:0; transform: scale(0.7) translateY(12px); }
          65%  { transform: scale(1.04) translateY(-2px); }
          100% { opacity:1; transform: scale(1) translateY(0); }
        }
        @keyframes scout-dot {
          0%,60%,100% { transform: translateY(0); opacity:.35; }
          30%          { transform: translateY(-5px); opacity:1; }
        }
        @keyframes scout-shine {
          0%,100% { opacity: 0.1; }
          50%     { opacity: 0.22; }
        }
        .scout-float   { animation: scout-float 3s ease-in-out infinite; }
        .scout-walk    { animation: scout-walk 0.4s ease-in-out infinite; }
        .scout-excited { animation: scout-excited 0.5s ease-in-out 3; }
        .scout-shine   { animation: scout-shine 3s ease-in-out infinite; }
        .scout-bubble-pop { animation: scout-bubble-pop 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards; }
      `}</style>

      {/* Scout character */}
      <div ref={ref}
        style={{
          position: 'fixed', left: catX, bottom: bottomOffset, zIndex: 9998,
          cursor: 'pointer', userSelect: 'none',
          display: chatOpen ? 'none' : 'block',
          transition: 'bottom 1.1s cubic-bezier(0.34,1.56,0.64,1), left 2s ease-in-out',
          transform: facingRight ? 'scaleX(1)' : 'scaleX(-1)',
          filter: 'drop-shadow(0 8px 24px rgba(29,78,216,0.35))',
        }}
        onClick={() => { if (life === 'hidden') return; setShowBubble(false); setChatOpen(o => !o); }}
        onMouseEnter={() => {
          if (['hidden', 'peek'].includes(life)) return;
          setMood('happy'); setShowBubble(true); setWingsOpen(true);
          setTimeout(() => setWingsOpen(false), 1000);
        }}
        onMouseLeave={() => setMood('idle')}
      >
        <div className={`${walkClass || (life === 'idle' ? 'scout-float' : '')} ${mood === 'excited' ? 'scout-excited' : ''}`}>
          <ScoutSVG mood={mood} blinking={blinking} eyeX={eyeX} eyeY={eyeY} wingsOpen={wingsOpen}/>
        </div>

        {/* Greeting bubble */}
        {showBubble && !chatOpen && (
          <div className="scout-bubble-pop" style={{
            position: 'absolute', bottom: 148, left: '50%',
            transform: facingRight ? 'translateX(-50%)' : 'translateX(-50%) scaleX(-1)',
            background: 'linear-gradient(135deg,#eff6ff,#dbeafe)',
            border: '2px solid #60a5fa', borderRadius: 18,
            padding: '10px 18px',
            boxShadow: '0 8px 32px rgba(29,78,216,0.25)',
            whiteSpace: 'nowrap', pointerEvents: 'none',
          }}>
            <p style={{ fontSize: 13, fontWeight: 800, color: '#1d4ed8', margin: 0 }}>Hi! 🔍 Need an inspection?</p>
            <p style={{ fontSize: 11, color: '#2563eb', margin: '2px 0 0', fontWeight: 500 }}>Tap me to chat ✨</p>
            <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0,
              borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '8px solid #60a5fa' }}/>
          </div>
        )}

        {/* Unread dot */}
        {!chatOpen && messages.length > 0 && (
          <div style={{ position: 'absolute', top: 12, right: -4, width: 16, height: 16,
            background: '#ef4444', borderRadius: '50%', border: '2px solid white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transform: facingRight ? 'none' : 'scaleX(-1)' }}>
            <span style={{ color: 'white', fontSize: 8, fontWeight: 700 }}>!</span>
          </div>
        )}
      </div>

      {/* Chat window */}
      {chatOpen && (
        <div className="scout-bubble-pop" style={{
          position: 'fixed', left: 12, bottom: 16, zIndex: 9997,
          width: Math.min(380, (window.innerWidth || 400) - 16),
          height: 'min(580px, calc(100vh - 32px))',
          display: 'flex', flexDirection: 'column',
          background: '#f0f9ff',
          border: '1.5px solid #bfdbfe',
          borderRadius: 20,
          boxShadow: '0 24px 64px rgba(29,78,216,0.22), 0 4px 16px rgba(29,78,216,0.1)',
          overflow: 'hidden',
          fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
        }}>
          {/* Header */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px',
            background: 'linear-gradient(135deg,#1d4ed8,#2563eb)',
            flexShrink: 0,
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <ScoutSVG mini mood={mood}/>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontWeight: 800, fontSize: 14, color: 'white' }}>Scout</p>
              <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>ASADS Home Inspection · Online</p>
            </div>
            <button onClick={() => setChatOpen(false)} style={{
              background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%',
              width: 30, height: 30, cursor: 'pointer', color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
            }}>✕</button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px 12px 4px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {messages.map(m => (
              <div key={m.id} style={{
                display: 'flex', justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start',
              }}>
                {m.from === 'bot' && (
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#1d4ed8', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 6, marginTop: 2 }}>
                    <MagnifyIcon/>
                  </div>
                )}
                <div style={{
                  maxWidth: '78%', padding: '9px 13px', borderRadius: m.from === 'user' ? '16px 16px 4px 16px' : '4px 16px 16px 16px',
                  background: m.from === 'user'
                    ? 'linear-gradient(135deg,#1d4ed8,#2563eb)'
                    : 'white',
                  color: m.from === 'user' ? 'white' : '#1e293b',
                  fontSize: 13.5, lineHeight: 1.55,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                }}>
                  {renderText(m.text)}
                </div>
              </div>
            ))}
            {typing && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#1d4ed8',
                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MagnifyIcon/>
                </div>
                <div style={{ background: 'white', borderRadius: '4px 16px 16px 16px', padding: '10px 14px',
                  display: 'flex', gap: 5, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                  {[0, 0.18, 0.36].map((d, i) => (
                    <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: '#3b82f6',
                      animation: `scout-dot 1.1s ease-in-out ${d}s infinite` }}/>
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef}/>
          </div>

          {/* Quick replies */}
          {quickReplies.length > 0 && (
            <div style={{ padding: '6px 10px', display: 'flex', flexWrap: 'wrap', gap: 6, flexShrink: 0 }}>
              {quickReplies.map(qr => (
                <button key={qr.value} onClick={() => handleSend(qr.value)}
                  style={{
                    padding: '6px 12px', borderRadius: 20, fontSize: 12.5, cursor: 'pointer', fontWeight: 600,
                    background: '#eff6ff', color: '#1d4ed8', border: '1.5px solid #bfdbfe',
                    transition: 'all 0.15s', whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.background = '#1d4ed8'; (e.target as HTMLElement).style.color = 'white'; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.background = '#eff6ff'; (e.target as HTMLElement).style.color = '#1d4ed8'; }}
                >{qr.label}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ padding: '8px 12px 12px', display: 'flex', gap: 8, flexShrink: 0,
            borderTop: '1px solid #dbeafe', background: 'white' }}>
            <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)}
              placeholder="Ask about inspections…"
              onKeyDown={e => { if (e.key === 'Enter') handleSend(input); }}
              style={{
                flex: 1, border: '1.5px solid #bfdbfe', borderRadius: 20, padding: '9px 14px',
                fontSize: 13.5, outline: 'none', background: '#f8fafc', color: '#1e293b',
              }}/>
            <button onClick={() => handleSend(input)} disabled={!input.trim()}
              style={{
                width: 38, height: 38, borderRadius: '50%', border: 'none', cursor: 'pointer',
                background: input.trim() ? 'linear-gradient(135deg,#1d4ed8,#2563eb)' : '#e2e8f0',
                color: input.trim() ? 'white' : '#94a3b8',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s', flexShrink: 0,
              }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Open button (when chat is closed) */}
      {!chatOpen && life !== 'hidden' && (
        <button onClick={() => setChatOpen(true)}
          style={{
            position: 'fixed', right: 16, bottom: 16, zIndex: 9996,
            width: 52, height: 52, borderRadius: '50%', border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg,#1d4ed8,#2563eb)',
            boxShadow: '0 4px 20px rgba(29,78,216,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', transition: 'transform 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          title="Chat with Scout"
        >
          <MagnifyIcon/>
          {messages.length > 0 && (
            <div style={{ position: 'absolute', top: 4, right: 4, width: 14, height: 14,
              background: '#ef4444', borderRadius: '50%', border: '2px solid white' }}/>
          )}
        </button>
      )}
    </>
  );
};

export default SiteAssistant;
