import React from 'react';
import { connect } from 'react-redux';
import * as sitesActions from './../../../../actions';

class Listing extends React.Component {
  constructor(props) {
    super(props);
    // this.deleteSites = this.deleteSites.bind(this);
    // this.populateSites = this.populateSites.bind(this);
    // this.handleClickGoTo = this.handleClickGoTo.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
  }
  // handleClickGoTo() {
  //   this.props.clickGoTo(this);
  // }

  handleClickDelete(listing) {
    console.log('inhandle click', this);
    this.props.deleteSite(listing);
  }
  
  render() {
    console.log('in listing render ', this.props)
    return (
      // <div className = "listing" onClick = { this.handleClickGoTo } >
      <div className = "listing">
        { this.props.title }
        { this.props.address }
        {/*title of project, address, buttons*/}
        <button className = "deleteSite" onClick = {this.handleClickDelete} ></button>
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   console.log('in map state to props', state)
//   return {
//     sites: state.sites
//   }
// }

const mapDispatchToProps = dispatch => ({
  deleteSite: (listing) => {
    dispatch(sitesActions.deleteSite(listing));
  }
});

const ConnectedListing = connect(null, mapDispatchToProps)(Listing);

export default ConnectedListing;
