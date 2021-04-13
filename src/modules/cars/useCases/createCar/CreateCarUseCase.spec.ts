import { AppError } from "@errors/AppError";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let carsRepository: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      fine_amount: 60,
      category_id: "category",
      license_plate: "ABC-1234",
      brand: "brand",
    });
    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with exists license plate", async () => {
    await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      fine_amount: 60,
      category_id: "category",
      license_plate: "ABC-1234",
      brand: "brand",
    });

    await expect(
     createCarUseCase.execute({
        name: "Name Car",
        description: "Description Car",
        daily_rate: 100,
        fine_amount: 60,
        category_id: "category",
        license_plate: "ABC-1234",
        brand: "brand",
      })
    ).rejects.toEqual(new AppError("Car already exists!"))
  });
  it("should  be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      fine_amount: 60,
      category_id: "category",
      license_plate: "ABC-1234",
      brand: "brand",
    });
    expect(car.available).toBe(true);
  });
});
