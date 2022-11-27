const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;


// =================================================================

// SHEMA => MODEL => QUERY

// =================================================================


// Schema Design
const stockSchema = mongoose.Schema({
    ProductId: {
        type: ObjectId,
        required: true,
        ref: 'Product'
    },
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
        required: rtue,
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
    price: {
        type: Number,
        required: true,
        min: [0, "Product Price Can't be Negative"]
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, "Product Quantity Can't be Negative"]
    },
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
    },
    stock: {
        type: String,
        requird: true,
        enum: {
            values: ['in-stock', 'out-of-stock', 'discontinued'],
            message: "Status Can't be {VALUE}"
        }
    },
    store: {
        name: {
            type: String,
            trim: true,
            lowercase: true,
            required: [true, 'Please Provide a Store Name'],
            enum: {
                values: ['Dhaka', 'Chittagong', 'Sylhet', 'Khulna', 'Barishal', 'Mymensingh', 'Rajshahi', 'Rangpur'],
                message: "{VALUE} is not a valid name"
            }
        },
        id: {
            type: ObjectId,
            requird: true,
            ref: "Store"
        }
    },
    suppiredBy: {
        name: {
            type: String,
            trim: true,
            required: [true, 'Please Provide a Supplier Name'],
        },
        id: {
            type: ObjectId,
            requird: true,
            ref: "Supplier"
        }
    }

}, { timestamps: true });

// =================================================================

// Mongoose Middlewares for saving data: pre / post

stockSchema.pre('save', function (next) {
    // this =>
    console.log("Before Saving Data");
    if (this.quantity === 0) {
        this.status = "out-of-stock"
    };

    next();
});

stockSchema.methods.logger = function () {
    console.log(`Data Saved for ${this.name}`);
}

// =================================================================

// Add Model

const Stock = mongoose.model("Stock", stockSchema);



module.exports = Stock;
