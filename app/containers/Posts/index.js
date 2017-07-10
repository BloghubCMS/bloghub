import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { asyncConnect } from 'redux-connect';

import RaisedButton from 'material-ui/RaisedButton';

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
import { apiGetPosts } from 'redux/modules/posts/posts';

/* component styles */
import s from './styles.css';

export class Posts extends Component {
  static propTypes = {
    items: PropTypes.array,
  };

  state = {
    selected: [1],
  };

  isSelected = (index) => {
    return this.state.selected.indexOf(index) !== -1;
  };

  handleRowSelection = (selectedRows) => {
    const hash = this.props.items[selectedRows].id;
    window.pageid = hash;
    this.props.history.push('/sites/' + this.props.params.site_id + '/posts/' + hash);

    console.log('selected row:', selectedRows);
    this.setState({
      selected: selectedRows,
    });
  };


  getChildContext() {
    return {
      muiTheme: getMuiTheme({ userAgent: (typeof navigator !== 'undefined' && navigator.userAgent) || 'all' }),
    };
  }

  render() {
    const { items } = this.props;

    return (
      <section className={s.root}>
        <Helmet
          title="posts"
        />
        <div className={s.buttonContainer}>
          <h2 className={s.header}>Posts</h2>

          <RaisedButton
            label="New Post"
            primary={true}
            className={s.button}
            icon={<i className="fa fa-plus" aria-hidden="true" />}
          />
        </div>
        <Table className={s.list} onRowSelection={this.handleRowSelection}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Status</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            stripedRows={true}
            showRowHover={true}
          >
          { // Render posts
            items && items.map(post =>
              <TableRow className={s.item} key={post.id}>>
                <TableRowColumn>{post.id}</TableRowColumn>
                <TableRowColumn>{post.title}</TableRowColumn>
                <TableRowColumn>Published</TableRowColumn>
              </TableRow>
            )
          }
          </TableBody>
        </Table>

      </section>
    );
  }
}

Posts.childContextTypes = {
  muiTheme: React.PropTypes.object,
};

export default asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    if (!getState().posts.items) {
      // Get items from api server // see: app/redux/modules/posts
      return dispatch(apiGetPosts());
    }
  },
}])(connect( // Conect to redux posts store // see: app/redux/modules/posts
  state => ({ ...state.posts }),
  dispatch => bindActionCreators({
    ...actionCreators.posts,
  }, dispatch),
)(Posts));
