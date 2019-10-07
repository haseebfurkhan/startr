import React, { Component } from "react";

class Item extends Component {
  render() {
    var headerClass = "card-header text-center  text-light";
    var color = { background: this.props.headerColor };
    var backgroundClass = "overlayDiv " + this.props.logo + " colored";
    return (
      <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 animated zoomIn">
        <div
          className="card border-dark bg-light mb-3 shadow text-left"
          style={{ minWidth: "18rem" }}
        >
          <div className={headerClass} style={color}>
            {" "}
            <h4>{this.props.technology}</h4>{" "}
          </div>
          <div className="card-body text-dark" style={{ height: "15rem" }}>
          <div
              className={backgroundClass}
            
            ></div>
            <h5 className="card-title">
              <div className="row">
                <div className="col">{this.props.title} </div>
              </div>
            </h5>
            <p className="card-text">{this.props.desc}</p>
          </div>
          <div className="card-footer">
            <div className="row">
              <div className="col font-weight-bold">
                <p className="align-self-center">Stars : {this.props.stars}</p>
              </div>
              <div className="col">
                <div className="text-right">
                  <a
                    class="btn btn-outline-info"
                    href={this.props.url}
                    target="_blank"
                  >
                    Details
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Item;
