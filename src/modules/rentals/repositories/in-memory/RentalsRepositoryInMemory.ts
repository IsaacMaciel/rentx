import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalRepository {

  rentals: Rental[] = [];

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return await this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return await this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );
  }

 async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental()

    Object.assign(rental,{
      ...data,
      start_date: new Date()
    })

    this.rentals.push(rental)

    return await rental;
  }

  async findById(id: string): Promise<Rental> {
    return this.rentals.find(rental => rental.id === id)
  }
  async findByUserId(user_id: string): Promise<Rental[]> {
    return this.rentals.filter(rental => rental.user_id === user_id)
  }
}

export { RentalsRepositoryInMemory }