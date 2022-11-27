const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;


const brandSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "please Provide a Brand Name"],
        maxLength: 100,
        unique: true,
        lowercase: true
    },
    description: String,
    email: {
        type: String,
        validate: [validator.isEmail, 'Please Provide a Valid Email'],
        lowercase: true
    },
    website: {
        type: String,
        validate: [validator.isURL, 'Please Provide a Valid URL']
    },
    location: String,
    products: [{
        type: ObjectId,
        ref: 'Product'
    }],
    suppliers: [{
        name: String,
        contactNumber: String,
        id: {
            type: ObjectId,
            ref: 'Supplier'
        }
    }],
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }


}, {
    timestams: true
});

const Brand = mongoose.model("Brand", brandSchema);

exports = Brand;