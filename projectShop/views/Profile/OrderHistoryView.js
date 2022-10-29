import { View, Text, Button, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';
import orderApi from '../../api/orderApi';
import styles from '../../styles/orderhistoryStyle.js'
import userApi from '../../api/userApi';

const OrderHistoryView = (props) => {
    const focus = useIsFocused();
    const [userId, setUserId] = useState(props.route.params.userId);
    const [isAdmin, setIsAdmin] = useState(props.route.params.isAdmin);
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        if (focus) {
            fetchOrders(userId, isAdmin);
        }
    }, [focus])
    const fetchOrders = async (userId, isAdmin) => {
        let respone = [];
        if (isAdmin) respone = await orderApi.getAll();
        else respone = await orderApi.get(userId);

        setOrders(respone.data.data);
    }
    const handleGetUser = async (id) => {
        // let respone = await userApi.getUser(id);
        console.log(id)
        // props.navigation.navigate('User detail', { user: respone.data.data })
    }

    const handleRenderOrders = () => {
        console.log(orders);
        return (
            <ScrollView showsHorizontalScrollIndicator={false}>
                {orders.map((order) => {
                    return (
                        <View key={order._id} style={styles.card1}>

                            <Text style={styles.label}>Order's total price: <Text style={styles.labelInner}>{order.total}</Text></Text>
                            <Text style={styles.label}>Order's status: <Text style={styles.labelInner}>{order.status}</Text></Text>
                            <Text style={styles.label}>Products:</Text>
                            {handleRenderProducts(order.products)}
                            {/* if admin then have button */}
                            {isAdmin && (
                                <TouchableOpacity style={[styles.button, styles.button2]} onPress={() => handleGetUser(order.user.user)} >
                                    <Text style={styles.btnTextblack}>View User</Text>
                                </TouchableOpacity>

                            )}

                            {/* render products in orders */}


                        </View>
                    )
                })}
            </ScrollView>

        )
    }

    const handleRenderProducts = (products) => {
        // console.log(products)
        return (
            <View>
                {products.map((item, index) => {
                    let product = item.product;
                    return (
                        <View style={styles.card2} key={product._id}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={{ uri: product.images[0].url }} style={styles.cardImage} />
                                <View style={{ paddingHorizontal: 10 }}>
                                    <Text style={styles.label}>Title: <Text style={styles.labelInner}> {product.title}</Text></Text>
                                    <Text style={styles.label}>Price: <Text style={styles.labelInner}> {product.price}</Text></Text>
                                    <Text style={styles.label}>Order quantity: <Text style={styles.labelInner}> {item.quantity}</Text></Text>
                                </View>
                            </View>



                        </View>

                        //     <TouchableOpacity style={style.card} onPress={() => handdleViewDetail(product)} >
                        //     <View style={{ display: 'flex', flexDirection: 'row' }}>
                        //         <Image source={{ uri: product.images[0].url }} style={style.cardImage} />
                        //         <View style={{ paddingHorizontal: 10 }}>
                        //             <Text style={style.label}>Title:<Text style={style.labelInner}> {product.title}</Text></Text>
                        //             <Text style={style.label}>Description:<Text style={style.labelInner}> {product.description}</Text></Text>
                        //             <Text style={style.label}>Price:<Text style={style.labelInner}> {product.price}</Text></Text>

                        //             <View style={{ display: 'flex', flexDirection: 'row' }}>
                        //                 <Text style={style.label}>Category: </Text>
                        //                 {product.categories.map((cate) => { return (<Text style={style.labelInner} key={cate._id}> {cate.title}</Text>) })}
                        //             </View>
                        //         </View>
                        //     </View>
                        //     </TouchableOpacity>
                    )
                })}
            </View>
        )
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.button1]} onPress={() => { props.navigation.navigate('Profile view') }}>
                        <Text style={styles.btnTextblack}> Go back to your profile </Text>
                    </TouchableOpacity>
                </View>
                {orders.length == 0 ? (<Text>No orders</Text>) : handleRenderOrders()}
            </View>
        </>
    )
}

export default OrderHistoryView