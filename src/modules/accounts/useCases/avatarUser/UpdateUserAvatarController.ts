import { Request, response, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

class UpdateUserAvatarController {
  async handle(req: Request, resp: Response) {
    const { id } = req.user;

    const avatar_file = req.file.filename;

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);
    updateUserAvatarUseCase.execute({ user_id: id, avatar_file });

    return resp.status(204).json()
  }
}

export { UpdateUserAvatarController };
