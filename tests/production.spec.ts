import { expect, test, type Page } from "@playwright/test";

const projectRoutes = [
  "/work/agentic-pipeline-system",
  "/work/industrial-iot-dashboard",
  "/work/ai-learning-platform",
  "/work/clinical-trial-platform",
  "/work/predictive-maintenance-system",
] as const;

const requiredRoutes = ["/", "/resume", ...projectRoutes] as const;

async function installLayoutShiftObserver(page: Page) {
  await page.addInitScript(() => {
    const measuredWindow = window as Window & { __portfolioCls?: number };
    measuredWindow.__portfolioCls = 0;

    new PerformanceObserver((entries) => {
      for (const entry of entries.getEntries()) {
        const layoutShift = entry as PerformanceEntry & {
          hadRecentInput?: boolean;
          value?: number;
        };

        if (!layoutShift.hadRecentInput) {
          measuredWindow.__portfolioCls =
            (measuredWindow.__portfolioCls ?? 0) + (layoutShift.value ?? 0);
        }
      }
    }).observe({ type: "layout-shift", buffered: true });
  });
}

test.describe("production export", () => {
  test("serves every required route and metadata asset", async ({ request }) => {
    for (const route of requiredRoutes) {
      const response = await request.get(route);
      expect(response.status(), route).toBe(200);
    }

    for (const asset of [
      "/robots.txt",
      "/sitemap.xml",
      "/manifest.webmanifest",
      "/og-image.png",
      "/og-image.svg",
      "/icon.svg",
    ]) {
      const response = await request.get(asset);
      expect(response.status(), asset).toBe(200);
    }

    const homepageResponse = await request.get("/");
    expect(homepageResponse.headers()["x-content-type-options"]).toBe(
      "nosniff",
    );
    expect(homepageResponse.headers()["x-frame-options"]).toBe("DENY");
    expect(homepageResponse.headers()["referrer-policy"]).toBe(
      "strict-origin-when-cross-origin",
    );

    const manifest = await (await request.get("/manifest.webmanifest")).json();
    expect(manifest.icons).toContainEqual({
      sizes: "any",
      src: "/icon.svg",
      type: "image/svg+xml",
    });

    const sitemap = await (await request.get("/sitemap.xml")).text();
    expect(sitemap).toContain("https://anishallamneni.com/resume");

    const missingResponse = await request.get("/missing-production-route");
    expect(missingResponse.status()).toBe(404);
  });

  test("publishes complete homepage SEO metadata", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    await expect(page).toHaveTitle(
      "Anish Babu Allamneni | AI Engineer",
    );
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /production LLM systems/i,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://anishallamneni.com",
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      "https://anishallamneni.com/og-image.png",
    );
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image",
    );
  });

  test("keeps production semantics and interaction targets healthy", async ({
    page,
  }) => {
    for (const route of requiredRoutes) {
      await page.setViewportSize({ width: 375, height: 900 });
      await page.goto(route, { waitUntil: "networkidle" });

      const audit = await page.evaluate(() => {
        const ids = Array.from(
          document.querySelectorAll<HTMLElement>("[id]"),
          (element) => element.id,
        );
        const duplicateIds = ids.filter(
          (id, index) => id && ids.indexOf(id) !== index,
        );
        const imagesWithoutAlt = Array.from(
          document.querySelectorAll<HTMLImageElement>("img"),
        )
          .filter((image) => !image.hasAttribute("alt"))
          .map((image) => image.currentSrc || image.src);
        const unsafeNewTabLinks = Array.from(
          document.querySelectorAll<HTMLAnchorElement>(
            'a[target="_blank"]',
          ),
        )
          .filter((link) => {
            const rel = link.rel.split(/\s+/);

            return !rel.includes("noopener") && !rel.includes("noreferrer");
          })
          .map((link) => link.href);
        const headingLevels = Array.from(
          document.querySelectorAll<HTMLHeadingElement>(
            "h1, h2, h3, h4, h5, h6",
          ),
          (heading) => Number(heading.tagName.slice(1)),
        );
        const skippedHeadingLevels = headingLevels.filter(
          (level, index) =>
            index > 0 && level - headingLevels[index - 1] > 1,
        );
        const undersizedButtons = Array.from(
          document.querySelectorAll<HTMLElement>(
            'button, [role="button"]',
          ),
        )
          .filter((element) => {
            const style = window.getComputedStyle(element);
            const rect = element.getBoundingClientRect();

            return (
              style.display !== "none" &&
              style.visibility !== "hidden" &&
              rect.width > 0 &&
              rect.height > 0 &&
              (rect.width < 24 || rect.height < 24)
            );
          })
          .map((element) => element.getAttribute("aria-label") || element.textContent);

        return {
          duplicateIds,
          imagesWithoutAlt,
          skippedHeadingLevels,
          undersizedButtons,
          unsafeNewTabLinks,
        };
      });

      expect(audit.duplicateIds, `${route} duplicate IDs`).toEqual([]);
      expect(audit.imagesWithoutAlt, `${route} image alt text`).toEqual([]);
      expect(audit.skippedHeadingLevels, `${route} heading order`).toEqual([]);
      expect(audit.undersizedButtons, `${route} interaction targets`).toEqual([]);
      expect(audit.unsafeNewTabLinks, `${route} new-tab links`).toEqual([]);
    }
  });

  test("keeps homepage layout shift below the good threshold", async ({
    page,
  }) => {
    await installLayoutShiftObserver(page);
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/", { waitUntil: "networkidle" });

    for (const sectionId of ["work", "skills", "experience", "about", "contact"]) {
      await page.locator(`#${sectionId}`).scrollIntoViewIfNeeded();
      await page.waitForTimeout(250);
    }

    const cls = await page.evaluate(
      () =>
        (window as Window & { __portfolioCls?: number }).__portfolioCls ?? 0,
    );

    expect(cls).toBeLessThanOrEqual(0.1);
  });

  test("stays within production JavaScript and CSS budgets", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    const resources = await page.evaluate(() =>
      performance
        .getEntriesByType("resource")
        .map((entry) => entry as PerformanceResourceTiming)
        .filter(
          (entry) =>
            entry.name.includes("/_next/static/") &&
            (entry.name.endsWith(".js") || entry.name.endsWith(".css")),
        )
        .map((entry) => ({
          name: entry.name,
          size: entry.transferSize || entry.encodedBodySize,
        })),
    );

    const javascriptBytes = resources
      .filter((resource) => resource.name.endsWith(".js"))
      .reduce((total, resource) => total + resource.size, 0);
    const cssBytes = resources
      .filter((resource) => resource.name.endsWith(".css"))
      .reduce((total, resource) => total + resource.size, 0);
    const largestResource = Math.max(
      0,
      ...resources.map((resource) => resource.size),
    );

    expect(javascriptBytes).toBeLessThanOrEqual(850_000);
    expect(cssBytes).toBeLessThanOrEqual(100_000);
    expect(largestResource).toBeLessThanOrEqual(200_000);
  });
});
