import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, View, Text, Picker } from 'react-native';
import { tasksFetch } from '../actions';
import { CardSection } from './common';
import ListItem from './ListItem';

class TaskList extends Component {
  state = { filter: null }

  componentWillMount() {
    this.props.tasksFetch();
    
    this.createDataSource(this.props);    
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps); 
  }

  setFilter(text) {
    this.setState({ filter: text });
    this.createDataSource(this.props); 
  }

  createDataSource({ tasks }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(this.sortFilter(tasks));
  }

  sortFilter(tasks) {
    const filteredTasks = this.state.filter
      ? tasks.filter(task => {
          return task.important.indexOf(this.state.filter) > -1;
        })
      : tasks;
      console.log(filteredTasks)
    return filteredTasks;
  }

  renderRow(task) {
    return <ListItem task={task} />;
  }

  render() {
    return (
    <View>
      <CardSection>
          <Text>Filter</Text>
          <Picker
            style={{ flex: 1 }}
            onValueChange={text => 
              this.setFilter(text)}
          >
            <Picker.Item label="Easy" value="Easy" />
            <Picker.Item label="Normal" value="Normal" />
            <Picker.Item label="Hard" value="Hard" />
          </Picker>
        </CardSection>
      <ListView 
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
</View>
      
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
