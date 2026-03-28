import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { Phone, Mail, MessageCircle, Search, CheckCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useState, useMemo } from "react";
import { HeroBookingSection } from "@/components/HeroBookingSection";

const faqCategories = [
  {
    category: "General Home Inspection",
    questions: [
      {
        question: "What is a home inspection?",
        answer: "A home inspection is a comprehensive, non-invasive visual examination of a property\'s accessible systems and components by a qualified inspector. It covers the structure, roof, electrical, plumbing, HVAC, insulation, and more. The purpose is to give buyers and sellers an objective assessment of the property\'s condition so they can make informed decisions.",
      },
      {
        question: "Is a home inspection required by law in Ontario?",
        answer: "Home inspections are not legally mandatory in Ontario for resale properties, but they are strongly recommended. Since 2023, Ontario\'s Trust in Real Estate Services Act (TRESA) entitles buyers to a reasonable opportunity to conduct a home inspection before making an offer. Skipping an inspection on a property can expose you to costly surprises after closing.",
      },
      {
        question: "How long does a home inspection take?",
        answer: "A typical home inspection takes 2.5 to 4 hours depending on the size, age, and condition of the property. A small condo may take 90 minutes while a large older home in Toronto\'s Annex or East York neighbourhood could take 4 or more hours. Additional specialized tests like radon or mold add time.",
      },
      {
        question: "Should I attend the home inspection?",
        answer: "Absolutely. Attending your inspection is one of the best things you can do as a buyer. You can ask questions in real time, see issues firsthand, and receive a verbal walkthrough from the inspector at the end. First-time buyers especially benefit from learning about the home\'s systems and maintenance needs directly from a certified professional.",
      },
      {
        question: "Can a home fail a home inspection?",
        answer: "No. A home inspection is not a pass/fail test. Inspectors report on the current condition of the property without assigning a grade. Every home, including brand-new construction, will have some items noted. The report gives you the information you need to negotiate, plan repairs, or make a purchase decision.",
      },
      {
        question: "Who hires the home inspector - the buyer or the seller?",
        answer: "In a standard Ontario real estate transaction, the buyer hires and pays for the home inspection. The inspector\'s duty is to the client who engages them. Sellers may also hire an inspector independently to conduct a pre-listing inspection before putting their property on the market.",
      },
      {
        question: "How do I find a qualified home inspector in Ontario?",
        answer: "In Ontario, home inspectors must be licensed under the Home Inspection Act, 2017, which came into force in 2023. Look for inspectors who hold additional credentials from OAHI (Ontario Association of Home Inspectors) or InterNACHI. ASADS inspectors are licensed, InterNACHI-certified, and carry full WSIB and errors-and-omissions insurance.",
      },
      {
        question: "What qualifications should a home inspector have in Ontario?",
        answer: "Ontario home inspectors must be licensed by the province, carry errors-and-omissions insurance, and follow the Ontario Standards of Practice. Top inspectors also hold designations like RHI (Registered Home Inspector) from OAHI or Certified Inspector (CI) from InterNACHI, which require ongoing education and adherence to a code of ethics.",
      },
      {
        question: "What is the difference between a home inspection and an appraisal?",
        answer: "A home inspection evaluates the physical condition of the property - its systems, structure, and components. An appraisal determines the market value of the property for lending purposes. They are completely separate processes conducted by different professionals. Lenders require appraisals; buyers arrange inspections for their own protection.",
      },
      {
        question: "What is the difference between a home inspection and a home survey?",
        answer: "A home survey (often called a real property report or survey) establishes property boundaries, easements, and encroachments on the land. A home inspection assesses the physical condition of the buildings and systems on the property. Both serve different purposes and neither replaces the other.",
      },
      {
        question: "Do home inspectors in Ontario carry insurance?",
        answer: "Yes, licensed Ontario home inspectors are required to carry insurance and general liability coverage. At ASADS, we carry Intact insurance and all inspectors are also covered by WSIB, protecting both our team and our clients. Always confirm insurance coverage before booking any inspector.",
      },
      {
        question: "What happens after the home inspection is complete?",
        answer: "After the inspection, your inspector will do a verbal summary walkthrough with you on site. You will then receive a detailed written report, typically within 24 hours and often same-day, delivered digitally via email. The report includes photos, descriptions of all findings, and recommendations for follow-up or repairs.",
      },
      {
        question: "When will I receive my inspection report?",
        answer: "ASADS delivers detailed digital inspection reports within 24 hours of the inspection, and in most cases the same day. Reports are sent by email in an easy-to-read format with photographs, categorized findings, and clear maintenance recommendations that you can share with your realtor or lawyer.",
      },
      {
        question: "Can I use my inspection report to negotiate the purchase price?",
        answer: "Yes, and this is one of the most practical uses of an inspection report. Significant deficiencies discovered - such as a failing furnace, active roof leaks, or knob-and-tube wiring - can be the basis for requesting a price reduction, seller repairs before closing, or a credit on closing costs. Your real estate agent can guide you through negotiation.",
      },
      {
        question: "What if the inspector misses something?",
        answer: "Home inspectors inspect only visible and accessible areas at the time of the inspection. They are not required to move furniture, cut into walls, or predict future failures. If a defect was concealed or inaccessible, the inspector is generally not liable. This is why E&O insurance and a thorough, experienced inspector matter - ASADS stands behind every report.",
      },
      {
        question: "How do I prepare my home for an inspection?",
        answer: "Sellers should ensure all areas of the home are accessible: clear clutter from around the furnace, water heater, and electrical panel; unlock the attic hatch and crawlspace; make sure all utilities are on; replace burnt-out lightbulbs; and ensure pets are secured or removed. The more accessible the home, the more thorough the inspection.",
      },
      {
        question: "Can a home inspection be done in winter in Ontario?",
        answer: "Yes. Winter inspections are common in Ontario and can actually reveal issues that are harder to spot in warmer months - ice damming on the roof, heating system performance, drafts around windows and doors, and frost in attics indicating ventilation problems. Heavy snow may limit roof visibility, which the inspector will note in the report.",
      },
      {
        question: "Do home inspectors check for pests or pest damage?",
        answer: "Standard home inspectors look for visual evidence of pest activity - wood damage consistent with carpenter ants or termites, rodent droppings, and entry points. However, a full pest inspection is a separate specialized service. If signs are found during the inspection, we will recommend a dedicated pest inspection by a licensed exterminator.",
      },
      {
        question: "Is a home inspection worth it for a newer home?",
        answer: "Yes, absolutely. Even homes built in the last 10 years can have construction deficiencies, improperly installed systems, moisture issues, or code violations. In fact, many builders make shortcuts that only become apparent after the first few years. An inspection on a newer home in Vaughan, Brampton, or Mississauga is just as important as on a 100-year-old Toronto Victorian.",
      },
      {
        question: "What is a pre-delivery inspection (PDI) for a new construction home?",
        answer: "A PDI is a walkthrough conducted with the builder before you take possession of a new construction home. Under the Ontario New Home Warranties Plan Act (Tarion), builders are required to conduct a PDI. You should bring your own independent inspector to document deficiencies and ensure nothing is missed before you sign.",
      },
      {
        question: "How is an Ontario home inspection different from a US home inspection?",
        answer: "Ontario home inspectors are now licensed under provincial law (Home Inspection Act, 2017), whereas US licensing varies dramatically by state. Ontario Standards of Practice align with InterNACHI but have specific provincial requirements. Some issues are also Ontario-specific - KITEC plumbing, knob-and-tube wiring insurance requirements, and radon prevalence in certain regions are examples.",
      },
    ],
  },
  {
    category: "Costs & Booking",
    questions: [
      {
        question: "How much does a home inspection cost in Toronto?",
        answer: "A standard home inspection in Toronto typically costs between $450 and $650 for a detached single-family home, depending on size and age. Condos range from $350 to $475. Homes over 3,000 sq ft or older than 80 years may cost more. Call ASADS at (647) 801-9311 for a precise quote based on your specific property.",
      },
      {
        question: "How much does a condo inspection cost in Ontario?",
        answer: "Condo inspections in Ontario typically range from $325 to $475 depending on the size and floor of the unit. Because the inspection focuses on the interior unit rather than the building exterior, it is generally shorter and less expensive than a full house inspection. Contact us at (647) 801-9311 for a quote.",
      },
      {
        question: "How much does radon testing cost in Ontario?",
        answer: "ASADS radon testing starts from $499. Radon is a two-visit service — we drop off certified monitoring equipment at your property, leave it for the required monitoring period, then return to retrieve it and generate your certified report. This two-visit requirement and the cost of professional-grade equipment is why pricing is higher than mail-in kits. Call (647) 801-9311 to book.",
      },
      {
        question: "How much does a mold inspection cost?",
        answer: "Mold inspections in the GTA range from $300 to $600 for a visual inspection, with additional costs of $100 to $300 per sample for laboratory analysis. Prices vary based on the number of areas tested and whether air sampling is included. ASADS provides transparent pricing - call (647) 801-9311 for a quote.",
      },
      {
        question: "How much does a WETT inspection cost in Ontario?",
        answer: "A WETT inspection in Ontario typically costs between $200 and $400, depending on the number and type of solid-fuel appliances on the property. Many insurance companies require a WETT inspection before providing coverage for homes with wood-burning fireplaces or stoves. Call (647) 801-9311 to add a WETT inspection to your booking.",
      },
      {
        question: "How much does an asbestos test cost in Ontario?",
        answer: "Asbestos bulk sampling (collecting a physical sample for lab analysis) costs approximately $50 to $150 per sample, plus $50 to $150 for laboratory analysis per sample. A visual assessment and sampling of multiple suspect materials in a pre-1985 home may total $400 to $700. ASADS follows O.Reg 278/05 protocols for all asbestos assessments.",
      },
      {
        question: "How do I book a home inspection with ASADS?",
        answer: "You can book online through our website, call us at (647) 801-9311, or email info@asads.ca. We offer flexible scheduling including evenings and weekends to accommodate your real estate timeline. We serve all of the Greater Toronto Area including Mississauga, Brampton, Markham, Vaughan, Richmond Hill, Ajax, and Oshawa.",
      },
      {
        question: "How far in advance do I need to book a home inspection?",
        answer: "We recommend booking as soon as your offer is accepted - ideally 24 to 48 hours in advance. In a competitive market, inspections often need to happen quickly. ASADS offers same-day and next-day bookings when availability allows. Call (647) 801-9311 to check availability for your preferred date.",
      },
      {
        question: "What payment methods do you accept?",
        answer: "ASADS accepts all major credit cards, debit cards, Interac e-transfer, and cash. Payment is collected at the time of the inspection. For commercial inspections or multiple services, we can issue an invoice. We do not require upfront deposits for standard residential inspections.",
      },
      {
        question: "Do you offer package deals or discounts for multiple services?",
        answer: "Yes. ASADS offers bundled pricing when you combine services - for example, a home inspection plus radon testing or thermal imaging. We also offer repeat customer discounts and referral incentives. Ask about current promotions when you call (647) 801-9311 to book.",
      },
      {
        question: "Can I get a same-day home inspection in Toronto?",
        answer: "Same-day inspections are available depending on inspector availability. If you have an urgent timeline due to a short conditional period, call (647) 801-9311 immediately and we will do our best to accommodate you. We understand that real estate transactions in the GTA often move quickly.",
      },
      {
        question: "Do you charge extra for older homes?",
        answer: "Older homes in Toronto - particularly those built before 1960 in neighbourhoods like The Junction, Leslieville, or Roncesvalles - often take longer to inspect due to their complexity, multiple systems layers, and age-related issues. We may charge a modest premium for homes over 80-100 years old. Call for a quote based on your specific property.",
      },
      {
        question: "Is the home inspection fee refundable if I walk away from the deal?",
        answer: "The inspection fee is generally non-refundable once the inspection has been completed, regardless of whether you proceed with the purchase. The service rendered - the inspection and report - has value whether you buy the home or not. The information in the report helps you make the right decision, even if that decision is to walk away.",
      },
      {
        question: "Do you offer commercial property inspections?",
        answer: "Yes, ASADS provides commercial property inspections for small to mid-sized commercial buildings, retail spaces, and mixed-use properties. Commercial inspections are priced individually based on the size and complexity of the building. Call (647) 801-9311 to discuss your commercial inspection needs.",
      },
      {
        question: "Do you inspect properties outside of Toronto?",
        answer: "ASADS serves the entire Greater Toronto Area and surrounding regions including Mississauga, Brampton, Markham, Vaughan, Richmond Hill, Oakville, Burlington, Hamilton, Ajax, Whitby, Oshawa, Barrie, and Kitchener-Waterloo. Call (647) 801-9311 or check our locations page to confirm coverage for your area.",
      },
    ],
  },
  {
    category: "What Gets Inspected",
    questions: [
      {
        question: "What does a standard home inspection include?",
        answer: "A standard Ontario home inspection covers: roofing, attic and insulation, exterior (siding, windows, doors, grading), structural components (foundation, walls, floors), electrical system, plumbing system, heating system, air conditioning (seasonal), interior finishes, and attached garage. Inspectors follow InterNACHI Standards of Practice and Ontario Standards of Practice.",
      },
      {
        question: "Do home inspectors check the roof?",
        answer: "Yes. Inspectors visually examine the roof covering, flashings, gutters, downspouts, soffits, fascia, and visible chimney components. Where safely accessible, the inspector may walk the roof. In cases where snow cover, steep pitch, or wet conditions make it unsafe, the roof will be inspected from ground level or with binoculars, and this limitation will be noted in the report.",
      },
      {
        question: "Do home inspectors check the attic?",
        answer: "Yes. Attic inspection includes checking for adequate insulation levels, proper ventilation (soffits, ridge vents), signs of moisture or condensation, visible structural members (rafters, trusses), pest activity, and evidence of roof leaks from below. In Ontario\'s climate, attic moisture and inadequate insulation are among the most common findings.",
      },
      {
        question: "Do home inspectors check the furnace?",
        answer: "Yes. Inspectors examine the furnace age, visible condition, operation, filter, exhaust flue, heat exchanger (visually), and distribution system. Furnaces over 25 years old are noted as at or near end of service life. Inspectors do not perform full HVAC servicing, but will flag signs of malfunction, improper installation, or safety concerns.",
      },
      {
        question: "Do home inspectors check the electrical panel?",
        answer: "Yes. Inspectors open the electrical panel to observe the wiring, breaker condition, proper grounding, and potential hazards. They check for double-tapped breakers, oversized fuses, unprotected wiring, and signs of amateur work. Inspectors do not perform live electrical testing but will flag panels that warrant evaluation by a licensed electrician.",
      },
      {
        question: "Do home inspectors check the plumbing?",
        answer: "Yes. Inspectors evaluate the water supply piping material, drain lines, water pressure, fixtures, water heater age and condition, sump pump, and visible plumbing for leaks. They identify pipe materials including copper, ABS, cast iron, galvanized steel, KITEC, and polybutylene - some of which are associated with elevated risk in Ontario homes.",
      },
      {
        question: "Do home inspectors check the foundation?",
        answer: "Yes. Inspectors examine the visible portions of the foundation from inside (basement/crawlspace) and outside. They look for cracks, water infiltration, efflorescence, bowing walls, and signs of settling. Horizontal cracks in poured concrete or block foundations are especially significant and may warrant evaluation by a structural engineer.",
      },
      {
        question: "Do home inspectors check for water damage?",
        answer: "Yes. Inspectors look for signs of past or active water intrusion including staining, efflorescence, damaged drywall, rust stains, sump pump condition, and grading issues. Thermal imaging (infrared cameras) can reveal hidden moisture that is not visible to the naked eye - this is available as an add-on service with ASADS.",
      },
      {
        question: "Do home inspectors check windows and doors?",
        answer: "Yes. Inspectors test a representative sample of windows and doors for operation, sealing, and condition. They check for failed window seals (foggy double-pane glass), rot around frames, improper installation, and missing weatherstripping. In Ontario, energy efficiency of windows is an important factor given our heating season.",
      },
      {
        question: "Do home inspectors check the air conditioning?",
        answer: "Inspectors test the AC system if outdoor temperatures are above 10-15 degrees Celsius. Operating an AC in cold weather can damage the compressor. If the inspection occurs in winter or early spring, the AC may not be testable and this limitation will be noted in the report. The inspector will still examine the unit visually.",
      },
      {
        question: "Do home inspectors check the water heater?",
        answer: "Yes. The water heater is inspected for age, visible condition, proper venting, temperature and pressure relief valve, and signs of corrosion or leaks. Most water heaters have a service life of 10-15 years. An aging water heater noted in the report helps you budget for replacement and negotiate with the seller.",
      },
      {
        question: "Do home inspectors check the garage?",
        answer: "Yes. Attached garages are included in the standard inspection. Inspectors check the fire separation between the garage and living space (required by Ontario Building Code), the garage door operation and auto-reverse safety feature, electrical outlets, ventilation, and structural condition.",
      },
      {
        question: "Do home inspectors check insulation?",
        answer: "Yes. Inspectors evaluate visible insulation in the attic and where accessible in the basement or crawlspace. They check insulation type (fibreglass, cellulose, spray foam, vermiculite), depth/R-value, and condition. Vermiculite insulation is flagged because it may contain asbestos and should be tested before disturbance.",
      },
      {
        question: "Do home inspectors check smoke and carbon monoxide detectors?",
        answer: "Yes. Inspectors verify that smoke and carbon monoxide detectors are present in required locations as per the Ontario Fire Code. They may test units but are not responsible for battery replacement. Missing or improperly located detectors are noted as safety concerns. Ontario law requires CO detectors in all homes with fuel-burning appliances or attached garages.",
      },
      {
        question: "Do home inspectors check for asbestos?",
        answer: "Standard home inspectors visually identify suspect materials that may contain asbestos - such as old floor tiles, pipe insulation, textured ceilings, and certain wall compounds - and recommend testing. Only a laboratory analysis of a physical sample can confirm the presence of asbestos. ASADS can arrange asbestos bulk sampling under O.Reg 278/05 protocols.",
      },
      {
        question: "Do home inspectors check septic systems?",
        answer: "Septic systems are generally outside the scope of a standard home inspection. ASADS recommends engaging a qualified septic inspector for properties with private septic systems, which is common in rural Ontario and communities around the GTA like Caledon, Uxbridge, or King Township. We can refer you to a qualified septic specialist.",
      },
      {
        question: "Do home inspectors check wells?",
        answer: "Private wells are generally not included in a standard home inspection. However, we recommend water quality testing for all well-water properties to check for bacteria, nitrates, and other contaminants. This is especially important in rural areas of Ontario where agricultural runoff can affect groundwater.",
      },
      {
        question: "What areas of the home are NOT inspected?",
        answer: "Areas not covered include: concealed or inaccessible spaces, areas blocked by stored belongings, underground systems (septic, drainage, buried oil tanks), swimming pools and hot tubs (unless added), outbuildings (unless specifically included), interior of chimneys (requires camera), private wells, and anything requiring destructive testing.",
      },
      {
        question: "Do home inspectors check for lead paint?",
        answer: "Inspectors may visually note areas of deteriorating paint in pre-1978 homes that could indicate lead paint, but laboratory confirmation requires testing. Lead paint is most common in homes built before 1960. If suspected, we recommend professional lead paint testing, especially if young children will be living in the home.",
      },
      {
        question: "Will the inspector check the fireplace?",
        answer: "Inspectors visually examine the firebox, damper operation, visible flue, and hearth condition. They do not insert cameras into chimney flues as part of a standard inspection - this requires a Level 2 chimney inspection. For homes with wood-burning appliances, a WETT inspection is recommended and often required by Ontario insurance companies.",
      },
    ],
  },
  {
    category: "Reading the Report",
    questions: [
      {
        question: "What does a home inspection report look like?",
        answer: "ASADS delivers digital reports with photographs, categorized findings, written descriptions, and clear recommendations. Reports are organized by system (roof, electrical, plumbing, etc.) and typically run 30 to 80 pages depending on the home. Every finding is described with its location, condition, and recommended action.",
      },
      {
        question: "How do I understand the ratings in my inspection report?",
        answer: "Most inspection reports use condition categories such as Satisfactory, Monitor, Repair/Replace, and Safety Concern. Safety Concerns and items rated Repair/Replace are the highest priority. Items rated Monitor should be tracked but are not immediate concerns. Your inspector will explain all ratings during the verbal summary at the end of the inspection.",
      },
      {
        question: "What is a major deficiency versus a minor deficiency?",
        answer: "A major deficiency is a finding that significantly affects the safety, habitability, or value of the home - such as a cracked heat exchanger, failing foundation wall, or active roof leak. A minor deficiency is a maintenance item or cosmetic issue with lower urgency. Both are reported, but major deficiencies may warrant renegotiation or specialist evaluation.",
      },
      {
        question: "Should I be worried if there are a lot of items in my report?",
        answer: "Not necessarily. A thorough inspector on an older home will generate a longer report, but many findings are routine maintenance items. Focus on safety concerns and major deficiencies first. A long report on a 1950s Toronto home does not mean the house is a bad buy - it means the inspector did a thorough job.",
      },
      {
        question: "What items in a report are most important to address before buying?",
        answer: "Prioritize: structural issues (foundation, load-bearing elements), safety hazards (CO, fire risks, knob-and-tube wiring), roofing failures, active water intrusion, failing mechanical systems (furnace, water heater), and evidence of mold or asbestos. These items either affect safety, habitability, or involve the highest remediation costs.",
      },
      {
        question: "Can I share my inspection report with my lawyer?",
        answer: "Yes. Your inspection report belongs to you and you can share it with your real estate agent, lawyer, or contractor. Many buyers share the relevant sections with their lawyer to support price renegotiation or request repairs as conditions of the sale. Your lawyer can advise on how to use the report most effectively.",
      },
      {
        question: "How long is an inspection report valid?",
        answer: "An inspection report reflects the condition of the property on the day of the inspection. It does not expire, but its relevance diminishes over time as conditions change. If significant time passes between inspection and closing (more than 90 days), or if the seller has done major work, a follow-up visit may be warranted.",
      },
      {
        question: "What does it mean when the report says further evaluation is needed?",
        answer: "This means the inspector found something that warrants more detailed assessment by a specialist - such as a structural engineer for foundation issues, a licensed electrician for wiring concerns, or a plumber for pipe condition. These recommendations should not be ignored. Follow through with the specialist before finalizing your purchase decision.",
      },
      {
        question: "Will the report tell me how much repairs will cost?",
        answer: "Home inspectors are not required to provide repair cost estimates and most do not, as costs vary significantly by contractor and scope of work. ASADS reports describe deficiencies clearly so you and your contractor can accurately scope the work. For rough budgeting, your real estate agent or contractor can provide estimates based on the report findings.",
      },
      {
        question: "What does deferred maintenance mean in an inspection report?",
        answer: "Deferred maintenance refers to routine upkeep that has been neglected over time - for example, peeling exterior paint, aging caulking, dirty furnace filters, or overdue gutter cleaning. These items are not urgent safety concerns but accumulate into bigger problems if left unaddressed. A pattern of heavy deferred maintenance can be a useful negotiating point.",
      },
      {
        question: "My report mentions vermiculite insulation. What should I do?",
        answer: "Vermiculite insulation, commonly found in attics of Ontario homes built before the 1990s, may contain asbestos, particularly if it came from the Libby, Montana mine. Do not disturb it. Have a sample professionally tested by an accredited lab before doing any work in the attic. ASADS can arrange sampling under Ontario\'s asbestos regulations.",
      },
      {
        question: "How do I use the inspection report to negotiate with the seller?",
        answer: "Bring your report findings to your real estate agent and identify the items you want addressed. Typical negotiation strategies include requesting the seller repair specific items before closing, asking for a price reduction equivalent to estimated repair costs, or requesting a closing credit. Focus negotiations on major deficiencies - sellers may resist requests on routine maintenance items.",
      },
      {
        question: "What if I disagree with something in my inspection report?",
        answer: "Contact your inspector directly to discuss any concerns. Inspectors are often willing to clarify their findings or revisit an ambiguous observation. If you believe a significant error was made, the inspector\'s E&O insurance provides recourse. Keep all communication in writing for your records.",
      },
      {
        question: "Does the inspection report include maintenance tips?",
        answer: "Yes. ASADS reports include general maintenance recommendations alongside deficiency findings. These tips help new homeowners understand how to care for their property - things like cleaning gutters seasonally, checking the sump pump annually, or replacing furnace filters every 90 days. This educational component is especially valuable for first-time buyers.",
      },
      {
        question: "Can I get a second inspection if I am not satisfied?",
        answer: "Yes. You are always entitled to seek a second opinion from another licensed inspector. If you feel the initial inspection was incomplete or inaccurate, a second inspection can provide additional perspective. In some cases, a specialized engineer or tradesperson may be better suited to evaluate a specific concern identified in the original report.",
      },
    ],
  },
  {
    category: "Buying a Home",
    questions: [
      {
        question: "Should I get a home inspection when buying a house in Ontario?",
        answer: "Yes, strongly. A home inspection is one of the most important steps in buying a home. With Ontario real estate transactions often happening at high prices - particularly in Toronto, Mississauga, and the surrounding GTA - even a $500 inspection can save you tens of thousands of dollars in unexpected repairs or reveal issues that change your decision entirely.",
      },
      {
        question: "Can I get a home inspection during a bully offer or pre-emptive offer?",
        answer: "Under Ontario\'s TRESA (Trust in Real Estate Services Act), you have a right to a reasonable opportunity to conduct a home inspection before making an offer. In fast markets, buyers sometimes do pre-offer inspections. ASADS offers flexible scheduling, including short-notice bookings for competitive offer situations. Call (647) 801-9311.",
      },
      {
        question: "What is a home inspection condition in an Ontario offer?",
        answer: "A home inspection condition (also called a home inspection contingency) is a clause in your Agreement of Purchase and Sale that makes the deal conditional on a satisfactory inspection within a set number of days - typically 5 to 7 business days. If major issues are found, you can renegotiate or withdraw from the offer without penalty during this period.",
      },
      {
        question: "What if I waive the home inspection condition?",
        answer: "Waiving the inspection condition means you accept the property as-is, without the protection of being able to renegotiate or exit based on inspection findings. In competitive Toronto markets, some buyers do this to make their offers more attractive. If you must waive, consider a pre-offer inspection so you have information before committing.",
      },
      {
        question: "What is a pre-offer home inspection in Ontario?",
        answer: "A pre-offer inspection (also called a pre-emptive inspection) is one you arrange before submitting your offer. This allows you to submit a firm offer without an inspection condition, which can be more competitive, while still having full knowledge of the property\'s condition. ASADS accommodates pre-offer inspections with quick scheduling and same-day reports.",
      },
      {
        question: "How many homes should I have inspected before buying?",
        answer: "Ideally, every home you make an offer on should be inspected. In practice, buyers in competitive markets sometimes limit inspections to properties where an offer has been accepted. If you are touring multiple homes seriously, a pre-offer inspection on your top candidate is a good investment before submitting your offer.",
      },
      {
        question: "What are the biggest red flags in a home inspection?",
        answer: "The most serious red flags include: horizontal cracks in the foundation wall, active water intrusion in the basement, failed or aging main electrical panel (Federal Pacific, Zinsco, or Pushmatic), knob-and-tube or aluminum wiring, KITEC plumbing, failing roof with no remaining life, cracked heat exchanger on the furnace, and evidence of mold throughout the structure.",
      },
      {
        question: "What problems are most common in older Toronto homes?",
        answer: "Toronto homes built before 1960 commonly have knob-and-tube wiring, galvanized steel pipes, clay sewer laterals prone to root intrusion, inadequate attic insulation, lead paint, aging foundations, and lack of modern safety features. Many of these issues are manageable and well-understood by experienced inspectors familiar with Toronto\'s housing stock.",
      },
      {
        question: "What problems are common in homes built in the 1970s and 1980s in Ontario?",
        answer: "Homes from this era may have aluminum wiring (1960s-1970s), KITEC or polybutylene plumbing (1980s-1990s), asbestos in floor tiles and insulation, Federal Pacific or Zinsco electrical panels, and urea formaldehyde foam insulation (UFFI). Many of these issues require disclosure under Ontario real estate law if the seller is aware of them.",
      },
      {
        question: "Should I be concerned about buying a home with a sump pump in Ontario?",
        answer: "A sump pump is not inherently a problem - it is a common and recommended feature in Ontario basements given our heavy rain and spring snowmelt. The inspector will check the sump pump\'s condition, operation, and whether a battery backup exists. An active, well-maintained sump pump is a sign the basement water management is being handled proactively.",
      },
      {
        question: "What should I look for when buying a house in a flood-prone area of Ontario?",
        answer: "Check for evidence of previous flooding (water stains, efflorescence, fresh paint over stains), sump pump condition and capacity, window well drains, exterior grading sloping away from the foundation, backwater valve installation, and any history of insurance claims. Many areas around the GTA including parts of Mississauga and Etobicoke have experienced flooding.",
      },
      {
        question: "Should I get a home inspection on a property sold as-is?",
        answer: "Absolutely, and perhaps more so than on a regular listing. An as-is sale means the seller is not willing to negotiate on condition. An inspection gives you full knowledge of what you are taking on. You can still walk away during the inspection period or adjust your offer price accordingly. Never buy an as-is property without an inspection.",
      },
      {
        question: "What is a Phase 1 Environmental Site Assessment and when do I need one?",
        answer: "A Phase 1 Environmental Site Assessment (ESA) is a professional review of a property\'s environmental history - looking for past industrial use, buried oil tanks, soil contamination, and other environmental liabilities. It is typically required for commercial property purchases but may be advisable for residential properties with known environmental concerns or former commercial use.",
      },
      {
        question: "Should I get an inspection on a recently renovated home?",
        answer: "Yes - possibly even more than an unrenovated home. Recent renovations can conceal pre-existing issues or introduce new problems if done without permits or by unlicensed contractors. Inspectors look for signs of unpermitted work, code violations in renovations, and whether cosmetic updates are hiding underlying deficiencies.",
      },
      {
        question: "What is a home inspection report used for in mortgage financing?",
        answer: "Lenders do not typically require a home inspection as a condition of mortgage approval. However, if you discover major issues through the inspection and renegotiate the price, this can affect your financing. Some lenders may have concerns if a property is in very poor condition. Always inform your mortgage broker of any significant inspection findings.",
      },
      {
        question: "Can a home inspection reveal hidden defects under Ontario real estate law?",
        answer: "Home inspectors identify visible deficiencies, which may include latent (hidden) defects that become visible through inspection techniques. Under Ontario real estate law, sellers have a duty to disclose known latent defects that affect habitability or safety. If a defect was deliberately concealed, you may have legal recourse - speak to a real estate lawyer.",
      },
      {
        question: "What is the difference between a patent defect and a latent defect in Ontario?",
        answer: "A patent defect is one that is obvious and visible to the naked eye - a buyer is expected to notice these themselves. A latent defect is hidden and not discoverable through ordinary inspection - such as a concealed plumbing leak behind walls or buried foundation cracking. Sellers in Ontario must disclose known latent defects.",
      },
      {
        question: "How can I find out about the history of defects in a home I am buying?",
        answer: "Review the Seller Property Information Statement (SPIS) if provided, ask your agent about any permit history, search the city\'s permit records online, review prior MLS listings for disclosure notes, and speak with neighbours. A thorough inspection combined with due diligence on permit history gives you the most complete picture.",
      },
      {
        question: "What should I ask a home inspector before hiring them?",
        answer: "Ask: Are you licensed under Ontario\'s Home Inspection Act? Do you carry E&O insurance and WSIB? How many inspections have you done? What certifications do you hold (OAHI, InterNACHI)? What is included in the report? How long will the inspection take? When will I receive the report? Can I attend? ASADS inspectors are happy to answer all of these.",
      },
      {
        question: "Can a home inspector recommend specific contractors for repairs?",
        answer: "Ontario home inspection standards generally discourage inspectors from referring specific contractors to avoid conflicts of interest. However, inspectors can recommend the type of professional needed (licensed electrician, structural engineer, plumber, etc.). Your real estate agent or lawyer can refer you to trusted contractors once you know what repairs are needed.",
      },
    ],
  },
  {
    category: "Selling a Home",
    questions: [
      {
        question: "Should I get a pre-listing home inspection before selling?",
        answer: "A pre-listing inspection is highly recommended for sellers in Ontario. It identifies issues before buyers do, allows you to make repairs on your own timeline, price the home accurately, and present buyers with confidence. Homes with pre-listing inspections often sell faster and with fewer surprises during negotiations.",
      },
      {
        question: "What are the benefits of a pre-listing inspection in Ontario?",
        answer: "Benefits include: discovering and fixing issues before buyers see them, accurate pricing based on actual condition, reduced likelihood of renegotiation after an offer, faster closing with fewer conditions, and building buyer trust by demonstrating transparency. In Ontario\'s market, a pre-listing inspection is a competitive differentiator.",
      },
      {
        question: "Do I have to disclose the results of a pre-listing inspection in Ontario?",
        answer: "This is a nuanced area of Ontario real estate law. If you become aware of a latent defect through your pre-listing inspection, you are likely required to disclose it. Consult your real estate agent and lawyer about disclosure obligations before deciding how to handle findings from a pre-listing inspection.",
      },
      {
        question: "What if the buyer wants their own inspection after I already had one?",
        answer: "Buyers are entitled to their own independent inspection regardless of whether you provided a pre-listing report. Your pre-listing inspection still has value - it shows you are an informed, transparent seller and reduces the likelihood of surprising findings. Buyers who see a pre-listing report often have more confidence in the purchase.",
      },
      {
        question: "How much does a pre-listing inspection cost?",
        answer: "Pre-listing inspections are priced the same as buyer-side inspections - typically $450 to $650 for a detached home in the GTA. This is a small investment relative to the potential savings from renegotiation or lost deals. Call ASADS at (647) 801-9311 to book your pre-listing inspection.",
      },
      {
        question: "Should I fix items found in a pre-listing inspection?",
        answer: "It depends on the severity and cost of the item. Safety hazards and major deficiencies are generally worth repairing before listing. Minor maintenance items may be left and priced accordingly. Your real estate agent can advise on which repairs generate the best return and which buyers will overlook. ASADS reports make it easy to triage findings.",
      },
      {
        question: "Can a pre-listing inspection affect my listing price?",
        answer: "Yes - in both directions. A clean pre-listing inspection can justify a premium price. Significant findings should be factored into the listing price to avoid renegotiation later. Many sellers find that a pre-listing inspection results in a more accurately priced listing and a smoother transaction.",
      },
      {
        question: "What do sellers need to prepare before a pre-listing inspection?",
        answer: "Ensure all areas are accessible: clear storage from around the electrical panel, furnace, and water heater; unlock the attic hatch and any outbuilding; ensure all utilities are connected and operational; remove pets; replace burnt-out bulbs; and have documentation for any recent major work (roof, furnace, etc.) available for the inspector.",
      },
      {
        question: "What is the Seller Property Information Statement in Ontario?",
        answer: "The SPIS is a voluntary document in which sellers disclose known defects, history of issues, and information about the property\'s systems. While not legally required in Ontario, many real estate agents recommend it. A pre-listing inspection provides factual support for what you fill out on the SPIS and demonstrates due diligence.",
      },
      {
        question: "Can a seller attend the buyer\'s home inspection?",
        answer: "It is generally not recommended for sellers to be present during the buyer\'s home inspection. The buyer and their inspector should be able to move freely, discuss findings openly, and ask questions without feeling observed or pressured. Your real estate agent can advise on the appropriate protocol for your transaction.",
      },
      {
        question: "How does a home inspection affect the closing timeline in Ontario?",
        answer: "A home inspection condition typically gives buyers 5 to 7 business days to complete the inspection and make a decision. If repairs are requested, additional time may be needed to obtain quotes and confirm the work. ASADS delivers reports within 24 hours, which helps keep your transaction on track.",
      },
      {
        question: "What happens if the buyer finds issues and wants to renegotiate after inspection?",
        answer: "This is a normal part of the Ontario real estate process. Buyers may request repairs, a price reduction, or a closing credit. You can agree, counteroffer, or decline. If the inspection condition expires without agreement, the buyer may walk. Having a pre-listing inspection means you are never caught off guard by findings.",
      },
      {
        question: "What if my home has known issues like knob-and-tube wiring or KITEC plumbing?",
        answer: "Known material defects should be disclosed in Ontario. Rather than trying to hide issues, many sellers find it better to price the home accordingly, provide remediation quotes to buyers, and let buyers make an informed decision. Transparency builds trust and reduces the risk of post-closing disputes or legal action.",
      },
      {
        question: "Is a home inspection required for estate sales in Ontario?",
        answer: "Estate sales are not legally required to have an inspection, and estate sellers often sell as-is because they do not have personal knowledge of the property\'s history. However, buyers should always conduct their own inspection on an estate property. A pre-listing inspection by the estate representative can help attract more confident buyers.",
      },
      {
        question: "Can I use a home inspection report from a previous buyer who walked away?",
        answer: "You can share a previous buyer\'s inspection report if you have their permission and if the report is recent. However, most buyers will want their own inspection conducted by an inspector of their choice. A pre-listing inspection from ASADS gives you a fresh, neutral report you can share with all prospective buyers.",
      },
    ],
  },
  {
    category: "New Construction Inspections",
    questions: [
      {
        question: "Do new construction homes need a home inspection?",
        answer: "Yes. New construction homes can have deficiencies including poor workmanship, improper installations, missing insulation, grading issues, and code violations. Municipal building inspectors check for code compliance but do not represent the buyer\'s interests the way an independent inspector does. An independent inspection before closing or during construction is strongly recommended.",
      },
      {
        question: "What is a Tarion warranty and does it replace a home inspection?",
        answer: "Tarion is Ontario\'s new home warranty program, providing statutory warranties for defects in workmanship, materials, and major structural defects. However, Tarion warranty claims require documented evidence and may take time to resolve. An independent inspection at key construction milestones and before possession documents deficiencies for Tarion claims.",
      },
      {
        question: "When should I get a new construction home inspected?",
        answer: "The ideal times for new construction inspections are: at the pre-drywall stage (to verify insulation, framing, and rough-in systems), before the PDI with the builder, and at the 1-year mark before your Tarion Year 1 warranty expires. ASADS offers new construction inspections at all of these stages.",
      },
      {
        question: "What is a pre-delivery inspection (PDI) for new homes in Ontario?",
        answer: "The PDI is a mandatory walkthrough with the builder before you take possession of your new home. The builder shows you how to operate the home\'s systems and you document any deficiencies on a form. Items noted at the PDI become the builder\'s responsibility to fix. Bring an independent inspector to the PDI to ensure nothing is missed.",
      },
      {
        question: "Can I bring my own inspector to the PDI with the builder?",
        answer: "Yes, and it is highly recommended. Builder representatives conduct the PDI to fulfill their obligation, not to advocate for you. An independent inspector attending the PDI will identify deficiencies the builder\'s representative may overlook or downplay. Contact ASADS at (647) 801-9311 to arrange a PDI inspection.",
      },
      {
        question: "What does a pre-drywall inspection involve?",
        answer: "A pre-drywall inspection takes place after framing, rough-in electrical, plumbing, and HVAC are installed but before drywall is applied. This is the best opportunity to verify insulation placement, structural members, wiring runs, pipe installations, and fire blocking - all of which will be concealed once drywalled. Missing this stage means relying entirely on building inspector sign-offs.",
      },
      {
        question: "What is a Tarion Year 1 inspection?",
        answer: "Tarion provides a one-year warranty on defects in workmanship and materials. Before the first anniversary of possession, you should document all remaining deficiencies and submit a warranty claim. ASADS offers a formal Year 1 inspection to document everything before the deadline, protecting your warranty rights.",
      },
      {
        question: "What common defects are found in new construction homes in Ontario?",
        answer: "Common new construction deficiencies include: missing or improperly installed insulation, poor attic ventilation, grading that directs water toward the foundation, improperly installed windows causing air leakage, incomplete drywall finishing, HVAC commissioning issues, and reversed bathroom fan ducting. New does not mean defect-free.",
      },
      {
        question: "Are new homes in Brampton, Vaughan, or Markham still inspected by the city?",
        answer: "Yes, municipal building inspectors in all GTA municipalities conduct mandatory code compliance inspections during construction. However, these inspectors verify minimum code standards, not quality of workmanship or buyer interests. They do not follow up on all aspects of a build. An independent inspection is a separate and valuable layer of protection.",
      },
      {
        question: "Should I get a home inspection on a new condo in Toronto?",
        answer: "Yes. New condo PDIs in Toronto frequently reveal issues including finish defects, appliance malfunctions, HVAC balancing problems, window sealing issues, and ventilation deficiencies. ASADS can attend your builder PDI and document all deficiencies for your Tarion warranty claim.",
      },
      {
        question: "Does a new construction home come with a warranty against radon?",
        answer: "No. Tarion does not provide a warranty for radon because it is a naturally occurring environmental condition, not a construction defect. However, Ontario Building Code requires radon-resistant construction measures in new homes built since 2016. Testing your new home after move-in is the only way to confirm radon levels are within safe limits.",
      },
      {
        question: "What questions should I ask the builder during the PDI?",
        answer: "Ask about: the operation of all mechanical systems (furnace, HRV, AC); location of shut-off valves; how to use and maintain the HRV system; warranty process and contact information; what is covered and excluded under Tarion; and when you will receive the completed PDI form. Your independent inspector can help formulate and document answers.",
      },
      {
        question: "What is an HRV system and should it be checked in a new home?",
        answer: "An HRV (Heat Recovery Ventilator) is required in all new Ontario homes built under the 2017 Ontario Building Code. It provides fresh air while recovering heat from exhaust air. During a new home inspection, ASADS verifies the HRV is properly installed, balanced, and operational, as improperly commissioned HRVs are a common new construction finding.",
      },
      {
        question: "How do I document deficiencies found during the PDI?",
        answer: "Use the builder-provided PDI form and insist on noting every deficiency in writing with a description and location. Photograph everything. Do not let the builder\'s representative dismiss concerns verbally - everything must be on the form. ASADS can help you prepare a comprehensive deficiency list during a PDI inspection.",
      },
      {
        question: "What happens if the builder refuses to fix deficiencies noted at the PDI?",
        answer: "If the builder fails to correct PDI deficiencies within a reasonable time, you can file a claim with Tarion. Tarion will investigate and, if the claim is valid, direct the builder to repair or arrange for repairs at the builder\'s expense. Keep all correspondence and documentation. Your lawyer can also advise on remedies under your purchase agreement.",
      },
    ],
  },
  {
    category: "Condo Inspections",
    questions: [
      {
        question: "Do I need a home inspection when buying a condo in Toronto?",
        answer: "Yes. While condos have fewer systems than houses, a condo inspection evaluates the interior unit condition, HVAC (fan coil or heat pump), electrical panel, plumbing fixtures, windows, balcony, and all finishes. Issues like water infiltration through the building envelope, fan coil problems, and KITEC plumbing are common in Toronto condos.",
      },
      {
        question: "What does a condo inspection cover?",
        answer: "A condo inspection covers the interior of your specific unit: walls, ceilings, floors, windows and balcony doors, electrical panel and outlets, plumbing fixtures and water pressure, kitchen and bathroom conditions, HVAC unit (fan coil or heat pump), suite ventilation, and any private terraces or parking spaces assigned to the unit.",
      },
      {
        question: "What is NOT included in a condo inspection?",
        answer: "Common elements managed by the condo corporation - including the roof, building exterior, elevators, corridors, garage structure, and shared mechanical systems - are typically not part of a condo unit inspection. The status certificate and reserve fund study are separate documents that address the building\'s overall financial and physical health.",
      },
      {
        question: "What is a status certificate and why do I need one?",
        answer: "A status certificate is a legal document from the condo corporation that discloses the building\'s financial health, reserve fund balance, any special assessments, ongoing litigation, and management details. Reviewing the status certificate alongside a unit inspection gives you a complete picture of what you are buying. Your lawyer should review it before you firm up your offer.",
      },
      {
        question: "What is a reserve fund and why does it matter?",
        answer: "A reserve fund is money set aside by the condo corporation for major future repairs - roof replacement, garage waterproofing, elevator upgrades, window replacement, etc. An underfunded reserve means the corporation may need to issue a special assessment (a lump-sum charge to all owners) to cover major repairs. Check the reserve fund study in the status certificate.",
      },
      {
        question: "What is a special assessment in a condo building?",
        answer: "A special assessment is an extra charge levied on condo owners when the reserve fund is insufficient to cover a major repair or unexpected expense. If a large special assessment is pending or recently passed, it may affect your purchase. This information should be in the status certificate and is a key reason to review it carefully before buying.",
      },
      {
        question: "Are Toronto condos commonly affected by KITEC plumbing?",
        answer: "Yes. Many Toronto condo buildings constructed between 1995 and 2007 contain KITEC plumbing in individual units and in building systems. KITEC is known to fail catastrophically and many insurers will not cover homes with KITEC or charge higher premiums. ASADS inspectors identify KITEC fittings during every condo inspection.",
      },
      {
        question: "How do I check if my condo building has KITEC plumbing?",
        answer: "Look for orange or blue flexible piping with brass fittings stamped KITEC, PlumbBetter, IPEX AQUA, or WarmRite near the hot water heater or under sinks. Ask the building superintendent or check with the condo corporation. Your inspector will look for these indicators during the unit inspection. Some buildings have already replaced KITEC system-wide.",
      },
      {
        question: "What is a fan coil unit and how is it inspected in a condo?",
        answer: "A fan coil unit is the HVAC system in most mid-to-high-rise Toronto condos, providing both heating and cooling. The inspector checks the fan coil for operation, filter condition, condensate tray for leaks, accessible components, and signs of water damage near the unit. Poorly maintained fan coils are a common source of water damage in condo buildings.",
      },
      {
        question: "Can I inspect the parking space and storage locker with a condo inspection?",
        answer: "Yes. If you are purchasing a parking space and storage locker with your unit, ASADS can include a visual inspection of these areas in your condo inspection. This is particularly useful for identifying signs of water infiltration in underground garage levels or evidence of pest activity in storage areas.",
      },
      {
        question: "What common problems are found in older Toronto condo buildings?",
        answer: "Older Toronto condos (pre-2000) commonly have KITEC plumbing, aging fan coil units, inadequate suite ventilation, outdated electrical panels (60-amp service), balcony concrete spalling, building envelope leakage around windows, and deferred reserve fund maintenance. Many buildings have also had remediation for these issues - check the status certificate for building repair history.",
      },
      {
        question: "Should I hire a condo inspector or a regular home inspector?",
        answer: "Any licensed, experienced home inspector can perform a condo inspection, but an inspector familiar with Toronto condo buildings and their specific systems (fan coil units, building envelope types, KITEC issues) will be more effective. ASADS inspectors have extensive experience with the GTA condo market and its common issues.",
      },
      {
        question: "What should I look for in a condo building before buying?",
        answer: "Before buying a Toronto condo, review the status certificate, the reserve fund study, building financials, any pending litigation, rules and restrictions (pets, rentals), the building\'s repair history, and the property management company. A good unit in a poorly managed building can still be a costly purchase.",
      },
      {
        question: "Can a condo inspection reveal balcony issues?",
        answer: "Yes. Balconies in older Toronto condo buildings are common maintenance concerns - inspectors look for concrete spalling, cracked or missing caulking at the balcony door threshold, guardrail integrity, and drainage. Balcony restoration projects can trigger significant special assessments in older buildings.",
      },
      {
        question: "Is a home inspection on a condo worth it compared to the cost?",
        answer: "Absolutely. A $350-$475 condo inspection can identify issues that cost thousands to repair - a failed fan coil unit, active water infiltration, or electrical panel concerns. In Toronto\'s condo market where prices regularly exceed $700,000, an inspection is a low-cost form of due diligence that every buyer should undertake.",
      },
    ],
  },
  {
    category: "Electrical & Wiring",
    questions: [
      {
        question: "What is knob-and-tube wiring and is it dangerous?",
        answer: "Knob-and-tube (K&T) wiring is an early form of electrical wiring used in Canadian homes from approximately 1880 to 1940. It consists of single insulated copper conductors run through ceramic knobs and tubes. The wiring itself is not inherently dangerous when in original condition, but it has no ground wire, becomes brittle with age, and is often improperly modified. Most Ontario insurance companies will not insure homes with active knob-and-tube wiring.",
      },
      {
        question: "Can I get home insurance with knob-and-tube wiring in Ontario?",
        answer: "Most major Ontario insurance companies refuse to insure homes with active knob-and-tube wiring, or will only do so with an electrical inspection and significant premium increases. If you are buying a home with K&T wiring, get insurance quotes before closing to avoid surprises. ASADS identifies active knob-and-tube wiring during every inspection.",
      },
      {
        question: "How much does it cost to replace knob-and-tube wiring in Ontario?",
        answer: "Complete rewiring of a Toronto home to replace knob-and-tube wiring typically costs $8,000 to $20,000 or more depending on the home\'s size, number of floors, and accessibility. Homes with finished basements and plaster walls cost more to rewire than those with open framing. Get quotes from ESA-licensed electricians and factor this into your offer price.",
      },
      {
        question: "What is aluminum wiring and is it a problem in Ontario homes?",
        answer: "Aluminum wiring was used in Canadian homes from approximately 1965 to 1978 as a less expensive alternative to copper. Aluminum oxidizes and expands/contracts differently than copper, which can cause connections to loosen over time, creating fire risks at outlets, switches, and panels. Homes with aluminum wiring require CO/ALR-rated devices or pigtailing with copper to be safe and insurable.",
      },
      {
        question: "How do I know if my Ontario home has aluminum wiring?",
        answer: "Aluminum wiring may be identified by silver-coloured wire at outlets or panels marked with AL or ALUM. Homes built between 1965 and 1978 are the most likely to have it. Your home inspector will identify the wiring type at the panel and visible outlets. Confirmation and remediation should be done by an ESA-licensed electrician.",
      },
      {
        question: "What is a Federal Pacific or Zinsco electrical panel and why is it a concern?",
        answer: "Federal Pacific Electric (FPE) Stab-Lok and Zinsco (also sold as GTE-Sylvania) panels were found to have defective breakers that may fail to trip during overloads, creating fire risks. These panels are no longer manufactured and are recommended for replacement by most home inspectors and insurance companies in Ontario. If found, plan for panel replacement.",
      },
      {
        question: "What is a 60-amp electrical service and is it sufficient for a modern home?",
        answer: "A 60-amp main service is the minimum that was standard in older Ontario homes and is considered inadequate for modern electrical demands, especially with electric vehicles, multiple appliances, and central AC. Most Ontario home buyers should expect to upgrade to 100-amp or 200-amp service. The upgrade costs approximately $2,000 to $5,000 through a licensed electrician.",
      },
      {
        question: "What are AFCI breakers and are they required in Ontario?",
        answer: "Arc-Fault Circuit Interrupter (AFCI) breakers detect dangerous electrical arcing - a common cause of house fires - and cut power before ignition. The Ontario Electrical Safety Code requires AFCI protection in bedrooms of new construction and major renovations. Older homes are not required to retrofit, but upgrading to AFCI protection is recommended, especially in older wiring systems.",
      },
      {
        question: "What are GFCI outlets and where are they required in Ontario homes?",
        answer: "Ground-Fault Circuit Interrupter (GFCI) outlets protect against electrical shock in wet locations. The Ontario Electrical Safety Code requires GFCI protection in bathrooms, kitchens (outlets within 1.5m of the sink), garages, outdoors, and unfinished basements. ASADS inspectors test GFCI outlets during every inspection and note missing or non-functional units.",
      },
      {
        question: "What does a double-tapped breaker mean in an inspection report?",
        answer: "A double-tapped breaker means two wires are connected to a single breaker terminal that is only rated for one wire. This creates a fire hazard and is an electrical code violation unless the breaker is specifically rated for double-tapping. It is a common finding in older Ontario panels and should be corrected by a licensed electrician.",
      },
      {
        question: "What is an ungrounded electrical outlet and is it safe?",
        answer: "Ungrounded outlets have only two slots (no round ground hole) and provide no ground fault protection. They are common in pre-1960s Ontario homes with knob-and-tube wiring. They are not code-compliant in new installations and present safety risks with modern electronics. Options include rewiring with ground, installing GFCI outlets (which protect without ground), or upgrading the wiring.",
      },
      {
        question: "What is a sub-panel and does it need to be inspected?",
        answer: "A sub-panel is a secondary distribution panel fed from the main panel, common in homes with additions, workshops, or finished basements. Yes, inspectors open and examine sub-panels for proper wiring, appropriate breaker sizing, grounding, bonding, and code compliance. Sub-panels with improper wiring are a common finding in DIY renovations.",
      },
      {
        question: "What electrical issues are most common in older Toronto homes?",
        answer: "Common electrical findings in older Toronto homes include: knob-and-tube wiring (pre-1940 homes), 60-amp service (pre-1970 homes), aluminum wiring (1965-1978 homes), Federal Pacific panels, ungrounded outlets, DIY wiring modifications without permits, missing GFCI protection, and improper electrical work in finished basements.",
      },
      {
        question: "Do home inspectors check exterior electrical outlets and lighting?",
        answer: "Yes. Inspectors test exterior outlets for GFCI protection (required by code), check exterior light fixtures for condition and proper mounting, and look for exposed wiring, damaged conduit, or improper installations. Exterior electrical is a common area for code violations, particularly when DIY lighting or outlet additions have been made.",
      },
      {
        question: "Is a permit required for electrical work in Ontario homes?",
        answer: "Yes. All electrical work in Ontario requires an Electrical Safety Authority (ESA) permit and inspection by an ESA-licensed contractor, with some exceptions for minor replacements (like-for-like fixture or device changes). Unpermitted electrical work is flagged in home inspections and can affect insurance, resale, and legal liability. Always request the ESA inspection certificate for completed work.",
      },
    ],
  },
  {
    category: "Plumbing",
    questions: [
      {
        question: "What is KITEC plumbing and why is it a problem?",
        answer: "KITEC is a brand of flexible piping used in Canadian homes from approximately 1995 to 2007, identifiable by its orange (hot) and blue (cold) pipes with brass fittings. The fittings were found to dezincify and fail, potentially causing catastrophic leaks. KITEC was the subject of a class action lawsuit settled in 2011. Many Ontario insurers will not insure homes with KITEC or charge significant premiums.",
      },
      {
        question: "How do I know if my home has KITEC plumbing?",
        answer: "Look for orange and blue flexible piping near the water heater, under sinks, or where water lines enter bathrooms. Fittings may be stamped KITEC, PlumbBetter, IPEX AQUA, WarmRite, AmbioComfort, XPA, or KERR Controls. The orange pipe is used for hot water and the blue for cold. Your ASADS inspector will check for KITEC during every inspection.",
      },
      {
        question: "How much does it cost to replace KITEC plumbing in Toronto?",
        answer: "Replacing KITEC plumbing in a Toronto detached home typically costs $4,000 to $15,000 depending on the size of the home, whether it is a house or condo, and the accessibility of the piping. In condos, individual unit replacement costs $3,000 to $8,000 but building-wide replacement is often more cost-effective and funded through the reserve fund or a special assessment.",
      },
      {
        question: "Can I still sell a home with KITEC plumbing in Ontario?",
        answer: "Yes, but you must disclose it. Known KITEC is a material latent defect that Ontario sellers are legally obligated to disclose. Buyers may factor replacement costs into their offer price or require replacement as a condition of sale. Many Toronto properties sell with KITEC with both parties understanding the situation and adjusting the price accordingly.",
      },
      {
        question: "What is galvanized steel plumbing and when does it need to be replaced?",
        answer: "Galvanized steel pipes were commonly used in Ontario homes until the 1960s. Over time, the zinc coating corrodes from the inside, reducing water flow, causing discolouration and odour, and eventually failing. Galvanized pipes in a home over 50 years old should be evaluated for replacement. Partial galvanized systems (supply from street to house) may also affect water pressure.",
      },
      {
        question: "What is polybutylene plumbing and is it still found in Ontario homes?",
        answer: "Polybutylene (PB) pipe is a grey plastic pipe used in some Canadian homes during the 1980s. Like KITEC, it was found to degrade and fail unexpectedly. While less common than KITEC in Ontario, it is identified during inspections and noted as a concern. If found, testing and evaluation by a licensed plumber is recommended.",
      },
      {
        question: "What is a clay sewer lateral and why is it a concern?",
        answer: "Clay sewer laterals are found in older Toronto neighbourhoods (pre-1960 construction in areas like Riverdale, Leslieville, and The Danforth). Clay pipes are susceptible to root intrusion from street trees, cracking, and joint separation. A sewer scope (camera inspection of the drain line) is strongly recommended for any home with clay sewer laterals and is an add-on service ASADS can arrange.",
      },
      {
        question: "What is a sewer scope inspection and do I need one?",
        answer: "A sewer scope inspection uses a camera on a flexible cable to inspect the interior of the drain line from the home to the municipal connection. It identifies root intrusion, pipe damage, offset joints, and blockages. For any Toronto home built before 1970 or with mature trees near the drain line, a sewer scope is a worthwhile addition to the standard inspection.",
      },
      {
        question: "What is a backwater valve and does my Ontario home need one?",
        answer: "A backwater valve (or backflow prevention valve) prevents sewage from flowing back into your home during heavy rainstorms when the city\'s system is overwhelmed. Many municipalities in the GTA, including Toronto and Mississauga, offer rebate programs for backwater valve installation. Many older Toronto homes lack this protection. Inspectors note its presence or absence.",
      },
      {
        question: "What is the typical lifespan of a water heater in Ontario?",
        answer: "Tank water heaters in Ontario typically last 10 to 15 years. After 10 years, inspectors flag them as approaching end of life. Tankless water heaters last 20+ years with proper maintenance. Rented water heaters are common in Ontario (often through Reliance or other companies) and the rental contract terms transfer to the new owner at closing.",
      },
      {
        question: "What is a rented water heater in Ontario and what do I need to know?",
        answer: "Many Ontario homes have rented water heaters, furnaces, or water softeners. These contracts are typically assumed by the buyer at closing and carry monthly fees and long-term contracts (sometimes 10-15 years) with expensive buyout clauses. ASADS inspectors identify rental equipment and rental company stickers during inspections - review the contract before closing.",
      },
      {
        question: "What is low water pressure in a home inspection and what causes it?",
        answer: "Low water pressure can be caused by partially closed shut-off valves, mineral-clogged older pipes (galvanized or mineral deposits), pressure-reducing valves set too low, shared supply lines, or municipal supply issues. Inspectors test water pressure at fixtures and note significant deficiencies. A licensed plumber should investigate if pressure is substantially below normal.",
      },
      {
        question: "Do home inspectors check for lead pipes in Ontario?",
        answer: "Yes. Inspectors look for lead supply lines, which were used in Ontario homes until approximately 1950 and can also be present as the service line from the street. Lead pipe is silvery-grey and soft (dents with a key). Lead leaches into drinking water and is a health hazard. If lead pipes are suspected, water testing and pipe replacement are recommended.",
      },
      {
        question: "What is a sump pump and does my Ontario home need one?",
        answer: "A sump pump removes water that collects in a sump pit in the basement, preventing flooding. Given Ontario\'s spring snowmelt, heavy rains, and high water tables in many GTA communities, a sump pump is standard equipment in most newer homes and a common retrofit in older ones. Inspectors test the sump pump and note the presence of a battery backup.",
      },
      {
        question: "What does a drain tile system do and how is it inspected?",
        answer: "A drain tile system (also called a weeping tile or perimeter drain) directs groundwater away from the foundation to the sump pit. In older Toronto homes, the original clay weeping tile may be collapsed or blocked. Inspectors look for evidence of active water intrusion and sump pump performance. A functioning drain tile system is essential for a dry basement in Ontario.",
      },
    ],
  },
  {
    category: "Foundation & Structure",
    questions: [
      {
        question: "How serious are foundation cracks in an Ontario home?",
        answer: "Not all foundation cracks are equal. Hairline vertical or diagonal cracks in poured concrete foundations from curing shrinkage are usually cosmetic. Horizontal cracks indicate lateral pressure from soil and are the most serious - they can lead to wall failure. Stair-step cracks in block foundations suggest settlement. Active cracks with moisture or displacement warrant immediate structural engineer evaluation.",
      },
      {
        question: "What is the difference between a poured concrete and a concrete block foundation?",
        answer: "Poured concrete foundations are monolithic and generally stronger than concrete block (CMU) foundations. Block foundations are more common in older Ontario homes and are more susceptible to water infiltration through mortar joints and to bowing under lateral soil pressure. Both types are inspected, but block foundations often require more attention in older GTA homes.",
      },
      {
        question: "What causes a wet basement in Ontario and how serious is it?",
        answer: "Wet basements in Ontario are caused by poor grading (soil sloping toward the house), blocked weeping tile, cracks in the foundation wall, improperly sealed window wells, failed waterproofing, or high water table. The severity ranges from minor seasonal dampness to active flooding. Waterproofing repairs range from $5,000 for exterior crack injection to $20,000+ for full perimeter waterproofing.",
      },
      {
        question: "What is efflorescence on a basement wall?",
        answer: "Efflorescence is the white powdery deposit left on masonry surfaces when water passes through concrete or block walls and evaporates, leaving mineral salts behind. It is not structural damage itself but is evidence of water movement through the wall. Heavy efflorescence indicates significant moisture infiltration and should be investigated for the source.",
      },
      {
        question: "Do I need a structural engineer if the home inspection finds foundation issues?",
        answer: "Yes, if the inspector recommends it. Home inspectors can identify and describe foundation concerns, but structural engineers have the specialized training and tools to assess severity, determine cause, and specify appropriate repairs. Do not skip this step - foundation repairs done without proper engineering assessment can be ineffective or even make things worse.",
      },
      {
        question: "What is a settlement crack and is it serious?",
        answer: "Settlement cracks occur as a home\'s foundation moves slightly as soil compacts over time. Minor settlement is normal, especially in Ontario\'s clay-heavy soils. Cracks that are stable, narrow (under 3mm), and show no displacement are generally cosmetic. Active, widening, or displaced cracks - especially with water infiltration - are more serious and warrant engineering assessment.",
      },
      {
        question: "What causes bowed basement walls in Ontario homes?",
        answer: "Bowed walls are typically caused by lateral pressure from expansive clay soils, hydrostatic pressure (groundwater), or frost heave - all common in Ontario. Clay soils expand when wet and contract when dry, exerting significant force on foundation walls. Bowing is most dangerous in concrete block foundations and typically requires carbon fiber straps, wall anchors, or in severe cases, wall replacement.",
      },
      {
        question: "What is a crawlspace and what are common crawlspace issues?",
        answer: "A crawlspace is a low, unfinished area beneath the first floor, common in Ontario homes from certain eras and regions. Common crawlspace issues include moisture accumulation, inadequate vapour barrier, missing insulation, wood rot, pest activity, and poor ventilation. ASADS inspects accessible crawlspaces as part of the standard inspection.",
      },
      {
        question: "What is underpinning and when is it needed?",
        answer: "Underpinning is the process of extending or strengthening an existing foundation, often to increase basement ceiling height or stabilize a failing foundation. It is a major structural undertaking requiring permits and engineering. If an inspection reveals evidence of prior underpinning without permits, this is a significant concern that warrants investigation.",
      },
      {
        question: "Can floor slopes and uneven floors indicate a structural problem?",
        answer: "Sloping or bouncy floors can indicate structural issues including inadequate beam sizing, missing posts, wood rot, pest damage, or settlement. Inspectors look for floor sag, springiness, and slope, and will recommend structural assessment when concerning. Not all floor unevenness is structural - some in very old Toronto homes is from normal wood settling over a century.",
      },
      {
        question: "What is a kneewall and what are common issues with kneewalls?",
        answer: "Kneewalls are short walls in finished attic or upper floor spaces beneath the roof slope. Common issues include missing insulation in the kneewall cavity, missing air barriers, inadequate bracing, and pest access points. In Ontario\'s climate, improperly insulated kneewalls are a major source of heat loss in homes with finished upper floors.",
      },
      {
        question: "What are common structural issues in Toronto row houses and semis?",
        answer: "Toronto row houses and semi-detached homes often share party walls and have unique structural issues including differential settlement relative to the adjacent unit, shared chimney problems, close proximity issues with drainage, and interconnected drainage systems. ASADS inspectors have extensive experience with Toronto\'s wide range of housing stock.",
      },
      {
        question: "What is a lally column (Lally post) and does it matter in an inspection?",
        answer: "A lally column (or lally post) is a steel column used to support beams in the basement. Inspectors check lally columns for rust, plumb (vertical alignment), proper bearing plates at top and bottom, and signs of movement. A rusted or improperly placed lally column under a main beam is a structural concern that should be evaluated by an engineer.",
      },
      {
        question: "What is a load-bearing wall and why does it matter?",
        answer: "A load-bearing wall supports the weight of the structure above it. Removing a load-bearing wall without proper engineering can cause structural failure. Inspectors identify evidence of improper wall removal or modification (sagging ceilings, cracked finishes, bouncy floors) and note where structural assessment is needed. Any wall removal requires a building permit in Ontario.",
      },
      {
        question: "What is the difference between a full basement and a partial basement in Ontario?",
        answer: "A full basement extends under the entire footprint of the home while a partial basement may exist under only part of the home, with a crawlspace under the remainder. Partial basements are common in older Ontario homes and additions. The transition area between the basement and crawlspace often shows increased moisture and accessibility challenges during inspection.",
      },
    ],
  },
  {
    category: "Roofing",
    questions: [
      {
        question: "How do home inspectors assess the roof condition?",
        answer: "Inspectors visually examine the roofing material, flashings, ridge, soffits, fascia, gutters, and downspouts. Where safe and accessible, the inspector may walk the roof. In Ontario winters or on steep or wet roofs, inspection is conducted from ground level with binoculars and from inside the attic. The estimated remaining life of the roofing material is typically included in the report.",
      },
      {
        question: "How long does an asphalt shingle roof last in Ontario?",
        answer: "Standard 3-tab asphalt shingles last approximately 15 to 20 years in Ontario\'s climate. Architectural (dimensional) shingles last 25 to 30 years. Harsh Ontario winters with ice and snow, combined with summer heat, accelerate shingle degradation. An aging roof noted in the inspection report is an opportunity to negotiate a price reduction or roof replacement credit.",
      },
      {
        question: "What is ice damming and how is it detected?",
        answer: "Ice damming occurs when heat escapes through the roof and melts snow, which then refreezes at the cold eaves. This forces water up under shingles, causing interior leaks and damage. Signs include staining at eaves, damaged drip edge, or interior water stains at exterior walls. Ice damming is usually caused by inadequate attic insulation and ventilation.",
      },
      {
        question: "What is roof flashing and why is it important?",
        answer: "Roof flashings are metal strips that seal transitions between the roof and other elements - chimneys, skylights, plumbing vents, valleys, and walls. Failed, improperly installed, or missing flashings are among the most common causes of roof leaks in Ontario homes. Inspectors closely examine all flashings and note any that are lifted, corroded, or improperly sealed.",
      },
      {
        question: "What is the lifespan of a flat roof in Ontario?",
        answer: "Flat roofs on Toronto houses and low-rise buildings typically use EPDM rubber, TPO, modified bitumen, or built-up roofing. Service life varies: EPDM lasts 15 to 25 years, TPO 15 to 20 years, and modified bitumen 10 to 20 years. Flat roofs require more frequent inspection and maintenance than sloped roofs due to ponding water and Ontario\'s freeze-thaw cycles.",
      },
      {
        question: "What are gutters and downspouts and why do they matter?",
        answer: "Gutters and downspouts direct rainwater and snowmelt away from the foundation. Blocked, damaged, or improperly pitched gutters allow water to overflow and saturate the soil at the foundation - a leading cause of wet basements in Ontario. Inspectors note the condition and adequacy of the gutter system and whether downspouts discharge sufficiently away from the house.",
      },
      {
        question: "What is a chimney inspection and does my home inspector check the chimney?",
        answer: "Home inspectors visually examine the exterior chimney - masonry condition, flashing, crown, and cap - and the firebox and damper from inside. They do not perform interior flue inspections, which require a camera. For homes with fireplaces or wood stoves, a WETT inspection and Level 2 chimney inspection are recommended to ensure safe operation.",
      },
      {
        question: "What is a roof boot (pipe boot or stack flashing) and why does it fail?",
        answer: "A roof boot is the rubber or metal flashing around plumbing vent pipes that penetrate the roof. Rubber boots crack and harden with UV exposure, typically failing within 10-15 years. Failed roof boots are a very common and often overlooked source of water infiltration. Replacement costs under $200 per boot and is an easy repair for a roofer.",
      },
      {
        question: "How many layers of shingles can be on a roof?",
        answer: "Ontario Building Code allows a maximum of two layers of asphalt shingles on a roof. A second layer adds weight and heat to the underlying shingles, reducing their lifespan. A roof with two layers of shingles will require a full tear-off (removing both layers) at the next replacement, adding to the cost. Inspectors note the number of shingle layers present.",
      },
      {
        question: "What is a mansard roof and what are its specific inspection concerns?",
        answer: "A mansard roof has two slopes on all four sides, with the lower slope nearly vertical and often covered with shingles or metal panels. Common in older Victorian-era Toronto homes, mansard roofs have flashing and drainage challenges and are prone to ice damming at the nearly vertical surface. Inspectors pay particular attention to the transition between the two slopes.",
      },
    ],
  },
  {
    category: "HVAC & Mechanical",
    questions: [
      {
        question: "What HVAC systems does a home inspector check?",
        answer: "Home inspectors check the furnace or boiler (age, condition, operation, visible heat exchanger, exhaust flue), central air conditioning (operation when temperature permits, refrigerant lines, condensate), ductwork, air filters, thermostats, HRV/ERV if present, exhaust fans, and gas piping. Inspectors operate these systems through normal controls but do not perform HVAC servicing.",
      },
      {
        question: "How old is too old for a furnace in Ontario?",
        answer: "Furnaces in Ontario typically last 20 to 25 years for gas forced-air units and 25 to 30 years for boilers. After 20 years, furnaces are noted as at or near end of service life. Efficiency also declines with age - older furnaces may be 60% AFUE efficient versus 95%+ for modern units. Budget $3,500 to $7,000 for a new gas furnace installation.",
      },
      {
        question: "What is a cracked heat exchanger and is it dangerous?",
        answer: "The heat exchanger is the component inside the furnace that separates combustion gases from the air distributed through your home. A cracked heat exchanger can allow carbon monoxide to enter the living space, which is a serious safety hazard. Visual inspection of the heat exchanger is limited - further evaluation by an HVAC technician is recommended if a crack is suspected.",
      },
      {
        question: "What is an HRV and does my Ontario home need one?",
        answer: "A Heat Recovery Ventilator (HRV) exchanges stale indoor air with fresh outdoor air while recovering heat. Ontario Building Code requires HRVs in all new homes. Older homes built before this requirement may lack adequate ventilation, leading to moisture buildup, condensation, and indoor air quality issues. Adding an HRV to an older home improves comfort and reduces mold risk.",
      },
      {
        question: "What does a home inspector look for in the air conditioning unit?",
        answer: "Inspectors check the AC condenser unit condition and age, refrigerant lines (insulation, oil stains indicating leaks), condensate drain, air handler/evaporator coil condition, and operation (when outdoor temperature permits). They also check that the disconnect is within sight of the unit and that electrical connections are proper. Most AC units have a service life of 15 to 20 years.",
      },
      {
        question: "What is a boiler and what are common boiler inspection issues?",
        answer: "A boiler heats water for radiators or radiant floor heating, common in older Toronto homes in Rosedale, Forest Hill, and similar neighbourhoods. Common boiler issues include: aging and corrosion, improper pressure, failed expansion tank, missing pressure relief valve or improper discharge, leaking radiator valves, and improper combustion venting. Boiler lifespan is 25 to 40 years.",
      },
      {
        question: "What is a gas line inspection and what do inspectors look for?",
        answer: "Inspectors visually examine visible gas supply lines (typically black iron or corrugated stainless steel - CSST) for proper support, condition, and connection to appliances. They may use a gas sniffer to check for leaks at connections. CSST gas lines require proper bonding to protect against lightning-induced perforation. Inspectors flag improper installations for licensed gas technician review.",
      },
      {
        question: "What is a bathroom exhaust fan and is it important?",
        answer: "Bathroom exhaust fans remove moisture and odours from bathrooms, preventing mold growth on walls and ceilings. Inspectors check that exhaust fans are present, operational, and duct to the exterior (not into the attic, which is a common improper installation in Ontario homes). Inadequate bathroom ventilation is one of the most common contributors to mold growth in Ontario homes.",
      },
      {
        question: "What are common heating system issues in older Ontario homes?",
        answer: "Older Ontario homes may have: oil-to-gas conversion history with abandoned oil tanks (underground oil tanks are a significant environmental and financial liability), aging cast iron radiators with leaking valves, lack of zoned heating, non-programmable thermostats, deteriorated ductwork, and furnaces that pre-date modern efficiency standards. An aging heating system is always a budget consideration.",
      },
      {
        question: "What is an abandoned underground oil tank and what are the risks?",
        answer: "Many older Ontario homes were originally heated by oil, and some have abandoned underground storage tanks (USTs) that were never properly decommissioned. An abandoned UST may have leaked, causing soil contamination that is extremely expensive to remediate ($50,000 to $200,000+). ASADS inspectors look for evidence of former oil heating (fill pipes, vent pipes) and recommend environmental assessment if suspected.",
      },
    ],
  },
  {
    category: "Mold & Moisture",
    questions: [
      {
        question: "What is mold and why is it a concern in Ontario homes?",
        answer: "Mold is a fungus that grows in moist environments and can damage building materials and affect indoor air quality. In Ontario, mold growth is accelerated by our humid summers and the moisture challenges of basements and attics. Some mold species produce mycotoxins that can cause respiratory issues, allergic reactions, and illness, particularly in people with compromised immune systems.",
      },
      {
        question: "Does a standard home inspection check for mold?",
        answer: "Standard home inspectors look for visible mold growth and conditions conducive to mold - water stains, musty odours, elevated moisture, poor ventilation - and note these in the report. Confirmation of mold type and extent requires air or surface sampling and laboratory analysis, which is a separate mold inspection service that ASADS provides.",
      },
      {
        question: "What is a mold inspection and what does it involve?",
        answer: "A mold inspection typically involves a visual assessment of the entire property for visible mold and moisture, moisture readings at suspect areas, and collection of air samples or surface swabs for laboratory analysis. Results are compared to outdoor control samples to determine whether indoor mold levels are elevated. ASADS provides full mold inspection and air quality testing services.",
      },
      {
        question: "How much does mold remediation cost in Toronto?",
        answer: "Mold remediation costs in Toronto range widely: $500 to $3,000 for minor, surface mold in a contained area; $3,000 to $10,000 for moderate mold in a basement or bathroom; and $10,000 to $30,000+ for extensive mold requiring structural material removal and encapsulation. Costs depend on the type, extent, and location of mold growth.",
      },
      {
        question: "What causes mold in Ontario basements?",
        answer: "Mold in Ontario basements is primarily caused by water infiltration through the foundation or floor, condensation from humid air meeting cold surfaces, inadequate ventilation, plumbing leaks, and flooding. Ontario\'s climate - with cold winters and humid summers - makes basements particularly susceptible. A properly waterproofed and ventilated basement significantly reduces mold risk.",
      },
      {
        question: "What causes mold in Ontario attics?",
        answer: "Attic mold in Ontario is almost always caused by inadequate ventilation combined with warm, moist air rising from the living space into the attic through bypasses (ceiling penetrations, attic hatch gaps). Bathroom fans ducted into the attic instead of the exterior are a common culprit. Attic mold is often not visible from the living space and is discovered during the attic portion of the inspection.",
      },
      {
        question: "What is black mold and is it always dangerous?",
        answer: "Black mold (Stachybotrys chartarum) is one of many mold species that appear black or dark green. The term is often used loosely - many dark-coloured molds are not Stachybotrys. True Stachybotrys produces mycotoxins and requires a damp cellulosic material (drywall, wood) to grow. Any significant mold growth warrants remediation regardless of species - only lab testing can identify the specific type.",
      },
      {
        question: "How do I know if there is hidden mold behind walls?",
        answer: "Signs of hidden mold include musty odours without visible mold, recurring respiratory symptoms in occupants, past water damage or flooding, staining on finished surfaces, and peeling paint or wallboard damage. Thermal imaging can sometimes reveal moisture behind walls. Air quality sampling can detect mold spores even when mold is not visible. ASADS offers thermal imaging and air quality testing.",
      },
      {
        question: "Is mold common in Toronto condos?",
        answer: "Yes. Mold in Toronto condos is most often found around windows (condensation from insufficient glazing performance), in bathrooms with inadequate exhaust fans, in laundry closets, and around exterior walls in units with low interior temperatures. Fan coil unit condensate trays that are not regularly cleaned are also a common source of microbial growth in condo HVAC systems.",
      },
      {
        question: "What should I do if my home inspection report mentions mold?",
        answer: "Do not panic but do not ignore it. Have a qualified mold inspector assess the scope and type of mold before closing. Depending on the findings, you can request the seller remediate before closing, negotiate a price reduction, or request a holdback from the purchase price to fund remediation. ASADS can conduct a follow-up mold assessment and connect you with certified remediators.",
      },
      {
        question: "Can mold affect a real estate transaction in Ontario?",
        answer: "Yes significantly. Known mold is a latent defect that must be disclosed under Ontario real estate law. If mold is discovered during inspection, it provides grounds for renegotiation under an inspection condition. Widespread mold may affect mortgage approval and insurability. Buyers should always investigate mold findings thoroughly before closing.",
      },
      {
        question: "What is moisture mapping and does ASADS offer it?",
        answer: "Moisture mapping uses a moisture meter to systematically measure moisture levels in walls, floors, and ceilings throughout a property, creating a picture of where elevated moisture is present. Combined with thermal imaging, it can identify concealed leaks and moisture pathways before mold develops. ASADS includes moisture assessment as part of every inspection.",
      },
      {
        question: "What is the Ontario guideline for acceptable indoor mold levels?",
        answer: "Ontario does not have specific regulatory thresholds for indoor mold levels analogous to radon. Health Canada guidelines state that any visible mold growth indoors should be investigated and remediated. Air quality results are typically compared to outdoor (control) sample levels - indoor mold counts significantly higher than outdoor counts indicate an indoor mold problem.",
      },
      {
        question: "How can I prevent mold in my Ontario home?",
        answer: "Prevent mold by: controlling indoor humidity (35-50% RH), ensuring all exhaust fans duct to the exterior, fixing water leaks promptly, maintaining proper grading and drainage around the foundation, keeping the sump pump operational, using an HRV or dehumidifier in basements, and ensuring adequate attic ventilation. Regular inspections help catch moisture problems early.",
      },
      {
        question: "Does mold testing require a lab analysis?",
        answer: "Reliable mold testing requires laboratory analysis of air or surface samples. Visual inspection alone cannot identify mold species or quantify spore counts. Lab results typically take 5 to 10 business days. ASADS works with accredited environmental laboratories to provide accurate, defensible mold test results.",
      },
    ],
  },
  {
    category: "Radon Testing",
    questions: [
      {
        question: "What is radon gas?",
        answer: "Radon is a naturally occurring radioactive gas produced by the decay of uranium in soil and rock. It is colourless, odourless, and tasteless, and seeps into homes through foundation cracks, construction joints, floor drains, and sumps. Radon is the second leading cause of lung cancer in Canada after cigarette smoking, causing approximately 3,200 deaths per year.",
      },
      {
        question: "Is radon a problem in Ontario?",
        answer: "Yes. While radon levels vary across Ontario, studies by Health Canada have found elevated radon levels in homes throughout the province. Areas with uranium-bearing geology - including parts of the Greater Toronto Area, Simcoe County, and many rural Ontario communities - are associated with higher radon potential. The only way to know your home\'s radon level is to test.",
      },
      {
        question: "What is the safe radon level in Canada?",
        answer: "Health Canada\'s guideline for radon in indoor air is 200 Becquerels per cubic metre (200 Bq/m3). If your home tests above 200 Bq/m3, Health Canada recommends remediation within 2 years. If levels exceed 600 Bq/m3, remediation within 1 year is recommended. The WHO recommends an even lower reference level of 100 Bq/m3.",
      },
      {
        question: "How is radon testing done in a home?",
        answer: "Radon testing uses a passive detector (electret or charcoal canister for short-term, or an alpha track detector for long-term testing) placed in the lowest livable space of the home, typically the basement. Long-term tests (90+ days) are recommended by Health Canada as the most accurate. Short-term tests (48-96 hours) give faster but less representative results.",
      },
      {
        question: "What is the difference between short-term and long-term radon testing?",
        answer: "Short-term radon tests run for 48 to 96 hours and provide quick results but can be significantly affected by weather, ventilation, and seasonal variation. Long-term tests run for 90 days or more (ideally over a heating season) and provide a more accurate annual average radon level. Health Canada recommends long-term testing for the most reliable assessment.",
      },
      {
        question: "When is the best time to do a radon test in Ontario?",
        answer: "The best time to conduct a radon test in Ontario is during the heating season (November through April). In winter, homes are sealed tighter and radon tends to accumulate to higher levels. Testing in summer when windows are open gives artificially low readings. For a real estate transaction, ASADS can arrange a short-term test coordinated with the inspection.",
      },
      {
        question: "Can radon levels be fixed?",
        answer: "Yes. Radon mitigation is effective and relatively affordable. The most common method is sub-slab depressurization (SSD) - a pipe is installed through the foundation slab with a fan that draws radon from beneath the slab and vents it outside before it enters the home. Radon mitigation systems in Ontario typically cost $1,500 to $3,000 installed and reduce radon levels by 80-99%.",
      },
      {
        question: "Is radon testing required when buying a home in Ontario?",
        answer: "Radon testing is not legally required in Ontario real estate transactions, but it is strongly recommended, particularly for homes with basements. ASADS includes radon testing as an add-on to every home inspection. Given that radon is the second leading cause of lung cancer, it is one of the most important health-related tests you can commission.",
      },
      {
        question: "Does a new Ontario home need radon testing?",
        answer: "Yes. While Ontario Building Code since 2016 requires radon-resistant construction features in new homes (rough-in for sub-slab depressurization), this does not guarantee low radon levels - it just makes mitigation easier if needed. A post-move-in radon test (run for at least 90 days) is recommended for all new homes.",
      },
      {
        question: "Does ASADS provide radon testing and how do I add it to my inspection?",
        answer: "Yes. ASADS provides both short-term and long-term radon testing. Short-term tests can be deployed during the home inspection and provide results within 5-7 business days. Long-term test kits can be left in the home for 90 days post-possession. Call (647) 801-9311 or mention radon testing when booking to add it to your inspection.",
      },
    ],
  },
  {
    category: "Asbestos Testing",
    questions: [
      {
        question: "What is asbestos and where is it found in Ontario homes?",
        answer: "Asbestos is a naturally occurring fibrous silicate mineral that was widely used in building materials for its insulating and fire-resistant properties. In Ontario homes built before 1990, asbestos may be found in: pipe insulation (grey or white wrapping), floor tiles and adhesive (vinyl floor tiles, linoleum), ceiling tiles and textured (stipple) ceilings, drywall joint compound, vermiculite attic insulation, roofing materials, and siding.",
      },
      {
        question: "How dangerous is asbestos in a home?",
        answer: "Asbestos that is in good condition and undisturbed (called friable or non-friable asbestos in situ) poses minimal risk. Asbestos becomes dangerous when it is disturbed, cut, drilled, or deteriorated - releasing microscopic fibres into the air that can be inhaled and lodge in the lungs. Asbestos exposure is linked to mesothelioma, asbestosis, and lung cancer.",
      },
      {
        question: "Is asbestos testing required before renovations in Ontario?",
        answer: "Yes. Ontario Regulation 278/05 under the Occupational Health and Safety Act requires that any designated substance survey (including asbestos) be conducted before demolition or renovation of any building built before 1980. Homeowners doing DIY renovations are strongly advised to test for asbestos before any disturbance of suspect materials.",
      },
      {
        question: "Does my Ontario home have asbestos?",
        answer: "If your home was built before 1985, there is a reasonable chance it contains some asbestos-containing materials (ACMs). The probability is higher for homes built before 1975. The most common locations are pipe insulation, floor tiles, and ceiling finishes. Only laboratory analysis of a physical sample can confirm or rule out asbestos content.",
      },
      {
        question: "How is asbestos testing done?",
        answer: "Asbestos testing involves collecting a small bulk sample of the suspect material (a chip of floor tile, a snippet of pipe insulation, etc.) and sending it to an accredited environmental laboratory for analysis using polarized light microscopy (PLM) or transmission electron microscopy (TEM). ASADS can arrange asbestos bulk sampling under proper protocols.",
      },
      {
        question: "What does friable asbestos mean?",
        answer: "Friable asbestos is material that can be crumbled, pulverized, or reduced to powder by hand pressure when dry - meaning it can release fibres into the air readily. Non-friable asbestos is bound in a solid matrix (like floor tiles) and does not release fibres unless cut or broken. O.Reg 278/05 in Ontario provides specific requirements for handling both types.",
      },
      {
        question: "Should I remove asbestos from my home?",
        answer: "Not necessarily. If asbestos-containing materials are in good condition and will not be disturbed, encapsulation or management in place is often recommended over removal. Removal disturbs the material and can release fibres if not done properly. If materials are deteriorating, in an area of frequent disturbance, or renovation is planned, professional removal by a licensed Ontario abatement contractor is required.",
      },
      {
        question: "What is vermiculite insulation and does it contain asbestos?",
        answer: "Vermiculite is a natural mineral used as attic insulation, sold under the brand name Zonolite among others. Vermiculite mined from Libby, Montana (the dominant source until 1990) was contaminated with tremolite asbestos. If your home has vermiculite attic insulation, do not disturb it. Have it tested by an accredited lab and consult an asbestos abatement professional.",
      },
      {
        question: "How much does asbestos abatement cost in Ontario?",
        answer: "Asbestos abatement costs in Ontario vary by scope: floor tile removal in one room may cost $1,500 to $5,000; pipe insulation removal $500 to $3,000 per section; and full attic vermiculite removal $5,000 to $20,000. Full building asbestos abatement before major renovation can cost $10,000 to $50,000+. Always obtain quotes from licensed Ontario abatement contractors.",
      },
      {
        question: "Can ASADS identify asbestos during a home inspection?",
        answer: "ASADS inspectors identify materials that are suspect for asbestos based on their age, location, and appearance, and note these in the report with recommendations for laboratory testing. Visual identification alone cannot confirm asbestos - only lab analysis can. Where sampling is warranted, ASADS can coordinate bulk sample collection under O.Reg 278/05 requirements.",
      },
    ],
  },
  {
    category: "WETT Inspection",
    questions: [
      {
        question: "What is a WETT inspection?",
        answer: "WETT (Wood Energy Technology Transfer) is a national non-profit organization that provides training and certification for professionals who inspect solid-fuel burning appliances including fireplaces, wood stoves, pellet stoves, and their chimney systems. A WETT inspection ensures the appliance and installation meet CSA safety standards and is often required by Ontario insurance companies.",
      },
      {
        question: "When do I need a WETT inspection in Ontario?",
        answer: "In Ontario, a WETT inspection is typically required by your home insurer when you have a wood-burning appliance in a home you are buying or refinancing. It may also be required by mortgage lenders, when installing a new solid-fuel appliance, or after a chimney fire. Some real estate transactions in rural Ontario and cottage country require WETT inspection as a condition of sale.",
      },
      {
        question: "What does a WETT inspection include?",
        answer: "A WETT inspection assesses: the solid-fuel appliance (firebox condition, door, ash pit, damper), the chimney system (liner, crown, cap, masonry or metal exterior), clearances to combustibles, hearth pad dimensions and materials, air supply adequacy, and any visible signs of creosote, damage, or improper installation. The inspector issues a WETT report accepted by most Ontario insurers.",
      },
      {
        question: "What levels of WETT inspection are there?",
        answer: "WETT inspections are conducted at three levels: Level 1 is a visual inspection of accessible components without tools; Level 2 includes Level 1 plus inspection of accessible concealed areas (often including a chimney camera); Level 3 includes destructive examination for areas not otherwise accessible. Most insurance and real estate requirements are satisfied by a Level 1 or Level 2 inspection.",
      },
      {
        question: "Does ASADS offer WETT inspections?",
        answer: "Yes. ASADS has WETT-certified inspectors who can perform Level 1 and Level 2 WETT inspections for insurance, real estate transactions, and general safety assessments. WETT inspections can be combined with your standard home inspection for efficiency. Call (647) 801-9311 to book a WETT inspection.",
      },
      {
        question: "How much does a WETT inspection cost in Ontario?",
        answer: "A WETT Level 1 inspection in Ontario typically costs $200 to $350. A Level 2 inspection with chimney camera can cost $300 to $500. When bundled with a home inspection through ASADS, discounted add-on pricing applies. Call (647) 801-9311 for current pricing and to add a WETT inspection to your booking.",
      },
      {
        question: "Can a home with a wood stove be insured in Ontario without a WETT inspection?",
        answer: "Most Ontario home insurers will not provide coverage for homes with wood-burning appliances without a current WETT inspection certificate. Failure to disclose a wood stove or fireplace to your insurer may void your coverage. Always get a WETT inspection when buying a home with any solid-fuel appliance.",
      },
      {
        question: "What is creosote and is it dangerous?",
        answer: "Creosote is a byproduct of incomplete wood combustion that accumulates on the inside of chimney liners. It ranges from a dusty deposit (Stage 1) to a hard, tar-like coating (Stage 3). Heavy creosote accumulation is a significant fire hazard - it can ignite and cause a chimney fire. Regular chimney cleaning by a WETT-certified sweep prevents dangerous creosote buildup.",
      },
      {
        question: "What is a chimney liner and why is it important?",
        answer: "A chimney liner (flue liner) is a conduit inside the chimney that contains the products of combustion and protects the surrounding masonry from heat and gases. Ontario homes with older chimneys may have damaged terracotta tile liners or unlined chimneys. Damaged or missing liners are a fire and carbon monoxide hazard. A stainless steel liner can be installed as an upgrade.",
      },
      {
        question: "Can a wood stove be installed anywhere in an Ontario home?",
        answer: "No. Wood stoves must be installed according to the manufacturer\'s instructions and CSA B365 standards, with proper clearances to combustible walls, floors, and ceilings, and an adequate non-combustible hearth pad. They must connect to a properly sized, listed chimney. Permits are required in Ontario for new wood stove installations, and WETT inspection certifies compliance.",
      },
    ],
  },
  {
    category: "Environmental Testing",
    questions: [
      {
        question: "What environmental tests should I consider when buying a home in Ontario?",
        answer: "For a comprehensive environmental assessment when buying an Ontario home, consider: radon testing (all homes with basements), asbestos assessment (pre-1985 homes), lead paint testing (pre-1960 homes), well water testing (rural properties with private wells), underground oil tank investigation (older homes formerly heated by oil), and soil/groundwater assessment if the property has former industrial or commercial uses.",
      },
      {
        question: "What is thermal imaging and how does it help in a home inspection?",
        answer: "Thermal imaging (infrared inspection) uses a camera that detects heat differences to reveal moisture intrusion behind walls, missing or inadequate insulation, electrical hotspots, HVAC air leaks, and hidden pest activity. It is a non-invasive way to see what\'s behind finished surfaces. ASADS offers thermal imaging as an add-on to every home inspection.",
      },
      {
        question: "What is an indoor air quality test?",
        answer: "Indoor air quality (IAQ) testing assesses the air in your home for pollutants including mold spores, volatile organic compounds (VOCs), carbon monoxide, carbon dioxide, particulates, and allergens. Poor IAQ can cause headaches, respiratory issues, fatigue, and long-term health effects. ASADS provides IAQ testing as part of comprehensive environmental assessments.",
      },
      {
        question: "What is a Phase 1 Environmental Site Assessment?",
        answer: "A Phase 1 ESA is a professional review of a property\'s environmental history conducted by a qualified environmental professional. It reviews historical records, aerial photos, and site conditions to identify actual or potential contamination from previous uses. It is typically required for commercial purchases and recommended for any residential property with former industrial, agricultural, or commercial use.",
      },
      {
        question: "What is an underground storage tank (UST) and how do I know if my property has one?",
        answer: "Underground storage tanks were used to store heating oil and are found beneath older Ontario properties that were formerly heated by oil. Signs include: an unused fill pipe or vent pipe at the exterior foundation, a former oil-fired furnace, or references in prior listings to an oil-to-gas conversion. An abandoned, leaking UST can cost $50,000 to $200,000 to remediate.",
      },
      {
        question: "What is a lead paint test and when do I need one?",
        answer: "Lead paint was banned in Canada in 1976 but may be present in layers beneath newer paint in homes built before the 1980s. Lead-based paint that is intact poses minimal risk; deteriorating or disturbed lead paint releases lead dust which is highly toxic, especially to children. Testing is done by a certified inspector using an XRF analyzer or swab test kit.",
      },
      {
        question: "What is an energy audit and how is it related to a home inspection?",
        answer: "An energy audit (EnerGuide evaluation) assesses a home\'s energy efficiency - identifying air leaks, inadequate insulation, and inefficient systems. While not the same as a home inspection, some inspectors also perform or refer energy audits. Ontario\'s Greener Homes Grant may provide funding for energy retrofits identified in an EnerGuide audit.",
      },
      {
        question: "What is a water quality test for well water in Ontario?",
        answer: "Properties with private wells in Ontario should have the water tested for bacteria (total coliform, E. coli), nitrates, pH, hardness, and other parameters relevant to the local geology. Ontario\'s Clean Water Act and local public health units provide guidelines. Water testing is separate from the home inspection and is arranged through an accredited laboratory.",
      },
      {
        question: "What is UFFI insulation and is it still a concern?",
        answer: "Urea formaldehyde foam insulation (UFFI) was injected into wall cavities of Canadian homes in the late 1970s and early 1980s. It was banned in Canada in 1980 after concerns about formaldehyde off-gassing. UFFI was officially delisted as a concern after studies showed off-gassing diminishes significantly over time, but it must still be disclosed in real estate transactions under OREA standard forms.",
      },
      {
        question: "Does ASADS offer a full environmental package with the home inspection?",
        answer: "Yes. ASADS offers customized environmental packages combining home inspection with radon testing, mold air sampling, asbestos bulk sampling, thermal imaging, and indoor air quality testing. A combined package ensures all potential environmental concerns are addressed in a single coordinated visit. Call (647) 801-9311 to discuss the right package for your property.",
      },
    ],
  },
];

