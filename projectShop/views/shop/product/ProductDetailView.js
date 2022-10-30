import { StyleSheet, Text, View, Button, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';
import { Store } from '../../../store/store';
import productApi from '../../../api/productApi';
import { useDispatch } from 'react-redux';
import { deleteProduct, setAllProduct } from '../../../actions/productAction';
import { firebase } from '../../../firebase';
import asyncStorage from '../../../api/asynStorage';
import style from '../../../styles/mainStyle';
// import style from '../../../styles/mainStyle';

const { width } = Dimensions.get('window');
const height = width * 1;
const ProductDetailView = (props) => {
    const focus = useIsFocused();
    const dispatch = useDispatch();
    const [user, setUser] = useState(Store.getState().user.currentUser);
    const [profile, setProfile] = useState(Store.getState().user.currentUser.user)
    const [product, setProduct] = useState(props.route.params.product);
    const [appCategories, setAppCategories] = useState(Store.getState().cate.categories);
    const [active, setActive] = useState(0);
    useEffect(() => {
        if (focus) {
            const state = Store.getState();
            setUser(state.user.currentUser);
            setProfile(state.user.currentUser.user);
            let products = Store.getState().product.products;
            // find product by id in arrays
            let product = products.find((item) => item._id === props.route.params.product._id);
            if (product) setProduct(product);

            // console.log(product);
        }
    }, [focus])

    const handleDelete = async () => {
        // console.log(product.images)
        for (let i = 0; i < product.images.length; i++) {
            const element = product.images[i];
            await deleteImage(element.id)
            // console.log(element)
        }
        let respone = await productApi.delete(product._id);
        dispatch(setAllProduct(null));
        props.navigation.navigate('Main shop');

    }
    const deleteImage = async (name) => {
        try {
            let ref = await firebase.storage().ref().child("images/" + name).delete();
        } catch (error) {

        }
    }
    const handleAdmin = () => {
        return (
            <View style={{ marginVertical: 90 }}>

                <Text style={[style.label, { textAlign: 'center', color: "#D61C4E" }]}>Admin function</Text>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Button title='Update' onPress={() => props.navigation.navigate('Update product', { product: product, categories: appCategories })} />
                    <Button color={'red'} title='Delete' onPress={handleDelete} />
                </View>
            </View>
            // <View>
            //     <Button title='Update' onPress={() => props.navigation.navigate('Update product', { product: product, categories: appCategories })} />
            //     <Button title='Delete' onPress={handleDelete} />
            // </View>

        )
    }
    const handleBuy = async () => {
        let cart = await asyncStorage.get('cart');
        // find product in cart
        let index = cart.findIndex((item) => item.product._id === product._id);
        if (index === -1) {
            cart.push({ product: product, quantity: 1 });
        } else {
            cart[index].quantity += 1;
        }
        await asyncStorage.set('cart', cart);
    }
    const change = ({ nativeEvent }) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if (slide !== active) {
            setActive(slide);
        }
    }

    return (
        <ScrollView>
                <View style={{ width, height }}>

                    <ScrollView scrollEventThrottle={5} onScroll={change} showsHorizontalScrollIndicator={false} pagingEnabled horizontal style={{ width, height }}>
                        {
                            product.images.map((item, index) => {
                                return (
                                    <Image key={index} style={{ width, height, resizeMode: 'cover' }} source={{ uri: item.url }} />
                                )
                            })
                        }
                    </ScrollView>
                    <View style={{ flexDirection: 'row', position: 'absolute', bottom: 0, alignSelf: 'center' }}>
                        {product.images.map((item, index) => {
                            return (
                                <Text key={index} style={index == active ? { color: '#fff', margin: 3 } : { color: '#888', margin: 3 }} >
                                    ⬤
                                </Text>
                            )
                        })}
                    </View>
                </View >


                <View style={{ padding: 10, borderWidth: 1, borderRadius: 5, margin: 5, backgroundColor: "#1CD6CE" }}>

                    <Text style={style.label}>Title: {product.title}</Text>
                    <Text style={style.label}>Description: {product.description}</Text>
                    <Text style={style.label}>Price: {product.price}</Text>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: "#D61C4E" }}>Category: </Text>
                        {product.categories.map((cate, index) => {
                            return (
                                <Text key={index}> {cate.title}</Text>
                            )
                        })}
                    </View>
                    
                    {/* <Button title='Buy' onPress={() => handleBuy()} /> */}
                </View>
                <View style={{  justifyContent: 'center', alignItems: 'center', }}>
                    <TouchableOpacity style={{ backgroundColor: '#293462',  padding: 15, marginVertical: 15, width: 300, borderRadius: 5, }} >
                        <Text style={{ color: '#eee', fontSize: 15, fontWeight: 'bold', textAlign: 'center' }} onPress={() => handleBuy()}>Add to cart</Text>
                    </TouchableOpacity>
                </View>
                <View style={{  justifyContent: 'center', alignItems: 'center', }}>
                    <TouchableOpacity style={{ backgroundColor: '#293462',  padding: 15, marginVertical: 15, width: 300, borderRadius: 5, }} >
                        <Text style={{ color: '#eee', fontSize: 15, fontWeight: 'bold', textAlign: 'center' }} onPress={() => navigation.navigate("Home")}>Return home</Text>
                    </TouchableOpacity>
                </View>
                    {profile.isAdmin ? (handleAdmin()) : null}
            
        </ScrollView>

    )
}

export default ProductDetailView

const styles = StyleSheet.create({})