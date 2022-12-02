import Joi from "joi";
import { ProductSchemaProps } from "../types";

export const ValidateProduct = (data: ProductSchemaProps) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required().min(0),
    description: Joi.string(),
  });
  return schema.validate(data);
};
