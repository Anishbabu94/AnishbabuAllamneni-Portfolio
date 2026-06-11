import { siteConfig } from "@/lib/data";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.url,
  email: `mailto:${siteConfig.email}`,
  telephone: siteConfig.phone,
  jobTitle: siteConfig.role,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Detroit",
    addressRegion: "MI",
    addressCountry: "US",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Lawrence Technological University",
  },
  sameAs: [siteConfig.linkedin, siteConfig.github],
  knowsAbout: [
    "Artificial Intelligence",
    "Large Language Models",
    "Agentic AI",
    "Retrieval-Augmented Generation",
    "Machine Learning",
    "Amazon Web Services",
    "FastAPI",
    "React",
  ],
};

export function StructuredData() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
      }}
      type="application/ld+json"
    />
  );
}
