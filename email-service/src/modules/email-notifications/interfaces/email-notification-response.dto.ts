export interface EmailNotificationResponseDto {
    senderEmail: string;
    to: string;
    subject: string;
    content?: string;
}