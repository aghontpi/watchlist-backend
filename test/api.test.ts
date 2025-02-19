import { assert } from 'console';

import request from 'supertest';

import app from '../src/app';
import { testCaseUser } from '../src/controllers/auth';

describe('GET /random', () => {
  it('should return redirect', (done) => {
    request(app).get('/random').expect(302, done);
  });
});

describe('GET /asdfd/askf', () => {
  it('should return redirect', (done) => {
    request(app).get('/random').expect(302, done);
  });
});

describe('GET /top/askdf', () => {
  it('should return redirect', (done) => {
    request(app).get('/random').expect(302, done);
  });
});

describe('GET /top, accessing without token', () => {
  it('should return 401 Unauthorized', (done) => {
    request(app).get('/top').expect('Content-Type', 'text/html; charset=utf-8').expect(401, done);
  });
});

const testUser = testCaseUser;

describe('POST /authenticate, create token', () => {
  process.env.NODE_ENV = 'test';

  it('should return 401 with empty user', (done) => {
    request(app).post('/authenticate').set('Content-Type', 'application/json').send({}).expect(401, done);
  });

  it('should return 401 with invalid id', (done) => {
    request(app)
      .post('/authenticate')
      .set('Content-Type', 'application/json')
      .send({ id: testUser.id + 'invalid', uniqueHash: testUser.uniqueHash })
      .expect(401, done);
  });

  it('should return 401 with invalid uniqueHash', (done) => {
    request(app)
      .post('/authenticate')
      .set('Content-Type', 'application/json')
      .send({ id: testUser.id, uniqueHash: testUser.uniqueHash + 'invalid' })
      .expect(401, done);
  });

  it('should return 400 with invalid json', (done) => {
    request(app)
      .post('/authenticate')
      .set('Content-Type', 'application/json')
      .send("{ id: testUser.id, uniqueHash: testUser.uniqueHash + 'invalid' ")
      .expect(400, done);
  });

  it('should return 200 with valid user', (done) => {
    request(app)
      .post('/authenticate')
      .set('Content-Type', 'application/json')
      .send(testUser)
      .expect(200)
      .end((err, res) => {
        if (!err) {
          expect(res.body.token).toBeTruthy();
        }
        return done();
      });
  });

  // change back to production to test hardcoded users are invalid in production
  it('should return 401 with valid user when env is production', (done) => {
    process.env.NODE_ENV = 'production';
    request(app).post('/authenticate').set('Content-Type', 'application/json').send(testUser).expect(401, done);
  });
});

describe('GET /top', () => {
  let token = '';

  beforeAll(() => {
    // to get access to test users
    process.env.NODE_ENV = 'test';
    jest.setTimeout(10000);

    // create token for accessing secured content
    req
      .post('/authenticate')
      .set('Content-Type', 'application/json')
      .send(testUser)
      .end((err, res) => {
        if (!err) {
          expect(res.body).toBeTruthy();
          assert(res.body.token);
          token = res.body.token;
        }

        // revert the mode after creating authentication token
        process.env.NODE_ENV = 'production';
      });
  });

  const req = request.agent(app);
  it('should get 401 without token', (done) => {
    req.get('/top').expect(401, done);
  });

  it('should get 200 with token', (done) => {
    if (token) {
      req
        .get('/top')
        .set('Authorization', 'Bearer ' + token)
        .expect(200, done);
    } else {
      done(fail('token not created'));
    }
  });

  // can not make 5 consequetive requests constantly,
  // the number of requests to check here is 3, becase of the above
  // two tests

  for (let i = 0; i < 4; i++) {
    let title = '';
    let statusCode = 200;
    if (i < 2) {
      title = 'should not be rate limited';
      statusCode = 200;
    } else {
      title = 'should be rate limited';
      statusCode = 429;
    }
    it(title, (done) => {
      if (token) {
        req
          .get('/top')
          .set('Authorization', 'Bearer ' + token)
          .expect(statusCode, done);
      } else {
        done(fail('token not created'));
      }
    });
  }
});
