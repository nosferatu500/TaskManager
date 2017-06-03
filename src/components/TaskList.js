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
    
    this.createDataSource(this.props, this.state.filter);    
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps, this.state.filter); 
  }

  setFilter(text) {
    this.setState({ filter: text });
    this.createDataSource(this.props, text); 
    console.log(text)
  }

  createDataSource({ tasks }, text) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(this.sortFilter(tasks, text));
  }

  sortFilter(tasks, text) {
    console.log(text)
    if (text === 'All' || text === null) {
      return tasks;
    } 
    const filteredTasks = tasks.filter(task => {
          return task.important.indexOf(text) > -1;
    });
      console.log(text)
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
            <Picker.Item label="Select Filter" />
            <Picker.Item label="All" value="All" />
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
