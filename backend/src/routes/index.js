import { Router } from "express";
import { productsRoute } from "./product.routes.js";

export const appRouter = Router()

appRouter.use("/products", productsRoute)