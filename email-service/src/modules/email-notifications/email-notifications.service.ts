import { Injectable } from '@nestjs/common';
import { SendEmailNotificationDto } from './dto/send-email-notification.dto';

@Injectable()
export class EmailNotificationsService {
    async send(sendEmailNotificationDto: SendEmailNotificationDto) {

        return {}
    }
}