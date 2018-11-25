const cheerio = require('cheerio');
const unique = array => [...new Set(array)];
const BASE = 'https://he.wikipedia.org';

module.exports = {
    parse(body) {
        const $ = cheerio.load(body);
        const links = $('#mw-content-text .mw-parser-output p a')
            .toArray()
            .map(a => a.attribs['href'])
            .filter(href => href && href.startsWith('/wiki/'))
            .map(suffix => `${BASE}${suffix}`);

        return unique(links);
    }
};