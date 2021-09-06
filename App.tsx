import 'react-native-gesture-handler';
import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import MainStack from './src/navigation/navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background : 'white',
  },
};

const App = () => {
  return (
    <SafeAreaProvider>
    <NavigationContainer theme={MyTheme}>
        <MainStack />
    </NavigationContainer>
    </SafeAreaProvider>
  );
};



export default App;
