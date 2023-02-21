import { Module } from '@nestjs/common';
import { SubscriptionsModule } from '@modules/subscriptions/subscriptions.module';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from '@config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [getConfig],
      cache: true,
      isGlobal: true,
    }),
    SubscriptionsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
