import { Router } from "express";
import { ProductController } from "../controllers/product.controller.js";
import { serverNeonDB } from "../config/neon/neonDbConfig.js";

export const productsRouter = Router();

const productController = new ProductController({ productsDb: serverNeonDB });

productsRouter.get("/products", productController.getAllProducts);
productsRouter.get("/product/:id", productController.getProductById);
productsRouter.post("/products", productController.createProduct);
productsRouter.put("/product/:id", productController.updateProduct);
productsRouter.delete("/product/:id", productController.deleteProduct);
