import { Router } from "express";
import { PaymentController } from "../controllers/payment.controller.js";
import { PaymentModel } from "../models/product.models.js";
// import { serverNeonDB } from "../config/neon/neonDbConfig.js";
import { pgLocalDB } from "../config/dbConfig.js"; // Importa la configuración de la base de datos local

export const paymentRouter = Router()


// const paymentDb = new PaymentModel(serverNeonDB)
const paymentDb = new PaymentModel(pgLocalDB)

const paymentController = new PaymentController({ paymentDb })

paymentRouter.post("/create", paymentController.createPreferenceMP)
paymentRouter.post("/webhook", paymentController.webhook)