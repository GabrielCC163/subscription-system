import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('SubscriptionsController (e2e)', () => {
  let app: INestApplication;
  const apiKey = 'ss_test_t9KB41SpGQy7Lvg7';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('should create a subscription (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/subscriptions')
      .send({
        email: 'elon@email.com',
        firstName: 'elon',
        dateOfBirth: '1997-09-22',
        consent: true,
        newsletterId: '1' + Math.floor(Math.random() * 1000)
      })
      .set('Accept', 'application/json')
      .set('apiKey', apiKey)
      .expect(201);

    expect(response.body.id).toBeDefined();
  })

  afterAll(async () => {
    await app.close();
  });
});
