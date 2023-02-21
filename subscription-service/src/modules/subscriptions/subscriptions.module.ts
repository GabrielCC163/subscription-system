import { Module } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionEntity } from './entities/subscription.entity';
import { KafkaService } from '@modules/messaging/kafka.service';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([SubscriptionEntity])],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService, KafkaService],
})
export class SubscriptionsModule { }
