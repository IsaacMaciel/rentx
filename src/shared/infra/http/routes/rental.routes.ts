import { DevolutionRentalController } from "@modules/rentals/devolutionRental/DevolutionRentalController";
import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const createRentalController = new CreateRentalController();
const devolutionRentalController =  new DevolutionRentalController()
const listRentalByUserController = new ListRentalsByUserController()

const rentalRoutes = Router();

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);
rentalRoutes.post("/devolution/:id", ensureAuthenticated, devolutionRentalController.handle);
rentalRoutes.get("/user",ensureAuthenticated,listRentalByUserController.handle)

export { rentalRoutes };
