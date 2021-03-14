import React from "react";
// import "./style.css";

function Nav() {
  return (
      <nav>
    {/* // <nav className="navbar navbar-expand-lg">
    //   <a className="navbar-brand gameTitle" href="/">
    //     React Jeopardy
    //   </a>
    //   <a className="navbar-brand" href="/login">
    //     Log In
    //   </a>
    //   <a className="navbar-brand" href="/signup">
    //     Sign Up
    //   </a>
    //   <a className="navbar-brand" href="/">
    //     Logout
    //   </a> */}
      <a className="navbar-brand" href="/play">
        Play
      </a>
      {/* <a className="navbar-brand" href="/practice">
        Practice
      </a>
      <a className="navbar-brand" href="/leaderboard">
        Leaderboard
      </a> */}
    </nav>
  );
}

export default Nav;
