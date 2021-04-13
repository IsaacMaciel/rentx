import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { IUsersTokenRepository } from "../IUsersTokenRepository";

class UsersTokensRepositoryInMemory implements IUsersTokenRepository {
  usersTokens: UserTokens[] = []

  async create({ user_id, expires_date, refresh_token }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens()

    Object.assign(userToken,{
      expires_date,
      refresh_token,
      user_id
    })

    this.usersTokens.push(userToken)
    return  userToken
  }
  async findByUserIdAndRefreshToken(user_id: string, token: string): Promise<UserTokens> {
    return this.usersTokens.find(ut => ut.user_id === user_id && ut.refresh_token === token)
  }

  async deleteByUserId(id: string): Promise<void> {
    const newArray = this.usersTokens.filter( ut => ut.id !== id)
    this.usersTokens = newArray;
  }
  async findByRefreshToken(token: string): Promise<UserTokens> {
    return this.usersTokens.find(ut => ut.refresh_token === token)
  }

}

export { UsersTokensRepositoryInMemory }