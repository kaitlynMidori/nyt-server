//creating a variable named React from the 'react' directory 
//of our app's node_modules directory
import React from 'react';
import ReactDOM from 'react-dom';
//find the export default App we wrote at the bottom of the App.js file.
import App from './App';
//import a CSS file into our code and have it load in the 
//browser to apply styles on our application
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));