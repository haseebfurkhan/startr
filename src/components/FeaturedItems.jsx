import React, { Component } from "react";
import Item from "./item";
import { Data } from "../data/db.js";

class FeaturedItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredData: [],
      data: Data
    };

    this.state.filteredData = new Array();
    this.state.data.forEach(element => {
      element.details.sort((a, b) =>
        parseInt(a.stars) < parseInt(b.stars) ? 1 : -1
      );
      this.state.filteredData.push(element);
    });
  }

  render() {
    const fitleredItems = [];
    this.state.filteredData.map(item => {
     
      fitleredItems.push(
        <Item
          title={item.details[0].projectName}
          technology={item.language}
          desc={item.details[0].description}
          stars={item.details[0].stars}
          url={item.details[0].url}
          headerColor={item.headerColor}
          logo={item.logo}
        />
      );
    });
    return (
      <div>
        {this.state.filteredData && this.state.filteredData.length > 0 ? (
          <div className="container">
            <div className="row">{fitleredItems}</div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default FeaturedItems;
