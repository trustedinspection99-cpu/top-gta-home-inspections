export function buildLocalExpertise(data: {
  city: string;
  region?: string;
  neighborhoods?: string[];
}) {
  const areas = data.neighborhoods?.slice(0, 3).join(", ");

  return {
    title: `Local Home Inspection Expertise in ${data.city}`,
    paragraphs: [
      `As a professional home inspector serving ${data.city}${
        data.region ? ` within the ${data.region}` : ""
      }, we regularly inspect homes across ${
        areas || "multiple established neighbourhoods"
      }. Each area presents different construction styles, materials, and age-related conditions.`,
      `Our inspections are tailored to local building practices, climate exposure, and common deficiencies seen in this region. This local familiarity allows us to identify issues that are often overlooked during general inspections.`,
      `Whether you're purchasing a resale property, a newer build, or preparing for a warranty or pre-listing inspection, our local experience in ${data.city} ensures you receive accurate, relevant, and actionable findings.`
    ],
  };
}
