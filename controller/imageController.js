const {
    ImageService
} = require('../service/ImageService');
const AWS = require('aws-sdk');
const {
    ImageRepository
} = require('../repository/imageRepository');
const {
    UrlConverter
} = require('../util/url');
const {
    S3Controller
} = require('../lib/aws');

const bucketName = process.env.BUCKET_NAME;
const cfDomain = process.env.CF_DOMAIN;

const urlConverter = new UrlConverter(cfDomain, ['origin', 'standard', 'thumbnail']);
const s3Ctr = new S3Controller(new AWS.S3(), bucketName);
const service = new ImageService(new ImageRepository(), urlConverter, s3Ctr);

exports.getImages = async function (req, res, next) {
    try {
        const images = await service.listImages();
        res.status(200).json(images);
    } catch (err) {
        next(err);
    }
}

exports.getImage = async function (req, res, next) {
    const {
        param
    } = req;
    try {
        const idNum = Number.parseInt(param.id);
        const image = await service.findOneImage(idNum);
        res.status(200).json(image);
    } catch (err) {
        next(err);
    }
}


exports.postImage = async function (req, res, next) {
    const {
        body
    } = req;
    try {
        const imageObject = await service.createImage(body.name);
        res.status(201).json(imageObject);
    } catch (err) {
        next(err);
    }
}

exports.deleteImage = async function (req, res, next) {
    const {
        param
    } = req;
    try {
        const idNum = Number.parseInt(param.id);
        const imageObject = await service.removeObject(idNum);
        res.status(200).json(imageObject);
    } catch (err) {
        next(err);
    }
}