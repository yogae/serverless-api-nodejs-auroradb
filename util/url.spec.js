const {
    describe,
    it
} = require('mocha');
const {
    UrlConverter
} = require('./url');
const chai = require('chai');

/**
 * @type {UrlConverter}
 */
let urlConverter = null;
const domain = 'https://s3.test.com';
const resolutions = ['origin', 'standard', 'thumbnail'];
describe('url test', function () {

    before(async function () {
        urlConverter = new UrlConverter(domain, resolutions);
    });

    it('convertName2Url', async function () {
        const res = urlConverter.convertName2Url('test.jpg');
        Object.keys(res).forEach((key) => {
            chai.expect(resolutions).to.be.include(key);
            chai.expect(res[key].startsWith(domain)).to.be.equal(true);
        })
    });
})