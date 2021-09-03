import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CardList from '../components/restaurant-cards/CardList';
import ReviewsList from '../components/reviews/ReviewsList';
import Map from '../components/map/Map';
import { Text } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/core';
import { TouchableOpacity } from 'react-native-gesture-handler';





const Stack = createStackNavigator();

const MainStack = () => {
    const navigation = useNavigation()
    return (
        <Stack.Navigator
            initialRouteName="Mapa"
            screenOptions={{ headerTitleAlign: 'center' }}
        >
            <Stack.Screen
                name="Map"
                component={Map}
                options={{
                    title: "NearBite", headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.dispatch(StackActions.push("RestaurantList"))} style={{ marginLeft: 10 }}>
                            <Text style={{ color: "#68D17E", marginRight: 10 }}>Details</Text>
                        </TouchableOpacity>

                    ),
                }}
            />
            <Stack.Screen
                name="RestaurantList"
                component={CardList}
                options={{
                    title: "Near options", headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
                            <Text style={{ color: "#68D17E" }}>Back</Text>
                        </TouchableOpacity>

                    ),
                }}

            />
            <Stack.Screen
                name="Reviews"
                component={ReviewsList}
                options={{
                    title: "Reviews", headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
                            <Text style={{ color: "#68D17E" }}>Back</Text>
                        </TouchableOpacity>

                    ),
                }}

            />
        </Stack.Navigator>
    )
}

export default MainStack