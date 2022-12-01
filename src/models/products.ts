import mongoose from "mongoose";
import { ProductSchemaProps } from "../utils";

const Schema = mongoose.Schema;

const productSchema = new Schema<ProductSchemaProps>({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: String,
  seller: {
    type: Schema.Types.ObjectId,
    ref: "admin",
  },
});

export const ProductModel: mongoose.Model<ProductSchemaProps, {}> =
  mongoose.model("product", productSchema);
