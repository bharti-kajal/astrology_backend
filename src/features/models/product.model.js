import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    status:{
        type:Boolean,
        default:1
    },
    categoryId:{
        type: Schema.Types.ObjectId, ref: 'ProductCategory'
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required: true
    },
    discount_price:{
        type:String,
        required: true
    }
}, {timestamps: true});

const ProductModel = mongoose.model('product', productSchema);
export default ProductModel;
