import { Shield, Award, CheckCircle, Users } from "lucide-react";

// Updated to match your screenshot and professional certifications
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
    label: "2,000+ Inspections", // Matches your red-circled screenshot
    sublabel: "Satisfied Clients" 
  },
];

export function TrustBadges() {
  return (
    <section className="py-8 bg-card border-y">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <div 
              key={badge.label} 
              className="flex items-center gap-3 justify-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <badge.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-sm text-foreground">{badge.label}</p>
                <p className="text-xs text-muted-foreground whitespace-nowrap">
                  {badge.sublabel}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
