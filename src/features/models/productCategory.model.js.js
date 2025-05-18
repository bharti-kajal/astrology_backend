import mongoose from "mongoose";

const productCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: 0
    }
}, {timestamps: true});

export const ProductCategoryModel = mongoose.model('product_category', productCategorySchema);
