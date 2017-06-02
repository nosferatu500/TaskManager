import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TaskForm from './TaskForm';
import { taskUpdate, taskSave, taskDelete } from '../actions';
import { CardSection, Card, Button, Confirm } from './common';

class TaskEdit extends Component {
  state = { showModal: false }

  componentWillMount() {
    _.each(this.props.task, (value, prop) => {
      this.props.taskUpdate({ prop, value });
    });
  }

  onButtonPress() {
    const { title, description, important, date, completeDate, status } = this.props;

    this.props.taskSave({ title, description, important, date, completeDate, status, uid: this.props.task.uid });
  }

  onAccept() {
    const { uid } = this.props.task;

    this.props.taskDelete({ uid });
  }

  onDecline() {
    this.setState({ showModal: false });
  } 

  render() {
    return (
      <Card>
        <TaskForm />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Save
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={this.onTextPress.bind(this)}>
            Text 
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
            Fire Task!!!
          </Button>
        </CardSection>

        <Confirm 
          visible={this.props.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          Are you sure you want to delete this?
        </Confirm>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { title, description, important, date, completeDate, status } = state.taskForm;

  return { title, description, important, date, completeDate, status };
};

export default connect(mapStateToProps, {
  taskUpdate, 
  taskSave, 
  taskDelete 
})(TaskEdit);
