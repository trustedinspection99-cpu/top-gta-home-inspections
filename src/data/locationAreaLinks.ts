/**
 * Town pages that sit inside a larger municipality link to the parent area page, so Google can tell
 * which page answers which search (2026-11-08, group 2). Only pages under the protection threshold
 * and outside the Nov 1 title test (Bolton, Kleinburg; control Woodbridge) are listed.
 */
export interface AreaLinks {
  heading: string;
  text: string;
  links: { label: string; href: string }[];
}

export const locationAreaLinks: Record<string, AreaLinks> = {
  "home-inspection-flamborough": {
    heading: "Flamborough, Waterdown and Rural Hamilton",
    text: "Flamborough covers Waterdown and the rural north of the City of Hamilton. Many properties here have a private well and septic system, wood heat or outbuildings. Our rural home inspection guide explains what is covered and what to arrange separately, and we also serve neighbouring Burlington and Hamilton.",
    links: [
      { label: "Rural home inspection in Ontario: wells, septic and more", href: "/blog/rural-home-inspection-ontario-well-septic" },
      { label: "Well water testing", href: "/services/well-water-testing" },
      { label: "Home inspection in Hamilton", href: "/locations/home-inspection-hamilton" },
      { label: "Home inspection in Burlington", href: "/locations/home-inspection-burlington" },
    ],
  },
  "home-inspection-acton": {
    heading: "Acton and the Town of Halton Hills",
    text: "Acton is part of the Town of Halton Hills, along with Georgetown and the surrounding rural area. For home inspections anywhere in Halton Hills, see the Halton Hills page.",
    links: [
      { label: "Home inspection in Halton Hills", href: "/locations/home-inspection-halton-hills" },
      { label: "Home inspection in Georgetown", href: "/locations/home-inspection-georgetown" },
    ],
  },
  "home-inspection-unionville": {
    heading: "Unionville and the City of Markham",
    text: "Unionville is a community within the City of Markham. For home inspections across Markham, including Markham Village, Cornell and Cachet, see the Markham page.",
    links: [{ label: "Home inspection in Markham", href: "/locations/home-inspection-markham" }],
  },
};
