import { Request, response, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";

class CreateUserCaseController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password, driver_license } = req.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({
      name,
      email,
      password,
      driver_license,
    });

    return res.status(204).send();
  }
}

export { CreateUserCaseController };
