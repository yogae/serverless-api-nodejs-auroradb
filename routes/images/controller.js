const {
    response,
    request,
} = require('express');
const service = require('./service');

const list = ["qwe"];
/**
 * @param  {request} req
 * @param  {response} res
 */
exports.getImages = async function (req, res, next) {
    const {
        body
    } = req;
    res.status(200).json(list);
}