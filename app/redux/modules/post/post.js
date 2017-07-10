import createReducer from '../../utils/createReducer';

// initial state before request data from server
const initialState = {
  items: null,
};

// Work with promise middleware
// See in /app/redux/middleware/promise.js
export default createReducer({
  ['GET_POST_REQUEST']: (state, { payload }) => ({ // for example, set empty array on request
    ...state,
    items: null,
  }),

  ['GET_POST_SUCCESS']: (state, { payload }) => ({ // get posts from server
    ...state,
    items: payload.post,
  }),

  ['GET_POST_FAILURE']: (state, { payload }) => // for example, error from server
    console.log('error'),
}, initialState);

// Work with api middleware (will generate request promise).
// See in /app/redux/middleware/api.js
export const apiGetPost = (hash = '0') => ({
  mode: 'GET', // GET, POST
  type: 'GET_POST', // see: createReducer in this file
  url: 'post/' + hash, // => api/posts (see in /api/routes/posts.js)
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

export const apiPutPost = (hash = '0', text = 'empty post', header = '---\n---') => ({
  mode: 'PUT', // GET, POST
  type: 'PUT_POST', // see: createReducer in this file
  url: 'post/' + hash, // => api/posts (see in /api/routes/posts.js)
  data: {
    text: text, // query (if GET), body (if POST) (see in /api/routes/posts.js)
    header: header,
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


