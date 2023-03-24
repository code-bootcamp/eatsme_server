import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/info')
  getHello(): string {
    return 'hi';
  }
}
