import React from 'react';
import Listing from './../Listing/ListingComponent';
import dummy from './../../dummy';
import store from './../../main';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sitesActions from './../../../../actions'
import { Map } from 'immutable';
 
class List extends React.Component {
  constructor(props) {
    super(props);
    // this.clickHandlerGoTo = this.clickHandlerGoTo.bind(this);
    // this.clickHandlerDelete = this.clickHandlerDelete.bind(this);
    // this.state = {
    //   sites: [],
    // };
  }

  componentWillMount() {
    this.props.initializeSites();
    console.log('in component will mount', this.props);
    // store.dispatch(populateSites(dummy));
    // this.setState({sites: dummy})

  }
  // clickHandlerGoTo() {
  //   console.log('direct to site');
  // }
  // clickHandlerDelete(listing) {
  //   // let sites = new Immutable.List(this.state.sites);
  //   // // delete call to database here
  //   // // delete using immutable
  //   // sites = sites.delete(listing.props.id);
  //   // change state to update sites property
  //   store.dispatch(updateSites(sites));
  // }
  render() {
    let listingsArr = [];
    if (this.props.sites.sites.length) { 
    listingsArr = this.props.sites.sites.map( (site, i) => {
      return <Listing key={i} id={i} title={site.title} address={site.address} />
     });
    }
    return (
      <div className="listing">
        { listingsArr }
      </div>
    );
  }
}


// List.propTypes = {
//   dispatch: React.PropTypes.func,
//   sites: React.PropTypes.object
// }
const mapStateToProps = (state) => {
  return {
    sites: state.sites
  }
}

const mapDispatchToProps = (dispatch) => ({
  initializeSites: () => {
    dispatch(sitesActions.populateSites(dummy));
  }
});

const ConnectedList = connect(mapStateToProps, mapDispatchToProps)(List);

export default ConnectedList;
