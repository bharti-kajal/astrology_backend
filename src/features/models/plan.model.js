import mongoose from 'mongoose';
const { Schema } = mongoose;

const planSchema = new mongoose.Schema({
    planName:{
        type:String,
        required: true
    },
    extra:{
        type: String
    },
    price:{
        type:Number,
        default:0
    },
    status: {
        type: Boolean,
        default: true
    }
}, {timestamps: true});

const PlanModel = mongoose.model('pricing', planSchema);
export default PlanModel;
