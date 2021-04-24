//create basic server in app.js with Express and add morgan
//example: localhost:8000/books response: all books
//example: localhost/books?sort=rank response: books in order by rank or title
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(morgan('common')); // let's see what 'common' format looks like

//require array of books
const books = require('./books-data.js');
app.get('/books', (req, res) => {
    //get search params and default if not provided
    const { search = "", sort} = req.query;
    //validate: sort includes 'title' or 'rank'
    if (sort) {
        if (!['title', 'rank'].includes(sort)) {
          return res
            .status(400)
            .send('Sort must be one of title or rank');
        }
      }
    //filter function making search case insensitive lowercase the title and search before comparison
    let results = books.filter(book =>
        book.title.toLowerCase()
        .includes(search.toLowerCase()));
        //after book search filter, sort
        if (sort) {
            results.sort((a, b) => {
              return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
            });
          }

    //return list of books
res
    .json(results);
});
module.exports = app
app.listen(5000, () => {
  console.log('Server started on PORT 8000');
});