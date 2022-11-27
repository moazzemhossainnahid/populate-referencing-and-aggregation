const Category = require('../Models/Category.model')


exports.getCategoriesService = async () => {
    const categories = await Category.find({});
    return categories;
}

exports.createCategoryService = async (data) => {
    const category = await Category.create(data);
    return category;
}