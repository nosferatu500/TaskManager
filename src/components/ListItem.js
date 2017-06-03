import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { taskDelete, taskUpdate, taskSave } from '../actions';
import { CardSection, Card, Button, Confirm } from './common';

class ListItem extends Component {
  state = { showModal: false }

  onAccept() {
    const { uid } = this.props.task;

    this.props.taskDelete({ uid });
    this.setState({ showModal: false });
  }

  onDecline() {
    this.setState({ showModal: false });
  } 

  onEditPress() {
    Actions.taskEdit({ task: this.props.task });
  }

  onCompletePress() {
    const { title, description, important, date } = this.props.task;

    this.props.taskSave({ 
      title, 
      description, 
      important, 
      date, 
      completeDate: new Date().toLocaleString(), 
      status: 'Completed', 
      uid: this.props.task.uid 
    });
  }

  setColor() {
    if (this.props.task.date < new Date().toLocaleDateString()) {
      console.log(new Date().toLocaleDateString(), this.props.task.date);
      return 'red';
    }
  }

  cardStatusStyle() {
    return {
     borderRadius: 10,
     backgroundColor: this.setColor(),
   };
  }

  render() {
    const { title, description, date, completeDate, important, status } = this.props.task;

    return (
        <ScrollView>
          <Card>
            <CardSection style={this.cardStatusStyle()}>
              <View>
                <Text style={styles.titleStyle}>
                  {title}
                </Text>
                <Text style={styles.titleStyle}>
                  {description}
                </Text>
                <Text>
                  Important: {important}
                </Text>
                <Text>
                  Date: {date}
                </Text>
                <Text>
                  Completed: {completeDate}
                </Text>
                <Text>
                  Status: {status}
                </Text>
              </View>
            </CardSection>

            <CardSection>
              <Button onPress={this.onCompletePress.bind(this)} >
                  Complete!
                </Button>
              <Button onPress={this.onEditPress.bind(this)} >
                Edit
              </Button>
              <Button onPress={() => this.setState({ showModal: !this.state.showModal })} >
                  Delete!
                </Button>
            </CardSection>

            <Confirm 
              visible={this.state.showModal}
              onAccept={this.onAccept.bind(this)}
              onDecline={this.onDecline.bind(this)}
            >
              Are you sure you want to delete this?
              
            </Confirm>

            </Card>
        </ScrollView>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  },
  cardStatusStyle: {

  }
};

const mapStateToProps = (state) => {
  const { title, description, important, date, completeDate, status } = state.taskForm;

  return { title, description, important, date, completeDate, status };
};

export default connect(mapStateToProps, { taskDelete, taskUpdate, taskSave })(ListItem);
