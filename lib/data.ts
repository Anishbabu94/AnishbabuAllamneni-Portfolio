import type { LucideIcon } from "lucide-react";
import {
  Bot,
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  FileCode2,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Server,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: `#${string}`;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Project {
  number: string;
  slug: string;
  title: string;
  label?: string;
  tags: string[];
  summary: string;
  problem: string;
  build: string;
  details: string[];
  impact: string;
  metrics: ProjectMetric[];
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface SkillCategory {
  title: string;
  icon: LucideIcon;
  skills: string[];
}

export interface ExperienceEntry {
  role: string;
  company: string;
  client?: string;
  dateRange: string;
  location: string;
  highlights: string[];
  points: string[];
}

export interface QuickFact {
  label: string;
  value: string;
  icon: LucideIcon;
}

export interface Certification {
  href: string;
  label: string;
  logoAlt: string;
  logoSrc: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface ContactDetail {
  label: string;
  href?: string;
}

const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://anishallamneni.com";

export const siteConfig = {
  name: "Anish Babu Allamneni",
  shortName: "Anish",
  role: "AI Engineer",
  email: "anishallamneni@gmail.com",
  phone: "+1 (734) 937-9247",
  location: "Detroit, MI",
  url: configuredSiteUrl.replace(/\/+$/, ""),
  resumeHref: "/resume",
  description:
    "Portfolio of Anish Babu Allamneni, an AI Engineer building production LLM systems, agentic pipelines, RAG applications, and real-time ML infrastructure.",
  linkedin: "https://www.linkedin.com/in/anishbabuallamneni",
  github: "https://github.com/Anishbabu94",
} as const;

export const navItems: NavItem[] = [
  { label: "Projects", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const heroStats: Stat[] = [
  { value: "4+", label: "Years Experience" },
  { value: "10+", label: "Projects" },
  { value: "AWS", label: "Certified" },
  { value: "MS", label: "Computer Science" },
];

export const projects: Project[] = [
  {
    number: "01",
    slug: "agentic-pipeline-system",
    title: "AI Agentic Pipeline System",
    tags: ["Amazon Bedrock", "Claude Sonnet", "FastAPI", "Python"],
    summary:
      "Engineered event-driven AI agents on Amazon Bedrock that automate ML pipeline triage, cutting mean time-to-resolution by 60%.",
    problem:
      "ML pipeline incidents required manual review across logs, alerts, and operational context before teams could act.",
    build:
      "Built Bedrock-powered Claude Sonnet agents, FastAPI orchestration, deterministic cache keys, and production observability around triage workflows.",
    details: [
      "Built a Python and FastAPI caching architecture that reduced API response times from 2-5 seconds to under 1ms.",
      "Designed event-driven agent workflows that inspect failures, summarize root causes, and route remediation steps to engineering teams.",
      "Integrated Claude Sonnet through Amazon Bedrock with guarded prompts, structured outputs, and production-ready observability.",
    ],
    impact: "60% faster ML pipeline triage and sub-millisecond cached responses.",
    metrics: [
      { label: "MTTR reduction", value: "60%" },
      { label: "Cached latency", value: "<1ms" },
      { label: "Platform", value: "Bedrock" },
    ],
  },
  {
    number: "02",
    slug: "industrial-iot-dashboard",
    title: "Real-Time Industrial IoT Dashboard",
    tags: ["React", "TypeScript", "AWS Athena", "XGBoost"],
    summary:
      "Shipped a Plant to Line to Machine drill-down dashboard with real-time sensor telemetry charts and ML-derived feature visualization.",
    problem:
      "Industrial users needed fast visibility into machine health without overwhelming backend systems with constant telemetry polling.",
    build:
      "Created a React/TypeScript dashboard backed by partitioned Athena queries, React Query polling strategy, and ML feature visualizations.",
    details: [
      "Created a responsive telemetry interface for industrial users to inspect machine health across plant, line, and asset levels.",
      "Used React Query smart polling to reduce API traffic by 96x while keeping operational charts fresh.",
      "Visualized XGBoost feature signals so maintenance teams could interpret predictions without leaving the dashboard.",
    ],
    impact: "96x API traffic reduction with clearer sensor-to-model traceability.",
    metrics: [
      { label: "API reduction", value: "96x" },
      { label: "Data path", value: "Plant-Line-Machine" },
      { label: "Stack", value: "React + Athena" },
    ],
  },
  {
    number: "03",
    slug: "ai-learning-platform",
    title: "AI-Powered Learning Platform 2.0",
    label: "Master's Project",
    tags: ["Django", "FastAPI", "GPT-4.1", "SentenceTransformers"],
    summary:
      "Built a hybrid async learning platform with GPT-4.1 course generation, context-aware AI tutoring, and semantic assignment grading.",
    problem:
      "Learning workflows needed AI-generated courses, tutoring, and grading without coupling every AI workload into one slow monolith.",
    build:
      "Separated generation, tutoring, grading, and platform services using Django, FastAPI, GPT models, Gemini, and SentenceTransformers.",
    details: [
      "Separated content generation, tutoring, grading, and platform services so each workload could scale independently.",
      "Combined Gemini and GPT models for context-aware assistant flows tuned to course material and learner progress.",
      "Implemented semantic assignment grading with SentenceTransformers to evaluate conceptual similarity and feedback quality.",
    ],
    impact: "Independently scalable AI learning workflows from generation to grading.",
    metrics: [
      { label: "AI workflows", value: "4" },
      { label: "Model layer", value: "GPT + Gemini" },
      { label: "Grading", value: "Semantic" },
    ],
  },
  {
    number: "04",
    slug: "clinical-trial-platform",
    title: "Clinical Trial Management Platform",
    label: "Project",
    tags: ["Node.js", "GraphQL", "OAuth 2.0", "Docker"],
    summary:
      "Developed a microservices-based platform supporting 5+ services and 20+ APIs with RBAC, JWT authentication, and CI/CD Docker pipelines.",
    problem:
      "Clinical workflows needed secure multi-role access and efficient data exchange across researcher, clinician, and admin surfaces.",
    build:
      "Designed Node.js services, GraphQL APIs, OAuth 2.0/RBAC authentication, JWT flows, and Dockerized deployment pipelines.",
    details: [
      "Built secure GraphQL and REST interfaces for clinical workflows with RBAC and OAuth 2.0 access controls.",
      "Containerized services with Docker and supported CI/CD pipelines for consistent deployment across environments.",
      "Reduced data transfer overhead by shaping service boundaries and API responses around clinical workflow needs.",
    ],
    impact: "30-50% lower data transfer overhead across clinical service workflows.",
    metrics: [
      { label: "Services", value: "5+" },
      { label: "APIs", value: "20+" },
      { label: "Transfer savings", value: "30-50%" },
    ],
  },
  {
    number: "05",
    slug: "predictive-maintenance-system",
    title: "Predictive Maintenance ML System",
    label: "Project",
    tags: ["XGBoost", "TensorFlow", "CAN Bus", "Python"],
    summary:
      "Created an XGBoost-based fault detection system on automotive sensor and CAN bus data achieving 87% accuracy.",
    problem:
      "High-dimensional vehicle sensor streams needed reliable early fault detection before failures became maintenance events.",
    build:
      "Engineered CAN bus features, applied dimensionality reduction, and tuned XGBoost/TensorFlow models for predictive maintenance.",
    details: [
      "Engineered features from high-volume vehicle telemetry and CAN bus streams for predictive maintenance modeling.",
      "Applied dimensionality reduction, model tuning, and validation workflows to improve fault detection reliability.",
      "Compared XGBoost and TensorFlow approaches to balance interpretability, accuracy, and deployment constraints.",
    ],
    impact: "87% fault detection accuracy on automotive sensor data.",
    metrics: [
      { label: "Accuracy", value: "87%" },
      { label: "Signal", value: "CAN Bus" },
      { label: "Model", value: "XGBoost" },
    ],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    icon: FileCode2,
    skills: ["Python", "Go", "Java", "TypeScript", "SQL"],
  },
  {
    title: "Generative AI & Agentic Systems",
    icon: Bot,
    skills: [
      "Amazon Bedrock",
      "LangChain",
      "LLM Integration",
      "Prompt Engineering",
      "Tool Calling",
      "RAG Pipelines",
      "Model Evaluation",
    ],
  },
  {
    title: "Generative AI & NLP",
    icon: Sparkles,
    skills: [
      "Claude Sonnet",
      "GPT-4",
      "Mistral",
      "SBERT",
      "Vector Search",
      "Embeddings",
      "spaCy",
      "OCR (Tesseract)",
    ],
  },
  {
    title: "Machine Learning",
    icon: BrainCircuit,
    skills: [
      "Scikit-learn",
      "TensorFlow/Keras",
      "Predictive Maintenance",
      "Time Series Modeling",
    ],
  },
  {
    title: "Cloud & Infrastructure",
    icon: Cloud,
    skills: [
      "AWS S3",
      "AWS EC2",
      "AWS Lambda",
      "AWS CloudTrail",
      "AWS Secrets Manager",
      "GCP BigQuery",
      "GCP Cloud Storage",
      "Docker",
    ],
  },
  {
    title: "Databases & Data Engineering",
    icon: Database,
    skills: [
      "PostgreSQL",
      "MongoDB",
      "DynamoDB",
      "MySQL",
      "Redis",
      "AWS Athena",
      "Query Optimization",
    ],
  },
  {
    title: "Backend & APIs",
    icon: Server,
    skills: [
      "FastAPI",
      "Flask",
      "Django REST Framework",
      "Node.js",
      "Express.js",
      "GraphQL",
      "REST APIs",
      "OAuth 2.0",
    ],
  },
  {
    title: "Frontend",
    icon: Code2,
    skills: [
      "React",
      "TypeScript",
      "JavaScript",
      "Real-Time Telemetry Visualization",
    ],
  },
  {
    title: "Tools",
    icon: Wrench,
    skills: [
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Postman",
      "Jira",
      "Confluence",
    ],
  },
];

export const experienceEntries: ExperienceEntry[] = [
  {
    role: "AI Model Evaluator",
    company: "Handshake",
    client: "Anthropic",
    dateRange: "May 2026-Present",
    location: "San Francisco, CA (Remote)",
    highlights: ["LLM eval", "Safety alignment", "Multimodal QA"],
    points: [
      "Evaluated LLM outputs across text, visual, and STEM domains for accuracy, reasoning quality, and safety alignment using structured evaluation frameworks and red-teaming protocols.",
      "Assessed prompt quality across multiple task variants, identifying ambiguity, logical flaws, and annotation inconsistencies that could affect model training data quality and LLM benchmark scores.",
      "Applied multimodal evaluation protocols to scientific figures, infographics, charts, and diagrams to validate task suitability and answerability for LLM training datasets.",
      "Applied structured frameworks to judge whether AI outputs meet defined quality and safety standards, providing detailed written justifications for accept/reject decisions.",
      "Worked independently following rigorous annotation guidelines with high accuracy and attention to detail across diverse technical domains.",
    ],
  },
  {
    role: "AI Engineer",
    company: "ThinkDigits Inc",
    client: "Duro Last",
    dateRange: "Jan 2025-Present",
    location: "Detroit, MI",
    highlights: ["<1ms cache", "80% fewer bytes", "96x less traffic"],
    points: [
      "Engineered a Python/FastAPI caching architecture that reduced API response times from 2-5 seconds to under 1 millisecond, lowering AWS Athena compute costs and improving platform reliability.",
      "Optimized AWS Athena query performance by replacing sort-heavy scan patterns with single-pass aggregations and rolling 7-day partition windows, reducing bytes scanned by 80% and establishing reusable data access patterns adopted across the engineering team.",
      "Built and deployed event-driven AI agents on Amazon Bedrock with Claude Sonnet to automate ML pipeline triage, replacing manual review steps and cutting mean time-to-resolution for production issues by 60%, with alerts routed and triaged autonomously across enterprise operations.",
      "Implemented deterministic query parameter normalization across backend and frontend so all browser sessions produce identical query signatures regardless of load time, enabling cross-session server-side cache sharing validated via CloudWatch metrics.",
      "Reduced frontend API calls from continuous 30-second polling to 3 targeted fetches per day using React Query, achieving a 96x reduction in API traffic with no loss in data freshness.",
      "Shipped a Plant, Line, Machine drill-down dashboard in React/TypeScript with real-time sensor telemetry charts and ML-derived feature visualization, backed by partitioned Athena queries tuned for fast historical data loads.",
    ],
  },
  {
    role: "Software Engineer Intern",
    company: "Tek Labs Inc",
    client: "Magna",
    dateRange: "Jun-Aug 2024",
    location: "Detroit, MI",
    highlights: ["87% accuracy", "CAN bus data", "EDA insights"],
    points: [
      "Worked on XGBoost-based predictive maintenance models on automotive sensor data, achieving 87% fault detection accuracy through feature engineering and hyperparameter tuning.",
      "Processed and engineered features from CAN bus logs and high-dimensional vehicle sensor streams, applying dimensionality reduction to improve model robustness and cut training time.",
      "Performed exploratory data analysis on production line and vehicle performance metrics, identifying anomalous patterns and operational trends that supported early-stage fault detection and maintenance insights.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Channel Soft Inc Private Limited",
    dateRange: "Aug 2022-Sep 2023",
    location: "Vijayawada, Andhra Pradesh",
    highlights: ["5+ services", "20+ APIs", "30-50% less transfer"],
    points: [
      "Built a microservices-based clinical trial management platform using Node.js and Express, supporting multi-role workflows across 5+ services and 20+ APIs for researchers, clinicians, and administrators.",
      "Implemented OAuth 2.0 and Role-Based Access Control using Passport.js, ensuring secure and compliant access across user roles.",
      "Developed secure GraphQL APIs integrated with JWT-based authentication for robust client-server communication, reducing data transfer overhead by an estimated 30-50%.",
      "Implemented Docker containers and images with Docker Compose, integrated into CI/CD pipelines for streamlined and consistent deployments.",
    ],
  },
];

export const quickFacts: QuickFact[] = [
  {
    label: "Location",
    value: "Detroit, MI (Open to Relocate)",
    icon: MapPin,
  },
  {
    label: "Education",
    value: "Master's in Computer Science, Lawrence Technological University",
    icon: GraduationCap,
  },
  {
    label: "Certification",
    value: "AWS Certified Developer",
    icon: ShieldCheck,
  },
  {
    label: "Phone",
    value: "+1 (734) 937-9247",
    icon: Phone,
  },
  {
    label: "Email",
    value: "anishallamneni@gmail.com",
    icon: Mail,
  },
];

export const certifications: Certification[] = [
  {
    href: "https://aws.amazon.com/certification/certified-developer-associate/",
    label: "AWS Certified Developer (Associate) - Amazon Web Services",
    logoAlt: "Amazon Web Services logo",
    logoSrc: "/certifications/aws.svg",
  },
  {
    href: "https://www.ibm.com/training/",
    label: "Generative AI: Prompt Engineering - IBM",
    logoAlt: "IBM logo",
    logoSrc: "/certifications/ibm.svg",
  },
  {
    href: "https://www.jpmorganchase.com/",
    label: "Software Engineering Job Simulation - JPMorganChase",
    logoAlt: "JPMorganChase logo",
    logoSrc: "/certifications/jpmorganchase.svg",
  },
  {
    href: "https://www.deeplearning.ai/",
    label: "AI For Everyone - DeepLearning.AI",
    logoAlt: "DeepLearning.AI logo",
    logoSrc: "/certifications/deeplearning-ai.svg",
  },
  {
    href: "https://www.anthropic.com/",
    label: "Claude Code 101 - Anthropic",
    logoAlt: "Anthropic logo",
    logoSrc: "/certifications/anthropic.svg",
  },
];

export const contactDetails: ContactDetail[] = [
  {
    label: "anishallamneni@gmail.com",
    href: "mailto:anishallamneni@gmail.com",
  },
  {
    label: "+1 (734) 937-9247",
    href: "tel:+17349379247",
  },
  {
    label: "Detroit, MI",
  },
];

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: siteConfig.github,
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: siteConfig.linkedin,
    icon: Linkedin,
  },
  {
    label: "Email",
    href: `mailto:${siteConfig.email}`,
    icon: Mail,
  },
];

export const aboutCopy =
  "I'm Anish, an AI Engineer based in Detroit, MI, passionate about closing the gap between AI research and real-world impact. I specialize in building production-grade LLM systems, agentic pipelines, and data-intensive backends that scale. Whether it's automating enterprise ML workflows with Claude Sonnet or visualizing real-time factory sensor data, I bring full-cycle ownership from model to product.";

export const heroWords = ["Building", "AI", "That", "Works"] as const;

export const motionConfig = {
  ease: [0.25, 0.46, 0.45, 0.94],
  revealDuration: 0.5,
  hoverDuration: 0.2,
  stagger: 0.08,
} as const;
