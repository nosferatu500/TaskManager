import { combineReducers } from 'redux';
import TaskFormReducer from './TaskFormReducer';
import TaskReducer from './TaskReducer';

export default combineReducers({
    taskForm: TaskFormReducer,
    tasks: TaskReducer
});
