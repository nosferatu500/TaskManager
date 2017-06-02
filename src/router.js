import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import TaskList from './components/TaskList';
import TaskCreate from './components/TaskCreate';
import TaskEdit from './components/TaskEdit';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene 
        onRight={() => Actions.taskCreate()} 
        rightTitle="Add Task"
        key="taskList" 
        component={TaskList} 
        title="Task List" 
        initial
      />      

      <Scene title="Create Task" component={TaskCreate} key="taskCreate" />
      <Scene title="Edit Task" component={TaskEdit} key="taskEdit" />

    </Router>
  );
};

export default RouterComponent;
