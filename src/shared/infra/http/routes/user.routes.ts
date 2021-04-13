import { Router } from "express";
import multer from "multer";
import uploadConfig from "@config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/avatarUser/UpdateUserAvatarController";
import { CreateUserCaseController } from "@modules/accounts/useCases/createUser/CreateUserCaseController";
import { ProfileUserController } from "@modules/accounts/useCases/profileUser/ProfileUserController";

const userRouter = Router();

const uploadAvatar = multer(uploadConfig)


const createUserController = new CreateUserCaseController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

userRouter.post("/", createUserController.handle);
userRouter.patch("/avatar",ensureAuthenticated,uploadAvatar.single('avatar'),updateUserAvatarController.handle)
userRouter.get("/profile",ensureAuthenticated,profileUserController.handle)

export { userRouter };
