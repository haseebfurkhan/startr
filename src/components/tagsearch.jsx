import React, { Component } from "react";
import { KEYWORDS } from "../data/keywords";
import Item from "./item";
import { Data } from "../data/db.js";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const getItems = () => {
  let items = [];
  KEYWORDS.sort();
  KEYWORDS.forEach(element => {
    items.push({ id: element, content: element });
  });
  return items;
};

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const grid = 8;

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "white",
  padding: grid,
  width: "100%",
  minHeight: 100
});

class TagSearch extends Component {
  state = {
    items: getItems(),
    selected: [],
    filteredData: [],
    data: Data
  };

  constructor(props) {
    super(props);
  }

  id2List = {
    droppable: "items",
    droppable2: "selected"
  };

  getList = id => this.state[this.id2List[id]];

  onDragEnd = result => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      );

      let state = { items };

      if (source.droppableId === "droppable2") {
        state = { selected: items };
      }

      this.setState(state, this.UpdateUI);
    } else {
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );

      this.setState(
        {
          items: result.droppable,
          selected: result.droppable2
        },
        this.UpdateUI
      );
    }
  };

  UpdateUI = ui => {
    let filteredItemList = [];
    filteredItemList.push();

    let lookup = [];

    this.state.data.filter(item =>
      item.details.map(details => {
        let containsAll = false;

        for (var i = 0; i < this.state.selected.length; i++) {
          let element = this.state.selected[i];
          if (
            details.description &&
            details.description
              .toLowerCase()
              .includes(element.content.toLowerCase())
          ) {
            containsAll = true;
          } else {
            containsAll = false;
            break;
          }
        }
        
        if (containsAll) {
          lookup.push({
            item: item,
            details: details
          });
        }
      })
    );

    this.setState({ filteredData: lookup });
  };

  render() {
    const fitleredItems = [];
    this.state.filteredData.map(element => {
      fitleredItems.push(
        <Item
          title={element.details.projectName}
          technology={element.item.language}
          desc={element.details.description}
          stars={element.details.stars}
          url={element.details.url}
          headerColor={element.item.headerColor}
          logo={element.item.logo}
        />
      );
    });
    return (
      <div className="container">
        <div className="row">
          <DragDropContext onDragEnd={this.onDragEnd}>
            <div className="col-sm-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Keywords</h5>
                  <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                      >
                        {this.state.items.map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="btn btn-primary m-1"
                              >
                                {item.content}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Drag keywords here to filter</h5>
                  <Droppable droppableId="droppable2">
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                      >
                        {this.state.selected.map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="btn btn-success m-1"
                              >
                                {item.content}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              </div>
            </div>
          </DragDropContext>
        </div>
        <br></br>
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

export default TagSearch;
