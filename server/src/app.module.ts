import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [UserModule, ConfigModule.forRoot({
    isGlobal: true
  }), ThrottlerModule.forRoot([{ ttl: 60000, limit: 5 }]), TodoModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
