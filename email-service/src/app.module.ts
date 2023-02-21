import { getConfig } from '@config/app.config';
import { EmailNotificationsModule } from '@modules/email-notifications/email-notifications.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [getConfig],
      cache: true,
      isGlobal: true,
    }),
    EmailNotificationsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
