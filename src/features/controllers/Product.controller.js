import { ProductCategoryModel } from "../models/productCategory.model.js";
import ProductModel from "../models/product.model.js";
import CommonRepository from "../repository/common.repository.js";
class ProductController {
  
  constructor() {
    this.commonRepository = new CommonRepository();
  }

  // Product Add
  async addProduct(req, res) {
    try {
      const { name, description, categoryId, status, price, discount_price } =
        req.body;

      if (!req.file) {
        return res.status(400).json({ message: "Image file is missing" });
      }

      const fileName = req.file.filename;
      const data = {
        name,
        price,
        discount_price,
        description,
        categoryId,
        status,
        image: fileName,
      };

      let result = await this.commonRepository.add(data, ProductModel);
      if (result) {
        res
          .status(201)
          .json({ status: true, message: "Product Added Successfully!" });
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

  // Product Lists
  async ProductList(req, res) {
    try {
      const cond = { status: true };
      const result = await this.commonRepository.get(ProductModel, cond);
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

  // Start Delete Product
  async deleteProduct(req, res) {
    try {
      const productId = req.body.productId;
      if (!productId) {
        res
          .status(200)
          .json({ status: false, message: "productId Not correct" });
      }

      const filter = { _id: productId };
      const update = { status: false };

      const result = await this.commonRepository.delete(
        filter,
        update,
        ProductModel
      );
      if (result) {
        res
          .status(200)
          .json({ status: 200, message: "Product Deleted Successfully!" });
      } else {
        res.status(400).json({ status: 400, message: "Something Went Wrong!" });
      }
    } catch (err) {
      console.error("Error in controller", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  // End Delete Product

  // Update Product Details
  async updateProduct(req, res) {
    try {
      const {
        name,
        description,
        categoryId,
        status,
        price,
        discount_price,
        productId,
      } = req.body;

      if (!req.file) {
        return res.status(400).json({ message: "Image file is missing" });
      }

      const fileName = req.file.filename;
      const data = {
        name,
        price,
        discount_price,
        description,
        categoryId,
        status,
        image: fileName,
      };

      let result = await this.commonRepository.update(
        productId,
        data,
        ProductModel
      );
      if (result) {
        res
          .status(200)
          .json({ status: true, message: "Product Updated Successfully!" });
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
  // End Product Details

  // Add Function
  async addProductCategory(req, res) {
    try {
      const { name, status } = req.body;
      const data = { name, status };
      let result = await this.commonRepository.add(data, ProductCategoryModel);
      if (result) {
        res
          .status(201)
          .json({
            status: true,
            message: "Product Category Created Successfully!",
          });
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
  async ProductCategoryList(req, res) {
    try {
      const cond = { status: 1 };

      const ProductCategory = await this.commonRepository.get(
        ProductCategoryModel,
        cond
      );
      if (ProductCategory) {
        res.status(200).json({ status: true, message: ProductCategory });
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

  // Delete Product Category / Status Updated
  async ProductCategoryDelete(req, res) {
    try {
      const ProductId = req.body.ProductId;

      if (!ProductId) {
        res
          .status(400)
          .json({
            status: false,
            message: "Product Id Not Found in Our DB Product Lists",
          });
      }

      const filter = { _id: ProductId };
      const update = { status: 0 };
      let result = await this.commonRepository.delete(
        filter,
        update,
        ProductCategoryModel
      );

      if (result) {
        res.status(200).json({
          status: true,
          message: "Product Category Deleted Successfully!",
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

  // Update Product Details
  async ProductCategoryUpdate(req, res) {
    try {
      const { name, status, productId } = req.body;
      const data = { name, status };
      let result = await this.commonRepository.update(
        productId,
        data,
        ProductCategoryModel
      );
      if (result) {
        return res.status(200).json({
          status: true,
          message: "Product Category Updated Successfully!",
        });
      }
    } catch (err) {
      return res.status(200).json({
        status: false,
        message: "Product Category Updated Successfully!",
      });
      console.log("Error in controller", err);
    }
  }
}

export default ProductController;
