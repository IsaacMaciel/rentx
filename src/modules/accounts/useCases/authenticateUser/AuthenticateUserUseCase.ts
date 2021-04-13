import { compare } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { sign } from "jsonwebtoken";
import { AppError } from "@errors/AppError";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import auth from "@config/auth";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UserRepository")
    private usersRepository: IUserRepository,
    @inject("UsersTokensRepository")
    private usersTokenRepository: IUsersTokenRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError("Email or Password incorrect!");

    const passwordPassed = await compare(password, user.password);

    if (!passwordPassed) throw new AppError("Email or Password incorrect!");

    const token = sign({}, auth.secret_token, {
      subject: user.id,
      expiresIn: auth.expires_token,
    });

    const refresh_token = sign({ email }, auth.refresh_token, {
      subject: user.id,
      expiresIn: auth.expires_refresh_token
    });

    const refresh_token_expires_date = this.dateProvider.addDays(auth.expires_refresh_token_days)

    await this.usersTokenRepository.create({
      user_id: user.id,
      expires_date: refresh_token_expires_date,
      refresh_token,
    });

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
      refresh_token
    };
  }
}

export { AuthenticateUserUseCase };