export default function FAQ() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCategories = useMemo(() => {
    const q = search.toLowerCase();
    if (!q && activeCategory === "All") return faqCategories;
    return faqCategories
      .map(cat => ({
        ...cat,
        questions: cat.questions.filter(faq =>
          (activeCategory === "All" || cat.category === activeCategory) &&
          (!q || faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q))
        ),
      }))
      .filter(cat => cat.questions.length > 0);
  }, [search, activeCategory]);

  const totalFiltered = filteredCategories.reduce((sum, c) => sum + c.questions.length, 0);

  // Generate FAQ schema from all categories
  const allFaqs = faqCategories.flatMap(category => category.questions);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": "Home Inspection FAQ",
    "description": "Frequently asked questions about home inspections in the Greater Toronto Area.",
    "url": "https://www.asads.ca/faq",
    "mainEntity": allFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.asads.ca" },
      { "@type": "ListItem", "position": 2, "name": "FAQ", "item": "https://www.asads.ca/faq" }
    ]
  };

  return (
    <Layout>
      <Helmet>
        <title>Home Inspection FAQ | Common Questions Answered | ASADS</title>
        <meta name="description" content="Answers to common Ontario home inspection questions: cost, process, what's included, radon, mold, WETT & more. Call (647) 801-9311 to book." />
        <link rel="canonical" href="https://www.asads.ca/faq" />
        <meta property="og:title" content="Home Inspection FAQ | Common Questions Answered | ASADS" />
        <meta property="og:description" content="Answers to common Ontario home inspection questions: cost, process, what's included, radon, mold, WETT & more. Call (647) 801-9311 to book." />
        <meta property="og:url" content="https://www.asads.ca/faq" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.asads.ca/images/og-default.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Home Inspection FAQ | Common Questions Answered | ASADS" />
        <meta name="twitter:description" content="Answers to common Ontario home inspection questions: cost, process, radon, mold, WETT & more." />
        <meta name="twitter:image" content="https://www.asads.ca/images/og-default.jpg" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      <HeroBookingSection
        badge="100+ Questions Answered · Ontario Home Inspection FAQ"
        title="Home Inspection FAQ: Ontario Questions Answered"
        subtitle="Find answers to common questions about inspections, costs, radon, mold, electrical, HVAC, and more. Can't find what you need? Call us directly."
        priceCards={[
          { label: "Questions", price: "100+" },
          { label: "Categories", price: `${faqCategories.length}` },
          { label: "Pre-Purchase", price: "From $399", href: "/services/pre-purchase" },
          { label: "Same-Day", price: "Digital Report" },
        ]}
        formTitle="Book Your Inspection"
        ctaPrimary={{ text: "Browse Questions Below", href: "#faq-content" }}
        defaultService="Pre-Purchase Home Inspection"
      />

      {/* Search + Category Filter */}
      <section id="faq-content" className="py-6 border-b bg-gray-50 sticky top-0 z-10 shadow-sm">
        <div className="container">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between max-w-5xl mx-auto">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search questions…"
                className="pl-9 h-10 bg-white"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
              <button
                onClick={() => setActiveCategory("All")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors whitespace-nowrap ${activeCategory === "All" ? "bg-primary text-primary-foreground border-primary" : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary"}`}
              >
                All ({faqCategories.reduce((s, c) => s + c.questions.length, 0)})
              </button>
              {faqCategories.map(cat => (
                <button
                  key={cat.category}
                  onClick={() => setActiveCategory(cat.category)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors whitespace-nowrap ${activeCategory === cat.category ? "bg-primary text-primary-foreground border-primary" : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary"}`}
                >
                  {cat.category} ({cat.questions.length})
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {search && (
              <div className="mb-8 flex items-center justify-between">
                <p className="text-muted-foreground text-sm">{totalFiltered} result{totalFiltered !== 1 ? "s" : ""} for "<strong>{search}</strong>"</p>
                <button onClick={() => setSearch("")} className="text-sm text-primary hover:underline">Clear</button>
              </div>
            )}
            {filteredCategories.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <p className="text-lg mb-2">No questions match "{search}"</p>
                <button onClick={() => { setSearch(""); setActiveCategory("All"); }} className="text-primary hover:underline text-sm">Clear filters</button>
              </div>
            )}
            {filteredCategories.map((category, categoryIndex) => (
              <div key={category.category} className="mb-12">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                  {category.category}
                </h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {category.questions.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`${categoryIndex}-${index}`}
                      className="bg-background border rounded-lg px-6"
                    >
                      <AccordionTrigger className="text-left font-semibold hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Still Have Questions */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Still Have Questions?
              </h2>
              <p className="text-lg text-muted-foreground">
                Our team is here to help. Reach out through any of these channels.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <a
                href="tel:+16478019311"
                className="flex flex-col items-center p-6 bg-background rounded-xl border hover:border-primary transition-colors text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Call Us</h3>
                <p className="text-muted-foreground">(647) 801-9311</p>
                <p className="text-sm text-muted-foreground mt-1">7 days a week</p>
              </a>

              <a
                href="mailto:info@asads.ca"
                className="flex flex-col items-center p-6 bg-background rounded-xl border hover:border-primary transition-colors text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Email Us</h3>
                <p className="text-muted-foreground">info@asads.ca</p>
                <p className="text-sm text-muted-foreground mt-1">Response within 24hrs</p>
              </a>

              <Link
                to="/contact"
                className="flex flex-col items-center p-6 bg-background rounded-xl border hover:border-primary transition-colors text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Contact Form</h3>
                <p className="text-muted-foreground">Send a message</p>
                <p className="text-sm text-muted-foreground mt-1">We'll get back to you</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-12 bg-background border-t border-border/50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h3 className="font-heading text-xl font-semibold text-foreground mb-6 text-center">
              Learn More About Our Services
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Link to="/services/pre-purchase" className="p-3 rounded-lg bg-muted/50 border border-border/50 hover:border-primary/50 text-sm text-center hover:bg-primary/5 transition-colors">
                Pre-Purchase Inspection
              </Link>
              <Link to="/services/radon-testing" className="p-3 rounded-lg bg-muted/50 border border-border/50 hover:border-primary/50 text-sm text-center hover:bg-primary/5 transition-colors">
                Radon Testing
              </Link>
              <Link to="/services/mold-inspection" className="p-3 rounded-lg bg-muted/50 border border-border/50 hover:border-primary/50 text-sm text-center hover:bg-primary/5 transition-colors">
                Mold Inspection
              </Link>
              <Link to="/services/thermal-imaging" className="p-3 rounded-lg bg-muted/50 border border-border/50 hover:border-primary/50 text-sm text-center hover:bg-primary/5 transition-colors">
                Thermal Imaging
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm">
              <Link to="/services" className="text-primary hover:underline">All Services</Link>
              <span className="text-border">•</span>
              <Link to="/pricing" className="text-primary hover:underline">Pricing</Link>
              <span className="text-border">•</span>
              <Link to="/locations" className="text-primary hover:underline">Service Areas</Link>
              <span className="text-border">•</span>
              <Link to="/about" className="text-primary hover:underline">About Us</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-800 to-blue-900 text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Book Your Inspection?</h2>
              <p className="text-blue-100 text-lg mb-6 leading-relaxed">
                Get peace of mind with a thorough inspection from our certified professionals.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "OAHI & InterNACHI certified inspectors",
                  "Same-day digital reports with photos",
                  "Available 7 days a week",
                  "Fully insured — Intact · $2M liability",
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 text-blue-100 text-sm">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="tel:6478019311" className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                <Phone className="h-5 w-5" />
                (647) 801-9311
              </a>
            </div>
            <div className="bg-white rounded-2xl p-6 text-gray-900 shadow-2xl">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">Same-Day Availability</span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-1">Book Your Inspection</h3>
              <p className="text-sm text-gray-500 mb-5">Confirmed instantly. We may call if a time adjustment is needed.</p>
              <a href="/booking" className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-lg text-center transition-colors text-sm">
                Open Full Booking Form →
              </a>
              <p className="text-center text-xs text-gray-400 mt-3">
                or call <a href="tel:6478019311" className="text-blue-600 font-semibold">(647) 801-9311</a> — 7 days a week
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
