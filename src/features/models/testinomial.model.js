import mongoose from 'mongoose';
const { Schema } = mongoose;

const testinomialSchema = new mongoose.Schema({
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
    comment:{
        type:String,
        required:true
    }
}, {timestamps: true});

const TestinomialModel = mongoose.model('testinomial', testinomialSchema);
export default TestinomialModel;
