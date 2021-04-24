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
  it('should sort by title', () => {
    return supertest(app)
      .get('/books')
      .query({ sort: 'title' })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        let sorted = true;

        let i = 0;
        // iterate once less than the length of the array
        // because we're comparing 2 items in the array at a time
        while (i < res.body.length - 1) {
          // compare book at `i` with next book at `i + 1`
          const bookAtI = res.body[i];
          const bookAtIPlus1 = res.body[i + 1];
          // if the next book is less than the book at i,
          if (bookAtIPlus1.title < bookAtI.title) {
            // the books were not sorted correctly
            sorted = false;
            break; // exit the loop
          }
          i++;
        }
        expect(sorted).to.be.true;
      });
  });
});