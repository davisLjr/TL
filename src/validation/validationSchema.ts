import * as yup from "yup";
import productsData from "../../data/db.json";
import { ProductsData } from "../types/types";

const products: ProductsData = productsData;

const uniqueCategories = Array.from(
  new Set(products.productos.map((product) => product.categoria))
);

export const todoSchema = yup.object().shape({
  titulo: yup
    .string()
    .required("Title is required")
    .matches(
      /^[a-zA-Z0-9\s]+$/,
      "Title can only contain letters, numbers, and spaces"
    )
    .max(50, "Title cannot exceed 50 characters"),
  descripcion: yup
    .string()
    .required("Description is required")
    .matches(
      /^[a-zA-Z0-9\s]+$/,
      "Description can only contain letters, numbers, and spaces"
    )
    .max(200, "Description cannot exceed 200 characters"),
  categoria: yup
    .string()
    .required("Category is required")
    .oneOf(uniqueCategories, "Invalid category"),
});
