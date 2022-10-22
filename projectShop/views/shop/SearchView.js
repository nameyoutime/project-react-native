import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'
import productApi from '../../api/productApi';
import style from '../../styles/mainStyle';

const SearchView = (props) => {
    const focus = useIsFocused();
    const [products, setProducts] = useState([]);
    const [config, setConfig] = useState({
        limit: 10,
        skip: 0,
        sort: 'newest',
        category: 'all'
    })
    useEffect(() => {
        if (focus && products.length === 0) {
            console.log('SearchView');
            fetchProducts();
        } else {
            setProducts([]);
        }
    }, [focus]);
    const fetchProducts = async () => {
        // console.log(props.route.params.keyWord)
        let res = await productApi.search(props.route.params.keyWord);
        setProducts(res.data.data);
    }
    const handdleViewDetail = (item) => {
        // console.log(item)
        props.navigation.navigate('Product detail', { product: item })

    }
    return (
        <View style={style.container}>
            <ScrollView

                showsHorizontalScrollIndicator={false}
            // contentContainerStyle={{
            //     flexGrow: 1,
            //     justifyContent: 'center',
            //     width: '100%',
            // }}
            >

                {products.length != 0 ? products.map((product, index) => {
                    return (
                        <TouchableOpacity key={index} style={style.card} onPress={() => handdleViewDetail(product)} >
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Image source={{ uri: product.images[0].url }} style={style.cardImage} />
                                <View style={{ paddingHorizontal: 10 }}>
                                    <Text style={style.label}>Title: {product.title}</Text>
                                    <Text style={style.label}>Description: {product.description}</Text>
                                    <Text style={style.label}>Price: {product.price}</Text>
                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Category: </Text>
                                        {product.categories.map((cate, index) => {
                                            return (
                                                <Text key={index}> {cate.title}</Text>
                                            )
                                        })}
                                    </View>
                                    <View>
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