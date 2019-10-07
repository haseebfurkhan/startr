
import React, { Component } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import { TAGS } from "../data/tags";
import Item from "./item";
import { Data } from "../data/db.js";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      suggestions: TAGS,
      filteredData: [],
      data: Data
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleTagClick = this.handleTagClick.bind(this);
  }

  handleDelete(i) {
    let newTags = this.state.tags.filter((tag, index) => index !== i);
    this.setState({
      tags: newTags
    });
    let selectedTags = newTags.map(a => a.text);
    this.updateSearch(selectedTags);
  }

  handleAddition(tag) {
    let { tags, filteredData } = this.state;
    let selectedTags = tags.map(a => a.text);
    if (!selectedTags.includes(tag) && this.state.suggestions.includes(tag)) {
      this.setState({ tags: [...tags, { id: tags.length + 1, text: tag }] });
      selectedTags.push(tag);
      this.updateSearch(selectedTags);
    }
  }

  updateSearch(selectedTags) {
    let fitleredResults = [];
    selectedTags.forEach(element => {
      fitleredResults.push(
        this.state.data.filter(item => item.language.includes(element))
      );
    });
    this.state.filteredData = new Array();
    fitleredResults.forEach(element => {
      element[0].details.sort((a, b) => (parseInt(a.stars) < parseInt(b.stars)) ? 1 : -1);
      this.state.filteredData.push(element);
    });
    this.state.filteredData = this.state.filteredData.reverse();
  }

  handleDrag(tag, currPos, newPos) {
    const tags = [...this.state.tags];

    // mutate array
    tags.splice(currPos, 1);
    tags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags });
  }

  handleTagClick(index) {
    //console.log("The tag at index " + index + " was clicked");
  }

  render() {
    const { tags, suggestions } = this.state;
    const fitleredItems = [];
    this.state.filteredData.forEach(element => {
      element.map(item => {
        item.details.map(details =>
          fitleredItems.push(
            <Item
              title={details.projectName}
              technology={item.language}
              desc={details.description}
              stars={details.stars}
              url={details.url}
              headerColor={item.headerColor}
              logo={item.logo}
            />
          )
        );
      });
    });

    return (
      <div>
        <div className="container">
          <div className="card border-dark bg-light mb-3 shadow text-left">
            <div className="card-body text-dark">
              <h5 className="card-title">
                <div className="row">
                  <div className="col">Enter technologies</div>
                </div>
              </h5>
              <p className="card-text">
                <ReactTags
                  tags={tags}
                  suggestions={suggestions}
                  handleDelete={this.handleDelete}
                  handleAddition={this.handleAddition}
                  //handleDrag={this.handleDrag}
                  handleTagClick={this.handleTagClick}
                  classNames={{
                    tagInputField: "form-control form-control-sm m-1",
                    selected: "selectedClass",
                    tag: "btn btn-outline-primary btn-sm m-1 p-1",
                    remove: "h6 text-danger"
                  }}
                  placeholder=""
                  minQueryLength={1}
                />
              </p>
            </div>
          </div>
        </div>

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

export default Search;
