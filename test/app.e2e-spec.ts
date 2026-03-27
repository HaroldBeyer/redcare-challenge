import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Repositories API (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );

    app.setGlobalPrefix('api');

    await app.init();
  });

  it('/api/repositories (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/repositories')
      .query({
        language: 'typescript',
        createdAfter: '2023-01-01',
        page: 1,
        limit: 2,
      })
      .expect(200);

    expect(response.body).toHaveProperty('data');
    expect(response.body).toHaveProperty('page', 1);
    expect(response.body).toHaveProperty('limit', 2);
  });
});
