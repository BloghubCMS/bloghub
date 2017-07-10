import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { asyncConnect } from 'redux-connect';

import { ReactMde, ReactMdeCommands } from 'react-mde';

import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import * as actionCreators from 'redux/modules';
import { apiGetPost } from 'redux/modules/post/post';

/* component styles */
import s from './styles.css';

export class Post extends Component {
  static propTypes = {
    item: PropTypes.array,
  };

  state = {
    mdeValue: {text: "loading", selection: null},
  }

  handleValueChange(value) {
      this.setState({mdeValue: value});
  }

  handlePublishTap() {
    // console.log(this.props);
    this.props.apiPutPost(window.pageid, this.state.mdeValue.text);
  }

  getChildContext() {
    return {
      muiTheme: getMuiTheme({ userAgent: (typeof navigator !== 'undefined' && navigator.userAgent) || 'all' }),
    };
  }
  componentWillReceiveProps(nextProps) {
    const { items } = nextProps;
    if (items && items.text) {
      this.setState({
        mdeValue: {
          text: items.text,
          selection: null,
        },
      });
    }
  }

  render() {
    const { items } = this.props;
    let commands = ReactMdeCommands.getDefaultCommands();
    
    return (
      <section className={s.root}>
        <Helmet
          title="post"
        />
          <div className={s.buttonContainer}>
          <h2 className={s.header}>{items && items.title}</h2>
          <RaisedButton
            //href="https://github.com/callemall/material-ui"
            label="Preview"
            secondary={true}
            className={s.button}
          />
          <RaisedButton
            label="Publish Post"
            primary={true}
            className={s.button}
            onTouchTap={this.handlePublishTap.bind(this)}
          />
        </div>
        <ReactMde
            textareaId="ta1"
            textareaName="ta1"
            value={this.state.mdeValue}
            onChange={this.handleValueChange.bind(this)}
            commands={commands} />
      </section>
    );
  }
}

Post.childContextTypes = {
  muiTheme: React.PropTypes.object,
  redux: React.PropTypes.object
};

export default asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    // if (!getState().post.items) {
      // Get items from api server // see: app/redux/modules/posts
      return dispatch(apiGetPost(window.pageid));
    // }
  },
}])(connect( // Conect to redux posts store // see: app/redux/modules/posts
  state => ({ ...state.post }),
  dispatch => bindActionCreators({
    ...actionCreators.post,
  }, dispatch),
)(Post));
