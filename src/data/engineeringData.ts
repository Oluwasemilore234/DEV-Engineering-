import { ServiceItem, CaseStudy, ProcessStep, Testimonial, PricingModel, TechItem } from '../types';

export const MANIFESTO_TEXT = `Software engineering is the disciplined, systematic application of engineering principles to the design, development, testing, deployment, and maintenance of software systems. Unlike ad-hoc programming, software engineering emphasizes scalability, reliability, maintainability, and security over the complete product life cycle.`;

export const TRUST_METRICS = [
  { value: "99.99%", label: "SLA Uptime Maintained", sub: "Enterprise infrastructure" },
  { value: "< 45ms", label: "Average API Latency", sub: "Global edge routing" },
  { value: "100%", label: "Test Coverage Critical Paths", sub: "Unit, Integration & E2E" },
  { value: "ISO 27001", label: "Security Compliant", sub: "SOC 2 Type II Certified" },
];

export const CERTIFICATIONS = [
  { name: "AWS Certified Solutions Architect", code: "AWS-PSA-4091", org: "Amazon Web Services" },
  { name: "Google Cloud Professional Cloud Architect", code: "GCP-PCA-8812", org: "Google Cloud" },
  { name: "Certified Kubernetes Administrator (CKA)", code: "CKA-24018", org: "Linux Foundation" },
  { name: "ISO/IEC 27001 Information Security", code: "ISO-27001:2022", org: "BSI Verified" },
  { name: "SOC 2 Type II Attestation", code: "AICPA-SOC2", org: "Independent Audit" },
];

export const CLIENT_LOGOS = [
  { name: "FinScale Trading", tag: "FINTECH" },
  { name: "BioPulse Health", tag: "HEALTHCARE" },
  { name: "Orbit Logistics", tag: "SUPPLY CHAIN" },
  { name: "Vortex Data Systems", tag: "ENTERPRISE B2B" },
  { name: "Hyperion Cloud", tag: "SAAS PLATFORM" },
];

export const SERVICES: ServiceItem[] = [
  {
    id: "web-mobile",
    title: "Custom Web & Mobile Development",
    shortDesc: "Full-stack solutions using modern frameworks engineered for speed, high conversion, and resilient client-side state.",
    fullDesc: "We build enterprise-grade web applications and high-fidelity mobile systems using typed, reactive frameworks. From server-rendered hydration to cross-platform mobile architectures, our applications maintain sub-second load times and fluid 60fps UX under extreme concurrency.",
    iconName: "Layout",
    deliverables: [
      "Production-ready Next.js / React single-page and SSR architectures",
      "Strict TypeScript typing across API, store, and UI tiers",
      "Native-level offline persistence & optimistic UI updates",
      "WCAG 2.1 AA accessibility and cross-browser audit compliance"
    ],
    metrics: "Sub-900ms First Contentful Paint across 4G & broadband",
    techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "React Native"]
  },
  {
    id: "cloud-devops",
    title: "Cloud Architecture & DevOps",
    shortDesc: "AWS/GCP management, CI/CD automation, Terraform infrastructure-as-code, and resilient multi-region architectures.",
    fullDesc: "We architect immutable, fault-tolerant cloud environments that scale elastically. By codifying infrastructure with Terraform, implementing containerized ECS/EKS clusters, and designing automated canary deployment pipelines, we eliminate manual deployment risk and reduce cloud spend.",
    iconName: "Cloud",
    deliverables: [
      "Zero-downtime blue/green deployment pipelines via GitHub Actions",
      "Multi-AZ, auto-scaling Kubernetes / Docker container clusters",
      "Terraform / OpenTofu Infrastructure-as-Code with state locking",
      "Cost optimization reducing AWS/GCP bills by an average of 30-45%"
    ],
    metrics: "Zero unplanned deployment downtime in 36+ consecutive months",
    techStack: ["AWS", "Google Cloud", "Docker", "Kubernetes", "Terraform", "CI/CD"]
  },
  {
    id: "api-backend",
    title: "API Integration & Backend Systems",
    shortDesc: "Scalable database management, high-throughput microservices, and battle-tested REST, gRPC, and GraphQL APIs.",
    fullDesc: "Engineered for massive transaction throughput and deterministic latency. We build distributed backend services that decouple synchronous bottlenecks via event streaming (Kafka/RabbitMQ), enforce ACID guarantees with PostgreSQL, and protect ingress with granular rate limiting and OAuth2/JWT auth.",
    iconName: "Server",
    deliverables: [
      "Microservices and modular monolith architectures in Node.js, Python, and Java",
      "PostgreSQL query optimization, partitioning, and read-replica routing",
      "High-throughput caching topologies with Redis & in-memory stores",
      "Enterprise third-party API orchestration (Stripe, Twilio, ERPs, CRM)"
    ],
    metrics: "Handled sustained spikes up to 45,000 requests/sec with P99 < 40ms",
    techStack: ["Node.js", "Python", "Java", "PostgreSQL", "Redis", "Kafka", "gRPC"]
  },
  {
    id: "legacy-modernization",
    title: "Legacy Code Modernization",
    shortDesc: "Strategic refactoring, performance optimization, cloud migration, and systematic technical debt elimination.",
    fullDesc: "Tackle bloated legacy codebases without interrupting active customer operations. We employ the Strangler Fig pattern to progressively migrate monolithic systems into clean, maintainable micro-components, resolving memory leaks, outdated security CVEs, and archaic database schemas.",
    iconName: "RefreshCw",
    deliverables: [
      "Comprehensive technical debt audits with actionable risk heatmaps",
      "Incremental zero-risk migration away from fragile monoliths",
      "Database schema refactoring and zero-downtime data migration",
      "E2E regression safety harness guaranteeing functional parity"
    ],
    metrics: "Average 60% reduction in bug tickets and 4x faster feature velocity",
    techStack: ["TypeScript", "Docker", "PostgreSQL", "SonarQube", "Playwright"]
  }
];

