import createReducer from '../../utils/createReducer';

// initial state before request data from server
const initialState = {
  items: null,
};

// Work with promise middleware
// See in /app/redux/middleware/promise.js
export default createReducer({
  ['GET_SITES_REQUEST']: (state, { payload }) => ({ // for example, set empty array on request
    ...state,
    items: null,
  }),

  ['GET_SITES_SUCCESS']: (state, { payload }) => ({ // get SITES from server
    ...state,
    items: payload.sites,
  }),

  ['GET_SITES_FAILURE']: (state, { payload }) => // for example, error from server
    console.log('error'),
}, initialState);

// Work with api middleware (will generate request promise).
// See in /app/redux/middleware/api.js
export const apiGetSites = () => ({
  mode: 'GET', // GET, POST
  type: 'GET_SITES', // see: createReducer in this file
  url: 'sites', // => api/posts (see in /api/routes/posts.js)
  data: {
    testParam: 'test', // query (if GET), body (if POST) (see in /api/routes/posts.js)
  },
  onSuccess: (res, dispatch) => {
    // Callback on success

    // We can dispatch other action
    // dispatch(OthereExampleAction)
  },
  onFailure: (res, dispatch) => {
    // Callback on failure

    // We can dispatch other action
    // dispatch(OthereExampleAction)
  },
});
