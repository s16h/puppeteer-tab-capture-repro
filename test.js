const puppeteer = require('puppeteer');

(async () => {
    const pathToExtension = require('path').join(__dirname, 'test-extension');
    const extensionId = 'ggahojjidgommldmocemnbkdhagpackj';

    const browser = await puppeteer.launch({
        args: [
            `--whitelisted-extension-id=${extensionId}`,
            // '--use-fake-ui-for-media-stream',
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            `--disable-extensions-except=${pathToExtension}`,
            `--load-extension=${pathToExtension}`,
        ],
        headless: false,
    });
    const page = await browser.newPage();

    await page.goto('https://google.com', { waitUntil: 'networkidle2' });

    const targets = await browser.targets();
    const backgroundPageTarget = targets.find(target => target.type() === 'background_page' && target.url().startsWith(`chrome-extension://${extensionId}/`));
    const backgroundPage = await backgroundPageTarget.page();

    backgroundPage.on('console', msg => {
        for (let i = 0; i < msg.args().length; i++) {
            console.log(`${i}: ${msg.args()[i]}`);
        }
    });

    await backgroundPage.evaluate(() => {
        startRecording();
        return Promise.resolve(42);
    });

    await page.waitFor(120 * 1000);
    await browser.close();
})();