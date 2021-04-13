import { ICarsImageRepository } from "@modules/cars/repositories/ICarsImageRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { inject, injectable } from "tsyringe";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: ICarsImageRepository,
    @inject("StorageProvider")
    private StorageProvider: IStorageProvider
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    
    images_name.forEach(async (image) => {
      await this.carsImagesRepository.create(car_id, image);
      await this.StorageProvider.save(image, "cars");
    });
  }
}

export { UploadCarImagesUseCase };
