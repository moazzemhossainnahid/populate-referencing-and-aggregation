const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;


// =================================================================

// SHEMA => MODEL => QUERY

// =================================================================


// Schema Design
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Provide a Name for this Product."],
        trim: true,
        lowercase: true,
        unique: [true, "Name must be unique."],
        minlength: [3, "Name Must be at least 3 Charecters."],
        maxlength: [100, "Name is too large."],

    },
    description: {
        type: String,
        required: [true, "Please Provide a Description for this Product."],
    },
    unit: {
        type: String,
        required: [true],
        enum: {
            values: ["kg", "litre", "pcs", "bag"],
            message: "Unit value Can't be {VALUE}, must be kg/litre/pcs/bag."
        },
    },
    imageURLs: [{
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                if (!Array.isArray(value)) {
                    return false
                };
                let isValid = true;
                value.forEach(url => {
                    if (!validator.isURL(url)) {
                        isValid = false
                    }
                });
                return isValid;
            },
            message: "Please Provide a Valid Image URL"
        }
    }],
    category: {
        type: String,
        required: true
    },
    brand: {
        name: {
            type: String,
            required: true
        },
        id: {
            type: ObjectId,
            ref: 'Brand',
            required: true
        }
    }

    // createdAt: {
    //     type: Date,
    //     default: Date.now,
    // },
    // updatedAt: {
    //     type: Date,
    //     default: Date.now,
    // },
    // supplier: {
    //     type: mongoose.Schema.Types.OnjectId,
    //     ref: "Supplier"
    // },
    // categories: [{
    //     name: {
    //         type: String,
    //         required: true
    //     },
    //     _id: {
    //         type: mongoose.Schema.Types.OnjectId,
    //     }
    // }],




}, { timestamps: true });

// =================================================================

// Mongoose Middlewares for saving data: pre / post

productSchema.pre('save', function (next) {
    // this =>
    console.log("Before Saving Data");
    if (this.quantity === 0) {
        this.status = "out-of-stock"
    };

    next();
});

productSchema.methods.logger = function () {
    console.log(`Data Saved for ${this.name}`);
}

// =================================================================

// Add Model

const Product = mongoose.model("Product", productSchema);



module.exports = Product;
