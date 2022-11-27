const Product = require("../Models/Product.model")

exports.getProductsService = async (queryObject, queries) => {
    const Products = await Product
        .find(queryObject)
        .skip(queries.skip)
        .limit(queries.limit)
        .sort(queries.sortBy)
        .select(queries.fields);

    const totalProducts = await Product.countDocuments(queryObject);
    const pageCount = Math.ceil(totalProducts / queries.limit);

    return { totalProducts, pageCount, Products };
};

exports.createProductService = async (data) => {
    const product = await Product.create(data);
    return product;
};

exports.updateProductService = async (productId, data) => {
    const result = await Product.updateOne({ _id: productId }, { $set: data }, { runValidators: true });
    return result;
};

exports.bulkUpdateProductService = async (data) => {
    // const result = await Product.updateMany({ _id: data.ids }, data.data, {runValidators: true});
    // return result;

    const products = [];
    data.ids.forEach(product => {
        products.push(product.updateOne({ _id: product.id }, product.data))
    });
    const result = await Promise.all(products);
    return result;
};

exports.deleteProductService = async (productId) => {
    const result = await Product.deleteOne({ _id: productId });
    return result;
};

exports.bulkDeleteProductService = async (ids) => {
    const result = await Product.deleteMany({});
    return result;
};