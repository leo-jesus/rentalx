import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { ProfileUserController } from "@modules/accounts/useCases/profileUserUseCase/ProfileUserController";
import { UpdateUserAvatarUController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureAutheticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const usersRoutes = Router();
const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarUController = new UpdateUserAvatarUController();
const profileUserController = new ProfileUserController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch(
    "/avatar",
    ensureAutheticated,
    uploadAvatar.single("avatar"),
    updateUserAvatarUController.handle
);

usersRoutes.get("/profile", ensureAutheticated, profileUserController.handle);
export { usersRoutes };
