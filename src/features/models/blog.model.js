import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogSchema = new mongoose.Schema({
    title:{
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
   categories: [
    {
      type: String
    }
  ],
    description:{
        type:String,
        required:true
    }
}, {timestamps: true});

const BlogModel = mongoose.model('blog', blogSchema);
export default BlogModel;
