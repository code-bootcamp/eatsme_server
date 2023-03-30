import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { FilesService } from './files.service';

@Resolver()
export class FilesResolver {
  constructor(
    private readonly filesService: FilesService, //
  ) {}

  @Mutation(() => String)
  userImgUpload(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ) {
    return this.filesService.upload({ file });
  }
}
