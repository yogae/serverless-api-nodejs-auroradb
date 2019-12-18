const {
    Router
} = require('express');
const router = Router();

const controller = require('../../controller/imageController')

router.post('/', controller.postImage);

router.get('/', controller.getImages);

router.get('/:id', controller.getImage);

router.delete('/:id', controller.deleteImage);

module.exports = router;