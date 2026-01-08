// src/components/FloatingCallButton.tsx
import React from "react";

export default function FloatingCallButton() {
  return (
    <a
      href="tel:6478019311"
      className="
        fixed 
        bottom-5 
        right-5 
        z-[9999] 
        flex 
        items-center 
        justify-center 
        w-14 
        h-14 
        rounded-full 
        bg-blue-600 
        text-white 
        text-2xl 
        shadow-lg 
        hover:bg-blue-700 
        transition 
        duration-300
      "
      aria-label="Call ASADS Home Inspection"
    >
      📞
    </a>
  );
}
