import React from 'react';

class Listing extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickGoTo = this.handleClickGoTo.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
  }
  handleClickGoTo() {
    this.props.clickGoTo(this);
  }

  handleClickDelete() {
    this.props.clickDelete(this);
  }
  render() {
    return (
      <div className = "listing" onClick = { this.handleClickGoTo } >
        { this.props.title }
        { this.props.address }
        {/*title of project, address, buttons*/}
        <button className = "deleteSite" onClick = {this.handleClickDelete} ></button>
      </div>
    );
  }
}

export default Listing;