export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
  content: string;
}

export const blogPostsData: BlogPost[] = [
  {
    id: 1,
    slug: "first-time-home-buyer-inspection-guide",
    title: "First-Time Home Buyer's Complete Inspection Guide",
    metaTitle: "Home Inspection Guide for First-Time Buyers",
    metaDescription: "Everything first-time buyers need to know about home inspections, what's included, and how to prepare for the report.",
    excerpt: "Everything you need to know about home inspections before purchasing your first property in the GTA. Learn what inspectors look for and how to prepare.",
    category: "Buying Tips",
    author: "ASADS Team",
    date: "2024-01-15",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop",
    featured: true,
    content: `
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Why Home Inspections Matter for First-Time Buyers</h2>
      <p class="mb-4">Buying your first home is one of the most significant investments you'll ever make. A professional home inspection is your best defense against unexpected surprises and costly repairs. In Toronto's competitive real estate market, understanding what a home inspection entails can save you thousands of dollars and prevent future headaches.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">What Does a Home Inspector Look For?</h2>
      <p class="mb-4">A comprehensive home inspection covers over 200 points throughout the property. Here are the major areas our inspectors evaluate:</p>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Structural Components</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Foundation integrity and any signs of movement or cracking</li>
        <li>Load-bearing walls and structural supports</li>
        <li>Floor and ceiling condition</li>
        <li>Roof structure and condition</li>
      </ul>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Electrical Systems</h3>
      <p class="mb-4">Older Toronto homes often have outdated electrical systems that may not meet current safety standards. We check the electrical panel capacity, wiring type (aluminum vs. copper), outlet functionality, and GFCI protection in wet areas.</p>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Plumbing</h3>
      <p class="mb-4">From supply lines to drainage, we examine water pressure, pipe materials, water heater condition, and check for any signs of leaks or water damage that could indicate underlying issues.</p>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">HVAC Systems</h3>
      <p class="mb-4">Heating and cooling systems are expensive to replace. We assess the age and condition of furnaces, air conditioners, and ventilation systems to give you an idea of their remaining lifespan.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">How to Prepare for Your Home Inspection</h2>
      <p class="mb-4">As a buyer, there are several things you can do to get the most out of your inspection:</p>
      <ol class="list-decimal pl-6 mb-4 space-y-2">
        <li><strong>Attend the inspection</strong> - We encourage all buyers to be present, especially for the last hour when we walk through our findings.</li>
        <li><strong>Prepare questions</strong> - Write down any concerns you noticed during showings.</li>
        <li><strong>Wear appropriate clothing</strong> - Comfortable shoes and clothes that can get slightly dirty are recommended.</li>
        <li><strong>Plan for 2-4 hours</strong> - A thorough inspection takes time.</li>
      </ol>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Understanding Your Inspection Report</h2>
      <p class="mb-4">After the inspection, you'll receive a detailed report with photos and descriptions of all findings. Issues are typically categorized as:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li><strong>Safety hazards</strong> - Items requiring immediate attention</li>
        <li><strong>Major defects</strong> - Significant issues that may affect your decision or negotiations</li>
        <li><strong>Minor defects</strong> - Normal wear and maintenance items</li>
        <li><strong>Maintenance recommendations</strong> - Suggestions for future upkeep</li>
      </ul>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Using Your Inspection for Negotiations</h2>
      <p class="mb-4">Your inspection report is a valuable negotiating tool. You can request the seller to repair certain items, ask for a price reduction to cover repair costs, or in some cases, walk away from the deal if significant issues are discovered.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Conclusion</h2>
      <p class="mb-4">A home inspection is not just a formality—it's essential protection for one of life's biggest purchases. Don't skip this crucial step, even in a competitive market. The peace of mind and potential savings far outweigh the cost of the inspection.</p>
    `,
  },
  {
    id: 2,
    slug: "common-issues-toronto-homes",
    title: "10 Common Issues Found in Toronto Homes",
    metaTitle: "Common Home Inspection Problems in Toronto",
    metaDescription: "Discover frequent defects found in Toronto homes, from aging knob-and-tube wiring to moisture and foundation concerns.",
    excerpt: "Discover the most frequently found problems during home inspections in Toronto. From foundation cracks to outdated electrical systems.",
    category: "Inspection Insights",
    author: "ASADS Team",
    date: "2024-01-10",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=500&fit=crop",
    featured: false,
    content: `
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Understanding Toronto's Housing Stock</h2>
      <p class="mb-4">Toronto's diverse housing stock, ranging from Victorian-era homes to modern condos, presents unique inspection challenges. After thousands of inspections across the GTA, we've identified the most common issues that buyers should be aware of.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">1. Foundation Problems</h2>
      <p class="mb-4">Many older Toronto homes have stone or block foundations that may show signs of deterioration. Common issues include horizontal cracks from soil pressure, vertical cracks from settling, and water infiltration. While some cracking is normal, significant foundation issues can be costly to repair.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">2. Knob-and-Tube Wiring</h2>
      <p class="mb-4">Homes built before 1950 may still have knob-and-tube electrical wiring. While not inherently dangerous when properly maintained, this outdated system often cannot handle modern electrical demands and may affect your insurance eligibility.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">3. Aging Roofs</h2>
      <p class="mb-4">Asphalt shingle roofs typically last 20-25 years in Toronto's climate. We frequently find roofs at or past their expected lifespan, with issues like curling shingles, missing granules, and improper flashing around vents and chimneys.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">4. Plumbing Issues</h2>
      <p class="mb-4">Older homes may have galvanized steel pipes that corrode from the inside, reducing water pressure and potentially leading to leaks. We also commonly find improperly installed fixtures, slow drains, and outdated water heaters.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">5. Moisture and Water Damage</h2>
      <p class="mb-4">Toronto's wet climate makes moisture management critical. Common findings include basement water infiltration, poor grading directing water toward foundations, and inadequate drainage systems.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">6. HVAC System Age</h2>
      <p class="mb-4">Furnaces typically last 15-20 years, and air conditioners 10-15 years. Many homes have systems approaching or exceeding their expected lifespan, which may require replacement soon after purchase.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">7. Insulation Deficiencies</h2>
      <p class="mb-4">Using thermal imaging, we often discover inadequate attic insulation, missing wall insulation, and air leakage around windows and doors. These issues affect comfort and energy bills.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">8. Window Problems</h2>
      <p class="mb-4">Failed window seals leading to foggy glass, rotting wood frames, and improperly installed replacement windows are common findings. Windows are expensive to replace and affect energy efficiency.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">9. Deck and Exterior Issues</h2>
      <p class="mb-4">Many decks are built without proper permits and may not meet current building codes. Common issues include inadequate structural support, improper ledger board attachment, and rotted wood.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">10. Bathroom Ventilation</h2>
      <p class="mb-4">Improper bathroom ventilation leads to moisture problems, mold growth, and premature deterioration. We often find exhaust fans venting into attics rather than to the exterior, or no exhaust fans at all.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">What This Means for Buyers</h2>
      <p class="mb-4">Finding issues during an inspection doesn't mean you shouldn't buy the home. It means you can make an informed decision, budget for repairs, and negotiate with the seller. Knowledge is power in real estate transactions.</p>
    `,
  },
  {
    id: 3,
    slug: "pre-listing-inspection-benefits",
    title: "Why Sellers Should Get a Pre-Listing Inspection",
    metaTitle: "Pre-Listing Home Inspection Benefits | ASADS Toronto",
    metaDescription: "Learn how a pre-listing inspection can help you sell your home faster and for a better price. Avoid surprises and build buyer confidence.",
    excerpt: "Learn how a pre-listing inspection can help you sell your home faster and for a better price. Avoid surprises and build buyer confidence.",
    category: "Selling Tips",
    author: "ASADS Team",
    date: "2024-01-05",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?w=800&h=500&fit=crop",
    featured: false,
    content: `
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">The Seller's Secret Weapon</h2>
      <p class="mb-4">Most home inspections are ordered by buyers, but savvy sellers are discovering the advantages of getting inspected first. A pre-listing inspection puts you in control of the transaction and can lead to a faster, smoother sale.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Benefits of Pre-Listing Inspections</h2>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">1. No Surprises</h3>
      <p class="mb-4">Discover issues before buyers do. This allows you to address problems on your terms, rather than scrambling to respond to buyer demands during negotiations.</p>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">2. Better Pricing</h3>
      <p class="mb-4">Understanding your home's true condition helps you price it accurately. You can factor known issues into your asking price or complete repairs to justify a higher price.</p>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">3. Faster Sales</h3>
      <p class="mb-4">Providing a recent inspection report to potential buyers demonstrates transparency and can reduce the time between offer acceptance and closing. Some buyers may even waive their own inspection condition.</p>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">4. Stronger Negotiations</h3>
      <p class="mb-4">When issues are known upfront and priced accordingly, buyers have less room to negotiate down based on inspection findings.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">What to Do with Your Report</h2>
      <p class="mb-4">Once you have your pre-listing inspection report, you have several options:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li><strong>Complete repairs</strong> - Fix issues and provide documentation to buyers</li>
        <li><strong>Adjust pricing</strong> - Price your home to reflect its current condition</li>
        <li><strong>Disclose proactively</strong> - Share the report with interested buyers</li>
        <li><strong>Get contractor quotes</strong> - Provide accurate repair cost estimates</li>
      </ul>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Return on Investment</h2>
      <p class="mb-4">A pre-listing inspection costs a few hundred dollars but can save thousands in last-minute price reductions. More importantly, it reduces the risk of deals falling through due to inspection findings, which is particularly valuable in a changing market.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Conclusion</h2>
      <p class="mb-4">In a competitive real estate market, every advantage counts. A pre-listing inspection demonstrates professionalism, builds trust with buyers, and puts you in the driver's seat of your home sale.</p>
    `,
  },
  {
    id: 4,
    slug: "radon-testing-importance",
    title: "Radon Testing: What Every Homeowner Should Know",
    metaTitle: "Radon Testing Guide for Toronto Homeowners | ASADS",
    metaDescription: "Radon is the second leading cause of lung cancer. Learn why radon testing is essential for your family's health and safety in Toronto homes.",
    excerpt: "Radon is the second leading cause of lung cancer. Learn why radon testing is essential for your family's health and safety.",
    category: "Health & Safety",
    author: "ASADS Team",
    date: "2023-12-28",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop",
    featured: false,
    content: `
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">The Invisible Threat in Your Home</h2>
      <p class="mb-4">Radon is a naturally occurring radioactive gas that seeps up from the ground and can accumulate to dangerous levels inside homes. It's colorless, odorless, and tasteless—making testing the only way to know if your home has a radon problem.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Health Risks of Radon Exposure</h2>
      <p class="mb-4">According to Health Canada, radon is the second leading cause of lung cancer after smoking and the leading cause among non-smokers. Long-term exposure to elevated radon levels significantly increases your risk of developing lung cancer.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Radon in the Greater Toronto Area</h2>
      <p class="mb-4">While radon levels vary widely, any home can have elevated radon regardless of age, construction type, or location. Certain areas of the GTA have higher natural radon levels due to soil composition. The only way to know your home's radon level is to test.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Understanding Radon Levels</h2>
      <p class="mb-4">Radon is measured in becquerels per cubic metre (Bq/m³). Health Canada's guideline level is 200 Bq/m³. If your home tests above this level, remediation is recommended. However, even levels below 200 Bq/m³ carry some risk—the lower, the better.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">How Radon Enters Homes</h2>
      <p class="mb-4">Radon enters homes through:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Cracks in foundation floors and walls</li>
        <li>Construction joints</li>
        <li>Gaps around service pipes</li>
        <li>Support posts</li>
        <li>Window casements at or below grade</li>
        <li>Sump pump openings</li>
      </ul>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Testing Options</h2>
      <p class="mb-4">There are two main types of radon tests:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li><strong>Short-term tests (2-7 days)</strong> - Good for real estate transactions and initial screening</li>
        <li><strong>Long-term tests (3+ months)</strong> - Provide a more accurate annual average</li>
      </ul>
      <p class="mb-4">For real estate transactions, we provide short-term testing with continuous electronic monitors that measure hourly readings over the testing period.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Radon Mitigation</h2>
      <p class="mb-4">If elevated radon is found, the good news is that mitigation is effective and relatively affordable. Most homes can be remediated for $2,000-$4,000 through sub-slab depressurization systems that vent radon outside before it enters the home.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">When to Test</h2>
      <p class="mb-4">Health Canada recommends testing every home. Consider testing when buying or selling, after major renovations, or if you've never tested before. Regular testing every few years is also advisable as radon levels can change over time.</p>
    `,
  },
  {
    id: 5,
    slug: "winter-home-maintenance-checklist",
    title: "Winter Home Maintenance Checklist for GTA Homeowners",
    metaTitle: "Winter Home Maintenance Checklist | Ontario Guide",
    metaDescription: "Prepare your home for winter. Prevent freezing pipes, roof leaks, and heating failures with our expert maintenance checklist.",
    excerpt: "Prepare your home for harsh Canadian winters with our comprehensive maintenance checklist. Prevent costly repairs and stay warm.",
    category: "Maintenance",
    author: "ASADS Team",
    date: "2023-12-20",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?w=800&h=500&fit=crop",
    featured: false,
    content: `
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Preparing for Winter in the GTA</h2>
      <p class="mb-4">Toronto winters can be brutal on homes. Taking preventive measures before the cold sets in can save you from expensive emergency repairs and uncomfortable living conditions. Here's your comprehensive winter preparation checklist.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Exterior Preparation</h2>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Roof and Gutters</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Clean gutters and downspouts of leaves and debris</li>
        <li>Check for damaged or missing shingles</li>
        <li>Ensure downspouts direct water away from foundation</li>
        <li>Consider installing gutter guards to prevent ice dams</li>
      </ul>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Windows and Doors</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Check weatherstripping and replace if worn</li>
        <li>Apply caulking around exterior windows and doors</li>
        <li>Install storm windows if available</li>
        <li>Consider window insulation film for older windows</li>
      </ul>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Outdoor Plumbing</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Disconnect and drain garden hoses</li>
        <li>Shut off outdoor water supply and drain lines</li>
        <li>Insulate exterior faucets</li>
        <li>Drain sprinkler systems</li>
      </ul>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Interior Preparation</h2>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Heating System</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Schedule furnace maintenance and inspection</li>
        <li>Replace furnace filter</li>
        <li>Test thermostat operation</li>
        <li>Bleed radiators if you have a hot water heating system</li>
        <li>Ensure vents are unobstructed</li>
      </ul>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Fireplace and Chimney</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Have chimney professionally cleaned</li>
        <li>Inspect damper operation</li>
        <li>Stock up on firewood (stored away from house)</li>
        <li>Test smoke and carbon monoxide detectors</li>
      </ul>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Insulation and Ventilation</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Check attic insulation levels</li>
        <li>Seal gaps around electrical outlets and switch plates</li>
        <li>Insulate pipes in unheated areas</li>
        <li>Ensure attic ventilation is clear</li>
      </ul>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Emergency Preparation</h2>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Stock emergency supplies (flashlights, batteries, water)</li>
        <li>Know how to shut off main water valve</li>
        <li>Have contact information for emergency plumber and electrician</li>
        <li>Keep ice melt and shovels accessible</li>
      </ul>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Conclusion</h2>
      <p class="mb-4">A few hours of preparation now can prevent major headaches during winter. If you're unsure about your home's readiness for winter, consider scheduling a seasonal maintenance inspection.</p>
    `,
  },
  {
    id: 6,
    slug: "thermal-imaging-inspection-benefits",
    title: "How Thermal Imaging Reveals Hidden Home Problems",
    metaTitle: "Thermal Imaging Home Inspection Benefits | ASADS Toronto",
    metaDescription: "Discover how infrared technology can detect issues invisible to the naked eye, from water leaks to insulation gaps in Toronto homes.",
    excerpt: "Discover how infrared technology can detect issues invisible to the naked eye, from water leaks to insulation gaps.",
    category: "Technology",
    author: "ASADS Team",
    date: "2023-12-15",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=500&fit=crop",
    featured: false,
    content: `
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Seeing the Invisible</h2>
      <p class="mb-4">Thermal imaging cameras detect infrared radiation (heat) and convert it into visible images. This technology allows home inspectors to see temperature differences that indicate potential problems hidden behind walls, ceilings, and floors.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">What Thermal Imaging Can Detect</h2>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Moisture and Water Intrusion</h3>
      <p class="mb-4">Wet areas cool differently than dry areas. Thermal imaging can reveal hidden water damage, active leaks, and moisture intrusion that would otherwise go unnoticed until significant damage occurs.</p>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Insulation Deficiencies</h3>
      <p class="mb-4">Missing or inadequate insulation shows up clearly on thermal images as temperature variations in walls and ceilings. This helps identify areas where energy is being wasted and comfort is compromised.</p>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Electrical Hot Spots</h3>
      <p class="mb-4">Overloaded circuits, loose connections, and faulty wiring generate heat. Thermal imaging can identify dangerous electrical conditions before they cause fires.</p>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">HVAC Issues</h3>
      <p class="mb-4">Blocked ducts, air leaks in ductwork, and uneven heating/cooling distribution are easily identified with thermal cameras. This information helps optimize system performance.</p>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Pest Infestations</h3>
      <p class="mb-4">Animal nests and pest activity generate heat that can be detected within wall cavities and attics, even when there's no visible evidence.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Limitations of Thermal Imaging</h2>
      <p class="mb-4">While powerful, thermal imaging has limitations:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>It shows temperature differences, not the actual problem</li>
        <li>Findings require interpretation by trained inspectors</li>
        <li>Some conditions must exist for problems to be visible (temperature differential)</li>
        <li>It cannot see through walls—only surface temperatures</li>
      </ul>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">When to Use Thermal Imaging</h2>
      <p class="mb-4">We include thermal imaging as part of our standard home inspections. It's particularly valuable for:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Older homes with potential insulation issues</li>
        <li>Homes with history of water problems</li>
        <li>Properties with finished basements</li>
        <li>Energy efficiency assessments</li>
        <li>Post-renovation verification</li>
      </ul>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Conclusion</h2>
      <p class="mb-4">Thermal imaging adds significant value to home inspections by revealing problems that would be impossible to detect visually. This technology helps protect buyers from hidden issues and provides valuable information for maintenance and energy improvements.</p>
    `,
  },
  {
    id: 7,
    slug: "understanding-your-home-inspection-report",
    title: "Understanding Your Home Inspection Report: A Complete Guide",
    metaTitle: "How to Read Home Inspection Report | ASADS Toronto",
    metaDescription: "Learn how to read and interpret your home inspection report. Understand the difference between major concerns and minor issues.",
    excerpt: "Learn how to read and interpret your home inspection report. Understand the difference between major concerns and minor issues.",
    category: "Buying Tips",
    author: "ASADS Team",
    date: "2023-12-10",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=800&h=500&fit=crop",
    featured: false,
    content: `
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Your Roadmap to Understanding</h2>
      <p class="mb-4">After your home inspection, you'll receive a comprehensive report documenting the inspector's findings. For first-time buyers especially, this document can seem overwhelming. Here's how to make sense of it all.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Report Structure</h2>
      <p class="mb-4">Most inspection reports are organized by system or area:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Exterior (siding, trim, grading, walkways)</li>
        <li>Roofing (shingles, flashing, gutters)</li>
        <li>Structure (foundation, framing)</li>
        <li>Electrical (panel, wiring, outlets)</li>
        <li>Plumbing (pipes, fixtures, water heater)</li>
        <li>HVAC (furnace, AC, ventilation)</li>
        <li>Interior (walls, ceilings, floors, stairs)</li>
        <li>Insulation and ventilation</li>
        <li>Garage and outbuildings</li>
      </ul>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Understanding Severity Levels</h2>
      <p class="mb-4">Issues in inspection reports are typically categorized by severity:</p>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Safety Hazards</h3>
      <p class="mb-4">These require immediate attention. Examples include exposed wiring, gas leaks, missing handrails on stairs, or carbon monoxide risks. Don't negotiate—these need to be fixed before you move in.</p>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Major Defects</h3>
      <p class="mb-4">Significant issues that are expensive to repair or affect the home's functionality. These include roof replacement, foundation problems, major electrical upgrades, or HVAC replacement. Use these for negotiation.</p>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Minor Defects</h3>
      <p class="mb-4">Items that should be repaired but aren't urgent or expensive. Missing caulking, dripping faucets, or minor grading issues fall into this category. Most buyers address these after purchase.</p>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Maintenance Recommendations</h3>
      <p class="mb-4">Suggestions for ongoing upkeep to prevent future problems. These aren't defects but rather guidance for responsible homeownership.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">What's NOT in the Report</h2>
      <p class="mb-4">Understand the limitations of home inspections:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Cosmetic issues (paint, flooring appearance)</li>
        <li>Areas not accessible (behind walls, buried pipes)</li>
        <li>Code compliance (inspectors note visible code issues but don't do code inspections)</li>
        <li>Pest inspection (separate specialty inspection)</li>
        <li>Environmental testing (radon, mold testing are add-ons)</li>
      </ul>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Using Your Report for Negotiations</h2>
      <p class="mb-4">Focus on significant issues when negotiating. Requesting repairs or credits for every minor item can backfire and frustrate sellers. Prioritize safety hazards and major defects.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">After Purchase</h2>
      <p class="mb-4">Keep your inspection report—it's a valuable document for:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Planning repairs and maintenance</li>
        <li>Understanding your home's systems</li>
        <li>Reference when selling</li>
        <li>Insurance claims documentation</li>
      </ul>
    `,
  },
  {
    id: 8,
    slug: "mold-prevention-tips",
    title: "Mold Prevention: Keep Your Home Safe and Healthy",
    metaTitle: "Mold Prevention Tips for Ontario Homeowners",
    metaDescription: "Learn how to prevent mold growth through moisture control and ventilation. Essential tips for maintaining a healthy Ontario home.",
    excerpt: "Practical tips to prevent mold growth in your home. Learn about moisture control, ventilation, and early warning signs.",
    category: "Health & Safety",
    author: "ASADS Team",
    date: "2023-12-05",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=500&fit=crop",
    featured: false,
    content: `
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Understanding Mold</h2>
      <p class="mb-4">Mold is a natural part of our environment, but when it grows indoors, it can cause health problems and damage your home. The key to mold prevention is moisture control—mold cannot grow without water.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Health Effects of Mold</h2>
      <p class="mb-4">Mold exposure can cause various health effects including:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Allergic reactions (sneezing, runny nose, skin rash)</li>
        <li>Asthma attacks in sensitive individuals</li>
        <li>Respiratory issues</li>
        <li>Eye and throat irritation</li>
      </ul>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Common Causes of Indoor Mold</h2>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Water leaks (roof, plumbing, windows)</li>
        <li>Condensation on cold surfaces</li>
        <li>High humidity</li>
        <li>Flooding or water damage</li>
        <li>Poor ventilation in bathrooms and kitchens</li>
        <li>Wet building materials</li>
      </ul>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Prevention Strategies</h2>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Control Humidity</h3>
      <p class="mb-4">Keep indoor humidity between 30-50%. Use dehumidifiers in damp areas, especially basements. Vent clothes dryers to the outside and use exhaust fans when cooking or showering.</p>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Improve Ventilation</h3>
      <p class="mb-4">Ensure bathrooms and kitchens have working exhaust fans vented to the exterior. Open windows when weather permits. Consider a heat recovery ventilator (HRV) for whole-house ventilation.</p>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Fix Leaks Promptly</h3>
      <p class="mb-4">Address any water intrusion immediately. Dry wet areas within 24-48 hours to prevent mold growth. Don't ignore small leaks—they become big problems.</p>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Maintain Your Home</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Clean gutters regularly</li>
        <li>Ensure proper grading away from foundation</li>
        <li>Check caulking around windows and doors</li>
        <li>Inspect roof regularly</li>
        <li>Monitor basement for moisture</li>
      </ul>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Warning Signs of Mold</h2>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Musty odors</li>
        <li>Visible mold growth (can be various colors)</li>
        <li>Water stains</li>
        <li>Peeling paint or wallpaper</li>
        <li>Warped walls or floors</li>
        <li>Persistent allergy symptoms at home</li>
      </ul>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">When to Call Professionals</h2>
      <p class="mb-4">If you find mold covering more than about 10 square feet, or if mold returns after cleaning, it's time to call in professionals. A mold inspection can identify the source of moisture and the extent of contamination.</p>
    `,
  },
  {
    id: 9,
    slug: "new-construction-inspection-importance",
    title: "New Construction Inspections: Don't Skip This Crucial Step",
    metaTitle: "Why New Construction Inspections Are Essential",
    metaDescription: "New homes have defects too. Learn how professional inspections protect buyers before builder warranty deadlines expire.",
    excerpt: "Why you need a professional inspection even on brand new homes. Learn about builder deficiencies and Tarion warranty coverage.",
    category: "Buying Tips",
    author: "ASADS Team",
    date: "2023-11-28",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=500&fit=crop",
    featured: false,
    content: `
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">The New Home Myth</h2>
      <p class="mb-4">Many buyers assume new homes don't need inspections—they're new, so what could be wrong? Unfortunately, construction deficiencies are common even in brand new homes. Fast-paced construction schedules, subcontractor coordination issues, and varying quality standards mean problems slip through.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Common New Construction Issues</h2>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Improperly installed windows and doors</li>
        <li>Missing insulation</li>
        <li>HVAC system deficiencies</li>
        <li>Grading directing water toward foundation</li>
        <li>Incomplete exterior caulking</li>
        <li>Plumbing leaks and improper connections</li>
        <li>Electrical code violations</li>
        <li>Poor drywall finishing</li>
        <li>Missing weatherstripping</li>
      </ul>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Understanding Tarion Warranty</h2>
      <p class="mb-4">In Ontario, new homes are covered by the Tarion Warranty Corporation. Understanding your warranty is essential:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li><strong>One-Year Warranty</strong> - Covers most defects in workmanship and materials</li>
        <li><strong>Two-Year Warranty</strong> - Covers plumbing, heating, and electrical systems, plus water penetration</li>
        <li><strong>Seven-Year Warranty</strong> - Covers major structural defects</li>
      </ul>
      <p class="mb-4">You have specific timelines to submit warranty claims, so identifying issues early is critical.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Types of New Construction Inspections</h2>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Pre-Delivery Inspection (PDI)</h3>
      <p class="mb-4">This is your walkthrough with the builder before taking possession. Having an inspector present ensures nothing is missed and provides documentation for warranty claims.</p>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">30-Day Tarion Form Inspection</h3>
      <p class="mb-4">Within 30 days of possession, you must submit your first warranty form. An inspection at this time helps identify issues that may not have been apparent during PDI.</p>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Year-End Inspection</h3>
      <p class="mb-4">Before your first-year warranty expires, a comprehensive inspection identifies any remaining deficiencies. This is your last chance for many warranty claims.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">What We Look For</h2>
      <p class="mb-4">Our new construction inspections cover all the same items as a resale inspection, plus:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Comparison to builder specifications</li>
        <li>Tarion-specific requirements</li>
        <li>Documentation for warranty claims</li>
        <li>Items that may worsen over time</li>
      </ul>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Conclusion</h2>
      <p class="mb-4">A professional inspection of your new home is an investment that can save you thousands in repairs that should be covered by your builder's warranty. Don't assume new means perfect.</p>
    `,
  },
  {
    id: 10,
    slug: "condo-inspection-checklist",
    title: "Condo Inspection: What's Included and What to Expect",
    metaTitle: "Condo Inspection Checklist for Ontario Buyers",
    metaDescription: "A practical guide on what to look for when buying a condo, from HVAC systems to common area transitions and unit safety.",
    excerpt: "Condo inspections differ from house inspections. Learn what's covered, the importance of status certificates, and common condo issues.",
    category: "Inspection Insights",
    author: "ASADS Team",
    date: "2023-11-20",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=500&fit=crop",
    featured: false,
    content: `
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Condo vs. House Inspections</h2>
      <p class="mb-4">When you buy a condo, you're buying your individual unit plus a share of the common elements. A condo inspection focuses on your unit and what you'll be responsible for maintaining and repairing.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">What's Included in a Condo Inspection</h2>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Electrical system within the unit</li>
        <li>Plumbing fixtures and visible pipes</li>
        <li>HVAC components (in-unit heating/cooling)</li>
        <li>Kitchen appliances</li>
        <li>Bathroom fixtures and ventilation</li>
        <li>Windows and doors</li>
        <li>Walls, ceilings, and floors</li>
        <li>Balcony or terrace (if applicable)</li>
        <li>Water heater (if in-unit)</li>
      </ul>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">What's NOT Included</h2>
      <p class="mb-4">Common elements are the corporation's responsibility:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Roof</li>
        <li>Exterior walls</li>
        <li>Hallways and lobbies</li>
        <li>Elevator systems</li>
        <li>Parking garage structure</li>
        <li>Main building systems</li>
      </ul>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">The Status Certificate</h2>
      <p class="mb-4">While not part of the inspection, the status certificate is essential when buying a condo. It reveals the building's financial health, reserve fund status, special assessments, and any ongoing issues. Have your lawyer review it carefully.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Common Condo Issues We Find</h2>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Bathroom exhaust fans not working or venting improperly</li>
        <li>HVAC filter maintenance neglected</li>
        <li>Water damage around windows or balcony doors</li>
        <li>Electrical outlets not working</li>
        <li>Plumbing fixture problems</li>
        <li>Appliance issues</li>
        <li>Window seal failures</li>
      </ul>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Why Get a Condo Inspection?</h2>
      <p class="mb-4">Some buyers skip condo inspections, reasoning that the building is the corporation's responsibility. However, you're still buying a property with plumbing, electrical, and appliances that can have problems. Issues within your unit are your responsibility to repair.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Conclusion</h2>
      <p class="mb-4">A condo inspection provides peace of mind and helps you understand exactly what you're buying. Combined with a thorough status certificate review, you'll have the complete picture of your potential new home.</p>
    `,
  },
  {
    id: 11,
    slug: "asbestos-in-older-homes",
    title: "Asbestos in Older Toronto Homes: What You Need to Know",
    metaTitle: "Asbestos in Older Toronto Homes | ASADS",
    metaDescription: "If your home was built before 1990, it may contain asbestos. Learn where it's commonly found and when testing is necessary.",
    excerpt: "If your home was built before 1990, it may contain asbestos. Learn where it's commonly found and when testing is necessary.",
    category: "Health & Safety",
    author: "ASADS Team",
    date: "2023-11-15",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop",
    featured: false,
    content: `
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Understanding Asbestos</h2>
      <p class="mb-4">Asbestos is a naturally occurring mineral that was widely used in building materials until the 1980s due to its fire resistance, strength, and insulating properties. When disturbed, asbestos releases microscopic fibers that can cause serious lung diseases including mesothelioma.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Where Asbestos May Be Found</h2>
      <p class="mb-4">In Toronto homes built before 1990, asbestos may be present in:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Vermiculite attic insulation (Zonolite)</li>
        <li>Pipe and duct insulation</li>
        <li>Vinyl floor tiles and sheet flooring</li>
        <li>Ceiling tiles and textured coatings</li>
        <li>Cement siding (asbestos-cement shingles)</li>
        <li>Roofing materials</li>
        <li>Joint compound and drywall mud</li>
        <li>Boiler and furnace insulation</li>
        <li>Window glazing</li>
      </ul>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">When Is Asbestos Dangerous?</h2>
      <p class="mb-4">Intact asbestos materials in good condition generally pose minimal risk. The danger arises when materials are disturbed, damaged, or deteriorating, releasing fibers into the air. This is why asbestos awareness is critical before renovations.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">When to Test for Asbestos</h2>
      <p class="mb-4">Consider asbestos testing when:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Planning renovations in homes built before 1990</li>
        <li>Buying an older home (pre-purchase testing)</li>
        <li>You notice damaged or deteriorating materials</li>
        <li>Vermiculite insulation is present in attic</li>
        <li>Required for demolition permits</li>
      </ul>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">The Testing Process</h2>
      <p class="mb-4">Asbestos testing involves collecting samples of suspected materials and sending them to an accredited laboratory for analysis. This should only be done by trained professionals to avoid disturbing the materials.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">If Asbestos Is Found</h2>
      <p class="mb-4">Finding asbestos doesn't necessarily mean immediate action is needed:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li><strong>Good condition, undisturbed</strong> - May be left in place with periodic monitoring</li>
        <li><strong>Damaged or planned renovation</strong> - Professional abatement required</li>
        <li><strong>Encapsulation</strong> - May be an option for some materials</li>
      </ul>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Vermiculite Insulation</h2>
      <p class="mb-4">Special note: Much of the vermiculite insulation sold in Canada came from a mine contaminated with asbestos. If your attic has vermiculite insulation, assume it contains asbestos unless tested. Never disturb this material without professional guidance.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Conclusion</h2>
      <p class="mb-4">If you own or are buying an older Toronto home, understanding asbestos risks is important. Testing before renovations protects your health and ensures proper handling of hazardous materials.</p>
    `,
  },
  {
    id: 12,
    slug: "spring-home-maintenance-checklist",
    title: "Spring Home Maintenance Checklist for GTA Homeowners",
    metaTitle: "Spring Home Maintenance Checklist Toronto | ASADS",
    metaDescription: "Essential spring maintenance tasks to protect your home. From roof inspections to HVAC tune-ups, get your Toronto home ready for warmer weather.",
    excerpt: "Essential spring maintenance tasks to protect your home. From roof inspections to HVAC tune-ups, get your home ready for warmer weather.",
    category: "Maintenance",
    author: "ASADS Team",
    date: "2023-11-10",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=500&fit=crop",
    featured: false,
    content: `
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Spring Awakening for Your Home</h2>
      <p class="mb-4">After a long Toronto winter, your home needs attention. Spring maintenance helps repair winter damage, prepare for summer, and catch problems before they worsen.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Exterior Inspection</h2>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Roof</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Check for missing or damaged shingles</li>
        <li>Look for ice dam damage</li>
        <li>Inspect flashing around vents and chimneys</li>
        <li>Clear debris from roof valleys</li>
      </ul>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Gutters and Downspouts</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Clean out leaves and debris</li>
        <li>Check for proper attachment</li>
        <li>Ensure downspouts direct water away from foundation</li>
        <li>Repair any damage from ice</li>
      </ul>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Foundation and Grading</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Inspect foundation for new cracks</li>
        <li>Regrade soil if needed (slope away from house)</li>
        <li>Fill in settled areas near foundation</li>
        <li>Check window wells for debris</li>
      </ul>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">HVAC Maintenance</h2>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Schedule AC maintenance before hot weather</li>
        <li>Replace furnace filter</li>
        <li>Clean dust from vents and returns</li>
        <li>Clear debris from outdoor AC unit</li>
        <li>Test AC operation</li>
      </ul>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Plumbing</h2>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Turn on outdoor water supply</li>
        <li>Check hose bibs for freeze damage</li>
        <li>Inspect visible pipes for leaks</li>
        <li>Test sump pump operation</li>
        <li>Flush water heater</li>
      </ul>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Windows and Doors</h2>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Check caulking and weatherstripping</li>
        <li>Clean windows inside and out</li>
        <li>Replace damaged screens</li>
        <li>Lubricate door hinges and locks</li>
      </ul>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Safety Items</h2>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Test smoke and CO detectors</li>
        <li>Check fire extinguisher expiration</li>
        <li>Review family emergency plan</li>
        <li>Clear dryer vent</li>
      </ul>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Deck and Outdoor Areas</h2>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Inspect deck for loose boards and rot</li>
        <li>Check railings for stability</li>
        <li>Power wash deck and siding</li>
        <li>Apply deck sealant if needed</li>
      </ul>
    `,
  },
  {
    id: 13,
    slug: "wett-inspection-wood-burning",
    title: "WETT Inspections: Essential for Wood-Burning Appliances",
    metaTitle: "WETT Inspection Guide Toronto | ASADS",
    metaDescription: "Planning to buy a home with a fireplace or wood stove? Learn why WETT inspections are crucial for safety and insurance compliance.",
    excerpt: "Planning to buy a home with a fireplace or wood stove? Learn why WETT inspections are crucial for safety and insurance compliance.",
    category: "Inspection Insights",
    author: "ASADS Team",
    date: "2023-11-05",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=800&h=500&fit=crop",
    featured: false,
    content: `
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">What is WETT?</h2>
      <p class="mb-4">WETT stands for Wood Energy Technology Transfer, a non-profit organization that sets standards for safe installation and operation of wood-burning appliances in Canada. A WETT inspection evaluates wood stoves, fireplaces, pellet stoves, and their chimneys for safety compliance.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Why WETT Inspections Matter</h2>
      <p class="mb-4">Improperly installed or maintained wood-burning appliances are a leading cause of house fires. A WETT inspection identifies safety hazards including:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Inadequate clearances to combustibles</li>
        <li>Damaged or deteriorated chimneys</li>
        <li>Improper installation</li>
        <li>Creosote buildup</li>
        <li>Missing or damaged components</li>
      </ul>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Insurance Requirements</h2>
      <p class="mb-4">Many insurance companies require a WETT inspection before they'll provide coverage for homes with wood-burning appliances. Even if not required, passing a WETT inspection can reduce your insurance premiums and provides peace of mind.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Types of WETT Inspections</h2>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Level 1 - Basic Inspection</h3>
      <p class="mb-4">Visual inspection of readily accessible areas. Suitable for regularly used appliances with no known problems.</p>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Level 2 - Detailed Inspection</h3>
      <p class="mb-4">More comprehensive inspection including accessible attic and crawl spaces. Required for real estate transactions or after events that may have damaged the system.</p>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Level 3 - Specialty Inspection</h3>
      <p class="mb-4">Includes removal of components to access hidden areas. Required when Level 2 findings suggest hidden hazards.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Common Issues Found</h2>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Insufficient clearance between stovepipe and combustibles</li>
        <li>Missing or improper floor protection</li>
        <li>Chimney liner damage</li>
        <li>Creosote accumulation</li>
        <li>Improper connections</li>
        <li>Missing rain caps</li>
      </ul>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">When to Get a WETT Inspection</h2>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Before purchasing a home with wood-burning appliances</li>
        <li>When required by your insurance company</li>
        <li>After installing a new wood stove or fireplace insert</li>
        <li>Before selling your home</li>
        <li>If you haven't had one in several years</li>
      </ul>
    `,
  },
  {
    id: 14,
    slug: "negotiating-after-inspection",
    title: "How to Negotiate After a Home Inspection: A Buyer's Guide",
    metaTitle: "Home Inspection Negotiation Tips | ASADS Toronto",
    metaDescription: "Inspection found issues? Learn strategies for negotiating repairs, credits, or price reductions with sellers in Toronto's real estate market.",
    excerpt: "Inspection found issues? Learn strategies for negotiating repairs, credits, or price reductions with sellers.",
    category: "Buying Tips",
    author: "ASADS Team",
    date: "2023-10-28",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=500&fit=crop",
    featured: false,
    content: `
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">The Inspection Is Done—Now What?</h2>
      <p class="mb-4">Your home inspection revealed some issues, which is completely normal. Now comes the important part: deciding what to do with this information and how to approach negotiations with the seller.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Understanding Your Options</h2>
      <p class="mb-4">After an inspection, you typically have several options:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Proceed with the purchase as-is</li>
        <li>Request repairs before closing</li>
        <li>Ask for a price reduction</li>
        <li>Request a credit at closing for repairs</li>
        <li>Walk away from the deal</li>
      </ul>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">What's Worth Negotiating?</h2>
      <p class="mb-4">Focus your negotiations on significant issues:</p>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Always Negotiate</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Safety hazards (electrical, structural, fire)</li>
        <li>Major system failures (HVAC, plumbing, electrical)</li>
        <li>Roof replacement needed</li>
        <li>Foundation problems</li>
        <li>Water damage or active leaks</li>
      </ul>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Usually Skip</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Cosmetic issues</li>
        <li>Normal wear and maintenance items</li>
        <li>Minor code updates (unless safety-related)</li>
        <li>Items you knew about before offering</li>
      </ul>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Negotiation Strategies</h2>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Get Repair Quotes</h3>
      <p class="mb-4">Before negotiating, get actual quotes from licensed contractors. This gives you concrete numbers to work with rather than guesses.</p>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Prioritize Your Requests</h3>
      <p class="mb-4">Long lists of demands can frustrate sellers. Focus on what matters most and present a reasonable, prioritized list.</p>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Consider Credits vs. Repairs</h3>
      <p class="mb-4">Sellers rushing to close may prefer giving credits rather than coordinating repairs. Credits also let you choose your own contractors.</p>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Be Flexible</h3>
      <p class="mb-4">Negotiations work best when both parties feel they got something. Be willing to compromise on less important items.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">What to Avoid</h2>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Demanding repairs on items you saw during showings</li>
        <li>Requesting every minor item be fixed</li>
        <li>Using the inspection to renegotiate based on market changes</li>
        <li>Being unreasonable or aggressive</li>
      </ul>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Know When to Walk Away</h2>
      <p class="mb-4">Sometimes the inspection reveals problems that make the home a bad investment. Major structural issues, environmental contamination, or problems the seller won't address may be deal-breakers. Don't let emotions override good judgment.</p>
    `,
  },
  {
    id: 15,
    slug: "sewer-scope-inspection-guide",
    title: "Sewer Scope Inspections: Why Camera Inspections Save Thousands",
    metaTitle: "Sewer Scope Inspection Guide Toronto | ASADS",
    metaDescription: "Sewer line repairs can cost $10,000+. Learn how a simple camera inspection can reveal hidden problems before you buy in Toronto.",
    excerpt: "Sewer line repairs can cost $10,000+. Learn how a simple camera inspection can reveal hidden problems before you buy.",
    category: "Inspection Insights",
    author: "ASADS Team",
    date: "2023-10-20",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&h=500&fit=crop",
    featured: false,
    content: `
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">The Hidden Pipe Problem</h2>
      <p class="mb-4">The sewer line connecting your home to the municipal sewer is underground and out of sight. Problems in this pipe can go undetected until a catastrophic failure occurs—often after you've already purchased the home.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Why Sewer Lines Fail</h2>
      <p class="mb-4">Several factors can damage sewer lines:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li><strong>Tree roots</strong> - Roots seek moisture and can infiltrate pipe joints</li>
        <li><strong>Age</strong> - Older clay pipes deteriorate over time</li>
        <li><strong>Ground movement</strong> - Settling can cause pipes to crack or separate</li>
        <li><strong>Belly or sag</strong> - Low spots collect debris and cause backups</li>
        <li><strong>Improper materials</strong> - Some older pipes were made of inferior materials</li>
        <li><strong>Blockages</strong> - Grease, debris, or foreign objects</li>
      </ul>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">What a Sewer Scope Reveals</h2>
      <p class="mb-4">A small waterproof camera is inserted into the sewer line, typically through a cleanout access point. The camera records video as it travels through the pipe, revealing:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Root intrusion</li>
        <li>Cracks and breaks</li>
        <li>Joint separation</li>
        <li>Bellied or sagging sections</li>
        <li>Blockages and buildup</li>
        <li>Pipe material and condition</li>
        <li>Connection to municipal sewer</li>
      </ul>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">When to Get a Sewer Scope</h2>
      <p class="mb-4">Consider a sewer scope inspection when:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Buying a home more than 20 years old</li>
        <li>Large trees are present near the sewer line path</li>
        <li>The home has a history of drain problems</li>
        <li>Previous owner used root killer products</li>
        <li>You want complete peace of mind</li>
      </ul>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Repair Costs</h2>
      <p class="mb-4">Sewer line repair or replacement is expensive:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li><strong>Spot repair:</strong> $1,500-$4,000</li>
        <li><strong>Full replacement:</strong> $8,000-$20,000+</li>
        <li><strong>Trenchless replacement:</strong> $6,000-$15,000</li>
      </ul>
      <p class="mb-4">A sewer scope inspection costs a fraction of potential repairs and can save you from an unexpected financial burden.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">What We Provide</h2>
      <p class="mb-4">Our sewer scope inspection includes:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Complete video recording of the inspection</li>
        <li>Written report with findings</li>
        <li>Photos of any problem areas</li>
        <li>Recommendations for repairs if needed</li>
      </ul>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Conclusion</h2>
      <p class="mb-4">A sewer scope is a small investment that can reveal expensive hidden problems. For older homes especially, it's one of the smartest add-on inspections you can get.</p>
    `,
  },
  {
    id: 11,
    slug: "thermal-imaging-benefits",
    title: "How Thermal Imaging Reveals Hidden Home Problems",
    metaTitle: "Thermal Imaging Home Inspection Benefits | ASADS Toronto",
    metaDescription: "Discover how infrared thermal imaging detects hidden moisture, insulation gaps, electrical hotspots, and energy loss that visual inspections miss.",
    excerpt: "Learn how thermal imaging technology helps detect hidden problems like moisture intrusion, insulation deficiencies, and electrical issues before they become costly repairs.",
    category: "Inspection Technology",
    author: "Haroon Choudhry",
    date: "2024-03-15",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=500&fit=crop",
    featured: true,
    content: `
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">What is Thermal Imaging in Home Inspections?</h2>
      <p class="mb-4">Thermal imaging, also known as infrared thermography, uses specialized cameras to detect temperature differences across surfaces in your home. These temperature variations often reveal hidden problems that are invisible to the naked eye, making it an invaluable tool for comprehensive home inspections.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Hidden Problems Thermal Imaging Can Detect</h2>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">1. Moisture Intrusion and Water Damage</h3>
      <p class="mb-4">Water infiltration is one of the most damaging and expensive problems a home can face. Thermal imaging detects moisture by identifying cooler areas where evaporation is occurring. We can find:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Roof leaks before they cause visible damage</li>
        <li>Plumbing leaks hidden behind walls</li>
        <li>Foundation moisture seepage</li>
        <li>Window and door seal failures</li>
      </ul>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">2. Insulation Deficiencies</h3>
      <p class="mb-4">Poor or missing insulation shows up clearly on thermal images as temperature anomalies. In Ontario's climate, proper insulation is critical for energy efficiency and comfort. We commonly find:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Missing insulation in walls and ceilings</li>
        <li>Settling or compressed insulation</li>
        <li>Thermal bridging through studs</li>
        <li>Air infiltration points</li>
      </ul>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">3. Electrical Issues</h3>
      <p class="mb-4">Overloaded circuits, loose connections, and faulty breakers generate excess heat that thermal cameras can detect before they become fire hazards:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Overloaded circuits generating heat</li>
        <li>Loose electrical connections</li>
        <li>Failing breakers in electrical panels</li>
        <li>Overheated wiring behind walls</li>
      </ul>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">4. HVAC System Problems</h3>
      <p class="mb-4">Heating and cooling systems are major investments. Thermal imaging helps identify efficiency problems:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Duct leaks and disconnections</li>
        <li>Blocked or restricted airflow</li>
        <li>Radiant heating system failures</li>
        <li>Heat loss through ductwork</li>
      </ul>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Benefits of Thermal Imaging Inspections</h2>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Non-Invasive Detection</h3>
      <p class="mb-4">Unlike traditional methods that might require cutting into walls or ceilings, thermal imaging is completely non-destructive. We can scan entire rooms in minutes without leaving a mark.</p>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Early Problem Detection</h3>
      <p class="mb-4">Many issues develop slowly over time. Thermal imaging catches problems in their early stages before they cause significant damage or require expensive repairs.</p>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Comprehensive Documentation</h3>
      <p class="mb-4">Every thermal image is documented in your inspection report, providing visual evidence of any concerns and a baseline for future reference.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">When is Thermal Imaging Most Effective?</h2>
      <p class="mb-4">Thermal imaging works best when there is a temperature difference between inside and outside. In Ontario, late fall through early spring provides ideal conditions, though our inspectors can work around various conditions throughout the year.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Add Thermal Imaging to Your Inspection</h2>
      <p class="mb-4">At ASADS Home Inspection, we offer thermal imaging as an add-on service to any of our standard inspections. For new construction homes, we strongly recommend it to verify insulation installation and identify any thermal bypasses before they become long-term energy drains.</p>
      <p class="mb-4">Contact us at (647) 801-9311 to add thermal imaging to your next home inspection.</p>
    `,
  },
  {
    id: 12,
    slug: "what-to-expect-home-inspection",
    title: "What to Expect During Your Home Inspection",
    metaTitle: "What to Expect During a Home Inspection | ASADS Toronto",
    metaDescription: "Learn what happens during a professional home inspection, how long it takes, what is included, and how to prepare for your inspection day.",
    excerpt: "A complete guide to the home inspection process, from scheduling to receiving your report. Know exactly what to expect on inspection day.",
    category: "Buying Tips",
    author: "Haroon Choudhry",
    date: "2024-02-28",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop",
    featured: false,
    content: `
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Before the Inspection: How to Prepare</h2>
      <p class="mb-4">A little preparation goes a long way toward ensuring a thorough and efficient inspection. Here is what you and the seller can do:</p>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">For Buyers</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Schedule 2-3 hours for a typical home inspection</li>
        <li>Wear comfortable clothes and closed-toe shoes</li>
        <li>Prepare questions about the property</li>
        <li>Plan to attend at least the final hour for the walkthrough</li>
      </ul>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">For Sellers (If Applicable)</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Ensure all utilities are on (electricity, gas, water)</li>
        <li>Clear access to the electrical panel, furnace, and water heater</li>
        <li>Unlock any outbuildings, gates, or utility areas</li>
        <li>Replace burned-out light bulbs</li>
        <li>Clear items from around the furnace and water heater</li>
      </ul>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">What Happens During the Inspection</h2>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Exterior Inspection</h3>
      <p class="mb-4">We start outside, examining the property from the ground up:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li><strong>Roof:</strong> Shingles, flashing, chimneys, vents, and gutters</li>
        <li><strong>Siding:</strong> Condition, damage, and proper installation</li>
        <li><strong>Foundation:</strong> Visible cracks, settling, and drainage</li>
        <li><strong>Grading:</strong> Slope away from the house for proper drainage</li>
        <li><strong>Driveways and walkways:</strong> Condition and trip hazards</li>
        <li><strong>Decks and porches:</strong> Structure, railings, and safety</li>
      </ul>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Interior Inspection</h3>
      <p class="mb-4">Inside, we go room by room and system by system:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li><strong>Electrical:</strong> Panel capacity, wiring type, outlets, and safety</li>
        <li><strong>Plumbing:</strong> Water pressure, drainage, water heater, visible pipes</li>
        <li><strong>HVAC:</strong> Furnace, air conditioning, ductwork, filters</li>
        <li><strong>Walls and ceilings:</strong> Cracks, stains, and damage</li>
        <li><strong>Windows and doors:</strong> Operation, seals, and condition</li>
        <li><strong>Kitchen:</strong> Appliances, ventilation, and plumbing</li>
        <li><strong>Bathrooms:</strong> Fixtures, ventilation, and moisture issues</li>
      </ul>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Attic Inspection</h3>
      <p class="mb-4">If accessible, we enter the attic to check:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Insulation type, depth, and condition</li>
        <li>Ventilation adequacy</li>
        <li>Signs of moisture, mold, or pest intrusion</li>
        <li>Roof structure and sheathing condition</li>
      </ul>
      
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Basement or Crawl Space</h3>
      <p class="mb-4">Below grade, we look for:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Foundation cracks and water intrusion</li>
        <li>Structural supports and floor joists</li>
        <li>Moisture, mold, and efflorescence</li>
        <li>Sump pump operation (if present)</li>
      </ul>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">How Long Does a Home Inspection Take?</h2>
      <p class="mb-4">A typical home inspection takes 2-4 hours depending on the size and condition of the property:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li><strong>Condo (under 1,000 sq ft):</strong> 1.5-2 hours</li>
        <li><strong>Average home (1,500-2,500 sq ft):</strong> 2-3 hours</li>
        <li><strong>Large home (3,000+ sq ft):</strong> 3-4 hours</li>
        <li><strong>Older or complex properties:</strong> May take longer</li>
      </ul>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Should You Attend the Inspection?</h2>
      <p class="mb-4">We strongly encourage buyers to attend, at least for the final walkthrough. Being present allows you to:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Ask questions in real-time</li>
        <li>See issues firsthand</li>
        <li>Learn about the home systems and maintenance needs</li>
        <li>Understand the severity and context of findings</li>
      </ul>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">After the Inspection: Your Report</h2>
      <p class="mb-4">At ASADS, we provide same-day digital reports that include:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Summary of major findings</li>
        <li>Detailed descriptions of each issue</li>
        <li>High-resolution photos documenting conditions</li>
        <li>Recommendations for repairs or further evaluation</li>
        <li>Maintenance tips for the new homeowner</li>
      </ul>
      <p class="mb-4">You will receive your report via email, usually within a few hours of the inspection completion.</p>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">What a Home Inspection Does NOT Include</h2>
      <p class="mb-4">It is important to understand the scope of a standard inspection. We do not:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Move furniture or personal belongings</li>
        <li>Perform destructive testing</li>
        <li>Inspect inside walls (unless using thermal imaging)</li>
        <li>Test for radon, mold, or asbestos (available as add-ons)</li>
        <li>Evaluate cosmetic conditions</li>
        <li>Provide repair cost estimates</li>
      </ul>
      
      <h2 class="font-heading text-2xl font-bold mt-8 mb-4">Book Your Inspection Today</h2>
      <p class="mb-4">Ready to get your home inspection scheduled? Contact ASADS Home Inspection at (647) 801-9311 or book online. We serve the entire Greater Toronto Area with same-day reporting and flexible scheduling.</p>
    `,
  },
];

// Helper function to get blog post metadata (for listing pages)
export const getBlogPostsMeta = () => {
  return blogPostsData.map(({ content, ...meta }) => meta);
};