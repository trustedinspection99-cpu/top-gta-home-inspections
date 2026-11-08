/**
 * Extra section for selected service × city pages (2026-11-05, Ahrefs content gap).
 * Only pages under the owner's protection threshold are listed here: the section is added to
 * these pages and no other page changes. Mold and air quality pages link to each other because
 * mold callers often book air quality testing.
 */
export interface CityExtra {
  heading: string;
  paragraphs: string[];
  links: { label: string; href: string }[];
}

const moldExtra = (city: string, citySlug: string): CityExtra => ({
  heading: `Mold Inspection and Mold Testing in ${city}`,
  paragraphs: [
    `A mold inspection in ${city} starts with a visual check and moisture readings, using a thermal camera to find wet areas behind walls and under floors without opening them. Where testing is needed, air samples are taken inside and outside the home and sent to an accredited laboratory, so the indoor spore count can be compared with the outdoor baseline.`,
    `Mold testing is most useful when there is a musty smell with no visible mold, after a leak or basement flood, when someone in the home has symptoms, or before buying a home with signs of past water damage. ASADS inspects and tests only; we do not do mold removal, so the results are independent.`,
  ],
  links: [
    { label: `Air quality testing in ${city}`, href: `/services/air-quality/${citySlug}` },
    { label: "Mold testing vs mold inspection", href: "/blog/mold-testing-vs-mold-inspection" },
    { label: "Mold test kits vs professional testing", href: "/blog/mold-test-kit-vs-professional-mold-testing" },
  ],
});

const airExtra = (city: string, citySlug: string): CityExtra => ({
  heading: `Indoor Air Quality Testing in ${city}`,
  paragraphs: [
    `An indoor air quality test in ${city} measures what is actually in the air you breathe at home: airborne mold spores compared with an outdoor sample, and, where needed, particulates, volatile organic compounds (VOCs), carbon dioxide and humidity. Samples are analysed by an accredited laboratory and explained in a written report.`,
    `Homeowners usually book air quality testing for a lingering musty or chemical smell, after water damage or a renovation, when allergy or breathing symptoms improve away from home, or before moving into a home. If mold is suspected, a mold inspection is often done at the same visit.`,
  ],
  links: [
    { label: `Mold inspection in ${city}`, href: `/services/mold-inspection/${citySlug}` },
    { label: "How to test air quality in your home", href: "/blog/how-to-test-air-quality-in-your-home" },
    { label: "Home indoor air quality in Ontario", href: "/blog/home-indoor-air-quality-ontario" },
  ],
});

const CITIES: Record<string, string> = {
  toronto: "Toronto", hamilton: "Hamilton", vaughan: "Vaughan", oakville: "Oakville", markham: "Markham",
  brampton: "Brampton", burlington: "Burlington", mississauga: "Mississauga",
};
const MOLD = ["toronto", "hamilton", "vaughan", "oakville", "markham", "brampton"];
const AIR = ["hamilton", "burlington", "vaughan", "oakville", "markham", "mississauga"];

const HUB_CITIES: Record<string, string> = { markham: "Markham", milton: "Milton", whitby: "Whitby", ajax: "Ajax", cambridge: "Cambridge" };
const hubExtra = (city: string, citySlug: string, kind: string): CityExtra => ({
  heading: `Home Inspection in ${city}`,
  paragraphs: [
    `This page covers ${kind} in ${city}. For every type of home inspection ASADS offers in ${city}, along with local housing notes, pricing and booking, see the main ${city} home inspection page.`,
  ],
  links: [{ label: `Home inspection in ${city}`, href: `/locations/home-inspection-${citySlug}` }],
});

const manualExtras: Record<string, CityExtra> = {
  "condo/toronto": {
    heading: "Condo Inspection in Toronto: What Is Checked and What It Costs",
    paragraphs: [
      "A Toronto condo inspection covers everything inside your unit: the in-suite heating and cooling (fan coil, heat pump or through-wall unit), plumbing and fixtures, the electrical panel and outlets, appliances, windows and balcony door seals, flooring, and signs of leaks from the unit above or from the building envelope. A thermal camera finds hidden moisture and drafts around windows that cannot be seen in a viewing. Common elements such as the roof, garage and lobby belong to the corporation and are reviewed through the status certificate rather than the inspection.",
      "ASADS condo inspections cost $299 for a studio or one-bedroom, $349 for a two-bedroom, $399 for three bedrooms or more and $449 for a townhouse condo, with a same-day report. Buying a new condo from a builder? Book a PDI inspection before your pre-delivery walk-through instead.",
    ],
    links: [
      { label: "Condo inspection Toronto: buyer's guide", href: "/blog/condo-inspection-toronto-guide" },
      { label: "Home inspection cost in Toronto", href: "/blog/home-inspection-cost-toronto" },
      { label: "PDI inspection in Toronto", href: "/services/pdi-inspection/toronto" },
      { label: "What is a PDI inspection?", href: "/blog/what-is-a-pdi-inspection-ontario" },
    ],
  },
};

export const serviceCityExtras: Record<string, CityExtra> = Object.fromEntries([
  ...MOLD.map((c) => [`mold-inspection/${c}`, moldExtra(CITIES[c], c)] as const),
  ...AIR.map((c) => [`air-quality/${c}`, airExtra(CITIES[c], c)] as const),
  ...Object.entries(HUB_CITIES).flatMap(([c, n]) => [
    [`pre-purchase/${c}`, hubExtra(n, c, "pre-purchase inspections")] as const,
    [`new-construction/${c}`, hubExtra(n, c, "new construction inspections")] as const,
  ]),
  ...Object.entries(manualExtras),
]);
