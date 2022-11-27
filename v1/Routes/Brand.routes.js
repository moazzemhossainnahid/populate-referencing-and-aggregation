const express = require('express');
const { createBrand, getAllBrands, getBrandById, updateBrand } = require('../Controllers/Brand.controller');
const router = express.Router();

router.route('/')
    .get(getAllBrands)
    .post(createBrand)

router.route('/:id')
    .get(getBrandById)
    .patch(updateBrand)



module.exports = router;