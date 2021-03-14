import React, {Component} from "react";
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Login from "./pages/Login";
// import SignUp from "./pages/SignUp";
import Play from "./pages/Play";
// import Practice from "./pages/Practice";
// import Leaderboard from "./pages/Leaderboard";
// import NoMatch from "./pages/NoMatch";
// import Nav from "./components/Nav";
import { Grommet } from "grommet";

const theme = { global: { colors: { doc: "#ff99cc" } } };

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: null,
    };

    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  updateUser(userObject) {
    this.setState(userObject);
  }

  getUser() {
    axios.get("/user").then((response) => {
      console.log("Get user response: ");
      console.log(response.data);
      if (response.data.user) {
        console.log("Get User: There is a user saved in the server session: ");

        this.setState({
          loggedIn: true,
          username: response.data.user.username,
        });
      } else {
        console.log("Get user: no user");
        this.setState({
          loggedIn: false,
          username: null,
        });
      }
    });
  }

  render() {
    return (
      <Grommet theme={theme}>
        <Router basename = "/app">
          <div>
            <Nav />
            <Switch>
              <Route exact path={["/", "/login"]}>
                <Login updateUser={this.updateUser} />
              </Route>
              <Route exact path="/signup">
                <SignUp />
              </Route>
              <Route exact path="/play">
                <Play />
              </Route>
              <Route exact path="/practice">
                <Practice />
              </Route>
              <Route exact path="/leaderboard">
                <Leaderboard />
              </Route>
              <Route>
                <NoMatch />
              </Route>
            </Switch>
          </div>
        </Router>
      </Grommet>
    );
  }
}

export default App;

// **********************


// const express = require('express');
// const expressLayouts = require('express-ejs-layouts');
// const mongoose = require('mongoose');
// const passport = require('passport');
// const flash = require('connect-flash');
// const session = require('express-session');

// const app = express();

// // Passport Config
// require('./config/passport')(passport);

// // DB Config
// const db = require('./config/keys').mongoURI;

// // Connect to MongoDB
// mongoose
//   .connect(
//     db,
//     { useNewUrlParser: true ,useUnifiedTopology: true}
//   )
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));

// // EJS
// app.use(expressLayouts);
// app.set('view engine', 'ejs');

// // Express body parser
// app.use(express.urlencoded({ extended: true }));

// // Express session
// app.use(
//   session({
//     secret: 'secret',
//     resave: true,
//     saveUninitialized: true
//   })
// );

// // Passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

// // Connect flash
// app.use(flash());

// // Global variables
// app.use(function(req, res, next) {
//   res.locals.success_msg = req.flash('success_msg');
//   res.locals.error_msg = req.flash('error_msg');
//   res.locals.error = req.flash('error');
//   next();
// });

// // Routes
// app.use('/', require('/jeopardy-app/routes/index.js'));
// app.use('/users', require('./Routes/routes.js'));

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, console.log(`Server running on  ${PORT}`));
