import { Router } from "express";
import { ProductController } from "../controllers/product.controller.js";
// import { serverNeonDB } from "../config/neon/neonDbConfig.js";
import { pgLocalDB } from "../config/dbConfig.js"; // Importa la configuración de la base de datos local

export const productsRouter = Router();

// const productController = new ProductController({ productsDb: serverNeonDB });
const productController = new ProductController({ productsDB: pgLocalDB });


productsRouter.get("/products", productController.getAllProducts);
productsRouter.get("/product/:id", productController.getProductById);
productsRouter.post("/products", productController.createProduct);
productsRouter.put("/product/:id", productController.updateProduct);
productsRouter.delete("/product/:id", productController.deleteProduct);
