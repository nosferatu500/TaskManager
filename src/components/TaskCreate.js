import React, { Component } from 'react';
import { connect } from 'react-redux';
import { taskUpdate, taskCreate } from '../actions';
import { Card, CardSection, Button } from './common';
import TaskForm from './TaskForm';

class TaskCreate extends Component {
  onButtonPress() {
    const { title, description, important, date, completeDate, status } = this.props;

    this.props.taskCreate({ 
      title, 
      description, 
      important: (important === null) ? 'Easy' : important, 
      date, 
      completeDate, 
      status 
    });
  }

  render() {
    return (
      <Card>
        <TaskForm {...this.props} />

        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Save
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  const { title, description, important, date, completeDate, status } = state.taskForm;

  return { title, description, important, date, completeDate, status };
};

export default connect(mapStateToProps, { taskUpdate, taskCreate })(TaskCreate);
