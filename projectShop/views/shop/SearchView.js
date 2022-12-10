import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'
import productApi from '../../api/productApi';
import style from '../../styles/searchStyle.js';

const SearchView = (props) => {
    const focus = useIsFocused();
    const [products, setProducts] = useState([]);
    useEffect(() => {
        if (focus && products.length === 0) {
            fetchProducts();
        } else {
            setProducts([]);
        }
    }, [focus]);
    const fetchProducts = async () => {
        let res = await productApi.search(props.route.params.keyWord);
        setProducts(res.data.data);
    }
    const handdleViewDetail = (item) => {
        props.navigation.navigate('Product detail', { product: item })
    }
    return (
        <View style={style.container}>
            <View>
                <Text style={style.title}>Search results for {props.route.params.keyWord}</Text>
            </View>
            <ScrollView showsHorizontalScrollIndicator={false}>
                {products.length != 0 ? products.map((product, index) => {
                    return (
                        <TouchableOpacity key={product._id} style={style.card} onPress={() => handdleViewDetail(product)} >
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Image source={{ uri: product.images[0].url }} style={style.cardImage} />
                                <View style={{ paddingHorizontal: 10 }}>
                                    <Text style={style.label}>Title:<Text style={style.labelInner}> {product.title}</Text></Text>
                                    <Text style={style.label}>Description:<Text style={style.labelInner}> {product.description}</Text></Text>
                                    <Text style={style.label}>Price:<Text style={style.labelInner}> {product.price}</Text></Text>
                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                        <Text style={style.label}>Category: </Text>
                                        {product.categories.map((cate) => { return (<Text style={style.labelInner} key={cate._id}> {cate.title}</Text>) })}
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }) : <Text>No result</Text>}
            </ScrollView>

        </View>
    )
}

export default SearchView