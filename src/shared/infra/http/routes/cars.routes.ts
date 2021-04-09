import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCars/CreateCarController";
import { CreateCarSpecificationConstroller } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listCars/ListAvailableCarsController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAutheticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationConstroller();

carsRoutes.post(
    "/",
    ensureAutheticated,
    ensureAdmin,
    createCarController.handle
);

carsRoutes.get("/available", listAvailableCarsController.handle);

carsRoutes.post(
    "/specifications/:id",
    ensureAutheticated,
    ensureAdmin,
    createCarSpecificationController.handle
);

export { carsRoutes };
