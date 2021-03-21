const express = require('express');
const ejs = require('ejs');
const path = require('path');
const pupeeter = require('puppeteer');

const app = express();

app.get('/pdf', async (req, res) => {
	const browser = await pupeeter.launch();
	const page = await browser.newPage();

	await page.goto('http://localhost:3000', {
		waitUntil: 'networkidle0'
	});

	const pdf = await page.pdf({
		printBackground: true,
		format: 'letter',

	})

	await browser.close();

	res.contentType('application/pdf')
	return res.send(pdf);
});

app.get('/', (req, res) => {

	const reportFile = path.join(__dirname, 'template', 'relatorio.ejs');
	const data = { suggestion1: 'Matheus', suggestion2: 'Alice', suggestion3: 'suggestion3', suggestion4: 'suggestion4' };

	ejs.renderFile(reportFile, data, (err, html) => {
		if (err) {
			return res.send('Erro na leitura do arquivo');
		}
		res.send(html);
	});

});

app.listen(3000);