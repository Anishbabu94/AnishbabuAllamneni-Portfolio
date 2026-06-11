import { Phone } from "lucide-react";
import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { siteConfig, socialLinks } from "@/lib/data";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-card/24">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent"
      />
      <div className="section-shell grid gap-6 py-8 text-sm text-muted-foreground md:grid-cols-[1fr_auto_1fr] md:items-center">
        <div className="flex items-center gap-3">
          <BrandMark className="transition-transform duration-300 hover:-rotate-3 hover:scale-105" />
          <p className="font-display font-semibold text-foreground">
            {siteConfig.name}
          </p>
        </div>
        <p className="md:text-center">
          Built with{" "}
          <span aria-label="love" role="img">
            &#10084;&#65039;
          </span>{" "}
          by Anish
        </p>
        <div className="flex items-center gap-2 md:justify-end">
          {socialLinks.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                aria-label={`Open ${link.label}`}
                className="focus-ring group relative grid size-11 place-items-center overflow-hidden rounded-full border border-border bg-card/70 text-muted-foreground shadow-inset transition duration-300 hover:-translate-y-0.5 hover:border-accent/35 hover:text-accent hover:shadow-soft"
                href={link.href}
                key={link.label}
                rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-accent/8 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <Icon
                  aria-hidden="true"
                  className="relative"
                  size={18}
                  strokeWidth={2}
                />
              </Link>
            );
          })}
          <Link
            aria-label={`Call ${siteConfig.name} at ${siteConfig.phone}`}
            className="focus-ring group relative grid size-11 place-items-center overflow-hidden rounded-full border border-border bg-card/70 text-muted-foreground shadow-inset transition duration-300 hover:-translate-y-0.5 hover:border-accent/35 hover:text-accent hover:shadow-soft"
            href="tel:+17349379247"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-accent/8 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
            <Phone
              aria-hidden="true"
              className="relative"
              size={18}
              strokeWidth={2}
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
