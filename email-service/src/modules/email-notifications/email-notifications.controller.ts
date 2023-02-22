import { BadRequestException, Controller, UnauthorizedException } from '@nestjs/common';
import { Ctx, EventPattern, KafkaContext, Payload } from '@nestjs/microservices';
import { SubscriptionDto } from './dto/subscription.dto';
import { EmailNotificationsService } from './email-notifications.service';
import { EmailNotificationResponseDto } from './interfaces/email-notification-response.dto';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '@config/app.config';
import * as jwt from 'jsonwebtoken';


@Controller()
export class EmailNotificationsController {
    private apiSharedSecret: string;

    constructor(
        private readonly emailService: EmailNotificationsService,
        private readonly configService: ConfigService<AppConfig>
    ) {
        this.apiSharedSecret = this.configService.get('api_shared_secret');
    }

    @EventPattern('subscription-service.new-subscription')
    create(@Payload() message: SubscriptionDto, @Ctx() context: KafkaContext): Promise<EmailNotificationResponseDto> {
        const originalMessage = context.getMessage();
        const { headers } = originalMessage;

        if (!headers || !headers['x-auth-token']) throw new BadRequestException('Invalid payload');

        try {
            const token = String(headers['x-auth-token']);
            jwt.verify(token, this.apiSharedSecret);
            return this.emailService.send(message);
        } catch (error) {
            throw new UnauthorizedException('Invalid JWT signature');
        }
    }
}