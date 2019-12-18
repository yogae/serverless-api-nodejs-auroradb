const {
    ImageService
} = require('./ImageService');
const {
    describe,
    it
} = require('mocha');
const sinon = require('sinon');
const {
    ImageRepository
} = require('../repository/imageRepository');
const {
    UrlConverter
} = require('../util/url');
const {
    S3Controller
} = require('../lib/aws');
const AWS = require('aws-sdk');

/**
 * @type {ImageService}
 */
let service = null;

/**
 * @type {ImageRepository}
 */
let repo = null;

/**
 * @type {UrlConverter}
 */
let urlConverter = null;

/** 
 * @type {S3Controller}
 */
let s3Controller = null;

/**
 * @type {AWS.S3}
 */
let s3 = null;

const resolutions = ['origin', 'standard', 'thumbnail'];
describe('image service test', function () {
    const domain = 'https://s3.test.com';
    const resolution = ['origin', 'standard', 'thumbnail'];

    before(async function () {
        repo = new ImageRepository();
        sinon.stub(repo, 'createImage').resolves({
            id: 1,
            name: 'test.jpg'
        });
        sinon.stub(repo, 'findOneImage').resolves({
            id: 1,
            name: 'test.jpg'
        });
        sinon.stub(repo, 'listImages').resolves([{
            id: 1,
            name: 'test.jpg'
        }, {
            id: 2,
            name: 'test2.jpg'
        }]);
        sinon.stub(repo, 'removeOneImage').resolves({
            id: 1,
            name: 'test.jpg'
        });
        urlConverter = new UrlConverter(domain, resolution);
        s3 = new AWS.S3();
        s3Controller = new S3Controller(s3, 'testBucket');
        const s3Stub = sinon.stub(s3Controller, 'removeObject').resolves(`${resolution}/test.jpg`);
        resolutions.forEach((resolution) => {
            s3Stub.withArgs(`${resolution}/test.jpg`).resolves(`${resolution}/test.jpg`);
        })
        service = new ImageService(repo, urlConverter, s3Controller);
    });

    it('createImage', async function () {
        const res = await service.createImage('test.jpg');
        console.log(res);
    });

    it('listImages', async function () {
        const res = await service.listImages();
        console.log(res);
    });

    it('remove Image', async function () {
        const res = await service.removeObject(1);
        console.log(res);
    });
});