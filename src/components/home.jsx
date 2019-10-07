import React, { Component } from "react";
// eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Lottie from "./lottieComponent";
import FeaturedItems from "./FeaturedItems";

class Home extends Component {
  render() {
    return (
      <div className="container">
        <div className="row" style={{ color: "white" }}>
          <div className="col-sm-6">
            <div className="text-right img-fluid">
              <div className="animated fadeInLeftBig img-fluid ">
                <Lottie />
              </div>
            </div>
          </div>
          <div className="col-sm-6 text-right">
            <h1 className="display-2">
              <div className="animated fadeInRightBig">Never waste </div>
              <div className="animated fadeInRightBig">hours writing</div>
              <div className="animated fadeInRightBig">
                starter code again.{" "}
              </div>
            </h1>
          </div>
        </div>
        <div style={{ color: "white" }} className="animated fadeIn delay1">
          <p className="lead">
            Choose your technologies and find the right starter pack for your
            project
          </p>
          <Link to={"/search"}>
            {" "}
            <button
              type="button"
              className="btn btn-primary rounded-pill shadow p-3 mb-5 rounded"
            >
              Get Started Now{" "}
            </button>
          </Link>
        </div>

        <div className="animated zoomIn delay2">
          <div>
            <h3 style={{ color: "white" }} className="font-weight-lighter">
              Top starter Kits
            </h3>
          </div>
          <hr className="my-4" style={{ color: "white" }} />
          <FeaturedItems />
        </div>
        
        <br />
        <br />

        <footer className="footer">
        <div className="container">
          <a
            class="btn btn-warning btn-block"
            href="https://www.reactriot.com/entries/19-purple-bit/vote"
            target="_blank"
          >
            Vote for Us
          </a>
        </div>
      </footer>
      <br />
      </div>
    );
  }
}

export default Home;
