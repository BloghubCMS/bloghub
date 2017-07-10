import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { asyncConnect } from 'redux-connect';
import { browserHistory } from 'react-router';

import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {fullWhite} from 'material-ui/styles/colors';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import * as actionCreators from 'redux/modules';
import { apiGetSites } from 'redux/modules/sites/sites';

/* component styles */
import s from './styles.css';

export class Sites extends Component {
  static propTypes = {
    items: PropTypes.array,
  };

  getChildContext() {
    return {
      muiTheme: getMuiTheme({ userAgent: (typeof navigator !== 'undefined' && navigator.userAgent) || 'all' }),
    };
  }

  state = {
    selected: [1],
  };

  isSelected = (index) => {
    return this.state.selected.indexOf(index) !== -1;
  };

  handleRowSelection = (selectedRows) => {
    this.props.history.push('/sites/' + selectedRows);

    console.log('selected row:', selectedRows);
    this.setState({
      selected: selectedRows,
    });
  };


  render() {
    const { items } = this.props;

    return (
      <section className={s.root}>
        <Helmet
          title="sites"
        />
        <div className={s.buttonContainer}>
          <h2 className={s.header}>My Sites</h2>
          <RaisedButton
            //href="https://github.com/callemall/material-ui"
            label="Open Site"
            secondary={true}
            className={s.button}
            icon={<i className="fa fa-github" aria-hidden="true"/>}
          />
          <RaisedButton
            label="Create Site"
            primary={true}
            className={s.button}
            icon={<i className="fa fa-plus" aria-hidden="true" />}
          />
        </div>
        <Table onRowSelection={this.handleRowSelection} className={s.list}>
          <TableBody
            stripedRows={true}
            showRowHover={true}
            displayRowCheckbox={false}
          >
          { // Render posts
            items && items.map((site, i) =>
              <TableRow className={s.item} key={site.id} selected={this.isSelected(i)}>
                <TableRowColumn>{site.title}</TableRowColumn>
                <TableRowColumn>{site.id}</TableRowColumn>
              </TableRow>
            )
          }
          </TableBody>
        </Table>

      </section>
    );
  }
}

Sites.childContextTypes = {
  muiTheme: React.PropTypes.object,
};

export default asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    if (!getState().sites.items) {
      // Get items from api server // see: app/redux/modules/posts
      return dispatch(apiGetSites());
    }
  },
}])(connect( // Conect to redux posts store // see: app/redux/modules/posts
  state => ({ ...state.sites }),
  dispatch => bindActionCreators({
    ...actionCreators.sites,
  }, dispatch),
)(Sites));
