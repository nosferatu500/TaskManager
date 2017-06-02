import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { taskUpdate } from '../actions';
import { CardSection, Input } from './common';

class TaskForm extends Component {
  onPickDate() {
    return (<DatePicker
            style={{ width: 200 }}
            date={this.state.date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="2015-05-01"
            maxDate="2018-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
            }}
            onDateChange={(date) => { this.props.taskUpdate({ prop: 'date', value: date }); }}
    />);
  }

  setCompleteDate() {

  }

  setStatus() {

  }

  render() {
    return (
      <View>
        <CardSection>
          <Input 
            label="Title"
            placeholder="Tasks title"
            value={this.props.title}
            onChangeText={text => this.props.taskUpdate({ prop: 'title', value: text })}
          />
        </CardSection>
        
        <CardSection>
          <Input 
            label="Description"
            placeholder="Tasks description"
            value={this.props.description}
            onChangeText={text => this.props.taskUpdate({ prop: 'description', value: text })}
          />
        </CardSection>
        
        <CardSection>
          <Text>Important</Text>
          <Picker
            style={{ flex: 1 }}
            selectedValue={this.props.important}  
            onValueChange={important => this.props.taskUpdate({ prop: 'important', value: important })}
          >
            <Picker.Item label="Easy" value="Easy" />
            <Picker.Item label="Normal" value="Normal" />
            <Picker.Item label="Hard" value="Hard" />
          </Picker>
        </CardSection>
        
        <CardSection>
          <Text>Date</Text>
          {this.props.onPickDate()}
        </CardSection>
        
        <CardSection>
          <Text>Complete Date</Text>
          {this.props.onPickDate()}
        </CardSection>
        
        <CardSection>
          <Text>Status</Text>
          {this.props.onPickDate()}
        </CardSection>
        
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { title, description, important, date, completeDate, status } = state.taskForm;

  return { title, description, important, date, completeDate, status };
};

export default connect(mapStateToProps, { taskUpdate })(TaskForm);
