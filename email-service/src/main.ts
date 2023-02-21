import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as dotenv from 'dotenv';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '@config/app.config';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService<AppConfig, true>>(ConfigService);
  const kafkaBrokers = config.get<AppConfig['kafka_brokers']>('kafka_brokers');
  console.log(kafkaBrokers)

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'email-service',
        brokers: [kafkaBrokers]
      }
    }
  })

  app.startAllMicroservices().then(() => {
    console.log('[Email Service] Microservice running!');
  });

  await app.listen(process.env.PORT || 3002).then(() => {
    console.log('[Email Service] HTTP server running!');
  });
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
