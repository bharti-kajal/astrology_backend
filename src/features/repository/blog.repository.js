import BlogModel from '../models/blog.model.js'

class BlogRepository {

  async get(userId, limit=0) {
    try{
        return await BlogModel.find({"userId": userId}).limit(limit);
    }catch(err){
      console.log("Error", err);
    }
  }

  async add(insertData, ) {
    try {
      const transaction = new BlogModel(insertData);
      return await transaction.save();
    } catch (err) {
      console.log("Error", err);
    }
  }

  async update(userId, updateData) {
    try {
      return await BlogModel.findByIdAndUpdate(userId, updateData);
    } catch (err) {
      console.log("Error", err);
    }
  }

  async findById(id){
    try{
      return await BlogModel.findOne({"_id": id}).select("amount");
    }catch(err){
      console.log("Error ", err);
    }
  }

}

export default BlogRepository;

