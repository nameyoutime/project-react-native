import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';
import { Store } from '../../../store/store';
import productApi from '../../../api/productApi';
import { useDispatch } from 'react-redux';
import { deleteProduct, setAllProduct } from '../../../actions/productAction';
import { firebase } from '../../../firebase';
import asyncStorage from '../../../api/asynStorage';


const ProductDetailView = (props) => {
    const focus = useIsFocused();
    const dispatch = useDispatch();
    const [user, setUser] = useState(Store.getState().user.currentUser);
    const [profile, setProfile] = useState(Store.getState().user.currentUser.user)
    const [product, setProduct] = useState(props.route.params.product);
    const [appCategories, setAppCategories] = useState(Store.getState().cate.categories);
    useEffect(() => {
        if (focus) {
            const state = Store.getState();
            setUser(state.user.currentUser);
            setProfile(state.user.currentUser.user);
            let products = Store.getState().product.products;
            // find product by id in arrays
            let product = products.find((item) => item._id === props.route.params.product._id);
            if (product) setProduct(product);
            console.log('ProductDetailView');
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
            <>
                <Button title='Update' onPress={() => props.navigation.navigate('Update product', { product: product, categories: appCategories })} />
                <Button title='Delete' onPress={handleDelete} />
            </>

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
    return (
        <View>
            {profile.isAdmin ? (handleAdmin()) : null}
            <Text>{product._id}</Text>
            <Button title='Buy' onPress={() => handleBuy()} />
        </View>
    )
}

export default ProductDetailView

const styles = StyleSheet.create({})