export const TECH_STACK: TechItem[] = [
  // Frontend
  {
    id: "react",
    name: "React",
    category: "frontend",
    description: "Component-driven reactive UI architecture with concurrent rendering and hooks.",
    experience: "7+ years",
    iconType: "react",
    highlightTag: "Core Web Standard",
    useCases: ["Dynamic dashboards", "Complex stateful interfaces", "Real-time client feeds"]
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "frontend",
    description: "Production framework for SSR, static generation, server actions, and edge runtime.",
    experience: "5+ years",
    iconType: "nextjs",
    highlightTag: "SSR & Edge Performance",
    useCases: ["High-SEO platforms", "E-commerce frontends", "Hybrid client/server web apps"]
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "frontend",
    description: "Statically typed JavaScript preventing whole classes of runtime bugs at compile time.",
    experience: "7+ years",
    iconType: "typescript",
    highlightTag: "Type Safety Standard",
    useCases: ["Strict schema contracts", "Cross-tier type sharing", "Scalable refactoring"]
  },
  {
    id: "javascript",
    name: "JavaScript (ES6+)",
    category: "frontend",
    description: "Deep mastery of the V8 runtime, async event loop, memory profiling, and modern ES specs.",
    experience: "10+ years",
    iconType: "javascript",
    highlightTag: "Foundation",
    useCases: ["High-performance DOM logic", "Web Workers", "Micro-frontend runtimes"]
  },
  {
    id: "html5",
    name: "HTML5",
    category: "frontend",
    description: "Semantic, accessible markup with modern canvas, storage, and audio/video APIs.",
    experience: "10+ years",
    iconType: "html5",
    highlightTag: "Semantic Structure",
    useCases: ["Semantic SEO", "Accessible forms (ARIA)", "Microdata schema"]
  },
  {
    id: "css3",
    name: "CSS3 / Tailwind",
    category: "frontend",
    description: "Design-token driven utility CSS, hardware-accelerated animations, and responsive layouts.",
    experience: "10+ years",
    iconType: "css3",
    highlightTag: "Responsive Design",
    useCases: ["Adaptive UI across all viewports", "Fluid typography", "Dark/light palettes"]
  },
  // Backend
  {
    id: "nodejs",
    name: "Node.js",
    category: "backend",
    description: "Non-blocking event-driven backend runtime for high-concurrency microservices and APIs.",
    experience: "8+ years",
    iconType: "nodejs",
    highlightTag: "High Concurrency",
    useCases: ["REST & GraphQL gateways", "Real-time WebSockets", "Microservice orchestrators"]
  },
  {
    id: "python",
    name: "Python",
    category: "backend",
    description: "FastAPI, Django, data processing pipelines, automation scripts, and ML integrations.",
    experience: "6+ years",
    iconType: "python",
    highlightTag: "Data & API Pipelines",
    useCases: ["Data engineering pipelines", "Algorithmic backends", "Automated ETL systems"]
  },
  {
    id: "java",
    name: "Java",
    category: "backend",
    description: "Enterprise Spring Boot, JVM performance tuning, and robust multithreaded systems.",
    experience: "6+ years",
    iconType: "java",
    highlightTag: "Enterprise Scale",
    useCases: ["Banking/transactional engines", "High-reliability batch jobs", "Distributed processing"]
  },
  // Cloud & DB
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "cloud-db",
    description: "Relational database of choice with JSONB, row-level security, replication, and indexing.",
    experience: "8+ years",
    iconType: "postgresql",
    highlightTag: "ACID Relational Core",
    useCases: ["Complex relational models", "Full-text indexing", "High-volume transactional ledgers"]
  },
  {
    id: "docker",
    name: "Docker",
    category: "cloud-db",
    description: "Containerization guaranteeing 100% environment parity from local dev to production.",
    experience: "7+ years",
    iconType: "docker",
    highlightTag: "Immutable Containers",
    useCases: ["Microservice packaging", "Isolated test harnesses", "Multi-stage production builds"]
  },
  {
    id: "aws",
    name: "Amazon Web Services (AWS)",
    category: "cloud-db",
    description: "Certified architecture on ECS, RDS, Lambda, S3, CloudFront, IAM, and VPC networks.",
    experience: "7+ years",
    iconType: "aws",
    highlightTag: "Cloud Backbone",
    useCases: ["High-availability infrastructure", "Serverless workflows", "Global CDN distribution"]
  }
];

