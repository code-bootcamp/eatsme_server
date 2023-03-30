import { Storage } from '@google-cloud/storage';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getToday } from 'src/commons/utils/utils';
import { IFilesServiceUpload } from './interfaces/files-service.interface';

@Injectable()
export class FilesService {
  async upload({ file }: IFilesServiceUpload) {
    const storage = new Storage({
      projectId: process.env.GCP_PROJECTID,
      keyFilename: process.env.GCP_KEY_FILENAME,
    }).bucket(process.env.GCP_BUCKET);

    const fname = `${getToday()}/origin/${file.filename}`;
    const fileName = await new Promise((resolve, reject) => {
      file
        .createReadStream()
        .pipe(storage.file(fname).createWriteStream())
        .on('finish', () => resolve(`${process.env.GCP_BUCKET}/${fname}`))
        .on('error', () => reject('false'));
    });
    if (fileName === 'false') {
      throw new HttpException('이미지 업로드 오류', HttpStatus.CONFLICT);
    }
    return fileName;
  }
}
