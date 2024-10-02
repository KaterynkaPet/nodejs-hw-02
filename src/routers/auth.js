import { Router } from "express";

import * as authControllers from "../controllers/auth.js";

import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../utils/validateBody.js";

import { userRegisterSchema, userLoginSchema, requestResetEmailSchema } from "../validation/users.js";

import { requestResetEmailController } from "../controllers/auth.js";

const authRouter = Router();

authRouter.post("/register", validateBody(userRegisterSchema), ctrlWrapper(authControllers.registerController));

authRouter.post("/login", validateBody(userLoginSchema), ctrlWrapper(authControllers.loginController));

authRouter.post("/refresh", ctrlWrapper(authControllers.refreshController));

authRouter.post("/logout", ctrlWrapper(authControllers.logoutController));

authRouter.post("/send-reset-email", validateBody(requestResetEmailSchema), ctrlWrapper(requestResetEmailController));

export default authRouter;