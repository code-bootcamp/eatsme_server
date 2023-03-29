import { FileUpload } from 'graphql-upload';

export interface IFilesServiceUpload {
  file: FileUpload;
}

export interface IFileServiceDelete {
  fileDelete: string;
}
