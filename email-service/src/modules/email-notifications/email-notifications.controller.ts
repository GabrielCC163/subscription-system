import { Body, Controller, Post } from '@nestjs/common';
import { SendEmailNotificationDto } from './dto/send-email-notification.dto';
import { EmailNotificationsService } from './email-notifications.service';


@Controller('email-notifications')
export class EmailNotificationsController {
    constructor(private readonly emailService: EmailNotificationsService) { }

    @Post('send')
    create(@Body() sendEmailNotificationDto: SendEmailNotificationDto) {
        return this.emailService.send(sendEmailNotificationDto);
    }
}