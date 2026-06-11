import { expect, test, type Page } from "@playwright/test";

const viewports = [
  { name: "mobile-375", width: 375, height: 900 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "desktop-1280", width: 1280, height: 900 },
  { name: "wide-1440", width: 1440, height: 960 },
] as const;

const sectionIds = ["work", "skills", "experience", "about", "contact"] as const;
const projectRoutes = [
  {
    path: "/work/agentic-pipeline-system",
    title: "AI Agentic Pipeline System",
  },
  {
    path: "/work/industrial-iot-dashboard",
    title: "Real-Time Industrial IoT Dashboard",
  },
  {
    path: "/work/ai-learning-platform",
    title: "AI-Powered Learning Platform 2.0",
  },
  {
    path: "/work/clinical-trial-platform",
    title: "Clinical Trial Management Platform",
  },
  {
    path: "/work/predictive-maintenance-system",
    title: "Predictive Maintenance ML System",
  },
] as const;

async function revealDeferredSections(page: Page) {
  const visualReveals = page.locator("[data-visual-reveal]");
  const visualRevealCount = await visualReveals.count();

  for (let index = 0; index < visualRevealCount; index += 1) {
    const reveal = visualReveals.nth(index);

    await reveal.evaluate((element) => {
      const elementTop =
        element.getBoundingClientRect().top + window.scrollY - 120;

      window.scrollTo({ top: elementTop, behavior: "instant" });
    });
    await page.waitForTimeout(500);
  }

  for (const sectionId of sectionIds) {
    const section = page.locator(`#${sectionId}`);

    await section.evaluate((element) => {
      const sectionTop =
        element.getBoundingClientRect().top + window.scrollY - 120;

      window.scrollTo({ top: sectionTop, behavior: "instant" });
    });
    await page.waitForTimeout(650);
  }

  await page.locator(".deferred-section").evaluateAll((sections) => {
    sections.forEach((section) => {
      (section as HTMLElement).style.contentVisibility = "visible";
    });
  });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(200);
}

