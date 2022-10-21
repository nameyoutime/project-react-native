import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'
import productApi from '../../api/productApi';

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
        <>
            <ScrollView

                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'center',
                    width: '100%',
                }}
            >

                {products.length != 0 ? products.map((product, index) => {
                    return (
                        <TouchableOpacity key={index} style={{ borderWidth: 2, borderColor: 'black' }} onPress={() => handdleViewDetail(product)}>
                            <Image source={{ uri: product.images[0].url }} style={{ width: 100, height: 100 }} />
                            <Text>{product.title}-{product.price}</Text>
                            {product.categories.map((cate, index) => {
                                return (
                                    <Text key={index}>{cate.title}</Text>
                                )
                            })}
                            <View>

                            </View>

                        </TouchableOpacity>
                    )
                }) : <Text>No result</Text>}
            </ScrollView>

        </>
    )
}

export default SearchView