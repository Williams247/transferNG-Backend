import { Request, Response } from "express";
import { ProductModel } from "../../models";
import { ValidateAddProduct } from "../../utils";

export const handleAddProduct = async (
  request: Request,
  response: Response
) => {
  try {
    const { body } = request;
    const addProductError = ValidateAddProduct(body);

    if (addProductError.error) {
      response.status(401).json({ error: addProductError.error.message });
      return;
    }

    const createProduct = new ProductModel({
      ...body,
      seller: request?.user?.id,
    });

    await createProduct.save();
    response.status(201).json({ message: "Product created" });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Failed to add products" });
  }
};
