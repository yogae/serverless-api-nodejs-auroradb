const AWS = require('aws-sdk');

class S3Controller {

    /**
     *Creates an instance of S3Controller.
     * @param {AWS.S3} s3
     * @param {string} bucketName
     * @memberof S3Controller
     */
    constructor(s3, bucketName) {
        this.bucketName = bucketName;
        this.s3 = s3;
    }

    /**
     *
     *
     * @param {string} key
     * @returns {Promise<string>}
     * @memberof S3Controller
     */
    async removeObject(key) {
        return this.s3.deleteObject({
            Bucket: this.bucketName,
            Key: key
        }).promise().then(() => {
            return key;
        });
    }
}

module.exports = {
    S3Controller
}