test.describe("responsive portfolio", () => {
  for (const viewport of viewports) {
    test(`renders cleanly at ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await page.goto("/", { waitUntil: "networkidle" });
      await expect(page.locator("main")).toContainText("Anish Babu");
      await expect(page.locator("main")).toContainText("Allamneni");
      await expect(page.locator("main")).toContainText(
        "AI systems that act",
      );

      const overflow = await page.evaluate(() => {
        const root = document.documentElement;

        return root.scrollWidth - root.clientWidth;
      });

      expect(overflow).toBeLessThanOrEqual(1);
      await expect(page.getByRole("navigation", { name: /primary/i })).toBeVisible();
      await expect(page.locator("#work")).toBeVisible();
      await expect(page.locator("#skills")).toBeVisible();
      await expect(page.locator("#experience")).toBeVisible();
      await expect(page.locator("#about")).toBeVisible();
      await expect(page.locator("#contact")).toBeVisible();

      await revealDeferredSections(page);

      await page.screenshot({
        fullPage: true,
        path: `test-results/responsive-${viewport.name}.png`,
      });
    });
  }

  test("renders cleanly in dark theme with reduced motion", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.addInitScript(() => {
      window.localStorage.setItem("theme", "dark");
    });
    await page.goto("/", { waitUntil: "networkidle" });
    await expect(page.locator("html")).toHaveClass(/dark/);
    await revealDeferredSections(page);

    const overflow = await page.evaluate(() => {
      const root = document.documentElement;

      return root.scrollWidth - root.clientWidth;
    });

    expect(overflow).toBeLessThanOrEqual(1);
    await page.screenshot({
      fullPage: true,
      path: "test-results/responsive-dark-reduced-motion-1280.png",
    });
  });

  test("supports keyboard navigation in the mobile menu", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 900 });
    await page.goto("/", { waitUntil: "networkidle" });

    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Skip to main content" })).toBeFocused();

    const menuButton = page.getByRole("button", {
      name: "Open navigation menu",
    });
    await menuButton.focus();
    await menuButton.press("Enter");

    const mobileNavigation = page.getByRole("dialog", {
      name: "Mobile navigation",
    });
    await expect(mobileNavigation).toBeVisible();
    await expect(mobileNavigation.getByRole("link").first()).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(mobileNavigation).toBeHidden();
    await expect(
      page.getByRole("button", { name: "Open navigation menu" }),
    ).toBeFocused();
  });

  test("opens the printable resume from the hero", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    const resumeLink = page.getByRole("link", {
      name: /view anish babu allamneni resume/i,
    });

    await expect(resumeLink).toHaveAttribute("href", "/resume");
    await resumeLink.focus();
    await Promise.all([
      page.waitForURL(/\/resume$/),
      resumeLink.press("Enter"),
    ]);
    await expect(
      page.getByRole("heading", { name: "Anish Babu Allamneni" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Print or save resume as PDF" }),
    ).toBeVisible();
  });

  test("renders the branded not-found page", async ({ page }) => {
    await page.goto("/missing-page", { waitUntil: "networkidle" });

    await expect(
      page.getByRole("heading", { name: "This page is outside the system." }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Return to portfolio" }),
    ).toBeVisible();
  });

  test("opens a dedicated project case study", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    const projectLink = page.getByRole("link", {
      name: "View case study: AI Agentic Pipeline System",
    });

    await expect(projectLink).toHaveAttribute(
      "href",
      "/work/agentic-pipeline-system",
    );
    await projectLink.click();
    await expect(page).toHaveURL(/\/work\/agentic-pipeline-system$/);
    await expect(
      page.getByRole("heading", { name: "AI Agentic Pipeline System" }),
    ).toBeVisible();
    await expect(page.getByText("Measured impact")).toBeVisible();
    await page.waitForTimeout(1200);
    await page.screenshot({
      fullPage: true,
      path: "test-results/project-agentic-pipeline-1280.png",
    });
  });

  test("supports keyboard navigation in capability and career tabs", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    const reasonTab = page.getByRole("tab", { name: /Reason/i });
    await reasonTab.focus();
    await reasonTab.press("ArrowRight");
    await expect(page.getByRole("tab", { name: /Build/i })).toBeFocused();
    await expect(page.getByRole("tabpanel", { name: /Build/i })).toBeVisible();

    const firstRole = page.getByRole("tab", {
      name: /AI Model Evaluator/i,
    });
    await firstRole.focus();
    await firstRole.press("ArrowDown");
    await expect(
      page.getByRole("tab", { name: /AI Engineer/i }),
    ).toBeFocused();
    await expect(
      page.getByRole("tabpanel", { name: /AI Engineer/i }),
    ).toBeVisible();
  });

  test("renders every static project route", async ({ page }) => {
    for (const project of projectRoutes) {
      await page.goto(project.path, { waitUntil: "networkidle" });
      await expect(
        page.getByRole("heading", { level: 1, name: project.title }),
      ).toBeVisible();
      await expect(
        page.getByRole("link", { name: "Return to portfolio" }),
      ).toHaveAttribute("href", "/#work");
    }
  });

  test("removes screen-only resume chrome in print mode", async ({ page }) => {
    await page.goto("/resume", { waitUntil: "networkidle" });
    await page.emulateMedia({ media: "print" });

    await expect(page.locator(".resume-toolbar")).toBeHidden();
    await expect(page.locator(".resume-sheet")).toHaveCSS("box-shadow", "none");
    await expect(page.locator(".resume-sheet")).toHaveCSS("border-top-width", "0px");
  });

  test("exposes contact actions and clipboard feedback", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    await expect(
      page.getByRole("link", { name: "Email Anish Babu Allamneni" }),
    ).toHaveAttribute("href", "mailto:anishallamneni@gmail.com");
    await expect(
      page.getByRole("link", { name: "Connect with Anish on LinkedIn" }),
    ).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/anishbabuallamneni",
    );
    await expect(
      page.getByRole("link", { name: "View Anish on GitHub" }),
    ).toHaveAttribute("href", "https://github.com/Anishbabu94");

    const copyButton = page.getByRole("button", {
      name: "Copy anishallamneni@gmail.com to clipboard",
    });
    await copyButton.click();
    await expect(copyButton).toContainText("Email Copied");
    await expect(page.getByText("Email copied to clipboard")).toBeAttached();
  });

  test("contains no rendered encoding artifacts", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    const renderedText = await page.locator("body").innerText();

    expect(renderedText).not.toMatch(/â|Ã|ï¸|�/);
  });
});
