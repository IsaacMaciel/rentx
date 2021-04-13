import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";



interface IUsersTokenRepository {
  create({user_id,expires_date,refresh_token}: ICreateUserTokenDTO): Promise<UserTokens>
  findByUserIdAndRefreshToken(user_id: string,token: string): Promise<UserTokens>
  deleteByUserId(id: string): Promise<void>
  findByRefreshToken(token:string): Promise<UserTokens>
}

export { IUsersTokenRepository }