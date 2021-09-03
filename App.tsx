import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/navigation/navigation';

const App = () => {
  return (
    <NavigationContainer>
        <MainStack />
    </NavigationContainer>
  );
};



export default App;
