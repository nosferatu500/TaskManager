import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
  TASK_UPDATE, 
  TASK_CREATE, 
  TASKS_FETCH_SUCCESS, 
  TASK_SAVE_SUCCESS 
} from './types'; 

export const taskUpdate = ({ prop, value }) => {
  return {
    type: TASK_UPDATE,
    payload: { prop, value }
  };
};

export const taskCreate = ({ title, description, important, date, completeDate, status }) => {
  return (dispatch) => {
    firebase.database().ref('/tasks')
      .push({ title, description, important, date, completeDate, status })
      .then(() => {
        dispatch({ type: TASK_CREATE });
        Actions.taskList({ type: 'reset' });
      });
  };
};

export const tasksFetch = () => {
  return (dispatch) => {
    firebase.database().ref('/tasks')
      .on('value', snapshot => {
        dispatch({ type: TASKS_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const taskSave = ({ title, description, important, date, completeDate, status, uid }) => {
  return (dispatch) => {
    firebase.database().ref(`/tasks/${uid}`)
      .set({ title, description, important, date, completeDate, status })
      .then(() => {
        dispatch({ type: TASK_SAVE_SUCCESS });
        Actions.taskList({ type: 'reset' });
      });
  };
};

export const taskDelete = ({ uid }) => {
  return () => {
    firebase.database().ref(`/tasks/${uid}`)
      .remove()
      .then(() => {
        Actions.taskList({ type: 'reset' });
      });
  };
};
