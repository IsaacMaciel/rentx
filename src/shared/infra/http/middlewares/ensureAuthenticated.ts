import { NextFunction, Request, response, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "@errors/AppError";
import auth from "@config/auth";

type Payload = {
  sub: string;
};

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;


  if (!authHeader) throw new AppError("Token missing");

  const [bearer, token] = authHeader.split(" ");

  if (bearer !== "Bearer") throw new AppError("Badly formatted token");

  try {
    const { sub: user_id } = verify(token, auth.secret_token) as Payload;

    req.user = {
      id:user_id
    }
    
    next();
    
  } catch (error) {
    throw new AppError("User does not exist!",401);
  }
 
 
}
