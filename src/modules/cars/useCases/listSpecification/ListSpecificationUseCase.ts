import { inject, injectable } from "tsyringe";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationRepository";

@injectable()
class ListSpecificationUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificationRepository: SpecificationRepository
  ) {}

  async execute(): Promise<Specification[]> {
    const list = await this.specificationRepository.list();
    return list;
  }
}

export { ListSpecificationUseCase };
