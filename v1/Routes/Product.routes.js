const express = require('express');
const router = express.Router();
const productController = require("../Controllers/Product.controller");
const uploader = require('../Middlewares/Uploader');



// const uploader = multer({dest:"Images/"});

router.post("/file-upload", uploader.array("image"), productController.fileUpload);



router.route('/')
    .get(productController.getProducts)
    .post(productController.createProduct)

    
    router.route('/bulk-update')
    .patch(productController.bulkUpdateProduct)    
    router.route('/bulk-delete')
    .delete(productController.bulkDeleteProduct)
    
    router.route('/:id')
        .patch(productController.updateProduct)
        .delete(productController.deleteProduct)

module.exports = router;