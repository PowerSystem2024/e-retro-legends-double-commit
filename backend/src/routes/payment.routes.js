import { Router } from "express";
import { PaymentController } from "../controllers/payment.controller.js";
import { PaymentModel } from "../models/product.models.js";
import { serverNeonDB } from "../config/neon/neonDbConfig.js";

export const paymentRouter = Router()

const paymentDb = new PaymentModel(serverNeonDB)
const paymentController = new PaymentController({ paymentDb })

paymentRouter.post("/create", paymentController.createPreferenceMP)
paymentRouter.post("/webhook", paymentController.webhook)