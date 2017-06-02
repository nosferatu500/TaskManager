import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import { taskFetch } from '../actions';
import ListItem from './ListItem';

class TaskList extends Component {

}

const mapStateToProps = state => {
  const tasks = _.map(state.tasks, (val, uid) => {
    return { ...val, uid };
  });

  return { tasks };
};

export default connect(mapStateToProps, { taskFetch })(TaskList);
