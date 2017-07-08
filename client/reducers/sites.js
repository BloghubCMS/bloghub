// import { Map } from 'immutable';
// import dummy from './../pages/Main/dummy';
import { POPULATE_SITES, DELETE_SITE } from './../actions';


const initialState = { sites: [] };


const sites = (state = initialState, action) => {
  switch (action.type) {
    case 'POPULATE_SITES':
      // console.log('action sites', action.sites)
      return Object.assign({}, state, {
        sites: action.sites
      })
      // return state.set('sites', action.sites);
    case 'DELETE_SITE':
      console.log('in delete site reducer', action.site)
      let newDummy = state.sites.map( (site, i) => {
        console.log('in new dummy', site)
        console.log('actio.site', action)
        if (site !== action.site) return site;
      });

      return Object.assign({}, state, {
        sites: newDummy
      });

    default:
      return state;
  }
}

export default sites;
