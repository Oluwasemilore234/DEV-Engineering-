export type TechCategory = 'all' | 'frontend' | 'backend' | 'cloud-db';

export interface TechItem {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'cloud-db';
  description: string;
  experience: string;
  iconType: string;
  highlightTag: string;
  useCases: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  deliverables: string[];
  metrics: string;
  techStack: string[];
}

export interface CaseStudy {
  id: string;
  name: string;
  industry: string;
  timeline: string;
  problem: string;
  solution: string;
  technologies: string[];
  metrics: {
    primary: string;
    primaryLabel: string;
    secondary: string;
    secondaryLabel: string;
    tertiary: string;
    tertiaryLabel: string;
  };
  architectureDetails: string[];
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  timeline: string;
  description: string;
  deliverables: string[];
  keyActions: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  metricsResult: string;
  avatarUrl: string;
  verified: boolean;
}

export interface PricingModel {
  id: string;
  title: string;
  tagline: string;
  priceEstimate: string;
  billingType: string;
  bestFor: string;
  features: string[];
  popular?: boolean;
}

export interface LeadFormData {
  fullName: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}
