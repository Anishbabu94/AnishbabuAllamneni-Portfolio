import { expect, test } from "@playwright/test";

test("has no browser runtime errors", async ({ page }) => {
  const errors: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      errors.push(`console: ${message.text()}`);
    }
  });
  page.on("pageerror", (error) => {
    errors.push(`pageerror: ${error.message}`);
  });

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => {
    window.localStorage.setItem("theme", "dark");
  });
  await page.goto("/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);

  expect(errors, errors.join("\n")).toEqual([]);
});
