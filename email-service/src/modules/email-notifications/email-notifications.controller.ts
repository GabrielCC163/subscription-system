import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SubscriptionDto } from './dto/subscription.dto';
import { EmailNotificationsService } from './email-notifications.service';
import { EmailNotificationResponseDto } from './interfaces/email-notification-response.dto';


@Controller()
export class EmailNotificationsController {
    constructor(private readonly emailService: EmailNotificationsService) { }

    @EventPattern('subscription-service.new-subscription')
    create(@Payload() subscription: SubscriptionDto): Promise<EmailNotificationResponseDto> {
        return this.emailService.send(subscription);
    }
}