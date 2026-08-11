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

const PRISMA_ERROR_MAP: Record<string, { status: number; message: string }> = {
  P2002: { status: HttpStatus.CONFLICT, message: '이미 존재하는 데이터입니다.' },
  P2025: { status: HttpStatus.NOT_FOUND, message: '요청한 데이터를 찾을 수 없습니다.' },
  P2003: { status: HttpStatus.BAD_REQUEST, message: '잘못된 참조입니다.' },
};

// 어디서도 처리되지 않은 예외가 내부 정보(스택 트레이스, DB 에러 메시지 등)를
// 그대로 클라이언트에 노출하지 않도록 막는 마지막 안전망.
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('ExceptionFilter');

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      response.status(exception.getStatus()).json(exception.getResponse());
      return;
    }

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      const mapped = PRISMA_ERROR_MAP[exception.code];
      if (mapped) {
        response.status(mapped.status).json({
          statusCode: mapped.status,
          message: mapped.message,
        });
        return;
      }
    }

    this.logger.error(
      exception instanceof Error ? exception.stack : exception,
    );
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    });
  }
}
