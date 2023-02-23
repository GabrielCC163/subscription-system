import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('SubscriptionsController (e2e)', () => {
  let app: INestApplication;
  const apiKey = 'ss_test_t9KB41SpGQy7Lvg7';
  let subscriptionTestId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('should create a subscription', async () => {
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
    subscriptionTestId = response.body.id;
  });

  it('should get a list of subscriptions', async () => {
    const response = await request(app.getHttpServer())
      .get('/subscriptions')
      .set('apiKey', apiKey)
      .expect(200);

    expect(response.body.items).toBeDefined()
    expect(response.body.items.length).toBeGreaterThan(0);
  });

  it('shoud get one subscription by ID', async () => {
    const response = await request(app.getHttpServer())
      .get(`/subscriptions/${subscriptionTestId}`)
      .set('apiKey', apiKey)
      .expect(200);

    expect(response.body.id).toBe(subscriptionTestId);
  });

  it('should cancel a subscription', async () => {
    await request(app.getHttpServer())
      .delete(`/subscriptions/${subscriptionTestId}`)
      .set('apiKey', apiKey)
      .expect(204);

    const response = await request(app.getHttpServer())
      .get(`/subscriptions/${subscriptionTestId}`)
      .set('apiKey', apiKey)
      .expect(200);

    expect(response.body).toEqual({});
  });

  it('shoud return Unauthorized Exception (401)', async () => {
    await request(app.getHttpServer())
      .get(`/subscriptions/${subscriptionTestId}`)
      .expect(401);
  })

  afterAll(async () => {
    await app.close();
  });
});
