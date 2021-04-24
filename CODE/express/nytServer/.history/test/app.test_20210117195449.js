const supertest = require('supertest');
const app = require('../app');
const { expect } = require('chai');


//a test for the normal case, just request the endpoint with 
//no additional parameters. Remember that this endpoint responded 
//with JSON data. We can test that the correct 'Content-Type' has 
//been set and that we did indeed get JSON in the response with the right status.
describe('GET /books', () => {
  it('should return an array of books', () => {
    return supertest(app)
      .get('/books')
      .expect(200)
      .expect('Content-Type', /json/)
      //add a then handler to the chain and get the response object itself.
      .then(res => {
          expect(res.body).to.be.an('array');
          //To determine that the array contain book objects for instance
          expect(res.body).to.have.lengthOf.at.least(1);
          const book = res.body[0];
          expect(book).to.include.all.keys(
              'bestsellers_date', 'author', 'description', 'title'
          );
      });
  })
  it('should be 400 if sort is incorrect', () => {
    return supertest(app)
      .get('/books')
      .query({ sort: 'MISTAKE' })
      .expect(400, 'Sort must be one of title or rank');
  });
});