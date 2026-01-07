import { PhoneCall } from "lucide-react";

export default function FloatingCallButton() {
  return (
    <a
      href="tel:+16478019311"
      aria-label="Call ASADS Home Inspection"
      className="
        fixed bottom-5 right-5 z-50
        flex items-center justify-center
        w-14 h-14 rounded-full
        bg-green-600 text-white
        shadow-xl
        hover:bg-green-700
        transition-all
        md:hidden
      "
    >
      <PhoneCall size={26} />
    </a>
  );
}
