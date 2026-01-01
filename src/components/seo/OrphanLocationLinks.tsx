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
      <a className={linkCls} href="https://www.asads.ca/locations/beamsville/">Beamsville</a>
      <a className={linkCls} href="https://www.asads.ca/locations/flamborough/">Flamborough</a>
      <a className={linkCls} href="https://www.asads.ca/locations/beaverton/">Beaverton</a>
      <a className={linkCls} href="https://www.asads.ca/locations/unionville/">Unionville</a>
      <a className={linkCls} href="https://www.asads.ca/locations/dundas/">Dundas</a>
      <a className={linkCls} href="https://www.asads.ca/locations/innisfil/">Innisfil</a>
      <a className={linkCls} href="https://www.asads.ca/locations/bolton/">Bolton</a>
      <a className={linkCls} href="https://www.asads.ca/locations/stouffville/">Stouffville</a>
      <a className={linkCls} href="https://www.asads.ca/locations/midland/">Midland</a>
      <a className={linkCls} href="https://www.asads.ca/locations/east-york/">East York</a>
      <a className={linkCls} href="https://www.asads.ca/locations/bradford/">Bradford</a>
      <a className={linkCls} href="https://www.asads.ca/locations/orillia/">Orillia</a>
      <a className={linkCls} href="https://www.asads.ca/locations/fort-erie/">Fort Erie</a>
      <a className={linkCls} href="https://www.asads.ca/locations/stayner/">Stayner</a>
      <a className={linkCls} href="https://www.asads.ca/locations/scugog/">Scugog</a>
      <a className={linkCls} href="https://www.asads.ca/locations/clarington/">Clarington</a>
      <a className={linkCls} href="https://www.asads.ca/locations/wasaga-beach/">Wasaga Beach</a>
      <a className={linkCls} href="https://www.asads.ca/locations/caledon/">Caledon</a>
      <a className={linkCls} href="https://www.asads.ca/locations/ancaster/">Ancaster</a>
      <a className={linkCls} href="https://www.asads.ca/locations/lincoln/">Lincoln</a>
      <a className={linkCls} href="https://www.asads.ca/locations/concord/">Concord</a>
      <a className={linkCls} href="https://www.asads.ca/locations/port-perry/">Port Perry</a>
      <a className={linkCls} href="https://www.asads.ca/locations/new-tecumseth/">New Tecumseth</a>
      <a className={linkCls} href="https://www.asads.ca/locations/woodbridge/">Woodbridge</a>
      <a className={linkCls} href="https://www.asads.ca/locations/keswick/">Keswick</a>
      <a className={linkCls} href="https://www.asads.ca/locations/brantford/">Brantford</a>
      <a className={linkCls} href="https://www.asads.ca/locations/halton-hills/">Halton Hills</a>
      <a className={linkCls} href="https://www.asads.ca/locations/georgina/">Georgina</a>
      <a className={linkCls} href="https://www.asads.ca/locations/sutton/">Sutton</a>
      <a className={linkCls} href="https://www.asads.ca/locations/thornhill/">Thornhill</a>
      <a className={linkCls} href="https://www.asads.ca/locations/georgetown/">Georgetown</a>
      <a className={linkCls} href="https://www.asads.ca/locations/kleinburg/">Kleinburg</a>
      <a className={linkCls} href="https://www.asads.ca/locations/uxbridge/">Uxbridge</a>
      <a className={linkCls} href="https://www.asads.ca/locations/stoney-creek/">Stoney Creek</a>
      <a className={linkCls} href="https://www.asads.ca/locations/cannington/">Cannington</a>
      <a className={linkCls} href="https://www.asads.ca/locations/cobourg/">Cobourg</a>
      <a className={linkCls} href="https://www.asads.ca/locations/acton/">Acton</a>
      <a className={linkCls} href="https://www.asads.ca/locations/collingwood/">Collingwood</a>
      <a className={linkCls} href="https://www.asads.ca/locations/maple/">Maple</a>
      <a className={linkCls} href="https://www.asads.ca/locations/essa/">Essa</a>
      <a className={linkCls} href="https://www.asads.ca/locations/thorold/">Thorold</a>
      <a className={linkCls} href="https://www.asads.ca/locations/clearview/">Clearview</a>
      <a className={linkCls} href="https://www.asads.ca/locations/east-gwillimbury/">East Gwillimbury</a>
      <a className={linkCls} href="https://www.asads.ca/locations/port-colborne/">Port Colborne</a>
      <a className={linkCls} href="https://www.asads.ca/locations/alliston/">Alliston</a>
      <a className={linkCls} href="https://www.asads.ca/locations/peterborough/">Peterborough</a>
      <a className={linkCls} href="https://www.asads.ca/locations/niagara-on-the-lake/">Niagara-on-the-Lake</a>
      <a className={linkCls} href="https://www.asads.ca/locations/penetanguishene/">Penetanguishene</a>
      <a className={linkCls} href="https://www.asads.ca/locations/springwater/">Springwater</a>
      <a className={linkCls} href="https://www.asads.ca/locations/king-city/">King City</a>
      <a className={linkCls} href="https://www.asads.ca/locations/orangeville/">Orangeville</a>
      <a className={linkCls} href="https://www.asads.ca/locations/welland/">Welland</a>
      <a className={linkCls} href="https://www.asads.ca/locations/brock/">Brock</a>
      <a className={linkCls} href="https://www.asads.ca/locations/bowmanville/">Bowmanville</a>
      <a className={linkCls} href="https://www.asads.ca/locations/grimsby/">Grimsby</a>
    </div>
  );
}
