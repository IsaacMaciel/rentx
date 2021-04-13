import { inject, injectable } from "tsyringe";
import { AppError } from "@errors/AppError";
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificationRepository: SpecificationRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExist = await this.specificationRepository.findByName(
      name
    );

    if (specificationAlreadyExist)
      throw new AppError("Specification already exists!");

    this.specificationRepository.create({
      description,
      name,
    });
  }
}

export { CreateSpecificationUseCase };
