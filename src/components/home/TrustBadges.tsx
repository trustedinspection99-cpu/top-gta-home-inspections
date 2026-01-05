import React from "react"; // Added for stability
import { Shield, Award, CheckCircle, Users } from "lucide-react";

const badges = [
  { 
    icon: Shield, 
    label: "Licensed & Insured", 
    sublabel: "Full Liability Coverage" 
  },
  { 
    icon: Award, 
    label: "Master Inspector", 
    sublabel: "OAHI & OBC Expert" 
  },
  { 
    icon: CheckCircle, 
    label: "InterNACHI Member", 
    sublabel: "International Standards" 
  },
  { 
    icon: Users, 
    label: "2,000+ Inspections", 
    sublabel: "Satisfied Clients" 
  },
];

const TrustBadges = () => {
  return (
    <section className="py-8 bg-card border-y">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, index) => {
            const IconComponent = badge.icon; // Explicitly defining the icon component
            return (
              <div 
                key={index} 
                className="flex items-center gap-3 justify-center"
              >
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <IconComponent className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-sm text-foreground">{badge.label}</p>
                  <p className="text-xs text-muted-foreground whitespace-nowrap">
                    {badge.sublabel}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export { TrustBadges }; // Using standard export
