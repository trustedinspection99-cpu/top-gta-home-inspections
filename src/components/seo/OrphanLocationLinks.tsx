import { cn } from "@/lib/utils";

type Props = {
  /** Container classes (e.g. grid / flex) */
  className?: string;
  /** Shared classes applied to every link */
  linkClassName?: string;
};

/**
 * Hardcoded (non-looping) absolute anchor links for specific /locations/* URLs.
 * Requirement: must be plain <a href> in view-source, and must not use map()/loops.
 */
export function OrphanLocationLinks({ className, linkClassName }: Props) {
  const linkCls = cn(
    "text-sm text-muted-foreground hover:text-foreground transition-colors",
    linkClassName
  );

  return (
    <div className={cn("grid gap-2", className)}>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-beamsville">Beamsville</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-flamborough">Flamborough</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-beaverton">Beaverton</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-unionville">Unionville</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-dundas">Dundas</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-innisfil">Innisfil</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-bolton">Bolton</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-stouffville">Stouffville</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-midland">Midland</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-east-york">East York</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-bradford">Bradford</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-orillia">Orillia</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-fort-erie">Fort Erie</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-stayner">Stayner</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-scugog">Scugog</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-clarington">Clarington</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-wasaga-beach">Wasaga Beach</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-caledon">Caledon</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-ancaster">Ancaster</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-lincoln">Lincoln</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-concord">Concord</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-port-perry">Port Perry</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-new-tecumseth">New Tecumseth</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-woodbridge">Woodbridge</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-keswick">Keswick</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-brantford">Brantford</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-halton-hills">Halton Hills</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-georgina">Georgina</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-sutton">Sutton</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-thornhill">Thornhill</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-georgetown">Georgetown</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-kleinburg">Kleinburg</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-uxbridge">Uxbridge</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-stoney-creek">Stoney Creek</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-cannington">Cannington</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-cobourg">Cobourg</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-acton">Acton</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-collingwood">Collingwood</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-maple">Maple</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-essa">Essa</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-thorold">Thorold</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-clearview">Clearview</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-east-gwillimbury">East Gwillimbury</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-port-colborne">Port Colborne</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-alliston">Alliston</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-peterborough">Peterborough</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-niagara-on-the-lake">Niagara-on-the-Lake</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-penetanguishene">Penetanguishene</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-springwater">Springwater</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-king-city">King City</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-orangeville">Orangeville</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-welland">Welland</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-brock">Brock</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-bowmanville">Bowmanville</a>
      <a className={linkCls} href="https://www.asads.ca/locations/home-inspection-grimsby">Grimsby</a>
    </div>
  );
}
