import 'react-native-gesture-handler';
import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import MainStack from './src/navigation/navigation';
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background : 'white',
  },
};

const App = () => {
  return (
    <NavigationContainer theme={MyTheme}>
        <MainStack />
    </NavigationContainer>
  );
};



export default App;
