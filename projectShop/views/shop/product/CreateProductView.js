import { View, Text, Button, StyleSheet, TextInput, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as Imagepicker from 'expo-image-picker';
import { firebase } from '../../../firebase';
import { MultiSelect } from 'react-native-element-dropdown';
import { useIsFocused } from '@react-navigation/native';
import { Store } from '../../../store/store';
import { useDispatch } from 'react-redux';
import { createNewProduct, setAllProduct } from '../../../actions/productAction';
import productApi from '../../../api/productApi';
import { ImagePicker } from 'expo-image-multiple-picker'
import { Platform } from 'react-native';
import styles from '../../../styles/createproductStyle.js';

const CreateProductView = (props) => {
    const initProduct = {
        title: '',
        price: '',
        description: '',
        quantity: '',
        timestamp: '',
        categories: [],
        images: [],
    }
    const dispatch = useDispatch()
    const [product, setProduct] = useState(initProduct)
    const [selectedCate, setSelectedCate] = useState([]);
    const [cateState, setCateState] = useState([]);
    const [images, setImages] = useState([]);
    const [selectedimages, setSelectedimages] = useState([]);
    const [platfrom, setPlatfrom] = useState(Platform.OS);
    const [open, setOpen] = useState(false);
    const focus = useIsFocused();
    // chạy khi nào người dùng nhìn vào màn hình
    useEffect(() => {
        if (focus) {
            // lấy categories từ redux
            let state = Store.getState();
            let categories = state.cate.categories;
            if (categories) setCateState(categories);
        }
    }, [focus])


    // chạy khi bấm pick image
    const pickImage = async () => {
        // đầu tiên nó sẽ chọn hình và sẽ ra kết ảu vị trí của hình
        let result = await Imagepicker.launchImageLibraryAsync({
            mediaTypes: Imagepicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            // allowsEditing: true,
            quality: 0.5,
        });
        if (!result.cancelled) {
            let temp = [];
            // làm một cái mản rổng và cho vào tất cả hình ảnh đã chọn
            for (let i = 0; i < result.selected.length; i++) {
                const element = result.selected[i];
                temp = [...temp, element.uri];
            }
            setSelectedimages(temp);
        }
    };

    // khi chọn ở điện thoại
    const pickImage2 = async (assets) => {
        let temp = [];
        for (let i = 0; i < assets.length; i++) {
            const element = assets[i];
            temp = [...temp, element.uri];
        }
        // console.log(temp);
        setSelectedimages(temp);

    }
    // nó sẽ lấy id mới của firebase và sẽ cho vào stroage với tên id mới
    const uploadImage = async (image) => {
        try {
            let id = firebase.firestore().collection('name').doc().id;
            const response = await fetch(image);
            const blob = await response.blob();
            let ref = firebase.storage().ref().child("images/" + id);
            let upload = await ref.put(blob);
            // tải url của id đã tạo
            let url = await ref.getDownloadURL();
            return { id: id, url: url };

        } catch (error) {

        }
    }

    // khi tạo product mới
    const handleNewProduct = async () => {
        // check sem image có rõng hay không nếu không thì mới bắt đầu tạo
        let selectedImagesLength = selectedimages.length;
        if (selectedImagesLength != 0 && selectedCate.length != 0) {
            let newProduct = product;
            let imagesUrl = [];
            // tạo image và upload nó để có uri bỏ vào server
            for (let i = 0; i < selectedImagesLength; i++) {
                let url = await uploadImage(selectedimages[i]);
                imagesUrl = [...imagesUrl, url]
            }
            newProduct.images = imagesUrl;
            let res = await productApi.create({ product: newProduct });

            if (!res.data.error) {
                // set product = null để có thể load lại dữ liệu khi vào lại trang home
                dispatch(setAllProduct(null));
                props.navigation.goBack();
            }
        }

    }

    if (open) {
        return (
            <ImagePicker
                onSave={(assets) => {
                    pickImage2(assets);
                    setOpen(false)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
                multiple={true}
            />
        )
    }
    const renderItem = ({ item }) => (
        <View style={{ marginLeft: 5 }}>
            <Image source={{ uri: item }} style={{ width: 100, height: 100 }} />
            <Text onPress={() => {
                let temp = selectedimages.filter((v) => v !== item)
                setSelectedimages(temp);
            }} style={{ fontSize: 10, textAlign: 'center', borderRadius: 100, backgroundColor: 'red', color: 'black', fontWeight: 'bold', borderWidth: 1, width: 20, height: 20, position: 'absolute', top: 0, right: 0 }}>X</Text>
        </View>
    );
    return (
        <View style={{ backgroundColor: '#fff' }}>
            <View>
                <View style={[{ height: 600 }]}>
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                        <Text style={styles.label}>Title</Text>
                        <TextInput style={styles.texInput} placeholder="Title" onChangeText={(text) => setProduct({ ...product, title: text })} />
                        <Text style={styles.label}>Price</Text>
                        <TextInput style={styles.texInput} placeholder="Price" onChangeText={(text) => setProduct({ ...product, price: text })} />
                        <Text style={styles.label}>Description</Text>
                        <TextInput style={styles.texInput} placeholder="Description" onChangeText={(text) => setProduct({ ...product, description: text })} />
                        <Text style={styles.label}>Quantity</Text>
                        <TextInput style={styles.texInput} placeholder="Quantity" onChangeText={(text) => setProduct({ ...product, quantity: text })} />
                        <Text style={styles.label}>Select categories</Text>
                    </View>
                    <MultiSelect
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        search
                        data={cateState}
                        labelField="title"
                        valueField="_id"
                        placeholder="Select categories"
                        placeholderTextColor={'white'}
                        searchPlaceholder="Search..."
                        value={selectedCate}
                        onChange={item => { setSelectedCate(item); setProduct({ ...product, categories: item }); }}
                    />
                    <Text style={styles.label}>Select image</Text>

                    <View style={{ borderWidth: 1, padding: 5, display: 'flex', flexDirection: 'row' }}>
                        <FlatList
                            horizontal
                            data={selectedimages}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index}
                        />
                    </View>
                    <View style={{ display: 'flex', justifyContent: 'center',alignItems:'center', marginVertical: 5 }}>
                        {(platfrom == 'web') ? (
                            <TouchableOpacity style={styles.texInput} onPress={pickImage}>
                                <Text style={{color:'white',fontSize:16}}>Pick Image</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity style={styles.texInput} onPress={() => setOpen(true)}>
                                <Text style={{color:'white',fontSize:16}}>Pick Image</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity style={[styles.button, styles.button1]} onPress={handleNewProduct}>
                        <Text style={styles.btnTextblack}> Create a new Product </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.button2]} onPress={() => props.navigation.goBack()}>
                        <Text style={styles.btnTextwhite}> Go back to shop </Text>
                    </TouchableOpacity>
                </View>
                </View>
            </View>



        </View>
    )
}

export default CreateProductView
