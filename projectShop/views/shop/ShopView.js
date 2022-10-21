import { View, Text, Button, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import style from '../../styles/mainStyle'
import { Store } from '../../store/store'
import { useIsFocused } from '@react-navigation/native'
import productApi from '../../api/productApi'
import { useDispatch } from 'react-redux'
import { setAllProduct } from '../../actions/productAction'
import { useSelector } from 'react-redux'
import { setAllCate } from '../../actions/categoryAction'
import categoryApi from '../../api/categoryApi'
import { Picker } from '@react-native-picker/picker';
import asyncStorage from '../../api/asynStorage';

const ShopView = (props) => {
    const db = useSelector((store) => store.product);
    const dispatch = useDispatch();
    const focus = useIsFocused();
    const [user, setUser] = useState(Store.getState().user.currentUser);
    const [profile, setProfile] = useState(Store.getState().user.currentUser.user)
    const [categories, setCategories] = useState([]);
    const [selectedCate, setSelectedCate] = useState('all');
    const [sort, setSort] = useState('newest');
    const [limit, setLimit] = useState(10);
    const [skip, setSkip] = useState(0);
    const [keyWord, setKeyWord] = useState('');
    const [fillter, setFillter] = useState([{ label: 'newest', value: 'newest' }, { label: 'oldest', value: 'oldest' }, { label: 'price-asc', value: 'price-asc' }, { label: 'price-desc', value: 'price-desc' }]);

    const [config, setConfig] = useState({
        limit: 10,
        skip: 0,
        sort: 'newest',
        category: 'all'
    })
    const checkCart = async () => {
        let cart = await asyncStorage.get('cart');
        if (!cart) await asyncStorage.set('cart', []);
        // console.log(cart);

    }
    useEffect(() => {
        if (focus) {
            const state = Store.getState();
            setUser(state.user.currentUser);
            setProfile(state.user.currentUser.user);
            let products = state.product.products;
            if (categories.length === 0) fetchCategories();
            if (!products) fetchProducts();
            checkCart();
        }
    }, [focus, config]);
    const fetchCategories = async () => {
        const response = await categoryApi.getAll();
        setCategories(response.data.data);
        dispatch(setAllCate(response.data.data));
    }
    const fetchProducts = async () => {
        let res = await productApi.getAll(config.category, config.sort, config.limit, config.skip);
        dispatch(setAllProduct(res.data.data))
    }
    const handdleViewDetail = (item) => {
        props.navigation.navigate('Product detail', { product: item })
    }
    const renderProducts = () => {
        if (db.products) {
            return (
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'center',
                        width: '100%',
                    }}
                >
                    {db.products.map((product, index) => {
                        return (
                            <TouchableOpacity key={index} style={{ borderWidth: 2, borderColor: 'black' }} onPress={() => handdleViewDetail(product)} >
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
                    })}

                </ScrollView>
            )
        }
    }

    const hadleAdmin = () => {
        return (
            <>
                <Button title='Category' onPress={() => props.navigation.navigate('Create category')} />
                <Button title='Product' onPress={() => props.navigation.navigate('Create product')} />
            </>

        )
    }
    const handleSearch = () => {
        setKeyWord('')
        if (keyWord.length > 0) props.navigation.navigate('Search', { keyWord: keyWord })
    }
    return (
        <View style={style.container}>
            <TextInput value={keyWord} style={style.input} placeholder='Search' onChangeText={(text) => setKeyWord(text)} />
            <Button title='Search' onPress={() => handleSearch()} />
            {profile.isAdmin ? (hadleAdmin()) : null}
            <Picker
                onValueChange={(itemValue, itemIndex) => {
                    setConfig({ ...config, category: itemValue })
                    dispatch(setAllProduct(null));
                }
                }
                style={{ width: 100 }}>
                <Picker.Item label='all' value='all' />
                {categories.map((item, index) => {
                    return (
                        <Picker.Item key={index} label={item.title} value={item._id} />
                    )
                })}
            </Picker>
            <Picker
                onValueChange={(itemValue, itemIndex) => {
                    setConfig({ ...config, sort: itemValue })
                    dispatch(setAllProduct(null));
                }
                }
                style={{ width: 100 }}>
                {fillter.map((item, index) => {
                    return (
                        <Picker.Item key={index} label={item.label} value={item.value} />
                    )
                })}
            </Picker>
            <Text>ShopView</Text>
            {(db.products != null) ? renderProducts() : null}
        </View>
    )
}

export default ShopView