import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ReduxAsyncConnect } from 'redux-connect';
import { Router } from 'react-router';
import routes from './routes';
import store from 'redux/store';
import history from './history';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import '../node_modules/normalize.css/normalize.css';
import '../node_modules/font-awesome/scss/font-awesome.scss';
import '../node_modules/react-mde/lib/styles/react-mde.scss';
import '../node_modules/react-mde/lib/styles/react-mde-command-styles.scss';
import '../node_modules/react-mde/lib/styles/markdown-default-theme.scss';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import { cyan500 } from 'material-ui/styles/colors';
// import { grey300 } from 'material-ui/styles/colors';


// var ThemeManager = require('material-ui/lib/styles/theme-manager')();

// const muiTheme = getMuiTheme();
// const muiTheme = getMuiTheme({
//   palette: {
//     textColor: cyan500,
//   },
//   appBar: {
//     color: grey300,
//     textColor: cyan500,
//     height: 50,
//   },
// });

if (__CLIENT__ && __DEVELOPMENT__) {
  // https://facebook.github.io/react/docs/advanced-performance.html
  window.Perf = require('react-addons-perf');
}

if (__CLIENT__) {
  ReactDOM.render(
    // <MuiThemeProvider muiTheme={muiTheme}>
      <Provider store={store} key="provider">
        <Router render={(props) => <ReduxAsyncConnect {...props} />} history={history}>
            {routes}
        </Router>
      </Provider>,
    // </MuiThemeProvider>,
    document.getElementById('root')
  );
}
