import { Request, response, Response } from "express";
import { ProductModel } from "../models";

export const handleGetProduct = async (
  request: Request,
  response: Response
) => {
  try {
    const {
      params: { id },
    } = request;
    const product = await ProductModel.findById(id);
    response.status(200).json({ message: "Product Fetched", result: product });
  } catch (error) {
    response.status(500).json({ error: "Failed to get product" });
  }
};

export const handleGetProducts = async (
  request: Request,
  response: Response
) => {
  try {
    const {
      query: { page = 1, limit = 10 },
    } = request;

    const pageValue = Number(page);
    const limitValue = Number(limit);

    if (pageValue < 1) {
      response
        .status(400)
        .json({ error: "Page value should not be less than 1" });
      return;
    }

    const products = await ProductModel.find()
      .limit(limitValue)
      .skip((pageValue - 1) * pageValue);

    const count = await ProductModel.count();

    response.status(200).json({
      message: "Product Fetched",
      result: {
        totalProducts: count,
        currentPage: pageValue,
        pages: Math.ceil(count / limitValue),
        products,
      },
    });
  } catch (error) {
    response.status(500).json({ error: "Failed to fetch products" });
  }
};
