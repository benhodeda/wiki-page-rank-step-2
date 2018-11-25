const Page = require('./Page');

const pageByUrl = {};

module.exports = {
    getPage(url){
        pageByUrl[url] = pageByUrl[url] || new Page(url);
        return pageByUrl[url];
    }
};