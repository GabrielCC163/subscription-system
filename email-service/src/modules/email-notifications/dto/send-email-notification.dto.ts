import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SendEmailNotificationDto {
    @IsNotEmpty()
    @IsEmail()
    senderEmail: string;

    @IsNotEmpty()
    @IsEmail()
    to: string;

    @IsNotEmpty()
    @IsString()
    subject: string;

    @IsOptional()
    @IsString()
    content: string;
}