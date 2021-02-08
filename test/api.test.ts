import request from 'supertest';

import app from '../src/app';

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

describe('GET /top', () => {
  it('should return 200 OK', (done) => {
    request(app).get('/top').expect('Content-Type', /json/).expect(200, done);
  });
});

describe('GET /top', () => {
  const req = request.agent(app);
  it('shoult not be ratelimited', (done) => {
    req.get('/top').expect(200, done);
  });
  it('should not be ratelimited', (done) => {
    req.get('/top').expect(200, done);
  });
  it('should not be ratelimited', (done) => {
    req.get('/top').expect(200, done);
  });
  it('should not be ratelimited', (done) => {
    req.get('/top').expect(200, done);
  });
  it('should "be ratelimited"', (done) => {
    req.get('/top').expect(429, done);
  });
});
