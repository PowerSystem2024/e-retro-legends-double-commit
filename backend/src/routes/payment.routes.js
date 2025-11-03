import { Router } from "express";
import { PaymentController } from "../controllers/payment.controller";
import { PaymentModel } from "../models/product.models";
import { serverNeonDB } from "../config/neon/neonDbConfig";

export const paymentRoute = Router()

const paymentDb = new PaymentModel(serverNeonDB)
const paymentController = new PaymentController({ paymentDb })

paymentRoute.post("/payments/create", paymentController.createPreferenceMP)
paymentRoute.post("/payments/webhook", paymentController.webhook)