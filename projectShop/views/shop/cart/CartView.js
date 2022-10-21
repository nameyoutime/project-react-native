import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
import asyncStorage from '../../../api/asynStorage';

const CartView = (props) => {
    const focus = useIsFocused();
    const [cartItems, setCartItems] = useState([]);
    // const [total, setTotal] = useState(0);
    useEffect(() => {
        if (focus && cartItems.length === 0) {
            fetchCart()
        }
    }, [focus])
    const fetchCart = async () => {
        let cart = await asyncStorage.get('cart');
        console.log(cart)
        setCartItems(cart);
    }
    const handleCheckout = async () => {
        saveToStorage(cartItems);
        // console.log(total)
        let total = 0;
        for (let i = 0; i < cartItems.length; i++) {
            const element = cartItems[i];
            total += element.product.price * element.quantity;
        }
        // console.log(total)
        props.navigation.navigate('Checkout', { cartItems: cartItems, total: total });
        // setCartItems([]);
    }

    const saveToStorage = async (items) => {
        await asyncStorage.set('cart', items);
    }
    const handleChangeText = (text, index) => {
        // console.log(text)
        if (text.length > 0) {
            let newCart = [...cartItems];
            newCart[index].quantity = parseInt(text);
            setCartItems(newCart);
            saveToStorage(newCart);
        }
    }
    const handleIncrease = (index) => {
        let newCart = [...cartItems];
        newCart[index].quantity += 1;
        setCartItems(newCart);
        saveToStorage(newCart);
    }
    const handleDecrease = (index) => {
        let newCart = [...cartItems];
        if (newCart[index].quantity > 1) {
            newCart[index].quantity -= 1;
            setCartItems(newCart);
            saveToStorage(newCart);
        }
    }
    const handleTotal = () => {
        // console.log('test')
        let total = 0;
        for (let i = 0; i < cartItems.length; i++) {
            const element = cartItems[i];
            total += element.product.price * element.quantity;
        }
        if (total !== 0)
            return (
                <Text>{total}</Text>
            );
    }

    return (
        <>

            <View>{
                cartItems.map((item, index) =>
                    <View key={index}>
                        <Text>title:{item.product.title}</Text>
                        <Button title='+' onPress={() => handleIncrease(index)} />
                        <TextInput onChangeText={(text) => handleChangeText(text, index)} value={item.quantity} />
                        <Button title='-' onPress={() => handleDecrease(index)} />
                        <Text>Item total: {item.product.price * item.quantity}</Text>
                    </View>

                )
            }</View>
            <View>{handleTotal()}</View>
            {cartItems.length > 0 && <Button title='Checkout' onPress={() => handleCheckout()} />}
            
        </>
    )
}

export default CartView

const styles = StyleSheet.create({})