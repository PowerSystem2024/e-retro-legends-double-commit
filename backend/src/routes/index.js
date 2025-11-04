import { Router } from "express";
import { productsRouter } from "./product.routes.js";
import { authRouter } from "./auth.routes.js";
import { userRouter } from "./user.routes.js";
import { paymentRouter } from "./payment.routes.js";


export const appRouter = Router()

appRouter.use("/user", authRouter)
appRouter.use("/user", userRouter)
appRouter.use("/products", productsRouter)
appRouter.use("/payments", paymentRouter)
