const { chromium } = require("C:/Users/beuer/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");

(async () => {
  const browser = await chromium.launch({ headless: true, channel: "msedge" });
  const page = await browser.newPage({ viewport: { width: 1365, height: 980 }, hasTouch: true });
  await page.goto("file:///C:/Users/beuer/Documents/GitHub/Startseite/lernsimulationen/kurse/q1/ER/Samariter/index.html");
  await page.screenshot({ path: "samariter-qa-home.png", fullPage: false });
  await page.getByRole("button", { name: "Mission starten" }).click();
  await page.screenshot({ path: "samariter-qa-scene1.png", fullPage: false });
  await page.locator(".story-thumb").nth(1).click();
  await page.screenshot({ path: "samariter-qa-scene1-focus.png", fullPage: false });
  await page.locator(".option .button").first().click();
  await page.screenshot({ path: "samariter-qa-reason.png", fullPage: false });
  const metrics = await page.evaluate(() => ({
    bodyW: document.body.scrollWidth,
    viewW: innerWidth,
    scenePanelH: document.querySelector("#scenePanel")?.getBoundingClientRect().height,
    thumbs: Array.from(document.querySelectorAll(".story-thumb")).map((el) => ({
      h: el.getBoundingClientRect().height,
      text: el.textContent.trim()
    })),
    focus: document.querySelector("#frameFocusText")?.textContent
  }));
  console.log(JSON.stringify(metrics, null, 2));
  await browser.close();
})().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
