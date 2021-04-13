import { ResetPasswordUserController } from "@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController";
import { SendForgotPasswordMailUseController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";
import { Router } from "express";


const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailUseController()
const resetPasswordController = new ResetPasswordUserController()

passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle)
passwordRoutes.post("/reset", resetPasswordController.handle)

export { passwordRoutes }