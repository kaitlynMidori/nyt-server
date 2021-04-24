const supertest = require('supertest');
const app = require('../app');
const { expect } = require('chai');

describe('GET /books', () => {
  it('should return an array of books', () => {
    return supertest(app)
      .get('/books')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
          expect(res.body).to.be.an('array');
      });
  })
});