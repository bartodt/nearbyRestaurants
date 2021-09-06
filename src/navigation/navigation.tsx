import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CardList from '../components/restaurant-cards/CardList';
import ReviewsList from '../components/reviews/ReviewsList';
import Map from '../components/map/Map';
import { StyleSheet } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/core';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Svg, { Path, Circle } from 'react-native-svg';
import ICONS from "../assets"


const Stack = createStackNavigator();

const MainStack = () => {
    const navigation = useNavigation()
    return (
        <Stack.Navigator
            initialRouteName="Mapa"
            screenOptions={{ headerTitleAlign: 'center', headerStyle: { backgroundColor: "#111d5e" }, headerPressOpacity: 20, headerTintColor: "white" }}
        >
            <Stack.Screen
                name="Map"
                component={Map}
                options={{
                    title: "NearBite", headerRight: () => (
                        <TouchableOpacity
                            style={styles.headerRight}
                            onPress={() => { navigation.dispatch(StackActions.push("RestaurantList")) }}
                        >
                            <Svg fill={"white"} style={styles.list} viewBox={ICONS["LIST"].viewBox}>
                                <Path
                                    d={ICONS["LIST"].primary}
                                />
                                <Path
                                    d={ICONS["LIST"].secondary}
                                />
                                <Path
                                    d={ICONS["LIST"].terciary}
                                />
                                <Circle
                                    cx="27"
                                    cy="106"
                                    r="27"
                                    fill="#ffffff"
                                />
                                <Circle
                                    cx="27"
                                    cy="256"
                                    r="27"
                                    fill="#ffffff"
                                />
                                <Circle
                                    cx="27"
                                    cy="406"
                                    r="27"
                                    fill="#ffffff"
                                />
                            </Svg>
                        </TouchableOpacity>

                    ),

                }}
            />
            <Stack.Screen
                name="RestaurantList"
                component={CardList}
                options={{
                    title: "Near options", headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => { navigation.goBack() }}
                        >
                            <Svg fill={"white"} style={styles.arrowLeft} viewBox={ICONS["ARROW_LEFT"].viewBox}>
                                <Path
                                    d={ICONS["ARROW_LEFT"].primary}
                                />
                            </Svg>
                        </TouchableOpacity>)
                }}

            />
            <Stack.Screen
                name="Reviews"
                component={ReviewsList}
                options={{
                    title: "Reviews", headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => { navigation.goBack() }}
                        >
                            <Svg fill={"white"} style={styles.arrowLeft} viewBox={ICONS["ARROW_LEFT"].viewBox}>
                                <Path
                                    d={ICONS["ARROW_LEFT"].primary}
                                />
                            </Svg>
                        </TouchableOpacity>)
                }}

            />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    list: { height: 24, width: 24 },
    arrowLeft: { flex: 1, height: 30, width: 30 }
    , headerRight: {marginRight: 10}
})

export default MainStack