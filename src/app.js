import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './router';

class App extends Component {
  componentWillMount() {
    const config = {
    apiKey: 'AIzaSyAavV_VYYDZpAD8dIcLy6hZxIH-6bA3wk4',
    authDomain: 'taskmanager-1c626.firebaseapp.com',
    databaseURL: 'https://taskmanager-1c626.firebaseio.com',
    projectId: 'taskmanager-1c626',
    storageBucket: 'taskmanager-1c626.appspot.com',
    messagingSenderId: '291795142122'
  };
  firebase.initializeApp(config);
}

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
