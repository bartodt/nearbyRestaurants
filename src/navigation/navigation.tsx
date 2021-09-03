import React, {useContext} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Header from '../components/Header/Header';
import { Map } from '../components/Map';
import { Text } from 'react-native';
import {ThemeContext} from 'styled-components/native';


const Stack = createStackNavigator();

const MainStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                header: () => (
                    <Header />
                ),
            }}
        >
            <Stack.Screen
                name="Map"
                component={Map}
                options={{
                    headerTitle: 'Home',
                    headerRight: () => (
                        <Text>Right</Text>
                    ),
                }}

            />
        </Stack.Navigator>
    )
}

export default MainStack
