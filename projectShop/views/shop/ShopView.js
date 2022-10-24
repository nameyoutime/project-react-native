import { View, Text, Button, Image, TouchableOpacity, TextInput, ScrollView, FlatList, SafeAreaView } from 'react-native'
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
import LoadingView from '../utilities/LoadingView'

const ShopView = (props) => {
    const db = useSelector((store) => store.product);
    const dispatch = useDispatch();
    const focus = useIsFocused();
    const [user, setUser] = useState(Store.getState().user.currentUser);
    const [profile, setProfile] = useState(Store.getState().user.currentUser.user)
    const [categories, setCategories] = useState([]);
    const [selectedCate, setSelectedCate] = useState('all');
    const [skip, setSkip] = useState(0);
    const [keyWord, setKeyWord] = useState('');
    const [fillter, setFillter] = useState([{ label: 'newest', value: 'newest' }, { label: 'oldest', value: 'oldest' }, { label: 'price-asc', value: 'price-asc' }, { label: 'price-desc', value: 'price-desc' }]);
    const [loadMore, setLoadMore] = useState(false);
    const [noData, setNoData] = useState(false);
    const [config, setConfig] = useState({
        limit: 5,
        sort: 'newest',
        category: 'all'
    })
    const [loading, setLoading] = useState(false);
    const checkCart = async () => {
        let cart = await asyncStorage.get('cart');
        if (!cart) await asyncStorage.set('cart', []);

    }
    useEffect(() => {
        if (focus) {
            setLoading(true);
            const state = Store.getState();
            setUser(state.user.currentUser);
            setProfile(state.user.currentUser.user);
            let products = state.product.products;
            if (categories.length === 0) fetchCategories();
            if (!products) fetchProducts();
            checkCart();
            setLoading(false);
        }
    }, [focus, config]);
    const fetchCategories = async () => {
        const response = await categoryApi.getAll();
        setCategories(response.data.data);
        dispatch(setAllCate(response.data.data));

    }
    const fetchProducts = async () => {
        let res = await productApi.getAll(config.category, config.sort, config.limit, 0);
        dispatch(setAllProduct(res.data.data))
        setSkip(0);
        setNoData(false);
    }
    const handleLoadMore = async () => {
        // wait till the previous load more is done
        if (loadMore) return;
        setLoadMore(true);
        if (!noData) {
            let res = await productApi.getAll(config.category, config.sort, config.limit, skip + 1);
            if (res.data.data.length == 0) {
                console.log('no data')
                setNoData(true);
            } else {
                setSkip(skip + 1);
                dispatch(setAllProduct([...db.products, ...res.data.data]));
            }
        }

        setLoadMore(false);
    }

    const handdleViewDetail = (item) => {
        props.navigation.navigate('Product detail', { product: item })
    }
    const renderProducts = () => {
        if (db.products) {
            return (

                <FlatList
                    data={db.products}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item._id}
                    onEndReached={(e) => handleLoadMore()}
                    onEndReachedThreshold={0.2}
                    renderItem={({ item, index }) => {
                        let product = item;
                        return (
                            <View>

                                <TouchableOpacity style={style.card} onPress={() => handdleViewDetail(product)} >
                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                        <Image source={{ uri: product.images[0].url }} style={style.cardImage} />
                                        <View style={{ paddingHorizontal: 10 }}>
                                            <Text style={style.label}>Title: {product.title}</Text>
                                            <Text style={style.label}>Description: {product.description}</Text>
                                            <Text style={style.label}>Price: {product.price}</Text>
                                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Category: </Text>
                                                {product.categories.map((cate) => {
                                                    return (
                                                        <Text key={cate._id}> {cate.title}</Text>
                                                    )
                                                })}
                                            </View>
                                            <View>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                    ListFooterComponent={() => {
                        return (
                            <View>
                                {(loadMore) && (<Text style={[style.label, { textAlign: 'center' }]}>Loading more</Text>)}
                                {(noData) && <Text style={[style.label, { textAlign: 'center' }]}>No more data to get</Text>}
                            </View>
                        )
                    }}
                />


                // <ScrollView
                //     showsHorizontalScrollIndicator={false}
                // // contentContainerStyle={{
                // //     flexGrow: 1,
                // //     justifyContent: 'center',
                // //     width: '100%',
                // // }}
                // >
                //     {db.products.map((product, index) => {
                //         return (
                //             <TouchableOpacity key={index} style={style.card} onPress={() => handdleViewDetail(product)} >
                //                 <View style={{ display: 'flex', flexDirection: 'row' }}>
                //                     <Image source={{ uri: product.images[0].url }} style={style.cardImage} />
                //                     <View style={{ paddingHorizontal: 10 }}>
                //                         <Text style={style.label}>Title: {product.title}</Text>
                //                         <Text style={style.label}>Description: {product.description}</Text>
                //                         <Text style={style.label}>Price: {product.price}</Text>
                //                         <View style={{ display: 'flex', flexDirection: 'row' }}>
                //                             <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Category: </Text>
                //                             {product.categories.map((cate, index) => {
                //                                 return (
                //                                     <Text key={index}> {cate.title}</Text>
                //                                 )
                //                             })}
                //                         </View>
                //                         <View>
                //                         </View>
                //                     </View>



                //                 </View>

                //             </TouchableOpacity>
                //         )
                //     })}

                // </ScrollView>
            )
        }
    }

    const hadleAdmin = () => {
        return (
            <View style={{ marginVertical: 10 }}>

                <Text style={[style.label, { textAlign: 'center' }]}>Admin function</Text>
                <View style={{ display: 'flex', flexDirection: 'row', }}>
                    <Button title='Category' onPress={() => props.navigation.navigate('Create category')} />
                    <Button color={'green'} title='Product' onPress={() => props.navigation.navigate('Create product')} />
                </View>
            </View>

        )
    }
    const handleSearch = () => {
        setKeyWord('')
        if (keyWord.length > 0) props.navigation.navigate('Search', { keyWord: keyWord })
    }

    if(loading) return <LoadingView/>

    return (
        <View style={style.container}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>

                <TextInput value={keyWord} style={style.texInput} placeholder='Search' onChangeText={(text) => setKeyWord(text)} />
                <Button title='Search' onPress={() => handleSearch()} />
            </View>
            {profile.isAdmin ? (hadleAdmin()) : null}
            <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 10 }}>
                <Picker
                    onValueChange={(itemValue, itemIndex) => {
                        setConfig({ ...config, category: itemValue })
                        dispatch(setAllProduct(null));
                    }
                    }
                    style={style.picker}>
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
                    style={style.picker}>
                    {fillter.map((item, index) => {
                        return (
                            <Picker.Item key={index} label={item.label} value={item.value} />
                        )
                    })}
                </Picker>
            </View>

            {/* <Text>ShopView</Text> */}
            {/* <SafeAreaView style={styles.container}>
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView> */}
            {(db.products != null) ? renderProducts() : null}
        </View>
    )
}

export default ShopView