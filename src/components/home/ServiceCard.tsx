import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  index?: number;
  variant?: "default" | "compact";
}

export function ServiceCard({ icon: Icon, title, description, href, index = 0, variant = "default" }: ServiceCardProps) {
  return (
    <Link to={href}>
      <Card 
        className={cn(
          "group card-hover border-border/50 h-full",
          "animate-fade-in-up"
        )}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <CardContent className={cn(
          "flex flex-col",
          variant === "default" ? "p-6" : "p-5"
        )}>
          <div className={cn(
            "rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors",
            variant === "default" ? "h-12 w-12" : "h-10 w-10"
          )}>
            <Icon className={variant === "default" ? "h-6 w-6" : "h-5 w-5"} />
          </div>
          <h3 className={cn(
            "font-heading font-semibold mb-2 group-hover:text-primary transition-colors",
            variant === "default" ? "text-xl" : "text-lg"
          )}>
            {title}
          </h3>
          <p className={cn(
            "text-muted-foreground",
            variant === "default" ? "text-base" : "text-sm"
          )}>
            {description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}