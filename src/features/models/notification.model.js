import mongoose, { Schema } from 'mongoose';
const notificationSchema = new Schema({
    title: {
        type:String,
        required: true
    },
    description: {
        type:String,
        required: true
    },
    isRead:{
        type: Boolean,
        default: false
    }

}, {timestamps: true});

const notificationModel = mongoose.model('notification', notificationSchema);
export default notificationModel;
