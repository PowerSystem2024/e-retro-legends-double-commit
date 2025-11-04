import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { serverNeonDB } from "../config/neon/neonDbConfig";
import { isAuth } from "../middlewares/isAuth";

export const authRouter = Router();
const authController = new AuthController({ authDb: serverNeonDB });

authRouter.post("/signup", authController.signUp);
authRouter.post("/login", authController.userLogin);
authRouter.get("/logout", isAuth, authController.userLogout);
