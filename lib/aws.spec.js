const AWS = require('aws-sdk');
const {
    S3Controller
} = require('./aws');
const {
    describe
} = require('mocha');
const sinon = require('sinon');
const chai = require('chai');

/**
 * @type {S3Controller}
 */
let s3Controller = null;

/**
 * @type {AWS.S3}
 */
let s3 = null;
describe('aws test', function () {
    before(function () {
        s3 = new AWS.S3();
        sinon.stub(s3, 'deleteObject').returns({
            promise: () => {
                return Promise.resolve();
            }
        });
        s3Controller = new S3Controller(s3, 'testBucket');
    });

    it('remove object', async function () {
        const key = 'origin/test.jpg';
        const res = await s3Controller.removeObject(key);
        chai.expect(res).to.be.equal(key);
    });
});