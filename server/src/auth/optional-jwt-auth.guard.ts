
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// 토큰이 없거나 유효하지 않아도 401을 던지지 않고 req.user를 null로 둔 채 통과시킴.
@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any) {
    return user || null;
  }
}