export const ENGINEERING_PRINCIPLES = [
  {
    title: "Disciplined Code Quality",
    metric: "100% Lint & Static Pass",
    description: "Zero tolerance for unhandled exceptions or implicit 'any' types. Every pull request undergoes automated SonarQube analysis, strict ESLint enforcement, and mandatory pairwise peer review.",
    details: ["Mandatory 2-engineer code reviews", "Strict automated AST linting & formatting", "Self-documenting TypeScript interfaces"]
  },
  {
    title: "Comprehensive Test Coverage",
    metric: "92%+ Line Coverage Target",
    description: "We employ the test pyramid rigorously: fast unit tests for deterministic business logic, integration tests for DB queries and external APIs, and Playwright E2E suites for user journeys.",
    details: ["Unit testing with Vitest / Jest", "Integration tests on ephemeral Docker DBs", "Automated Playwright smoke & E2E flows"]
  },
  {
    title: "Agile & Predictable Delivery",
    metric: "Bi-Weekly Production Demos",
    description: "Eliminating guesswork with structured 2-week sprint cadences, transparent task backlogs (Linear/Jira), automated staging deployments on every commit, and detailed release changelogs.",
    details: ["Bi-weekly live client demo sessions", "CI/CD automated preview environments", "Deterministic velocity estimations"]
  },
  {
    title: "Defense-in-Depth Security",
    metric: "OWASP Top 10 & ISO 27001",
    description: "Security is baked into the architecture, not retrofitted. Automated dependency vulnerability scanning (Dependabot/Snyk), least-privilege IAM policies, and TLS 1.3 / AES-256 encryption at rest.",
    details: ["Automated vulnerability CVE scanning", "Strict RBAC and OAuth2 token rotation", "Zero secret storage in source control"]
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "finscale",
    name: "FinScale Trading Engine",
    industry: "Fintech & Algorithmic Trading",
    timeline: "4 Months Engagement",
    problem: "The client's monolithic execution engine experienced severe 450ms+ latency spikes during opening bell volatility, causing order drops and customer escalations.",
    solution: "Architected an event-driven microservices backend in Node.js and Go, backed by read-replica PostgreSQL clusters, Redis pub/sub order queues, and AWS ECS autoscaling clusters with private VPC peering.",
    technologies: ["Node.js", "TypeScript", "PostgreSQL", "Redis", "Docker", "AWS ECS", "Terraform"],
    metrics: {
      primary: "-68%",
      primaryLabel: "API Latency (450ms → 32ms)",
      secondary: "250K+",
      secondaryLabel: "Daily Active Traders Handled",
      tertiary: "99.995%",
      tertiaryLabel: "Uptime Over 12 Months"
    },
    architectureDetails: [
      "Decoupled synchronous REST bottlenecks into Redis Streams and Go-based matchers",
      "Partitioned historical ledger tables into PostgreSQL monthly shards with index optimization",
      "Automated zero-downtime blue/green deployments across 3 AWS Availability Zones"
    ]
  },
  {
    id: "medstream",
    name: "MedStream Clinical Care Portal",
    industry: "Digital Healthcare & Telehealth",
    timeline: "3 Months Engagement",
    problem: "A clinical platform struggled with slow video consultations, fragile HIPAA compliance documentation, and high patient abandon rates on mobile browsers.",
    solution: "Rebuilt the patient portal from the ground up using Next.js with server-side rendering, end-to-end encrypted WebRTC video sessions, automated HIPAA audit logging, and responsive Tailwind UI.",
    technologies: ["Next.js", "React", "TypeScript", "WebRTC", "AWS KMS", "Docker", "PostgreSQL"],
    metrics: {
      primary: "3.2x",
      primaryLabel: "Faster Patient Onboarding",
      secondary: "100%",
      secondaryLabel: "HIPAA Audit Compliance Score",
      tertiary: "4.95 / 5",
      tertiaryLabel: "Patient Experience Rating"
    },
    architectureDetails: [
      "Encrypted all protected health information (PHI) via envelope encryption with AWS KMS",
      "Engineered adaptive bitrate WebRTC fallback ensuring stable connections even on 3G mobile networks",
      "Sub-second page transitions via Next.js optimistic cache prefetching"
    ]
  },
  {
    id: "supplynexus",
    name: "SupplyNexus Logistics Mesh",
    industry: "Global Logistics & Fleet IoT",
    timeline: "5 Months Engagement",
    problem: "A legacy freight network was bottlenecked by a 4-hour reconciliation lag between warehouse scanners, IoT fleet telemetry, and dispatchers.",
    solution: "Engineered a real-time ingestion pipeline utilizing Python and Node.js microservices, Dockerized Kafka message brokers, and optimized PostgreSQL geospatial indexing (PostGIS).",
    technologies: ["Python", "Node.js", "Docker", "PostgreSQL", "AWS IoT", "Kafka", "React"],
    metrics: {
      primary: "< 1.2s",
      primaryLabel: "Telemetry Ingestion Latency",
      secondary: "-42%",
      secondaryLabel: "Cloud Infrastructure Cost",
      tertiary: "15M+",
      tertiaryLabel: "Events Processed Daily"
    },
    architectureDetails: [
      "Replaced batch ETL jobs with continuous stream processing via Apache Kafka",
      "Optimized fleet location queries using PostGIS spatial indexing, cutting CPU load by 60%",
      "Containerized all micro-workers with Docker on AWS Fargate with spot instance cost optimization"
    ]
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: "01",
    title: "Discovery & Architecture",
    timeline: "Week 1–2",
    description: "Requirements mapping, tech stack selection, risk modeling, and concrete system design before writing a single line of code.",
    deliverables: [
      "System Architecture Diagram & Technical Specification",
      "Database schema entity-relationship diagram (ERD)",
      "Security threat model & compliance checklist",
      "Milestone roadmap with fixed delivery timelines"
    ],
    keyActions: ["Stakeholder technical deep-dives", "Bottleneck identification", "Stack validation"]
  },
  {
    stepNumber: "02",
    title: "Sprint Execution",
    timeline: "Bi-Weekly Sprints",
    description: "Iterative development with clean documentation, continuous integration, and working bi-weekly demos for complete stakeholder visibility.",
    deliverables: [
      "Working software deployed to staging every sprint",
      "Bi-weekly live video demonstration with your team",
      "Comprehensive TypeScript code with 100% typing",
      "Interactive API documentation (Swagger/OpenAPI)"
    ],
    keyActions: ["2-week sprint cycles", "Daily async standup updates", "Immediate PR reviews"]
  },
  {
    stepNumber: "03",
    title: "QA & Deployment",
    timeline: "Pre-Launch Sprint",
    description: "Rigorous automated testing, security audits, load testing, and blue/green production cloud launch with zero user disruption.",
    deliverables: [
      "End-to-end automated test suite results & coverage report",
      "Penetration testing & vulnerability scan reports",
      "Simulated load test benchmarks (up to 10x peak traffic)",
      "Automated CI/CD release pipeline configured"
    ],
    keyActions: ["Staging soak testing", "Database migration dry-runs", "Production rollout script"]
  },
  {
    stepNumber: "04",
    title: "Maintenance & Support",
    timeline: "Ongoing Assurance",
    description: "Continuous monitoring, performance tuning, proactive security updates, and SLA-backed engineering enhancements.",
    deliverables: [
      "24/7 automated uptime and latency monitoring dashboards",
      "Guaranteed 1-hour critical incident response SLA",
      "Continuous dependency patching & security updates",
      "Monthly architectural review and cost optimization"
    ],
    keyActions: ["Observability monitoring", "Database vacuuming & tuning", "Regular security scans"]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "marcus-vance",
    name: "Marcus Vance",
    role: "Chief Technology Officer",
    company: "Apex Fintech Group",
    quote: "Dev Engineering transformed our core execution engine. Going from 450ms spikes down to 32ms P99 latency while scaling to 250k traders seemed impossible, but their disciplined engineering methodology delivered exactly what was promised on schedule.",
    metricsResult: "Reduced API Latency by 68%",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    verified: true
  },
  {
    id: "elena-rostova",
    name: "Elena Rostova",
    role: "Head of Product",
    company: "BioPulse Health",
    quote: "Their engineering standards are second to none. Unlike past agencies that delivered brittle codebases full of bugs, Dev Engineering's unit and E2E testing suite gave us 100% confidence. We passed our HIPAA external security audit on the very first attempt.",
    metricsResult: "100% Clean HIPAA Audit",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    verified: true
  },
  {
    id: "david-chen",
    name: "David Chen",
    role: "VP of Engineering",
    company: "Orbit Global Logistics",
    quote: "Dev Engineering acts like senior principal architects embedded directly with our founders. They cut our cloud infrastructure expenses by 42% while modernizing an archaic 4-hour batch process into a real-time event pipeline. Absolute masters of their craft.",
    metricsResult: "42% Cloud Spend Reduction",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    verified: true
  }
];

