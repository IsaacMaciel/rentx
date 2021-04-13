import { getRepository, Repository } from "typeorm";
import { Category } from "../entities/Category";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoryRepository";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

   constructor() {
    this.repository = getRepository(Category);
  }

  async create({ description, name }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      description,
      name,
    });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const list = await this.repository.find();
    return list;
  }

  async findByName(name: string): Promise<Category> {
    const user = await this.repository.findOne({name})
    return user;
  }
}

export { CategoriesRepository };
