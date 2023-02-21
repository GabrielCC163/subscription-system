import { GenderEnum } from '../enum';

export class SubscriptionDto {
    id: string;
    email: string;
    firstName?: string;
    gender?: GenderEnum;
    dateOfBirth: string;
    consent: boolean;
    newsletterId: string;
    createdAt: Date;
}