import { Phone } from "lucide-react";

const FloatingCallButton = () => {
  return (
    <a
      href="tel:+16478019311"
      aria-label="Call ASADS Home Inspection"
      className="
        fixed
        bottom-5
        right-5
        z-[9999]
        flex
        items-center
        gap-2
        rounded-full
        bg-gradient-to-r
        from-primary
        to-accent
        px-5
        py-3
        text-primary-foreground
        font-semibold
        shadow-lg
        shadow-primary/30
        hover:shadow-xl
        hover:shadow-primary/40
        hover:scale-105
        transition-all
        duration-300
        animate-pulse
        hover:animate-none
      "
    >
      <Phone className="h-5 w-5" />
      <span className="hidden sm:inline">Call Now</span>
    </a>
  );
};

export default FloatingCallButton;
