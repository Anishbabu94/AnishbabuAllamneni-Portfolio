import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrandMark } from "@/components/brand-mark";
import { ProjectArchitectureVisual } from "@/components/project-architecture-visual";
import { projects, siteConfig } from "@/lib/data";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `${siteConfig.url}/work/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | ${siteConfig.name}`,
      description: project.summary,
      url: `${siteConfig.url}/work/${project.slug}`,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${siteConfig.name}, AI Engineer portfolio`,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | ${siteConfig.name}`,
      description: project.summary,
      images: ["/og-image.png"],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((item) => item.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = projects[projectIndex];
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <main className="min-h-screen overflow-hidden">
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/82 backdrop-blur-xl">
        <div className="section-shell flex h-[var(--navbar-height)] items-center justify-between">
          <Link
            aria-label="Return to portfolio"
            className="focus-ring group inline-flex items-center gap-3 rounded-lg"
            href="/#work"
          >
            <BrandMark className="transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105" />
            <span className="font-display text-sm font-bold transition-colors group-hover:text-accent">
              {siteConfig.shortName}
            </span>
          </Link>
          <Link
            className="focus-ring group inline-flex items-center gap-2 rounded-full border border-border bg-card/65 px-4 py-2 text-sm font-semibold shadow-inset transition duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent hover:shadow-soft"
            href="/#work"
          >
            <ArrowLeft
              aria-hidden="true"
              className="transition-transform group-hover:-translate-x-1"
              size={16}
            />
            Projects
          </Link>
        </div>
      </header>

      <article>
        <section className="relative isolate border-b border-border/60">
          <div
            aria-hidden="true"
            className="grid-background absolute inset-0 -z-20 opacity-70"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 -z-10 h-[30rem] bg-[radial-gradient(ellipse_at_24%_12%,color-mix(in_srgb,var(--accent)_15%,transparent),transparent_42%),radial-gradient(ellipse_at_78%_22%,color-mix(in_srgb,var(--accent-secondary)_10%,transparent),transparent_38%)] [mask-image:linear-gradient(to_bottom,black,transparent)]"
          />
          <div className="section-shell pb-12 pt-12 sm:pb-16 sm:pt-20">
            <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-14">
              <div>
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-full border border-accent/25 bg-accent/10 font-mono text-[0.68rem] font-bold text-accent shadow-inset">
                    /{project.number}
                  </span>
                  <span className="h-px w-10 bg-gradient-to-r from-accent to-border" />
                  <span className="technical-label text-muted-foreground">
                    {project.label ?? "Case Study"}
                  </span>
                </div>
                <h1 className="relative mt-8 max-w-4xl font-display text-[clamp(2.8rem,6vw,5.8rem)] font-bold leading-[0.88] text-balance">
                  {project.title}
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-6 left-0 h-px w-32 bg-gradient-to-r from-accent via-accent-secondary to-transparent"
                  />
                </h1>
                <p className="mt-12 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                  {project.summary}
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span className="pill" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -inset-8 -z-10 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--accent)_12%,transparent),transparent_68%)] blur-2xl"
                />
                <div className="overflow-hidden rounded-lg border border-border-strong/80 bg-background/70 p-2 shadow-elevated backdrop-blur-xl sm:p-3">
                  <ProjectArchitectureVisual projectNumber={project.number} />
                </div>
                <div className="relative -mt-px grid grid-cols-3 overflow-hidden rounded-b-lg border border-border bg-card/88 shadow-soft">
                  {project.metrics.map((metric) => (
                    <div
                      className="min-w-0 border-r border-border px-3 py-4 last:border-r-0 sm:px-4"
                      key={`${project.slug}-hero-${metric.label}`}
                    >
                      <span className="metric-value block truncate text-base font-bold text-foreground sm:text-xl">
                        {metric.value}
                      </span>
                      <span className="technical-label mt-1 block text-[0.55rem] text-muted-foreground sm:text-[0.62rem]">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell section-spacing">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="section-label">Context</p>
              <h2 className="section-heading mt-6">
                The engineering story behind the outcome.
              </h2>
            </div>
            <div className="grid gap-3">
              {[
                ["Challenge", project.problem],
                ["System decision", project.build],
                ["Measured impact", project.impact],
              ].map(([label, value], index) => (
                <section
                  className={`group/story relative grid gap-4 overflow-hidden rounded-lg border p-6 shadow-inset transition duration-300 hover:-translate-y-0.5 hover:shadow-soft sm:grid-cols-[3rem_1fr] sm:p-7 ${
                    index === 2
                      ? "border-accent/25 bg-accent/8"
                      : "border-border bg-card/42"
                  }`}
                  key={label}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-gradient-to-b from-accent to-accent-secondary transition-transform duration-500 group-hover/story:scale-y-100"
                  />
                  <span className="font-mono text-sm font-bold text-accent">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="technical-label text-muted-foreground">
                      {label}
                    </h3>
                    <p className="mt-3 max-w-[68ch] text-lg leading-[1.75] text-muted-foreground transition-colors group-hover/story:text-foreground">
                      {value}
                    </p>
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="relative border-y border-border bg-card/38">
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent"
          />
          <div className="section-shell py-12 sm:py-16">
            <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="technical-label text-accent">System View</p>
                <h2 className="mt-2 max-w-2xl font-display text-3xl font-bold">
                  Architecture translated into operational proof.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                A simplified view of the production path and the signal that
                mattered most.
              </p>
            </div>
            <div className="relative overflow-hidden rounded-lg border border-border bg-background/45 p-3 shadow-inset sm:p-5">
              <span
                aria-hidden="true"
                className="grid-background absolute inset-0 opacity-35"
              />
              <div className="relative">
                <ProjectArchitectureVisual projectNumber={project.number} />
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell section-spacing">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="section-label">Delivery</p>
              <h2 className="section-heading mt-6">
                What moved from idea into production.
              </h2>
            </div>
            <ul className="grid gap-3">
              {project.details.map((detail, index) => (
                <li
                  className="group/detail grid grid-cols-[2.75rem_1fr] gap-4 rounded-lg border border-border bg-card/42 p-5 text-base leading-[1.75] text-muted-foreground shadow-inset transition duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:bg-card hover:text-foreground hover:shadow-soft"
                  key={detail}
                >
                  <span className="grid size-10 place-items-center rounded-lg border border-accent/25 bg-accent/10 text-accent transition-colors group-hover/detail:bg-accent group-hover/detail:text-white">
                    <CheckCircle2 aria-hidden="true" size={17} />
                  </span>
                  <div>
                    <span className="technical-label text-accent">
                      Shipped 0{index + 1}
                    </span>
                    <p className="mt-2">{detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="relative border-t border-border bg-card/24">
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent"
          />
          <div className="section-shell py-12 sm:py-16">
            <p className="technical-label text-muted-foreground">
              Next case study
            </p>
            <Link
              className="focus-ring group relative mt-4 grid gap-6 overflow-hidden rounded-lg border border-border bg-background/55 p-4 shadow-inset transition duration-300 hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-elevated sm:p-6 lg:grid-cols-[1fr_minmax(20rem,0.72fr)] lg:items-center"
              href={`/work/${nextProject.slug}`}
            >
              <span className="flex items-end justify-between gap-5">
                <span>
                  <span className="technical-label text-accent">
                    /{nextProject.number}
                  </span>
                  <span className="mt-3 block max-w-3xl font-display text-3xl font-bold leading-none sm:text-5xl">
                    {nextProject.title}
                  </span>
                </span>
                <span className="grid size-12 shrink-0 place-items-center rounded-full border border-accent/25 bg-accent/10 text-accent transition duration-300 group-hover:translate-x-1 group-hover:bg-accent group-hover:text-white">
                  <ArrowRight aria-hidden="true" size={24} />
                </span>
              </span>
              <span className="h-40 overflow-hidden rounded-lg border border-border bg-card/55 p-2 shadow-inset sm:h-48">
                <ProjectArchitectureVisual
                  projectNumber={nextProject.number}
                />
              </span>
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
