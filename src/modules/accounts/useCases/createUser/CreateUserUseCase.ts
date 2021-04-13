import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { AppError } from "@errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private usersRepository: IUserRepository
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const passwordHash = await hash(password,8)

    const userAlreadyExist = await this.usersRepository.findByEmail(email)

    if(userAlreadyExist) throw new AppError("User already exist!")
    
    await this.usersRepository.create({
      name,
      email,
      password:passwordHash,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
