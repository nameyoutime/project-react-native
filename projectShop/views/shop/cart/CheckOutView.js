import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';
import asyncStorage from '../../../api/asynStorage';
import orderApi from '../../../api/orderApi';
import { StackActions, CommonActions } from '@react-navigation/native';
const CheckOutView = (props) => {
    const focus = useIsFocused();
    const [cartItems, setCartItems] = useState(props.route.params.cartItems);
    const [user, setUser] = useState(null);
    useEffect(() => {
        if (focus && !user) {
            fetchUser();
        }
    }, [focus])
    const fetchUser = async () => {
        let user = await asyncStorage.get('user');

        setUser(user);
    }
    const handleOrder = async () => {
        let order = {
            products: [],
            total: props.route.params.total,
            user: '',
            status:0,
        };
        // console.log(cartItems)
        let tempUser = { ...user }
        tempUser = {
            ...tempUser,
            user: { isAdmin: tempUser.isAdmin, __v: 0, _id: tempUser._id, address: '123', phone: 123, name: '123', email: '123' },

        }
        for (let i = 0; i < cartItems.length; i++) {
            const element = cartItems[i];
            order.products.push({
                product: element.product._id,
                quantity: element.quantity,

            })
            // console.log(element)

        }
        order.user = tempUser.user._id;
        let respone = await orderApi.create({ order: order });
        await asyncStorage.set('cart', []);
        const resetAction = CommonActions.reset({
            index: 0,
            routes: [{ name: 'Shop' }]
        });
        props.navigation.dispatch(resetAction);
    }
    const handleCheck = async () => {
        await asyncStorage.set('cart', []);
        const resetAction = CommonActions.reset({
            index: 0,
            routes: [{ name: 'Shop' }]
        });
        props.navigation.dispatch(resetAction);

    }
    return (
        <View>
            <Button title='Order' onPress={() => handleOrder()} />
            {/* <Button title='Check' onPress={() => handleCheck()} /> */}

        </View>
    )
}

export default CheckOutView

const styles = StyleSheet.create({})