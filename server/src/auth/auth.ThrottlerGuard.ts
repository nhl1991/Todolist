import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { timingSafeEqual } from 'crypto';

@Injectable()
export class BffAwareThrottlerGuard extends ThrottlerGuard {
  protected async getTracker(req: Record<string, any>): Promise<string> {
    const secret = process.env.BFF_SHARED_SECRET;
    const given = req.headers['x-bff-secret'];
    let fromBff = false;
    if (secret && typeof given === 'string') {
      const a = Buffer.from(given);
      const b = Buffer.from(secret);
      fromBff = a.length === b.length && timingSafeEqual(a, b);
    }

    const clientIp = req.headers['x-client-ip'];
    if (fromBff && typeof clientIp === 'string' && clientIp) return clientIp;

    return req.ip;
  }
}
