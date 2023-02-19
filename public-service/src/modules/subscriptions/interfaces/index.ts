import { GenderEnum } from '../enum';

export interface Subscription {
    id: string;
    email: string;
    firstName?: string;
    gender?: GenderEnum;
    dateOfBirth: string;
    consent: boolean;
    newsletterId: string;
}