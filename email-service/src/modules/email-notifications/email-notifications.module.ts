import { Module } from '@nestjs/common';
import { EmailNotificationsController } from './email-notifications.controller';
import { EmailNotificationsService } from './email-notifications.service'

@Module({
  imports: [],
  controllers: [EmailNotificationsController],
  providers: [EmailNotificationsService],
})
export class EmailNotificationsModule { }
