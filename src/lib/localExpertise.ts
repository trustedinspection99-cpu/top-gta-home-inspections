type Location = {
  city: string;
  region?: string;
  neighborhoods?: string[];
  localInsights?: { title: string; content: string }[];
};

export function generateLocalExpertise(loc: Location) {
  const city = loc.city;
  const region = loc.region;
  const neighborhoods = loc.neighborhoods?.slice(0, 3).join(", ");
  const insight = loc.localInsights?.[0]?.title;

  return `
ASADS provides professional home inspection services in ${city}${
    region ? ` and throughout the ${region}` : ""
  }. Our inspectors are familiar with common property conditions in areas such as ${neighborhoods}, 
including building practices, age-related defects, and local construction standards. 
Whether you're buying, selling, or evaluating a property, we perform detailed inspections 
tailored to ${city} homes, with same-day reports and clear recommendations.
`.replace(/\s+/g, " ").trim();
}
