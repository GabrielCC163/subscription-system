import { IsEmail, IsNotEmpty } from 'class-validator';

export class SendEmailNotificationDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
}