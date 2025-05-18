import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
    price:{
        type:Number,
        required: true
    },
    extra: {
        type: String
    },
    status: {
        type: Boolean,
        default: 0
    }

}, {timestamps: true});

const planModel = mongoose.model('price_plan', planSchema);

export default planModel;