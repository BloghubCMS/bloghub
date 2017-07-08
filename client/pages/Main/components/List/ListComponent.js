import React from 'react';
import Listing from './../Listing/ListingComponent';
import dummy from './../../dummy';
const Immutable = require('immutable');
 
class List extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandlerGoTo = this.clickHandlerGoTo.bind(this);
    this.clickHandlerDelete = this.clickHandlerDelete.bind(this);
    this.state = {
      sites: [],
    };
  }

  componentWillMount() {
    this.setState({ sites: dummy });
  }
  clickHandlerGoTo() {
    console.log('direct to site');
  }
  clickHandlerDelete(listing) {
    let sites = new Immutable.List(this.state.sites);
    // delete call to database here
    // delete using immutable
    sites = sites.delete(listing.props.id);
    // change state to update sites property
    this.setState({ sites });
  }
  render() {
    const listingsArr = this.state.sites.map( (site, i) => {
      return <Listing key={i} id={i} clickGoTo={this.clickHandlerGoTo} clickDelete={this.clickHandlerDelete} title={site.title} address={site.address} />
     });
    return (
      <div className="listing">
        { listingsArr }
      </div>
    );
  }
}

export default List;
