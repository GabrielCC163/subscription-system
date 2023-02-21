import { Injectable } from '@nestjs/common';
import { SubscriptionDto } from './dto/subscription.dto';
import { EmailNotificationResponseDto } from './interfaces/email-notification-response.dto';

@Injectable()
export class EmailNotificationsService {
    async send(subscription: SubscriptionDto): Promise<EmailNotificationResponseDto> {
        try {
            const newNotification = {
                to: subscription.email,
                senderEmail: 'email-service@email.com',
                subject: subscription.newsletterId,
                content: ''
            }

            console.log({ date: new Date().toISOString(), ...newNotification });
            return newNotification;
        } catch (error) {
            console.log(error);
        }
    }
}