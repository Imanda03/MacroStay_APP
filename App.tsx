import React from 'react';
import StackNavigator from './StackNavigator';
import {ModalPortal} from 'react-native-modals';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <>
          <StackNavigator />
          <ModalPortal />
        </>
      </QueryClientProvider>
    </>
  );
};

export default App;
