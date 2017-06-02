import React, { Component } from 'react';
import firebase from 'firebase';

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
    return (
      
    );
  }
}

export default App;
