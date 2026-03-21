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

// Home inspector: hard hat, blue work shirt, clipboard, magnifying glass
const ScoutSVG: React.FC<ScoutProps> = ({ mood = 'idle', blinking = false, eyeX = 0, eyeY = 0, mini = false }) => {
  const happy = mood === 'happy' || mood === 'excited';
  const w = mini ? 44 : 100;
  const h = mini ? 50 : 138;
  return (
    <svg width={w} height={h} viewBox="0 0 160 230" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* ── HOME INSPECTOR CHARACTER ── */}
      <defs>
        <radialGradient id="sc-skin" cx="38%" cy="28%" r="70%">
          <stop offset="0%" stopColor="#fde8d0"/><stop offset="55%" stopColor="#f9c49a"/><stop offset="100%" stopColor="#e8a06a"/>
        </radialGradient>
        <radialGradient id="sc-skin-d" cx="38%" cy="28%" r="70%">
          <stop offset="0%" stopColor="#f9c49a"/><stop offset="100%" stopColor="#d4845a"/>
        </radialGradient>
        <radialGradient id="sc-shirt" cx="36%" cy="22%" r="74%">
          <stop offset="0%" stopColor="#93c5fd"/><stop offset="40%" stopColor="#3b82f6"/><stop offset="100%" stopColor="#1d4ed8"/>
        </radialGradient>
        <radialGradient id="sc-hat" cx="38%" cy="25%" r="72%">
          <stop offset="0%" stopColor="#fde68a"/><stop offset="45%" stopColor="#f59e0b"/><stop offset="100%" stopColor="#d97706"/>
        </radialGradient>
        <radialGradient id="sc-pants" cx="40%" cy="25%" r="72%">
          <stop offset="0%" stopColor="#d4b896"/><stop offset="55%" stopColor="#a08060"/><stop offset="100%" stopColor="#7a6048"/>
        </radialGradient>
        <radialGradient id="sc-eye-l" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#6ab0e8"/><stop offset="45%" stopColor="#2980c8"/><stop offset="100%" stopColor="#1a5c9a"/>
        </radialGradient>
        <radialGradient id="sc-eye-r" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#6ab0e8"/><stop offset="45%" stopColor="#2980c8"/><stop offset="100%" stopColor="#1a5c9a"/>
        </radialGradient>
        <radialGradient id="sc-lens" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#d4f0e8" stopOpacity="0.85"/><stop offset="60%" stopColor="#a8dfc8" stopOpacity="0.6"/><stop offset="100%" stopColor="#70c0a0" stopOpacity="0.4"/>
        </radialGradient>
        <filter id="sc-drop" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#3a2010" floodOpacity="0.22"/>
        </filter>
        <filter id="sc-glow-blue" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="72" cy="226" rx="44" ry="5" fill="#3a2010" opacity="0.12"/>

      {/* ── LEGS (khaki) ── */}
      <path d="M 54,168 Q 52,190 51,212 Q 50,220 58,220 Q 65,220 66,212 Q 67,190 66,168 Z" fill="url(#sc-pants)"/>
      <path d="M 78,168 Q 78,190 78,212 Q 78,220 86,220 Q 93,220 92,212 Q 91,190 88,168 Z" fill="url(#sc-pants)"/>
      {/* Leg crease */}
      <line x1="57" y1="172" x2="55" y2="208" stroke="#7a6048" strokeWidth="1.2" opacity="0.35"/>
      <line x1="82" y1="172" x2="82" y2="208" stroke="#7a6048" strokeWidth="1.2" opacity="0.35"/>
      {/* Shoes */}
      <path d="M 48,213 Q 44,220 47,224 Q 53,227 63,226 Q 68,224 68,220 Q 66,214 58,213 Z" fill="#2a1a0e"/>
      <path d="M 76,213 Q 75,220 78,224 Q 84,227 93,226 Q 97,224 96,220 Q 93,214 85,213 Z" fill="#2a1a0e"/>
      <path d="M 49,218 Q 53,216 59,217" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.28"/>
      <path d="M 78,218 Q 82,216 88,217" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.28"/>

      {/* ── TOOL BELT ── */}
      <rect x="48" y="160" width="48" height="10" rx="3" fill="#4a3728"/>
      {/* Belt buckle */}
      <rect x="68" y="161" width="10" height="8" rx="1.5" fill="#c8a020"/>
      <rect x="69" y="162" width="8" height="6" rx="1" fill="#f0c030" opacity="0.7"/>
      {/* Flashlight on belt right side */}
      <rect x="88" y="160" width="5" height="10" rx="2" fill="#888"/>
      <ellipse cx="90" cy="160" rx="3" ry="2" fill="#ffee88" opacity="0.7"/>
      {/* Pen on belt left */}
      <rect x="52" y="158" width="3" height="12" rx="1.5" fill="#1d4ed8"/>
      <rect x="56" y="158" width="3" height="12" rx="1.5" fill="#dc2626"/>

      {/* ── LEFT ARM (holding clipboard) ── */}
      <path d="M 50,100 Q 36,118 26,148 Q 23,156 29,158 Q 35,160 38,152 Q 46,126 56,106 Z" fill="url(#sc-shirt)"/>
      {/* Left hand */}
      <ellipse cx="31" cy="159" rx="7" ry="8" fill="url(#sc-skin)" filter="url(#sc-drop)"/>

      {/* ── CLIPBOARD (left hand) ── */}
      <g transform="rotate(-6,18,168)">
        <rect x="4" y="144" width="30" height="42" rx="3" fill="#b07840"/>
        <rect x="6" y="149" width="26" height="35" rx="2" fill="#f5f0e4"/>
        {/* Clip */}
        <rect x="11" y="141" width="16" height="10" rx="3" fill="#777"/>
        <rect x="13" y="142" width="12" height="7" rx="2" fill="#555"/>
        <ellipse cx="19" cy="142" rx="5" ry="2.5" fill="#666"/>
        {/* Checklist lines */}
        <line x1="10" y1="156" x2="28" y2="156" stroke="#9ca3af" strokeWidth="1.2" opacity="0.6"/>
        <line x1="10" y1="162" x2="28" y2="162" stroke="#9ca3af" strokeWidth="1.2" opacity="0.6"/>
        <line x1="10" y1="168" x2="28" y2="168" stroke="#9ca3af" strokeWidth="1.2" opacity="0.6"/>
        <line x1="10" y1="174" x2="28" y2="174" stroke="#9ca3af" strokeWidth="1.2" opacity="0.6"/>
        {/* Checkmarks */}
        <path d="M 9,155 L 11,157 L 14,153" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        <path d="M 9,161 L 11,163 L 14,159" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        {/* X mark (issue found) */}
        <path d="M 9,167 L 13,171 M 13,167 L 9,171" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
      </g>

      {/* ── RIGHT ARM (raised, holding magnifying glass) ── */}
      <path d="M 96,100 Q 110,80 120,56 Q 123,48 118,45 Q 113,42 110,50 Q 102,70 90,92 Z" fill="url(#sc-shirt)"/>
      {/* Right hand */}
      <ellipse cx="117" cy="44" rx="7" ry="8" fill="url(#sc-skin)" filter="url(#sc-drop)"/>

      {/* ── MAGNIFYING GLASS ── */}
      <path d="M 119,50 L 148,20" stroke="#2d7a3a" strokeWidth="8" strokeLinecap="round"/>
      <path d="M 119,50 L 148,20" stroke="#3a9a4a" strokeWidth="4" strokeLinecap="round" opacity="0.5"/>
      <line x1="128" y1="42" x2="132" y2="38" stroke="#1a5c28" strokeWidth="2.5" opacity="0.55"/>
      <line x1="134" y1="36" x2="138" y2="32" stroke="#1a5c28" strokeWidth="2.5" opacity="0.55"/>
      <circle cx="108" cy="54" r="22" fill="none" stroke="#2d7a3a" strokeWidth="5"/>
      <circle cx="108" cy="54" r="22" fill="none" stroke="#4aaa5a" strokeWidth="2" opacity="0.4"/>
      <circle cx="108" cy="54" r="18" fill="url(#sc-lens)"/>
      <ellipse cx="102" cy="46" rx="6" ry="4" fill="white" opacity="0.32" transform="rotate(-20,102,46)"/>
      {/* Home icon in lens */}
      <path d="M 108,42 L 99,52 L 117,52 Z" fill="#1a5c28" opacity="0.9"/>
      <path d="M 108,42 L 100,51 L 116,51 Z" fill="#2d7a3a" opacity="0.45"/>
      <rect x="100" y="51" width="16" height="12" rx="1.5" fill="#1a5c28" opacity="0.85"/>
      <rect x="105" y="55" width="6" height="8" rx="1" fill="#4aaa5a" opacity="0.95"/>
      <circle cx="110" cy="59" r="1" fill="#2d7a3a"/>
      <circle cx="108" cy="54" r="2.5" fill="#2d7a3a" opacity="0.45"/>

      {/* ── SHIRT BODY (blue work shirt) ── */}
      <path d="M 46,100 Q 42,128 44,162 L 100,162 Q 102,128 98,100 Q 88,88 72,86 Q 56,88 46,100 Z"
        fill="url(#sc-shirt)" filter="url(#sc-drop)"/>
      {/* Shirt shading */}
      <path d="M 46,100 Q 42,128 44,162 L 58,162 Q 54,132 56,104 Z" fill="#1d4ed8" opacity="0.3"/>
      {/* Chest pocket */}
      <rect x="74" y="108" width="15" height="13" rx="2" fill="#2563eb"/>
      <rect x="74" y="108" width="15" height="5" rx="1" fill="#1d4ed8"/>
      <line x1="78" y1="108" x2="78" y2="121" stroke="#f0c030" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="82" y1="108" x2="82" y2="121" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Collar */}
      <path d="M 58,92 Q 65,100 72,96 Q 79,100 86,92 Q 80,85 72,83 Q 64,85 58,92 Z" fill="#60a5fa"/>
      <path d="M 59,92 Q 65,97 72,95" stroke="#93c5fd" strokeWidth="1" opacity="0.5"/>
      <path d="M 85,92 Q 79,97 72,95" stroke="#93c5fd" strokeWidth="1" opacity="0.5"/>
      {/* Shirt placket */}
      <line x1="72" y1="96" x2="72" y2="162" stroke="#2563eb" strokeWidth="1.5" opacity="0.45"/>
      {[108,122,136,150].map((y, i) => <circle key={i} cx="72" cy={y} r="2" fill="#1d4ed8" opacity="0.55"/>)}

      {/* ── NECK ── */}
      <rect x="65" y="84" width="14" height="10" rx="5" fill="url(#sc-skin)"/>

      {/* ── HEAD ── */}
      <ellipse cx="72" cy="56" rx="30" ry="32" fill="url(#sc-skin)" filter="url(#sc-drop)"/>
      <ellipse cx="72" cy="71" rx="18" ry="10" fill="white" opacity="0.07"/>

      {/* ── EARS ── */}
      <ellipse cx="42" cy="58" rx="7" ry="9" fill="url(#sc-skin)"/>
      <ellipse cx="43" cy="58" rx="4" ry="6" fill="url(#sc-skin-d)" opacity="0.45"/>
      <ellipse cx="102" cy="58" rx="7" ry="9" fill="url(#sc-skin)"/>
      <ellipse cx="101" cy="58" rx="4" ry="6" fill="url(#sc-skin-d)" opacity="0.45"/>

      {/* ── HARD HAT (yellow) ── */}
      {/* Dome */}
      <path d="M 38,44 Q 38,10 72,8 Q 106,10 106,44 Q 98,30 72,28 Q 46,30 38,44 Z" fill="url(#sc-hat)"/>
      {/* Dome shading sides */}
      <path d="M 38,44 Q 40,22 52,14 Q 44,26 42,40 Z" fill="#d97706" opacity="0.4"/>
      <path d="M 106,44 Q 104,22 92,14 Q 100,26 102,40 Z" fill="#d97706" opacity="0.35"/>
      {/* Dome highlight */}
      <ellipse cx="66" cy="18" rx="16" ry="7" fill="white" opacity="0.18" transform="rotate(-8,66,18)"/>
      <path d="M 54,12 Q 68,9 82,12" stroke="#fde68a" strokeWidth="2.5" strokeLinecap="round" opacity="0.55"/>
      {/* Brim */}
      <path d="M 30,44 Q 30,52 72,54 Q 114,52 114,44 Q 114,38 72,40 Q 30,38 30,44 Z" fill="#d97706"/>
      <path d="M 34,47 Q 72,52 110,47" stroke="#b45309" strokeWidth="2" opacity="0.35" fill="none"/>
      {/* Hat suspension stripe */}
      <path d="M 42,42 Q 72,46 102,42" stroke="#b45309" strokeWidth="1.5" opacity="0.25" fill="none"/>
      {/* ASADS badge on hat */}
      <rect x="62" y="24" width="20" height="10" rx="2" fill="#1d4ed8" opacity="0.85"/>
      <text x="72" y="32" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold" fontFamily="sans-serif" opacity="0.9">ASADS</text>

      {/* ── BROWN HAIR (visible at sides under hat) ── */}
      <path d="M 38,44 Q 36,52 38,62" stroke="#5c3a18" strokeWidth="7" strokeLinecap="round" fill="none"/>
      <path d="M 106,44 Q 108,52 106,62" stroke="#5c3a18" strokeWidth="7" strokeLinecap="round" fill="none"/>
      <path d="M 40,46 Q 38,55 40,64" stroke="#3a2010" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.5"/>
      <path d="M 104,46 Q 106,55 104,64" stroke="#3a2010" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.5"/>

      {/* ── EYES ── */}
      <ellipse cx="61" cy="54" rx="11" ry={blinking ? 2 : 12} fill="white" stroke="#d4a060" strokeWidth="0.5"/>
      <ellipse cx="83" cy="54" rx="11" ry={blinking ? 2 : 12} fill="white" stroke="#d4a060" strokeWidth="0.5"/>
      {!blinking && <>
        <circle cx={61 + eyeX * 2} cy={54 + eyeY * 2} r={7.5} fill="url(#sc-eye-l)" filter="url(#sc-glow-blue)"/>
        <circle cx={83 + eyeX * 2} cy={54 + eyeY * 2} r={7.5} fill="url(#sc-eye-r)" filter="url(#sc-glow-blue)"/>
        <circle cx={61 + eyeX * 2} cy={54 + eyeY * 2} r={4} fill="#0a1a2e"/>
        <circle cx={83 + eyeX * 2} cy={54 + eyeY * 2} r={4} fill="#0a1a2e"/>
        <circle cx={58 + eyeX * 2} cy={51 + eyeY * 2} r={2.2} fill="white" opacity="0.95"/>
        <circle cx={80 + eyeX * 2} cy={51 + eyeY * 2} r={2.2} fill="white" opacity="0.95"/>
        <circle cx={63 + eyeX * 2} cy={56 + eyeY * 2} r={1} fill="white" opacity="0.5"/>
        <circle cx={85 + eyeX * 2} cy={56 + eyeY * 2} r={1} fill="white" opacity="0.5"/>
      </>}
      <ellipse cx="61" cy="54" rx="11" ry={blinking ? 2 : 12} fill="none" stroke="#5c3a18" strokeWidth="1.5"/>
      <ellipse cx="83" cy="54" rx="11" ry={blinking ? 2 : 12} fill="none" stroke="#5c3a18" strokeWidth="1.5"/>

      {/* ── EYEBROWS ── */}
      <path d={happy ? "M 51,41 Q 61,37 71,40" : "M 51,42 Q 61,39 71,41"}
        stroke="#5c3a18" strokeWidth="2.8" strokeLinecap="round" fill="none"/>
      <path d={happy ? "M 73,40 Q 83,37 93,41" : "M 73,41 Q 83,39 93,42"}
        stroke="#5c3a18" strokeWidth="2.8" strokeLinecap="round" fill="none"/>

      {/* ── NOSE ── */}
      <path d="M 68,66 Q 72,70 76,66" stroke="#d4845a" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <circle cx="68" cy="66" r="2.5" fill="#d4845a" opacity="0.45"/>
      <circle cx="76" cy="66" r="2.5" fill="#d4845a" opacity="0.45"/>

      {/* ── SMILE ── */}
      <path d={happy ? "M 58,76 Q 72,89 86,76" : "M 60,76 Q 72,84 84,76"}
        stroke="#c47850" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d={happy ? "M 60,77 Q 72,87 84,77 L 82,79 Q 72,88 62,79 Z" : "M 62,76 Q 72,83 82,76 L 80,78 Q 72,84 64,78 Z"}
        fill="white" opacity="0.88"/>
      {happy && <line x1="72" y1="77" x2="72" y2="86" stroke="#e0c0a0" strokeWidth="1" opacity="0.4"/>}
      {/* Cheeks */}
      <ellipse cx="51" cy="70" rx="9" ry="6" fill="#ff8888" opacity="0.26"/>
      <ellipse cx="93" cy="70" rx="9" ry="6" fill="#ff8888" opacity="0.26"/>

      {/* Head shine */}
      <ellipse cx="62" cy="44" rx="10" ry="6" fill="white" opacity="0.08" transform="rotate(-15,62,44)"/>
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
  type BookingStep = null | 'service' | 'city' | 'address' | 'age' | 'beds' | 'baths' | 'sqft' | 'name' | 'phone' | 'notes' | 'confirm' | 'submitting';
  interface BookingData { service: string; city: string; address: string; age: string; beds: string; baths: string; sqft: string; name: string; phone: string; notes: string; }
  const [bookingStep, setBookingStep] = useState<BookingStep>(null);
  const [bookingData, setBookingData] = useState<BookingData>({ service: '', city: '', address: '', age: '', beds: '', baths: '', sqft: '', name: '', phone: '', notes: '' });

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
    setBookingData({ service: '', city: '', address: '', age: '', beds: '', baths: '', sqft: '', name: '', phone: '', notes: '' });
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
        setBookingData(d); setBookingStep('address');
        botSay(`Got it — **${t}**! 🏠\n\nWhat's the property address?`, [{ label: '⏭️ Skip', value: '__skip__' }]);
        break;
      }
      case 'address': {
        const address = t === '__skip__' ? '' : t;
        const d = { ...bookingData, address };
        setBookingData(d); setBookingStep('age');
        botSay(`Got it! 📅 Approximately when was the property built?`, [
          { label: '🆕 New (< 5 yrs)', value: 'New build (under 5 years)' },
          { label: '5–20 years old', value: '5–20 years old' },
          { label: '20–50 years old', value: '20–50 years old' },
          { label: '50+ years old', value: '50+ years old' },
        ]);
        break;
      }
      case 'age': {
        const d = { ...bookingData, age: t };
        setBookingData(d); setBookingStep('beds');
        botSay(`Got it! 🛏️ How many bedrooms does the property have?`, [
          { label: '1 bedroom', value: '1' },
          { label: '2 bedrooms', value: '2' },
          { label: '3 bedrooms', value: '3' },
          { label: '4+ bedrooms', value: '4+' },
        ]);
        break;
      }
      case 'beds': {
        const d = { ...bookingData, beds: t };
        setBookingData(d); setBookingStep('baths');
        botSay(`Got it! 🚿 How many bathrooms?`, [
          { label: '1 bathroom', value: '1' },
          { label: '2 bathrooms', value: '2' },
          { label: '3 bathrooms', value: '3' },
          { label: '4+ bathrooms', value: '4+' },
        ]);
        break;
      }
      case 'baths': {
        const d = { ...bookingData, baths: t };
        setBookingData(d); setBookingStep('sqft');
        botSay(`Almost done! 📐 What's the approximate square footage?`, [
          { label: 'Under 1,500 sq ft', value: 'Under 1,500 sq ft' },
          { label: '1,500–2,500 sq ft', value: '1,500–2,500 sq ft' },
          { label: '2,500–3,500 sq ft', value: '2,500–3,500 sq ft' },
          { label: '3,500+ sq ft', value: '3,500+ sq ft' },
        ]);
        break;
      }
      case 'sqft': {
        const d = { ...bookingData, sqft: t };
        setBookingData(d); setBookingStep('name');
        botSay(`Perfect! 👤\n\nWhat's your full name?`);
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
        botSay(`Here's your booking request:\n\n🔍 **Service:** ${d.service}\n📍 **City:** ${d.city}${d.address ? `\n🏠 **Address:** ${d.address}` : ''}\n📅 **Property Age:** ${d.age}\n🛏️ **Bedrooms:** ${d.beds}\n🚿 **Bathrooms:** ${d.baths}\n📐 **Sq Ft:** ${d.sqft}\n👤 **Name:** ${d.name}\n📞 **Phone:** ${d.phone}${d.notes ? `\n📝 **Notes:** ${d.notes}` : ''}\n\nShall I send this to our team?`,
          [{ label: '✅ Confirm Booking', value: '__confirm__' }, { label: '✏️ Start Over', value: '__restart__' }]);
        break;
      }
      case 'confirm': {
        if (t === '__restart__') {
          setBookingStep(null);
          setBookingData({ service: '', city: '', address: '', age: '', beds: '', baths: '', sqft: '', name: '', phone: '', notes: '' });
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
