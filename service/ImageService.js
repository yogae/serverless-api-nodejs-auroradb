const {
    ImageRepository
} = require('../repository/imageRepository');
const {
    UrlConverter
} = require('../util/url');
const {
    S3Controller
} = require('../lib/aws');

const resolutions = ['origin', 'standard', 'thumbnail'];

function name2S3Key(resolution, name) {
    return `${resolution}/${name}`;
}

class ImageService {

    /**
     *Creates an instance of ImageService.
     * @param {ImageRepository} repo
     * @param {UrlConverter} urlConverter
     * @param {S3Controller} s3Ctr
     * @memberof ImageService
     */
    constructor(repo, urlConverter, s3Ctr) {
        this.repo = repo;
        this.urlConverter = urlConverter;
        this.s3Ctr = s3Ctr;
    }

    /**
     *
     * @param {string} name
     * @memberof ImageService
     */
    async createImage(name) {
        return this.repo.createImage(name);
    }


    /**
     *
     *
     * @param {number} id
     * @memberof ImageService
     */
    async findOneImage(id) {
        return this.repo.findOneImage(id);
    }

    /**
     *
     * @param {number} [limit=10]
     * @memberof ImageService
     */
    async listImages(limit = 10) {
        return this.repo.listImages(limit)
            .then((res) => {
                return res.map((image) => {
                    return this.urlConverter.convertName2Url(image.name);
                })
            });
    }


    /**
     *
     *
     * @param {number} id
     * @memberof ImageService
     */
    async removeObject(id) {
        const {
            name
        } = await this.repo.findOneImage(id);
        const keys = resolutions.map((resolution) => {
            return name2S3Key(resolution, name);
        });
        const promises = keys.map((key) => {
            return this.s3Ctr.removeObject(key);
        });
        return Promise.all(promises);
    }
}

module.exports = {
    ImageService
}