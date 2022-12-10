import { View, Text, BackHandler } from 'react-native'
import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShopLayoutView from '../shop/ShopLayoutView';
import { useNavigation } from '@react-navigation/native';
import CartLayoutView from '../shop/cart/CartLayoutView';
import ProfileLayoutView from '../Profile/ProfileLayout';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../styles/navbarStyle.js';

const Tab = createBottomTabNavigator();
const HomeLayoutView = (props) => {
    const navigation = useNavigation();
    // không cho user back về
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, [])

    return (
        <Tab.Navigator 
            initialRouteName='Shop'
            screenOptions={{ tabBarShowLabel: false, tabBarStyle: {
                    backgroundColor: '#333',
                    borderTopColor: 'transparent',
                    height: 60,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    }
            }}>
            {/* bottom tab styling */}
            <Tab.Screen name="Profile" component={ProfileLayoutView} options={{
                    tabBarIcon: ({ focused }) => (
                        <View onPress={() => { navigation.navigate('Profile') }} style={styles.icon}>
                            {focused ?(<Icon  name='user' color='white' size={40} />):(<Icon  name='user' color='grey' size={40} />)}
                        </View>
                    ),}}/>

            <Tab.Screen name="Shop" component={ShopLayoutView} options={{
                    tabBarIcon: ({ focused }) => (
                        <View onPress={() => { navigation.navigate('Main shop') }} style={styles.icon}>
                            {focused ?(<Icon  name='shopping-bag' color='white' size={40} />):(<Icon  name='shopping-bag' color='grey' size={40} />)}
                        </View>
                    ),}}/>

            <Tab.Screen name="Cart" component={CartLayoutView} options={{
                    tabBarIcon: ({ focused }) => (
                        <View onPress={() => { navigation.navigate('Cart') }} style={styles.icon}>
                            {focused ?(<Icon  name='shopping-cart' color='white' size={40} />):(<Icon  name='shopping-cart' color='grey' size={40} />)}
                        </View>
                    ),
                }
            } />

        </Tab.Navigator>
    )
}

export default HomeLayoutView