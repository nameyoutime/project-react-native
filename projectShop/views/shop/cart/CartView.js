import { StyleSheet, Text, View, Button, TextInput, ScrollView, Image, TouchableHighlight } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
import asyncStorage from '../../../api/asynStorage';
import styles from '../../../styles/mainStyle';
import { Entypo, Ionicons } from '@expo/vector-icons'

const CartView = (props) => {
    const focus = useIsFocused();
    const [cartItems, setCartItems] = useState([]);
    // const [total, setTotal] = useState(0);
    useEffect(() => {
        if (focus) {
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
    const handleDelete = async (index) => {
        let newCart = [...cartItems];
        newCart.splice(index, 1);
        setCartItems(newCart);
        await asyncStorage.set('cart', newCart);
    }
    if(cartItems.length == 0){
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 24 }}>Cart is empty</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>

            <Text style={{ fontSize: 24 }}>Cart</Text>
            <ScrollView>{
                cartItems.map((item, index) => {
                    return (
                        <View key={index}>
                            <View
                                style={{
                                    marginTop: 20,
                                    opacity: 0.5,
                                    borderBottomColor: 'black',
                                    borderBottomWidth: 1,
                                    width: 350
                                }}
                            />
                            <View style={styles.item}>
                               
                               
                                {/* <Text onPress={() => handleDelete(index)} style={{ fontSize: 10, textAlign: 'center', borderRadius: 100, backgroundColor: 'red', color: 'black', fontWeight: 'bold', borderWidth: 1, width: 20, height: 20, position: 'absolute', top: 0, right: 5 }}>X</Text> */}
                                <View style={{ display: 'flex', flexDirection: "row" }}>

                                    

                                    <Image source={{ uri: item.product.images[0].url }} style={{ width: 100, height: 100, borderRadius: 10 }} />
                                    <View style={{ paddingHorizontal: 20 }}>
                                        <Text style={styles.title}>{item.product.title}</Text>
                                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                                            <Entypo size={30}  name="squared-minus" color="#293462" onPress={() => handleDecrease(index)}></Entypo>
                                            <TextInput
                                            underlineColorAndroid='transparent'
                                            style={{ textAlign: 'center', fontSize: 20, width: 25, outlineStyle: 'none' }}
                                            keyboardType='numeric'
                                            onChangeText={(text) => handleChangeText(text, index)} value={item.quantity}
                                            editable={false}
                                            />
                                            <Entypo size={30}  name="squared-plus" color="#293462" onPress={() => handleIncrease(index)}></Entypo>
                                        </View>
                                        <Text style={styles.description}>Total: {item.product.price * item.quantity} VND</Text>
                                    </View>
                                    <View style={{ alignItems: 'center', justifyContent: 'center', paddingLeft: 20 }}>
                                        <TouchableHighlight>
                                            <Ionicons color="#D61C4E" size={30} name="ios-remove-circle-outline" onPress={() => handleDelete(index)}/>
                                        </TouchableHighlight>
                                    </View>
                                </View>

                            </View>
                        </View>

                    )
                }
                    // <View key={index}>
                    //     <Text>title:{item.product.title}</Text>
                    //     <Button title='+' onPress={() => handleIncrease(index)} />
                    //     <TextInput onChangeText={(text) => handleChangeText(text, index)} value={item.quantity} />
                    //     <Button title='-' onPress={() => handleDecrease(index)} />
                    //     <Text>Item total: {item.product.price * item.quantity}</Text>
                    // </View>
                )}

            </ScrollView>
            <View style={{display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'center', marginBottom: 50}}>
                {/* <Text style={styles.title}>Total</Text> */}
                <Text style={{  fontSize: 20, color : "#D61C4E", fontWeight: "bold", paddingRight: 10}}> Total {handleTotal()} VND</Text>
                {cartItems.length > 0 && <Entypo size={40} name='paper-plane' color="#1CD6CE" title='Checkout'  onPress={() => handleCheckout()} />}
            </View>
        </View>
    )

}

export default CartView
