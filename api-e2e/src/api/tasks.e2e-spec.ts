import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../api/src/app/app.module';

describe('Tasks API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('CRUD flow', async () => {
    // list empty
    await request(app.getHttpServer()).get('/api/tasks').expect(200).expect([]);

    // create
    const createRes = await request(app.getHttpServer())
      .post('/api/tasks')
      .send({ title: 'Test', completed: false })
      .expect(201);
    const created = createRes.body;
    expect(created.id).toBeDefined();

    // list has one
    const listRes = await request(app.getHttpServer()).get('/api/tasks').expect(200);
    expect(listRes.body.length).toBe(1);

    // patch
    const patchRes = await request(app.getHttpServer())
      .patch(`/api/tasks/${created.id}`)
      .send({ completed: true })
      .expect(200);
    expect(patchRes.body.completed).toBe(true);

    // delete
    await request(app.getHttpServer()).delete(`/api/tasks/${created.id}`).expect(200);

    // list empty again
    await request(app.getHttpServer()).get('/api/tasks').expect(200).expect([]);
  });
});
