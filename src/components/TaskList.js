import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import { tasksFetch } from '../actions';
import ListItem from './ListItem';

class TaskList extends Component {

  componentWillMount() {
    this.props.tasksFetch();

    this.createDataSource(this.props);    
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps); 
  }

  createDataSource({ tasks }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(tasks);
  }

  renderRow(task) {
    return <ListItem task={task} />;
  }

  render() {
    return (
      <ListView 
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = state => {
  const tasks = _.map(state.tasks, (val, uid) => {
    return { ...val, uid };
  });

  return { tasks };
};

export default connect(mapStateToProps, { tasksFetch })(TaskList);
