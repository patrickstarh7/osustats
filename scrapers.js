/*const puppeteer = require('puppeteer');


async function scrapeProduct(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('//*[@id="productTitle"]');
    const txt = await el.getProperty('textContent');
    const rawTxt = await txt.jsonValue();

    console.log({rawTxt});

    browser.close();
}

scrapeProduct('https://www.amazon.com/Logitech-Tenkeyless-Lightspeed-Mechanical-LIGHTSYNC/dp/B07NY9ZRZG/ref=sr_1_5?crid=SQNDS1IYNOA9&keywords=logitech%2Bkeyboard&qid=1640889646&sprefix=logitech%2Bkeyboard%2Caps%2C52&sr=8-5&th=1');*/

const request = require('request');
const cheerio = require('cheerio');
const express = require('express')
const app = express();
const PORT = 8000;

app.use(express.json())

//listens for port and calls back when api is ready
app.listen(8000, () =>{
    console.log(`it's alive on http://localhost:${PORT}/osustats`);
})


app.get('/osustats', (req, res) => {
    request('https://osu.ppy.sh/rankings/osu/performance', (error, response, html) => {
        if(!error && response.statusCode == 200){
            const $ = cheerio.load(html);
            $('.ranking-page-table__row').each((i, el) => {
                const item = $(el).text().replace(/\s\s+/g, ' ').replace(/,/, '');
                const data = await item.json();
                res.status(200).send({
                    "player": item
                })
                //console.log(item);
            });
        }
    });
    console.log(req);
});

app.post('/osustats/:id', (req, res) => {
    const {id} = req.params;
    const {pfp} = req.body;

    if(!pfp){
        res.status(418).send({message: 'Default pfp!'})
    }

    res.send({
        osu_player: `username with id of ${id} and pfp of ${pfp}`,
    })

});