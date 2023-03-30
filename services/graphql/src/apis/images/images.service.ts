import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import {
  IImageServiceCreate,
  IImagesServiceStorageDel,
} from './interfaces/images-service.interface';

@Injectable()
export class ImagesService {
  constructor(
    private readonly imagesRepository: Repository<Image>, //
  ) {}

  createImg({ url }: IImageServiceCreate): Promise<Image> {
    const image = this.imagesRepository.create({ url });
    return this.imagesRepository.save(image);
  }

  async storageDelete({ storageDel }: IImagesServiceStorageDel) {
    const storage = new Storage({
      projectId: process.env.GCP_PROJECTID,
      keyFilename: process.env.GCP_KEY_FILENAME,
    });
    const deleteFile = async () => {
      await storage.bucket(process.env.GCP_BUCKET).file(storageDel).delete();
    };
    deleteFile().catch(console.error);
  }
}
