const puppeteer = require("puppeteer");
const express = require("express");

const app = express();

app.get("/", async (req, res) => {
  console.log("Starting browser...");
  const browser = await puppeteer.launch({
    headless: true,
    ignoreHTTPSErrors: true,
    defaultViewport: null,
    args: ["--start-maximized"],
  });
  const page = await browser.newPage();
  await page.goto(`https://raise.com`); // URL is given by the "user" (your client-side application)
  const screenshotBuffer = await page.screenshot();

  // await page.waitForSelector('button[data-testid="login-button"]');
  // await page.click('button[data-testid="login-button"]');
  // await page.waitForSelector('input[name="email"]');
  // await page.type('input[name="email"]');
  // await page.type('input[name="password"]');
  // await page.click('button[type="submit"]');
  // await page.waitForSelector('button[data-testid="login-button"]');
  // await page.click('button[data-testid="login-button"]');
  // Respond with the image
  res.writeHead(200, {
    "Content-Type": "image/png",
    "Content-Length": screenshotBuffer.length,
  });
  res.end(screenshotBuffer);

  await browser.close();
});

app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
