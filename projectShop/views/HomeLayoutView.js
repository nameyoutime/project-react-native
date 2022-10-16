import { View, Text,BackHandler } from 'react-native'
import React , {useEffect} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ProfileView from './ProfileView';
import ShopView from './ShopView';

const Tab = createBottomTabNavigator();
const HomeLayoutView = () => {
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, [])

    return (
        <Tab.Navigator>
            <Tab.Screen name="Profile" component={ProfileView} />
            <Tab.Screen name="Shop" component={ShopView} />
        </Tab.Navigator>
    )
}

export default HomeLayoutView