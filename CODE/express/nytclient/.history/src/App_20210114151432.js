import React, { Component } from 'react';
import './App.css';
import Book from './book/book';

class App extends Component {

  //start by setting up the initial state in the constructor:
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      search: '',
      sort: '',
      error: null
    }
  }

  //create methods to update the state.
  setSearch(search) {
    this.setState({
      search
    });
  }

  setSort(sort) {
    this.setState({
      sort
    });
  }

  //Finally, the form-submit handler will construct the query string, 
  //attach it to the URL, perform the fetch and update the state with 
  //the returned data. If there is an error when fetching the data 
  //display a message to the user.
  handleSubmit(e) {
    e.preventDefault();
    const baseUrl = 'http://localhost:8000/books';
    const params = [];
    if (this.state.search) {
      params.push(`search=${this.state.search}`);
    }
    if (this.state.sort) {
      params.push(`sort=${this.state.sort}`);
    }
    const query = params.join('&');
    const url = `${baseUrl}?${query}`;

    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          books: data,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          error: 'Sorry, could not get books at this time.'
        });
      })

  }

  //In the render method, display a list of books and the form. 
  //Attach onChange listeners to the components for updating 
  //the state as the user selects values.
  render() {
    const books = this.state.books.map((book, i) => {
      return <Book {...book} key={i}/>
    })
    return (
      <main className="App">
        <h1>NYT Best Sellers</h1>
        <div className="search">
          <form onSubmit={e => this.handleSubmit(e)}>
            <label htmlFor="search">Search: </label>
            <input
              type="text"
              id="search"
              name="search"
              value={this.state.search}
              onChange={e => this.setSearch(e.target.value)}/>

            <label htmlFor="sort">Sort: </label>
            <select id="sort" name="sort" onChange={e => this.setSort(e.target.value)}>
              <option value="">None</option>
              <option value="title">Title</option>
              <option value="rank">Rank</option>
            </select>
            <button type="submit">Search</button>
          </form>
          <div className="App_error">{ this.state.error }</div>
        </div>
        {books}
      </main>
    );
  }
}

export default App;