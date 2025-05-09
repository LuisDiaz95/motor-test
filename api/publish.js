const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

module.exports = async function publish(price, description) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto("https://admin.seminuevos.com/login", { waitUntil: "networkidle2" });

    // Login
    await page.type("#email", process.env.SEMINUEVOS_EMAIL);
    await page.type("#password", process.env.SEMINUEVOS_PASSWORD);
    await page.click("button[type=submit]");
    await page.waitForNavigation();

    // Por alguna razón, si quito este screenshot, deja de funcionar
    await page.screenshot({ path: 'debug_post_login.png', fullPage: true });

    // Navegar a formulario de publicación
    await page.goto("https://particulares.seminuevos.com/particulares/vehiculos/publicar", { 
        waitUntil: "networkidle2" 
    });
  
    // Elegir plan
    const buttons = await page.$$("button");
    for (const button of buttons) {
        const text = await page.evaluate(el => el.textContent, button);
        if (text.includes("Elegir plan")) {
            await button.click();
            break;
        }
    }

    // Aquí es dónde me atoré, no puedo modificar los select para llenar el formulario
    // Intenté modificar el select directamente, y también filtrando por clase para usar 'maintine-Select-input' y hacer click, pero tampoco
    //await page.select("#marca", "Acura");
    //await page.select("#modelo", "ILX");

    // Screenshot de confirmación
    const screenshotPath = `images/screenshots/published_${Date.now()}.png`;
    await page.screenshot({ path: screenshotPath, fullPage: true });

    await browser.close();
    return screenshotPath;
  } catch (err) {
    await browser.close();
    throw err;
  }
};
