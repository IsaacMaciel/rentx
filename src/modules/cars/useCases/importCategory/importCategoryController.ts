import { Request, Response } from "express";
import { container } from "tsyringe";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {
  handle(req: Request, res: Response) {
    const { file } = req;
    const importCategoryUseCase = container.resolve(ImportCategoryUseCase);
    importCategoryUseCase.execute(file);
    res.send();
  }
}

export { ImportCategoryController };
