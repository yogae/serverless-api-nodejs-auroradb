const {
    ImageRepository
} = require('./imageRepository');
const {
    sequelize,
    Image
} = require('../util/db');
const {
    describe,
    it
} = require('mocha');
const sinon = require('sinon');
const chai = require('chai');

/**
 * @type {ImageRepository}
 */
let repo = null;
/**
 * @type {sinon.SinonSandbox}
 */
let sandbox = null;

describe('image repository test', function () {
    const testName = 'test';

    before(async function () {
        sandbox = sinon.createSandbox();
        sinon.stub(Image, 'create').resolves({
            dataValues: {
                id: 1,
                name: testName
            }
        });

        sinon.stub(Image, 'findOne').resolves({
            dataValues: {
                id: 1,
                name: testName
            }
        });

        sinon.stub(Image, 'findAll').resolves([{
                dataValues: {
                    id: 1,
                    name: 'test1'
                },
            },
            {
                dataValues: {
                    id: 2,
                    name: 'test2'
                },
            },
            {
                dataValues: {
                    id: 3,
                    name: 'test3'
                },
            }
        ]);

        sinon.stub(Image, 'destroy').resolves({
            dataValues: {
                id: 1,
                name: testName
            }
        });

        repo = new ImageRepository();
    });

    it('createImage test', async function () {
        const res = await repo.createImage(testName);
        chai.expect(res.id).to.be.equals(1);
    });

    it('findOneImage test', async function () {
        const res = await repo.findOneImage(1);
        chai.expect(res.name).to.be.equals('test');
    });

    it('listImages test', async function () {
        const res = await repo.listImages();
        chai.expect(res.length).to.be.equals(3);
    });

    it('removeOneImage test', async function () {
        const res = await repo.removeOneImage(1);
        chai.expect(res.id).to.be.equals(1);
    });
});