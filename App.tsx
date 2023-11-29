import {View, Text} from 'react-native';
import React from 'react';
import StackNavigator from './StackNavigator';
import {ModalPortal} from 'react-native-modals';
import {Provider} from 'react-redux';
import store from './store';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <StackNavigator />
        <ModalPortal />
      </Provider>
    </>
  );
};

export default App;
