import { Router } from "express";
import { PaymentController } from "../controllers/payment.controller";

export const paymentRoute = Router()
const paymentController = new PaymentController()

paymentRoute.post("/payment", paymentController.createPreferenceMP)