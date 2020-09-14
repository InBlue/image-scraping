module.exports = async (options) => {
    console.clear();
    if(!options) return process.exit(0);
    const Scraper = require('images-scraper');
    const axios = require('axios');
    const fs = require('fs');
    const google = new Scraper({ puppeteer: { headless: false, }});
    const ProgressBar = require('progress');
    
    console.log();
    const bar = new ProgressBar('Downloading [:bar] :percent', {
      complete: '=',
      incomplete: ' ',
      width: 20,
      total: options.amount
    });

    let download = async(url, filename) => {
        await axios({
            url: url,
            responseType: 'stream'
        })
        .then(async res => {
            if(res.headers['content-type'].split("/")[1].includes("html") || res.headers['content-type'].split("/")[1].includes("-stream")) return;
            await res.data.pipe(fs.createWriteStream(`${filename}.${res.headers['content-type'].split("/")[1]}`));
            bar.tick(1);
        })
        .catch(e => {
            return;
        })
    }

    const results = await google.scrape(options.query, options.amount);
    results.forEach(async (res, i) => {
        await download(res.url, `${options.dir}${options.prefix}-${i+1}`);
    });
};