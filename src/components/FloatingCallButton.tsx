import React from "react";

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
        h-14
        w-14
        items-center
        justify-center
        rounded-full
        bg-blue-600
        text-white
        shadow-lg
        hover:bg-blue-700
        transition
      "
    >
      📞
    </a>
  );
};

export default FloatingCallButton;
