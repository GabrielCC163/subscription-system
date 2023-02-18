export interface Subscription {
    id: string;
    email: string;
    firstName?: string;
    gender?: string;
    dateOfBirth: string;
    consent: boolean;
    newsletterId: string;
}