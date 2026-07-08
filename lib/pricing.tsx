import type { LucideIcon } from "lucide-react";
import { BarChart3, Crown, Rocket, Users, Zap } from "lucide-react";

export const TargetIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

export type PricingPlan = {
  name: string;
  sub: string;
  description: string;
  price: string;
  duration: string;
  icon: LucideIcon | React.FC<{ className?: string }>;
  features: string[];
  color: "blue" | "primary" | "purple";
  popular: boolean;
  cta: string;
  footer: string;
};

export const pricingData: {
  oneTime: PricingPlan[];
  monthly: PricingPlan[];
} = {
  oneTime: [
    {
      name: "Visibility Launch Pad",
      sub: "Starter Website Bundle",
      description:
        "Service providers or local businesses needing a basic, effective online presence.",
      price: "£500",
      duration: "/ project",
      icon: Zap,
      features: [
        "Landing Web Page",
        "Basic On-Page SEO Setup",
        "Professional Logo Design (3 Concepts)",
        "Brand Style Guide (Colors, Fonts)",
        "Business Card & Letterhead Design",
        "Social Media Profile Kit",
      ],
      color: "blue",
      popular: false,
      cta: "Get Started",
      footer: "",
    },
    {
      name: "Growth-Ready",
      sub: "Advanced/Premium Bundle",
      description:
        "New businesses needing a professional face and complete digital foundation.",
      price: "£1,200",
      duration: "/ project",
      icon: Rocket,
      features: [
        "Everything in Visibility Launch Pad",
        "5-Page Custom Website",
        "Mobile-Optimized & Fast Hosting",
        "Contact Form & Maps Integration",
        "Domain & SSL (1 Year Included)",
        "Technical Performance Setup",
      ],
      color: "primary",
      popular: true,
      cta: "Choose Growth",
      footer: "",
    },
    {
      name: "Scale Premium",
      sub: "Custom Lead-Gen Solution",
      description:
        "Businesses serious about generating leads and scaling aggressively online.",
      price: "£3,000",
      duration: "/ project",
      icon: TargetIcon,
      features: [
        "Up to 15-Page Custom Website",
        "Dedicated Campaign Landing Pages",
        "Advanced Technical SEO Foundation",
        "Lead Generation Funnels",
        "Premium Hosting & Security (1 Year)",
        "1-Hour Strategy Session",
      ],
      color: "purple",
      popular: false,
      cta: "Go Premium",
      footer: "",
    },
  ],
  monthly: [
    {
      name: "Essential Growth",
      sub: "Maintain Visibility",
      description:
        "Businesses who have a website and need consistent, reliable digital basics.",
      price: "£299",
      duration: "/ month",
      icon: BarChart3,
      footer: "flexible contract",
      features: [
        "Local SEO",
        "Digital AD Marketing",
        "Technical SEO Maintenance",
        "12 Social Media Posts & 1 AI Video",
        "Social Media Platform Handling",
        "Monthly Performance Report",
      ],
      color: "blue",
      popular: false,
      cta: "Start Scaling",
    },
    {
      name: "Accelerate & Convert",
      sub: "Aggressive Growth & Leads",
      description:
        "Focused on increasing market share and capturing qualified leads.",
      price: "£799",
      duration: "/ month",
      icon: Users,
      footer: "flexible contract",
      features: [
        "Everything in Essential Growth",
        "Advanced SEO Campaign",
        "Content Optimization & Outreach",
        "Dedicated Landing Page A/B Testing",
        "15 Social Media Posts & 1 AI Vide",
        "Quarterly Strategy Review",
      ],
      color: "primary",
      popular: true,
      cta: "Start Accelerating",
    },
    {
      name: "Enterprise Impact",
      sub: "Full-Service Partnership",
      description:
        "Established businesses needing a full-scale digital department.",
      price: "£1,500",
      duration: "/ month",
      icon: Crown,
      footer: "flexible contract",
      features: [
        "Dedicated Account Manager & Team",
        "Blog Content Creation (Monthly)",
        "Full-Scale Social Ad Management",
        "Conversion Rate Optimization (CRO)",
        "Competitor Intelligence Reports",
        "Unlimited Strategic Support",
      ],
      color: "purple",
      popular: false,
      cta: "Partner With Us",
    },
  ],
};

export const servicePlanNames = [
  ...pricingData.oneTime.map((p) => p.name),
  ...pricingData.monthly.map((p) => p.name),
];
