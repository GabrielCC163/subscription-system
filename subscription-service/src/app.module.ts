import { Module } from '@nestjs/common';
import { SubscriptionsModule } from '@modules/subscriptions/subscriptions.module';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from '@config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config as TypeOrmConfig } from './ormconfig';
import { MessagingModule } from '@modules/messaging/messaging.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [getConfig],
      cache: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({ ...TypeOrmConfig, autoLoadEntities: true }),
    SubscriptionsModule,
    MessagingModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
