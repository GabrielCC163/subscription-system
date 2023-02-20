import { BaseEntity } from 'src/database/base.entity';
import { Column, Entity } from 'typeorm';
import { GenderEnum } from '../enum';

@Entity({ name: 'subscriptions' })
export class SubscriptionEntity extends BaseEntity {
    @Column()
    email: string;

    @Column({ nullable: true })
    firstName?: string;

    @Column({ type: 'enum', enum: GenderEnum, nullable: true })
    gender?: GenderEnum;

    @Column()
    dateOfBirth: string;

    @Column()
    consent: boolean;

    @Column()
    newsletterId: string;
}