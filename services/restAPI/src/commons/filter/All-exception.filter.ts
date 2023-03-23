// import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
// import { MongoError } from 'mongodb';

// @Catch(MongoError)
// export class MongooseExceptionFilter implements ExceptionFilter {
//   catch(exception: typeof MongoError, host: ArgumentsHost) {
//     console.log('#####');
//     const response = host.switchToHttp().getResponse();
//     response.status(404).json({ message: exception });
//   }
// }
import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    super.catch(exception, host);
  }
}
