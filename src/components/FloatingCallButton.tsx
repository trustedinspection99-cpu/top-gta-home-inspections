// src/components/FloatingCallButton.tsx
import React from "react";

const FloatingCallButton = () => {
  return (
    <a
      href="tel:+16478019311"
      className="fixed bottom-5 right-5 z-50 flex items-center justify-center rounded-full bg-blue-600 p-4 shadow-lg transition hover:bg-blue-700"
      aria-label="Call ASADS Home Inspection"
    >
      📞
    </a>
  );
};

export default FloatingCallButton;
