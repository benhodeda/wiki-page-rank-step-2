const request = require('request-promise-native');

module.exports = function fetch(url) {
    const options = { url };
    return request(options);
};