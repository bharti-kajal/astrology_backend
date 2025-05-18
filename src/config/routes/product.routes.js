import express from "express";
const productRouter = express.Router();
import ProductController from "../../features/controllers/Product.controller.js";
import { upload } from "../../features/middlewares/file-upload.middleware.js";

const productController = new ProductController();

productRouter.post("/add-category", (req, res) => {
  productController.addProductCategory(req, res);
});

productRouter.get("/category-list", (req, res) => {
  productController.ProductCategoryList(req, res);
});

productRouter.delete("/delete-category", (req, res) => {
  productController.ProductCategoryDelete(req, res);
});

productRouter.post("/update-category", (req, res) => {
  productController.ProductCategoryUpdate(req, res);
});

productRouter.post("/add-product", upload.single("image"), (req, res) => {
  productController.addProduct(req, res);
});

productRouter.get("/lists", (req, res) => {
  productController.ProductList(req, res);
});

productRouter.delete("/delete-product", (req, res) => {
  productController.deleteProduct(req, res);
});

productRouter.post("/update-product", upload.single("image"), (req, res) =>
  productController.updateProduct(req, res)
);

export default productRouter;
