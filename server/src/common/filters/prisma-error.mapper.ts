import { HttpStatus } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma/client';

type PrismaMeta = {
  modelName?: string;
  model?: string;
  driverAdapterError?: { cause?: { constraint?: { index?: string } } };
};

const UNIQUE_MESSAGES: Record<string, string> = {
  User_email_key: '이미 사용 중인 이메일입니다.',
  User_username_key: '이미 사용 중인 유저명입니다.',
};
const NOT_FOUND_MESSAGES: Record<string, string> = {
  Todo: '게시물을 찾을 수 없습니다.',
  User: '사용자를 찾을 수 없습니다.',
};

/** 알려진 Prisma 에러면 응답 상태와 메시지를, 아니면 null(→ 필터에서 500 처리)을 반환 */
export function mapPrismaError(
  err: Prisma.PrismaClientKnownRequestError,
): { status: number; message: string } | null {
  const meta = (err.meta ?? {}) as PrismaMeta;
  switch (err.code) {
    case 'P2002': {
      const constraint = meta.driverAdapterError?.cause?.constraint?.index;
      return {
        status: HttpStatus.CONFLICT,
        message:
          (constraint && UNIQUE_MESSAGES[constraint]) ??
          '이미 존재하는 데이터입니다.',
      };
    }
    case 'P2025': {
      const missing = meta.model ?? meta.modelName;
      return {
        status: HttpStatus.NOT_FOUND,
        message:
          (missing && NOT_FOUND_MESSAGES[missing]) ??
          '요청한 데이터를 찾을 수 없습니다.',
      };
    }
    case 'P2003':
      return {
        status: HttpStatus.CONFLICT,
        message:
          meta.modelName === 'User'
            ? '게시글이 존재하는 사용자는 삭제할 수 없습니다.'
            : '참조하는 데이터가 올바르지 않습니다.',
      };
    case 'P1001':
      return {
        status: HttpStatus.SERVICE_UNAVAILABLE,
        message:
          '데이터베이스에 연결할 수 없습니다. 잠시 후 다시 시도해 주세요.',
      };
    default:
      return null;
  }
}
