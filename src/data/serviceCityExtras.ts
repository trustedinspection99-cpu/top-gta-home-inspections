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

export const serviceCityExtras: Record<string, CityExtra> = Object.fromEntries([
  ...MOLD.map((c) => [`mold-inspection/${c}`, moldExtra(CITIES[c], c)] as const),
  ...AIR.map((c) => [`air-quality/${c}`, airExtra(CITIES[c], c)] as const),
]);
