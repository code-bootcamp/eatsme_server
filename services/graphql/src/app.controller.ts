import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/graphql')
  getHello(): string {
    return '하이';
  }
}
