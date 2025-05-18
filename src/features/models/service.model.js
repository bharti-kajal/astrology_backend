import mongoose from 'mongoose';
const { Schema } = mongoose;

const serviceSchema = new mongoose.Schema({
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
    description:{
        type:String,
        required:true
    }
}, {timestamps: true});

const ServiceModel = mongoose.model('service', serviceSchema);
export default ServiceModel;
