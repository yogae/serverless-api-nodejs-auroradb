const {
    Image
} = require('../models');

class ImageRepository {
    constructor() {

    }

    /**
     *
     *
     * @param {string} name
     * @returns {Promise<{id: number, name: string}>}
     * @memberof ImageRepository
     */
    async createImage(name) {
        return Image.create({
            name
        }).then((res) => {
            return res.dataValues;
        });
    }


    /**
     *
     *
     * @param {number} id
     * @returns {Promise<{id: number, name: string}>}
     * @memberof ImageRepository
     */
    async findOneImage(id) {
        return Image.findByPk(id)
            .then((res) => {
                return res.dataValues;
            });
    }

    /**
     * @param {number} [limit=10]
     * @returns {Promise<{id: number, name: string}[]>}
     * @memberof ImageRepository
     */
    async listImages(limit = 10) {
        return Image.findAll({
            limit
        }).then((res) => {
            return res.map((image) => image.dataValues);
        });
    }

    /**
     * @param {number} id
     * @returns {Promise<{id: number, name: string}>}
     * @memberof ImageRepository
     */
    async removeOneImage(id) {
        return Image.destroy({
            where: {
                id,
            }
        }).then((res) => {
            return res.dataValues
        });
    }
}

module.exports = {
    ImageRepository
}