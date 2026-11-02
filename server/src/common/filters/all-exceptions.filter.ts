import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { Prisma } from 'src/generated/prisma/client';
import { mapPrismaError } from './prisma-error.mapper';

// 어디서도 처리되지 않은 예외가 내부 정보(스택 트레이스, DB 에러 메시지 등)를
// 그대로 클라이언트에 노출하지 않도록 막는 마지막 안전망.
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('ExceptionFilter');

  catch(exception: unknown, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const body = exception.getResponse();
      // ThrottlerException 등 문자열 응답도 { statusCode, message } 형태로 통일
      response
        .status(status)
        .json(
          typeof body === 'string'
            ? { statusCode: status, message: body }
            : body,
        );
      return;
    }

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      const mapped = mapPrismaError(exception);
      if (mapped) {
        if (mapped.status >= 500) this.logger.error(exception.stack);
        response
          .status(mapped.status)
          .json({ statusCode: mapped.status, message: mapped.message });
        return;
      }
    }

    // 모르는 Prisma 코드, PrismaClientValidationError, 그 밖의 모든 예외
    this.logger.error(exception instanceof Error ? exception.stack : exception);
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    });
  }
}
