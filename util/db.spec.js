const dotenvJSON = require('dotenv-json');
dotenvJSON({
    path: "./env/.env_dev.json"
});

const {
    describe,
    it
} = require('mocha');
const {
    sequelize,
    Image
} = require('./db');

const name = 'test';
describe('db connection', function () {
    this.timeout(5000);

    before(async function () {
        await Image.sync();
    });

    after(async function () {
        await sequelize.close();
    });

    it('create', async function () {
        const res = await Image.create({
            name,
        });
    });

    it('list', async function () {
        const res = await Image.findAll();
        console.log(res);
    });

    it('remove', async function () {
        const res = await Image.destroy({
            where: {
                name,
            }
        });
        console.log(res);
    });
})