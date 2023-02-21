import { Injectable } from '@nestjs/common';
import { SendEmailNotificationDto } from './dto/send-email-notification.dto';

@Injectable()
export class EmailNotificationsService {
    async send(sendEmailNotificationDto: SendEmailNotificationDto) {
        try {
            const result = {
                ...sendEmailNotificationDto,
                success: true,
            };
            console.log(result);
            return result;
        } catch (error) {
            console.log(error);
        }
    }
}