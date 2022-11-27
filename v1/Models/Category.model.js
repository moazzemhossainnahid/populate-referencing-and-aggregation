const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;


const categorySchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        required: [true, 'Please Provide a Category Name']
    },
    description: String,
    imageURL: {
        type: String,
        validate: [validator.isURL, "Please Provide a Valid URL"]
    }



}, {
    timestamps: true
})

const Category = mongoose.model("Category", categorySchema);

exports = Category;