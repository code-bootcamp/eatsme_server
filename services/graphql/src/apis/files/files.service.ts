import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { IFilesServiceUpload } from './interfaces/files-service.interface';

@Injectable()
export class FilesService {
  async upload({ file }: IFilesServiceUpload): Promise<string> {
    const bucket = process.env.GCP_BUCKET;

    const storage = new Storage({
      projectId: process.env.GCP_PROJECTID,
      keyFilename: process.env.GCP_KEY_FILENAME,
    }).bucket(bucket);

    await new Promise((resolve, reject) =>
      file
        .createReadStream()
        .pipe(storage.file(file.filename).createWriteStream())
        .on('finish', () => {
          console.log('성공');
          resolve('성공!!!');
        })
        .on('error', () => {
          console.log('실패');
          reject('실패!!!');
        }),
    );

    console.log('파일전송이 완료되었습니다.');

    return '끝';
  }
}
