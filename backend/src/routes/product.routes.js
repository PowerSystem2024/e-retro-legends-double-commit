import { Router } from "express";
import { ProductController } from "../controllers/product.controller.js";
import { serverNeonDB } from "../config/neon/neonDbConfig.js";

export const productsRoute = Router();

const productController = new ProductController({ dbClient: serverNeonDB });

productsRoute.get("/products", productController.getAllProducts);
productsRoute.get("/product/:id", productController.getProductById);
productsRoute.post("/products", productController.createProduct);
productsRoute.put("/product/:id", productController.updateProduct);
productsRoute.delete("/product/:id", productController.deleteProduct);
