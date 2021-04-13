import { Router } from "express";
import { authenticateRouter } from "./authentication.routes";
import { carsRoutes } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { passwordRoutes } from "./password.routes";
import { rentalRoutes } from "./rental.routes";
import { specificationRoutes } from "./specifications.routes";
import { userRouter } from "./user.routes";

const router = Router();

router.use(authenticateRouter)
router.use("/password",passwordRoutes)
router.use("/user", userRouter);
router.use("/cars",carsRoutes)
router.use("/rentals", rentalRoutes)
router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationRoutes);

export { router };
