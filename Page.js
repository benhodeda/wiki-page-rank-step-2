module.exports = class Page {
    constructor(url) {
        this.url = url;
        this.follows = new Set();
        this.followers = new Set();
    }
};