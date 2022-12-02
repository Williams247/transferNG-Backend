import { Request, Response } from "express";
import { ProductModel } from "../../models";
import { ValidateProduct, ProductSchemaProps } from "../../utils";

export const handleAddProduct = async (
  request: Request,
  response: Response
) => {
  try {
    const {
      body,
      query: { quantity },
    } = request;

    const addProductError = ValidateProduct(body);

    if (addProductError.error) {
      response.status(401).json({ error: addProductError.error.message });
      return;
    }

    if (quantity) {
      const productQuantity = Number(quantity);

      let allProducts: ProductSchemaProps[] = [];

      for (let i = 0; i < productQuantity; i++) {
        allProducts.push(body);
      }

      await ProductModel.insertMany([...allProducts]);
      response.status(201).json({ message: "Products created" });
      return;
    }

    const createProduct = new ProductModel({
      ...body,
      seller: request?.user?.id,
    });

    await createProduct.save();
    response.status(201).json({ message: "Product created" });
  } catch (error) {
    response.status(500).json({ error: "Failed to add products" });
  }
};

export const handleDeleteProduct = async (
  request: Request,
  response: Response
) => {
  try {
    const {
      query: { id },
      body: { bulk },
    } = request;

    if (bulk) {
      const products = await ProductModel.count();

      if (products === 0) {
        response.status(404).json({ error: "No products found" });
        return;
      }

      await ProductModel.deleteMany();
      response.status(200).json({ error: "Products deleted" });
      return;
    }

    if (!id) {
      response.status(401).json({ error: "Product id is required" });
      return;
    }

    const product = await ProductModel.findOne({ _id: id });

    if (!product) {
      response.status(404).json({ error: "Product not find product" });
      return;
    }

    await ProductModel.findByIdAndDelete(id);
    response.status(200).json({ message: "Product deleted" });
  } catch (error) {
    response.status(500).json({ error: "Failed to delete product" });
  }
};

export const handleUpdateProduct = async (
  request: Request,
  response: Response
) => {
  try {
    const {
      body,
      query: { id },
    } = request;

    const updateProductError = ValidateProduct(body);
    if (updateProductError.error) {
      response.status(401).json({ error: updateProductError.error.message });
      return;
    }

    const updateProduct = await ProductModel.findByIdAndUpdate(id);
    if (updateProduct) {
      updateProduct.name = body.name;
      updateProduct.price = body.price;
      await updateProduct.save();
      response.status(200).json({ message: "Product updated" });
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Failed to delete product" });
  }
};
