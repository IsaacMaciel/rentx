import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { getRepository, Repository } from "typeorm";
import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return await this.repository.findOne({ 
      where: { car_id, end_date: null}
    });
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return await this.repository.findOne({ 
      where: { user_id, end_date: null}
    });
  }
  async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      ...data,
    });

    await this.repository.save(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    return await this.repository.findOne(id)
  }

  async findByUserId(user_id: string): Promise<Rental[]> {
    return await this.repository.find({
      where: { user_id },
      relations: ['car']
    })
  }
  
}

export { RentalsRepository };
