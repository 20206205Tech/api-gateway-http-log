import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { main } from './common/utils/main.util';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    // Giả sử main.util trả về instance đã được init()
    app = await main(AppModule);
  });

  it('GET /', async () => {
    const response = await request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toEqual({
      message: 'Hello World',
      docs: '/docs',
    });
  });

  afterAll(async () => {
    await app.close();
  });
});