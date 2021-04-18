import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsUserController";

import { ensureAutheticated } from "../middlewares/ensureAuthenticated";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsUserController = new ListRentalsUserController();

rentalsRoutes.post("/", ensureAutheticated, createRentalController.handle);
rentalsRoutes.post(
    "/devolution/:id",
    ensureAutheticated,
    devolutionRentalController.handle
);
rentalsRoutes.get(
    "/user",
    ensureAutheticated,
    listRentalsUserController.handle
);

export { rentalsRoutes };
