const { getProductsService, createProductService, updateProductService, deleteProductService, bulkUpdateProductService, bulkDeleteProductService } = require("../Services/Product.service");

exports.getProducts = async (req, res, next) => {
    try {
        // Operators
        // =============================================================================================
        // =============================================================================================
        let queryObject = { ...req.query };

        // sort - page - limit => exclude
        const excludeFields = ['sort', 'page', 'limit'];

        excludeFields?.forEach(field => delete queryObject[field]);

        const queries = {};

        if (req.query.sort) {
            // price, quantity => 'price quantity'

            const sortBy = req.query.sort.split(',').join(' ');
            queries.sortBy = sortBy
            console.log(sortBy);
        };



        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            queries.fields = fields
            // for not showing id
            // fields=name,des,-_id
        }

        if (req.query.limit) {
            const limit = req.query.limit;
            queries.limit = (limit * 1);
          }
        

        // {price:{$gt:50}}

        // gt, lt, gte, lte, ne
        let filterString = JSON.stringify(queryObject);
        filterString = filterString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

        queryObject = JSON.parse(filterString);



        // Pagination

        if (req.query.page){

            const {page = 1, limit= 10} = req.query;   //'3' '10'
            queries.limit = limit;
            const skip = (page - 1) * parseInt(limit);

            queries.skip = skip
            queries.limit = parseInt(limit)
        };


        const products = await getProductsService(queryObject, queries);

        // ==========================
        // Get by ID
        // ==========================
        // const products = await Product.find({ _id: "636a67aa073826aede164c52" });

        // ==========================
        // Or operator
        // ==========================
        // const products = await Product.find({$or: [{ _id: "636a67aa073826aede164c52" }, {name: "Rice"}]});

        // ==========================
        // Not Equal
        // ==========================
        // const products = await Product.find({ status: { $ne: "out-of-stock" } });

        // ==========================
        // Greter than Equal
        // ==========================
        // const products = await Product.find({ quantity: { $gte: 100 } });

        // ==========================
        // in Operator
        // ==========================
        // const products = await Product.find({ name: { $in: ["Rice", "Soyabin Oil"] } });

        // =============================================================================================
        // =============================================================================================

        // Projection
        // const products = await Product.find({}, "name quantity price");
        // const products = await Product.find({}, "-name -quantity");

        // sorting
        // const products = await Product.find({}).sort({ quantity: 1 });
        // const products = await Product.find({}).sort({ quantity: -1 });

        // selete
        // const products = await Product.find({}).select({ name: 1 });

        // chaining
        /*         const products = await (await Product
                    .where("name").equals(/\w/)
                    .where("quantity").gt(100).lt(600)
                    .limit(2).sort({quantity: -1})); */

        // find by id
        // const product = await Product.findById("636a5f04929eb7c6250c49b8");

        // others
        /*         const product = await Product.findById(undefined);
                const product = await Product.findById(_undefined); */



        res.status(200).json({
            status: "success",
            message: "Data Get Successfull",
            data: products
        });

    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Can't Get Data",
            error: error.message
        });
    };
};



exports.createProduct = async (req, res, next) => {
    try {
        // save or create


        /*         // save
                const product = new Product(req.body);
        
                // Instance Creation => Do Something => Save()
        
                if (product.quantity === 0) {
                    product.status = "out-of-stock"
                }
                const result = await product.save(); */

        // create
        const result = await createProductService(req.body);

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

// without service
/* exports.updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Product.updateOne({ _id: id }, { $set: req.body });

        res.status(200).json({
            status: "success",
            message: "Data Updated Successfull.",
            data: result
        });

    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Data isn't Updated",
            error: error.message
        })
    };
}; */

// with service
exports.updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateProductService(id, req.body)

        res.status(200).json({
            status: "success",
            message: "Data Updated Successfull.",
            data: result
        });

    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Data isn't Updated",
            error: error.message
        })
    };
};


// bulk update
exports.bulkUpdateProduct = async (req, res, next) => {
    try {
        const result = await bulkUpdateProductService(req.body)

        res.status(200).json({
            status: "success",
            message: "Bulk Data Updated Successfull.",
            data: result
        });

    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Bulk Data isn't Updated",
            error: error.message
        });
    };
};


// with service delete
exports.deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await deleteProductService(id)

        res.status(200).json({
            status: "success",
            message: "Data Deleted Successfull.",
            data: result
        });

    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Data isn't Deleted",
            error: error.message
        })
    };
};




// bulk delete
exports.bulkDeleteProduct = async (req, res, next) => {
    try {
        console.log(req.body)
        const result = await bulkDeleteProductService(req.body.ids);

        res.status(200).json({
            stauts: "success",
            message: "Successfully deleted the given products",
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't delete the given products",
            error: error.message,
        });
    }
};
