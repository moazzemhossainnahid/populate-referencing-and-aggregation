const { createBrandService, getAllBrandsService, getBrandByIdService, updateBrandService } = require("../Services/Brand.service");


exports.createBrand = async (req, res, next) => {
    try {

        const result = await createBrandService(req.body);

        result.logger();


        res.status(200).json({
            status: "success",
            message: "Data Inserted Successfull.",
            data: result
        });
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Data isn't Inserted",
            error: error.message
        })
    };
};
exports.getAllBrands = async (req, res, next) => {
    try {

        const brands = await getAllBrandsService(req.body);

        res.status(200).json({
            status: "success",
            message: "Data Get Successfull.",
            data: brands
        });
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Data isn't Get",
            error: error.message
        })
    };
};
exports.getBrandById = async (req, res, next) => {
    try {
        const { id } = req.prams;
        const brand = await getBrandByIdService(id);

        if (!brand) {
            return res.status(400).json({
                status: "failed",
                message: "Coudn't find a brand in this id",
                error: error.message
            })
        }
        res.status(200).json({
            status: "success",
            message: "Data Get Successfull.",
            data: brand
        });
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Data isn't Get",
            error: error.message
        })
    };
};
exports.updateBrand = async (req, res, next) => {
    try {
        const { id } = req.prams;
        const result = await updateBrandService(id, req.body);

        if (!result.nModified) {
            return res.status(400).json({
                status: "failed",
                message: "Coudn't update the brand in this id",
                error: error.message
            })
        }
        res.status(200).json({
            status: "success",
            message: "Data Updated Successfull.",
            data: result
        });
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Data isn't Update",
            error: error.message
        })
    };
};