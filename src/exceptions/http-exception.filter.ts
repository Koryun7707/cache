import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { BaseExceptionFilter } from '@nestjs/core';

export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    try {
      const status = exception.getStatus();
      // @ts-ignore
      if (!Array.isArray(exception.response.message)) {
        // @ts-ignore
        exception.response.message = [exception.response.message];
      }
      if (status === HttpStatus.UNAUTHORIZED) {
        return response.status(status).json({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: ['Unauthorized'],
          error: 'Unauthorized',
        });
      }
      if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
        return response.status(status).json({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ['Internal server error'],
          error: 'Internal server error',
        });
      }
      super.catch(exception, host);
    } catch (e) {
      console.log(exception);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ['Internal server error'],
        error: 'Internal server error',
      });
    }
  }
}
