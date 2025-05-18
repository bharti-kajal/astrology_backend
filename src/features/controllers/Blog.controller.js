import { BlogCategoryModel } from "../models/blogCategory.model.js";
import BlogModel from "../models/blog.model.js";
import CommonRepository from "../repository/common.repository.js";
class BlogController {
  constructor() {
    this.commonRepository = new CommonRepository();
  }

  // Blog Add
  async addBlog(req, res) {
    try {
      const { title, description, category, status } = req.body;

      if (!req.file) {
        return res.status(400).json({ message: "Image file is missing" });
      }

      const fileName = req.file.filename;
      const data = {
        title: title,
        description: description,
        categoryId: category,
        status: status,
        image: fileName,
      };

      let result = await this.commonRepository.add(data, BlogModel);
      if (result) {
        res
          .status(201)
          .json({ status: true, message: "Blog Added Successfully!" });
      } else {
        res
          .status(400)
          .json({ status: false, message: "Something Went Wrong!" });
      }
    } catch (err) {
      console.error("Error in controller", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // Blog Lists
  async blogList(req, res) {
    try {
      const cond = { status: true };
      const result = await this.commonRepository.get(BlogModel, cond);
      if (result) {
        res.status(200).json({ status: true, data: result });
      } else {
        res
          .status(400)
          .json({ status: false, message: "Something went wrong" });
      }
    } catch (err) {
      console.log("Error in Controller", err);
      res.status(500).json({ status: false, message: "Internal Server Error" });
    }
  }
  // End

  // Start Delete Blog
  async deleteBlog(req, res) {
    try {
      const blogId = req.body.blogId;
      if(!blogId){
        res.status(200).json({status: false, message: "BlogId Not correct"});
      }

      const filter = {"_id": blogId};
      const update = {"status": false};
      
      const result = await this.commonRepository.delete(filter, update, BlogModel);
      if(result){
        res.status(200).json({status: 200, message: "Blog Deleted Successfully!"});
      }
      else{
        res.status(400).json({status: 400, message: "Somwthing Went Wrong!"});
      }
    } catch (err) {
      console.error("Error in controller", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  // End Delete Blog


  // Update Blog Details
async updateBlog(req, res){
  try{
    const { blogId, title, description, category, status} = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "Image file is missing" });
    }

    const fileName = req.file.filename;
    const data = {
      title: title,
      description: description,
      categoryId: category,
      status: status,
      image: fileName,
    };

    let result = await this.commonRepository.update(blogId, data, BlogModel);
    if (result) {
      res
        .status(200)
        .json({ status: true, message: "Blog Updated Successfully!" });
    } else {
      res
        .status(400)
        .json({ status: false, message: "Something Went Wrong!" });
    }

  }
  catch (err) {
    console.error("Error in controller", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
  // End Blog Details 

  // Add Function
  async addBlogCategory(req, res) {
    try {
      const { name, status } = req.body;
      const data = { name, status };
      let result = await this.commonRepository.add(data, BlogCategoryModel);
      if (result) {
        res
          .status(201)
          .json({ status: true, message: "Blog Created Successfully!" });
      } else {
        res
          .status(400)
          .json({ status: false, message: "Something Went Wrong!" });
      }
    } catch (err) {
      res.status(400).json({ status: false, message: err.message });
      console.log("Error in controller", err);
    }
  }

  // Get Category Lists
  async blogCategoryList(req, res) {
    try {
      const cond = { status: 1 };

      const blogCategory = await this.commonRepository.get(
        BlogCategoryModel,
        cond
      );
      if (blogCategory) {
        res.status(200).json({ status: true, data: blogCategory });
      } else {
        res
          .status(400)
          .json({ status: false, message: "Something Went Wrong" });
      }
    } catch (err) {
      res.status(400).json({ status: false, message: err.message });
      console.log("Error in controller", err);
    }
  }

  // Delete Blog Category / Status Updated
  async blogCategoryDelete(req, res) {
    try {
      const blogId = req.body.blogId;

      if(!blogId){
        res.status(400).json({status: false, message:"Blog Id Not Found in Our DB Blog Lists"});
      }

      const filter = { _id: blogId };
      const update = { status: 0 };
      let result = await this.commonRepository.delete(
        filter,
        update,
        BlogCategoryModel
      );

      if (result) {
        res
          .status(200)
          .json({
            status: true,
            message: "Blog Category Deleted Successfully!",
          });
      } else {
        res
          .status(400)
          .json({ status: false, message: "Something Went Wrong!" });
      }
    } catch (err) {
      console.log("Error in controller", err);
    }
  }

  // Update Blog Details
  async blogCategoryUpdate(req, res) {
    try {
      const { name, status, blogId } = req.body;
      const data = { name, status };
      let result = await this.commonRepository.update(
        blogId,
        data,
        BlogCategoryModel
      );
      if (result) {
        return res
          .status(200)
          .json({
            status: true,
            message: "Blog Category Updated Successfully!",
          });
      }
    } catch (err) {
      return res
        .status(200)
        .json({
          status: false,
          message: "Blog Category Updated Successfully!",
        });
      console.log("Error in controller", err);
    }
  }

  async blogDetails(req, res){
      try{
        const blogId = req.params.id;
        if(!req.params.id){
          return res.status(400).json({status: false, message: "Something Went wrong"});
        }
        const result = await this.commonRepository.getById(blogId, BlogModel);
        if(result){
          res.status(200).json({status: true, data: result});
        }else {
          res.status(400).json({status: false, message: "Somethinf Went Wrong"});
        }
      }catch (err) {
            console.error("Error in controller", err);
            res.status(500).json({ message: "Internal Server Error" });
          }
    }

}

// Comments Part Start

// End Comments part 

// Like Parts 

export default BlogController;
