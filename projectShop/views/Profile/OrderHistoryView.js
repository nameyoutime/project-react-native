import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';
import orderApi from '../../api/orderApi';

const OrderHistoryView = (props) => {
    const focus = useIsFocused();
    const [userId, setUserId] = useState(props.route.params.userId);
    const [isAdmin, setIsAdmin] = useState(props.route.params.isAdmin);
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        if (focus) {
            fetchOrders(userId,isAdmin);
        }
    }, [focus])
    const fetchOrders = async (userId, isAdmin) => {
        let respone = [];
        if(isAdmin) respone = await orderApi.getAll();
        else respone = await orderApi.get(userId);
        console.log(respone.data)
    }

    console.log()
    return (
        <>
            <Button title='Go to profile' onPress={() => { props.navigation.navigate('Profile view') }} />


        </>
    )
}

export default OrderHistoryView

const styles = StyleSheet.create({})