const cheerio = require('cheerio');
const fetcher = require('./fetcher');
const wikiLinksParser = require('./wikiLinksParser');
const GraphBuilder = require('./GraphBuilder');

module.exports = class Graph {
    constructor(url) {
        this.graph = GraphBuilder.build(url);
    }

    * pageRank() {
        const pagesCount = this.graph.allPages.size;
        let pageRanks = pageRankInit(this.graph.allPages);
        while (true) {
            this.graph.allPages.forEach(page => {
                pageRanks[page].rank = pageRanks[page].nextRank;
                pageRanks[page].nextRank = 0;
            });
            this.graph.allPages.forEach(page => {
                const links = page.follows.size;
                const l = page.followers;
                l.forEach(follower => {
                    pageRanks[page].nextRank += (pageRanks[follower].rank / links);
                });
            });
            let rankedPages = pageRanks.keys().map(page => {
                return {
                    page,
                    rank: pageRanks[page].nextRank
                }
            });
            yield pageRankSort(rankedPages);
        }
    }
};

function pageRankInit(pages) {
    let ranks = {};
    pages.forEach(page => {
        ranks[page] = {rank: 1 / pages.size}
    });
    return ranks;
}

function pageRankSort(rankedPages) {
    const sortedRankedPages = rankedPages.sort((page1, page2) => page2.rank - page1.rank);
    return sortedRankedPages.map(page => page.url)
}