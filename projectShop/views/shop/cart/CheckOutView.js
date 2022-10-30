import { Button, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';
import asyncStorage from '../../../api/asynStorage';
import orderApi from '../../../api/orderApi';
import { StackActions, CommonActions } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'

const CheckOutView = (props) => {
    const focus = useIsFocused();
    const [cart, setCart] = useState(props.route.params.cartItems);
    const [user, setUser] = useState(null);
    const [total, setTotal] = useState(props.route.params.total);
    useEffect(() => {
        if (focus) {
            fetchUser();
        }
    }, [focus])
    const fetchUser = async () => {
        let user = await asyncStorage.get('user');
        console.log(user);
        setUser(user);
    }

    const handleOrder = async () => {
        let order = {
            products: [],
            total: props.route.params.total,
            user: '',
            status: 0,
        };
        // console.log(cart)
        let tempUser = { ...user }
        tempUser = {
            ...tempUser,
            user: { isAdmin: tempUser.isAdmin, __v: 0, _id: tempUser._id, address: '123', phone: 123, name: '123', email: '123' },

        }
        for (let i = 0; i < cart.length; i++) {
            const element = cart[i];
            order.products.push({
                product: element.product._id,
                quantity: element.quantity,

            })

        }
        order.user = tempUser.user._id;
        console.log(order)
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


    if (!user) {
        return (
            <View>
                <Text>Loading</Text>
            </View>
        )
    }
    return (
        <ScrollView>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", paddingRight: 20, marginTop: 10 }}>
                <AntDesign size={30} name="shoppingcart" color="#293462"></AntDesign>
                <Text style={{ fontSize: 20 }} >Your cart: {cart.length} products</Text>
            </View>

            <View style={{ alignItems: "center", justifyContent: "center", marginTop: 30 }}>
                <View style={[styles.container, { flexDirection: 'column', justifyContent: 'flex-start' }]}>
                    <ScrollView>

                        {cart.map((item, index) => {
                            let product = item.product;
                            return (
                                <View key={product._id} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View >
                                        <Text style={styles.textContainer}>{product.title}</Text>
                                    </View>
                                    <View>
                                        <Text style={[styles.textContainer]}>$ {product.price}x{item.quantity}</Text>
                                    </View>
                                </View>

                            )

                        })}
                    </ScrollView>

                </View>


                <View style={styles.totalContainer}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.textTotal}>Total money: </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                        <Text style={styles.textTotal}>$ {total}</Text>
                    </View>
                </View>
            </View>

            <View style={{ alignItems: "center", justifyContent: "center" }}>
                <View style={styles.userContainer}>
                    <View style={{}}>
                        <Text style={styles.textUser}>Name: {user.userName}</Text>
                        <Text style={styles.textUser}>Phone: {user.user.phone}</Text>
                        <Text style={styles.textUser}>Address: {user.user.address}</Text>
                        <Text style={styles.textUser}>Email: {user.user.email}</Text>
                    </View>
                </View>
            </View>


            <View style={{ alignItems: "center", justifyContent: "center", }}>
                <View style={styles.btn}>
                    <TouchableOpacity onPress={() => handleOrder()}>
                        <Text style={{ fontSize: 20, color: "#FFF" }}>Confirm order</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* <Button title='Order' onPress={() => handleOrder()} /> */}
            {/* <Button title='Check' onPress={() => handleCheck()} /> */}

        </ScrollView>
    )
}

export default CheckOutView

const styles = StyleSheet.create({
    container: {
        width: "90%",
        height: 300,
        backgroundColor: "#293462",
        borderRadius: 10,
        display: "flex",
        flexDirection: "row",
        padding: 15,
        justifyContent: 'space-around'
    },
    textContainer: {
        fontSize: 20,
        color: "#FFF"
    },
    totalContainer: {
        width: "90%",
        height: 60,
        backgroundColor: "#1CD6CE",
        borderRadius: 10,
        display: "flex",
        flexDirection: "row",
        padding: 15,
        justifyContent: 'space-around',
        marginTop: 20
    },

    userContainer: {
        width: "90%",
        height: 150,
        backgroundColor: "#1CD6CE",
        borderRadius: 10,
        padding: 15,
        marginTop: 20
    },

    textTotal: {
        fontSize: 20,
    },

    textUser: {
        fontSize: 20,
    },

    btn: {
        width: "70%",
        padding: 20,
        backgroundColor: "#D61C4E",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
    },
})