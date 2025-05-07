const puppeteer = require('puppeteer');

const browser_options = {
	headless: true,
	args: [
		'--no-sandbox',
		'--disable-background-networking',
		'--disable-default-apps',
		'--disable-extensions',
		'--disable-gpu',
		'--disable-sync',
		'--disable-translate',
		'--hide-scrollbars',
		'--metrics-recording-only',
		'--mute-audio',
		'--no-first-run',
		'--safebrowsing-disable-auto-update'
	]
};

async function visitPage(url){
	const browser = await puppeteer.launch(browser_options);
	const page = await browser.newPage();
	await page.goto(url);
	await page.waitForTimeout(5000);
	await browser.close();
};

module.exports = { visitPage };