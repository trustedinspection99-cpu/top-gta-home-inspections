export function realtorSlug(name: string, cities: string[]): string {
  const normalize = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const city = cities[0] ?? 'ontario';
  return `${normalize(name)}-${normalize(city)}`;
}

export function cityToLocationSlug(city: string): string {
  return `home-inspection-${city.toLowerCase().replace(/\s+/g, '-')}`;
}
