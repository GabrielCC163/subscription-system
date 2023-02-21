import { Body, Controller, Post } from '@nestjs/common';
import { SendEmailNotificationDto } from './dto/send-email-notification.dto';
import { EmailNotificationsService } from './email-notifications.service';


@Controller('email-notifications')
export class EmailNotificationsController {
    constructor(private readonly emailService: EmailNotificationsService) { }

    @Post('send')
    async create(@Body() sendEmailNotificationDto: SendEmailNotificationDto): Promise<void> {
        await this.emailService.send(sendEmailNotificationDto);
    }
}