export const PRICING_MODELS: PricingModel[] = [
  {
    id: "fixed-price",
    title: "Fixed-Price Project",
    tagline: "Best for well-defined scopes and MVP builds",
    priceEstimate: "$15,000 – $45,000",
    billingType: "Milestone-Based Billing",
    bestFor: "Early-stage founders, targeted new product launches, or bounded feature modules.",
    features: [
      "Rigorous discovery and fixed specification document",
      "Guaranteed delivery date with milestone disbursements",
      "Full IP ownership transferred upon completion",
      "Full-stack web or mobile application codebase",
      "Automated CI/CD deployment pipeline on your cloud",
      "60-day post-launch defect warranty & bug support"
    ],
    popular: false
  },
  {
    id: "dedicated-team",
    title: "Dedicated Engineering Team",
    tagline: "Monthly retainer for ongoing, full-stack capacity",
    priceEstimate: "$12,500 / month",
    billingType: "Predictable Monthly Retainer",
    bestFor: "Growing tech companies needing continuous, senior-level product development velocity.",
    features: [
      "Dedicated senior full-stack engineers (Frontend, Backend, Cloud)",
      "Technical lead overseeing architecture & code review",
      "Bi-weekly sprint planning and feature release demos",
      "Slack/Discord integration with 2-hour communication SLA",
      "Comprehensive test coverage & production monitoring",
      "Flexible monthly roadmap pivoting based on market feedback"
    ],
    popular: true
  },
  {
    id: "staff-aug",
    title: "Staff Augmentation",
    tagline: "Seamlessly add senior engineers to an existing team",
    priceEstimate: "$85 – $130 / hour",
    billingType: "Flexible Weekly / Hourly Billing",
    bestFor: "Engineering leaders needing specialized expertise (AWS, React, Node, PostgreSQL) to accelerate a tight deadline.",
    features: [
      "Direct integration into your existing Git, Jira & Slack workflows",
      "Senior architects with 7+ years of domain experience",
      "Fast onboarding within 48 hours without HR friction",
      "No long-term lock-in: scale capacity up or down with 2-week notice",
      "Rigorous adherence to your internal coding standards",
      "Mentorship and best-practice transfer to your in-house devs"
    ],
    popular: false
  }
];

export const CONTACT_INFO = {
  email: "engineering@devengineering.io",
  phone: "+1 (415) 890-3382",
  hq: "500 Howard St, Suite 400, San Francisco, CA 94105",
  hours: "Monday – Friday: 8:00 AM – 6:00 PM PST",
  calendarUrl: "https://cal.com/dev-engineering/discovery"
};
