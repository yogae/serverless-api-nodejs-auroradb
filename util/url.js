class UrlConverter {

    /**
     *Creates an instance of URL.
     * @param {string} domain,
     * @param {string[]} resolutions
     * @memberof URL
     */
    constructor(domain, resolutions) {
        this.domain = domain;
        this.resolutions = resolutions;
    }


    /**
     *
     *
     * @param {string} name
     * @returns {{[key: string]: string}}
     * @memberof UrlConverter
     */
    convertName2Url(name) {
        return this.resolutions.reduce((acc, elem) => {
            acc[elem] = `${this.domain}/${elem}/${name}`;
            return acc;
        }, {});
    }
}

module.exports = {
    UrlConverter
}