import { View, Text, BackHandler } from 'react-native'
import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShopLayoutView from '../shop/ShopLayoutView';
import { useNavigation } from '@react-navigation/native';
import CartLayoutView from '../shop/cart/CartLayoutView';
import ProfileLayoutView from '../Profile/ProfileLayout';
const Tab = createBottomTabNavigator();
const HomeLayoutView = (props) => {
    const navigation = useNavigation();

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, [])

    return (
        <Tab.Navigator initialRouteName='Shop' >
            <Tab.Screen name="Profile" component={ProfileLayoutView} options={

                {
                    headerTitle: (props) =>
                        <>
                            <Text onPress={() => { navigation.navigate('Profile') }}>
                                Profile
                            </Text>

                        </>
                }
            } />
            <Tab.Screen name="Shop" component={ShopLayoutView} options={
                {
                    headerTitle: (props) =>
                        <>
                            <Text onPress={() => { navigation.navigate('Main shop') }}>
                                Shop
                            </Text>

                        </>
                }

            } />
            <Tab.Screen name="Cart" component={CartLayoutView} options={
                {
                    headerTitle: (props) =>
                        <>
                            <Text onPress={() => { navigation.navigate('Cart') }}>
                                Cart
                            </Text>

                        </>
                }

            } />
            {/* <Stack.Screen name="Cart view" component={CartView} />
            <Stack.Screen name="Checkout" component={CheckOutView} /> */}

        </Tab.Navigator>
    )
}

export default HomeLayoutView