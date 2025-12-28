import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Award, 
  Shield, 
  Users, 
  Target, 
  CheckCircle, 
  ArrowRight,
  Building,
  GraduationCap
} from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Integrity",
    description: "We provide honest, unbiased assessments. Our only loyalty is to you and your safety.",
  },
  {
    icon: Target,
    title: "Thoroughness",
    description: "Our 200+ point inspection leaves no stone unturned. We inspect every accessible area.",
  },
  {
    icon: Users,
    title: "Education",
    description: "We take time to explain our findings and help you understand your home's condition.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Continuous training and the latest technology ensure you get the best inspection possible.",
  },
];

const certifications = [
  "Ontario Association of Home Inspectors (OAHI)",
  "InterNACHI Certified Professional Inspector",
  "WETT Certified Technician",
  "Thermography Certified",
  "Radon Measurement Professional",
  "Mold Assessment Technician",
];

const team = [
  {
    name: "Ahmad Siddiqui",
    role: "Founder & Lead Inspector",
    experience: "15+ years experience",
    certifications: ["OAHI", "InterNACHI", "WETT"],
    bio: "Ahmad founded ASADS with a mission to provide GTA homeowners with honest, thorough inspections. With over 5,000 inspections completed, he brings unmatched expertise to every home.",
  },
  {
    name: "Sarah Chen",
    role: "Senior Inspector",
    experience: "10+ years experience",
    certifications: ["OAHI", "Thermal Imaging"],
    bio: "Sarah specializes in thermal imaging and moisture detection. Her attention to detail has helped countless clients avoid costly repairs.",
  },
  {
    name: "Marcus Thompson",
    role: "Commercial Inspector",
    experience: "12+ years experience",
    certifications: ["InterNACHI", "Commercial"],
    bio: "Marcus leads our commercial inspection division, bringing extensive experience in multi-unit and commercial property assessments.",
  },
];

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              About ASADS Home Inspection
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Since 2009, we've been the GTA's trusted partner for comprehensive home inspections. 
              Our mission is simple: protect your investment and give you peace of mind.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                <span className="text-foreground font-medium">5,000+ Inspections</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-foreground font-medium">3 Certified Inspectors</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <span className="text-foreground font-medium">15+ Years Experience</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  ASADS Home Inspection was founded in 2009 by Ahmad Siddiqui, a former construction 
                  professional who saw a need for more thorough, client-focused home inspections in 
                  the Greater Toronto Area.
                </p>
                <p>
                  After years of working in residential construction, Ahmad noticed that many home 
                  buyers were not getting the full picture of their potential purchases. He founded 
                  ASADS with a commitment to change that—providing comprehensive, educational 
                  inspections that empower homeowners to make informed decisions.
                </p>
                <p>
                  Today, our team of certified inspectors has completed over 5,000 inspections 
                  across the GTA. We've helped first-time buyers, seasoned investors, and everyone 
                  in between understand their properties and protect their investments.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center">
                <div className="text-center text-primary-foreground p-8">
                  <GraduationCap className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-2xl font-heading font-bold">Founded 2009</p>
                  <p className="text-primary-foreground/80">Serving the GTA with pride</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-muted-foreground">
              These principles guide everything we do, from our inspection process to how we interact with clients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card 
                key={value.title} 
                className="text-center border-border/50 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="pt-8 pb-6">
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-muted-foreground">
              Our certified inspectors bring decades of combined experience to every inspection.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card 
                key={member.name}
                className="overflow-hidden border-border/50 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center">
                    <Users className="h-12 w-12 text-primary" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-xl text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium text-sm mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-sm mb-4">{member.experience}</p>
                  <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {member.certifications.map((cert) => (
                      <span 
                        key={cert}
                        className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Our Certifications
            </h2>
            <p className="text-lg text-primary-foreground/80">
              We maintain the highest industry standards and continuously update our training.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {certifications.map((cert) => (
              <div 
                key={cert}
                className="flex items-center gap-3 bg-primary-foreground/10 rounded-lg p-4"
              >
                <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0" />
                <span className="text-sm">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Work With Us?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Experience the ASADS difference. Book your inspection today and 
              see why thousands of GTA homeowners trust us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/booking">
                  Book Your Inspection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
