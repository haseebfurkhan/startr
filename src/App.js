import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/home";
import TagSearch from "./components/tagsearch";
import Search from "./components/search";

function App() {
  return (
    <div className="App">
      <Router>
        <nav className="navbar navbar-expand-lg navbar-dark bg-transparent static-top">
          <div className="container">
            {/* eslint-disable-next-line*/}
            <a className="navbar-brand">
              <Link to={"/"} className="navbar-brand">
                {" "}
                <h1>
                  {" "}
                  startr | <i className="fa fa-space-shuttle"></i>{" "}
                </h1>{" "}
              </Link>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/"} className="nav-link">
                    {" "}
                    Home{" "}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/search"} className="nav-link">
                    Search
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/tagsearch"} className="nav-link">
                    Keyword Search
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <hr />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/tagsearch" component={TagSearch} />
          <Route path="/search" component={Search} />
        </Switch>
      </Router>

     
    </div>
  );
}

export default App;
