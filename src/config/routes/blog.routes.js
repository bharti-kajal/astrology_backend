import express from "express";
const blogRouter = express.Router();
import BlogController from "../../features/controllers/Blog.controller.js";
import { upload } from "../../features/middlewares/file-upload.middleware.js";

const blogController = new BlogController();

blogRouter.post("/add-category", (req, res) => {
  blogController.addBlogCategory(req, res);
});

blogRouter.get("/category-list", (req, res) => {
  blogController.blogCategoryList(req, res);
});

blogRouter.delete("/delete-category", (req, res) => {
  blogController.blogCategoryDelete(req, res);
});

blogRouter.post("/update-category", (req, res) => {
  blogController.blogCategoryUpdate(req, res);
});

blogRouter.post("/add-blog", upload.single("image"), (req, res) => {
  blogController.addBlog(req, res);
});

blogRouter.get("/lists", (req, res) => {
  blogController.blogList(req, res);
});

blogRouter.delete("/delete-blog", (req, res) => {
  blogController.deleteBlog(req, res);
});

blogRouter.post("/update-blog", upload.single("image"), (req, res) =>
  blogController.updateBlog(req, res)
);

blogRouter.get("/:id", (req, res) => {
    blogController.blogDetails(req, res)
});

export default blogRouter;
