import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LoginView from './LoginView';
import RegisterView from './RegisterView';
import HomeLayoutView from './HomeLayoutView';
import LoadingScreenView from './LoadingScreenView';

const Stack = createStackNavigator();

const AuthLayout = () => {
    return (

        <Stack.Navigator initialRouteName="Loading"
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="Loading" component={LoadingScreenView} />

            <Stack.Screen name="Login" component={LoginView} />
            <Stack.Screen name="Register" component={RegisterView} />
            <Stack.Screen name="Home" component={HomeLayoutView} />
        </Stack.Navigator>

    )
}

export default AuthLayout