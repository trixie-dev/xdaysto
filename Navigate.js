import React from "react";
import MainPage from "./components/MainPage";
import TimerPage from "./components/TimerPage";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function Navigate() {
    return (
        <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen 
                name="XdaysTo..." 
                component={MainPage} 
                options={
                        {
                            title: '',
                            headerStyle: {
                                backgroundColor: 'rgba(30,30,30,1)',
                            },
                            headerTitleStyle: {
                                fontWeight: '400',
                            },
                            // hide bottom shadow
                            headerShadowVisible: false,
                        }
                    }
            />
            <Stack.Screen 
                name="TimerPage" 
                component={TimerPage} 
                options={
                    {
                        title: '',
                        headerTintColor: 'white',
                        headerStyle: {
                            backgroundColor: 'rgba(30,30,30,1)',
                        },
                        headerTitleStyle: {
                            fontWeight: '400',
                        },
                        // hide bottom shadow
                        headerShadowVisible: false,
                    }
                }
            />
        </Stack.Navigator>
        </NavigationContainer>
    );
}