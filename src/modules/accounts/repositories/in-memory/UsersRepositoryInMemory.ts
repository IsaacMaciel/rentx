import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";

class UsersRepositoryInMemory implements IUserRepository {
  users: User[] = [];

  async create({
    name,
    email,
    driver_license,
    password,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();
    Object.assign(user, {
      name,
      email,
      driver_license,
      password,
    });
    await this.users.push(user);
  }
  async findByEmail(email: string): Promise<User> {
    return  await this.users.find((e) => e.email === email);
  }
  async findById(id: string): Promise<User> {
    return await this.users.find((e) => e.id === id);
  }
}

export { UsersRepositoryInMemory };
