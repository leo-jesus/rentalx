import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/upload";
import { ensureAutheticated } from "../middlewares/ensureAuthenticated";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarUController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

const usersRoutes = Router();
const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const updateUserAvatarUController = new UpdateUserAvatarUController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch(
    "/avatar",
    ensureAutheticated,
    uploadAvatar.single("avatar"),
    updateUserAvatarUController.handle
);
export { usersRoutes };
