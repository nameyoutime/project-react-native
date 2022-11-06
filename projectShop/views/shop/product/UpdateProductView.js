import { StyleSheet, Text, View, TextInput, Button, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { MultiSelect } from 'react-native-element-dropdown';
import * as Imagepicker from 'expo-image-picker';
import { firebase } from '../../../firebase';
import productApi from '../../../api/productApi';
import { useDispatch } from 'react-redux';
import { setAllProduct, updatedProduct } from '../../../actions/productAction';
import { Platform } from 'react-native';
import { ImagePicker } from 'expo-image-multiple-picker'
import styles from '../../../styles/updateproductStyle.js';



const UpdateProductView = (props) => {
    const [product, setProduct] = useState(props.route.params.product);
    const [selectedCate, setSelectedCate] = useState([]);
    const [productCate, setProductCate] = useState(props.route.params.product.categories);
    const [cateState, setCateState] = useState(props.route.params.categories);
    const [images, setImages] = useState([]);
    const [selectedimages, setSelectedimages] = useState(props.route.params.product.images);
    const [deletedImages, setDeletedImages] = useState([]);
    const [platfrom, setPlatfrom] = useState(Platform.OS);
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch()
    const handleCheckCate = (item) => {
        setSelectedCate(item);
        console.log(item);
        for (let i = 0; i < item.length; i++) {
            const element = item[i];

            let res = productCate.findIndex((item) => item._id === element)
            if (res == -1) {
                let temp = cateState.findIndex((item) => item._id === element)
                setProductCate([...productCate, cateState[temp]])
            }
        }

    }
    const uploadImage = async (image) => {
        try {
            let id = firebase.firestore().collection('name').doc().id;
            const response = await fetch(image);
            const blob = await response.blob();
            let ref = firebase.storage().ref().child("images/" + id);
            let upload = await ref.put(blob);
            let url = await ref.getDownloadURL();
            return { id: id, url: url };

        } catch (error) {

        }
    }

    const pickImage = async () => {
        let result = await Imagepicker.launchImageLibraryAsync({
            mediaTypes: Imagepicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            // allowsEditing: true,
            quality: 0.5,

        });
        if (!result.cancelled) {
            let temp = []
            for (let i = 0; i < result.selected.length; i++) {
                const element = result.selected[i];
                temp = [...temp, { uri: element.uri }];
            }
            setImages(temp)
        }
    };
    const pickImage2 = async (assets) => {
        let temp = []
        for (let i = 0; i < assets.length; i++) {
            const element = assets[i];
            temp = [...temp, { uri: element.uri }];
        }
        setImages(temp);

    }
    const handdleUpdate = async () => {
        let updateProduct = product;
        let length = images.length;
        let imagesUrl = [];
        for (let i = 0; i < length; i++) {
            let url = await uploadImage(images[i].uri);
            imagesUrl = [...imagesUrl, url]
        }
        if (deletedImages.length > 0) {
            for (let i = 0; i < deletedImages.length; i++) {
                // console.log(deletedImages[i])
                deleteImage(deletedImages[i].id);

            }
        }
        updateProduct.images = [...selectedimages, ...imagesUrl];
        updateProduct.categories = productCate;

        console.log(updateProduct)
        let res = await productApi.update(updateProduct);
        dispatch(setAllProduct(null))
        props.navigation.navigate('Main shop')
        // console.log(res);


    }
    const deleteImage = async (name) => {
        try {
            let ref = await firebase.storage().ref().child("images/" + name).delete();
        } catch (error) {

        }
    }
    if (open) {
        return (
            <ImagePicker
                onSave={(assets) => {
                    // doWhatEverWithTheAssets(assets)
                    pickImage2(assets);
                    setOpen(false)
                }}
                onCancel={() => {
                    // doWhatEverWhenYourUserSucks()
                    setOpen(false)
                }}
                multiple={true}
            />
        )
    }
    return (
        <ScrollView style={{ backgroundColor: '#fff' }}>
            {/* <Text>UpdateProductView</Text> */}

            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>Admin's function: Update product</Text>
                </View>
                <View>
                    <Text style={styles.label}>Title</Text>
                    <TextInput style={styles.texInput} value={product.title} onChangeText={(text) => setProduct({ ...product, title: text })} />
                    <Text style={styles.label}>Description</Text>
                    <TextInput style={styles.texInput} value={product.description} onChangeText={(text) => setProduct({ ...product, description: text })} />
                    <Text style={styles.label}>Price</Text>
                    <TextInput style={styles.texInput} value={product.price} onChangeText={(text) => setProduct({ ...product, price: text })} />
                    <Text style={styles.label}>Quantity</Text>
                    <TextInput style={styles.texInput} value={product.quantity} onChangeText={(text) => setProduct({ ...product, quantity: text })} />
                </View>

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
                searchPlaceholder="Search..."
                value={selectedCate}
                onChange={item => { handleCheckCate(item) }}
                renderSelectedItem={(item) => (<></>)}
                selectedStyle={styles.selectedStyle}
            />
            <View>
                <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                    {productCate.map((item, index) => {
                        return (
                            <View key={index} >
                                <View style={{ display: 'flex', flexDirection: 'row', }}>
                                    <View style={{ marginVertical: 3, borderColor: 'black', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, borderWidth: 1, padding: 3 }}>
                                        <Text style={[styles.label, { color: 'black' }]}>{item.title}</Text>
                                    </View>
                                    {/* <Button title='X'  /> */}
                                    <Text onPress={() => {
                                        let temp = productCate.filter((v) => v._id !== item._id)
                                        setProductCate(temp);
                                    }} style={[styles.label, { padding: 3, marginVertical: 3, marginRight: 3, textAlign: 'center', borderColor: 'black', backgroundColor: 'red', color: 'black', borderTopRightRadius: 10, borderBottomRightRadius: 10, borderWidth: 1 }]}>X</Text>
                                </View>
                            </View>
                        )
                    })}
                </View>
            </View>
            <Text style={styles.label}>Images</Text>
            <View style={{ borderWidth: 1, padding: 5, display: 'flex', flexDirection: 'row' }}>
                <ScrollView horizontal={true}>


                    {selectedimages.map((item, index) => {

                        return (
                            <View key={index} style={{ marginLeft: 5 }}>
                                <Image source={{ uri: item.url }} style={{ width: 100, height: 100 }} />
                                <Text onPress={() => {
                                    let temp = selectedimages.filter((v) => v !== item)
                                    setSelectedimages(temp);
                                    setDeletedImages([...deletedImages, item]);
                                }} style={{ fontSize: 10, textAlign: 'center', borderRadius: 100, backgroundColor: 'red', color: 'black', fontWeight: 'bold', borderWidth: 1, width: 20, height: 20, position: 'absolute', top: 0, right: 0 }}>X</Text>
                            </View>
                        )

                    })}
                    {images.map((item, index) => {

                        return (
                            <View key={index} style={{ marginLeft: 5 }}>
                                <Image source={{ uri: item.uri }} style={{ width: 100, height: 100 }} />
                                <Text onPress={() => {
                                    let temp = images.filter((v) => v !== item)
                                    setImages(temp);
                                }} style={{ fontSize: 10, textAlign: 'center', borderRadius: 100, backgroundColor: 'red', color: 'black', fontWeight: 'bold', borderWidth: 1, width: 20, height: 20, position: 'absolute', top: 0, right: 0 }}>X</Text>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
            {/* {selectedimages.map((item, index) => {

                return (
                    <View key={index}>
                        <Image source={{ uri: item.url }} style={{ width: 100, height: 100 }} />
                        <Button title='X' onPress={() => {
                            let temp = selectedimages.filter((v) => v !== item)
                            setSelectedimages(temp);
                            setDeletedImages([...deletedImages, item]);
                        }} />
                    </View>
                )

            })} */}
            {/* {images.map((item, index) => {

                return (
                    <View key={index}>
                        <Image source={{ uri: item.uri }} style={{ width: 100, height: 100 }} />
                        <Button title='X' onPress={() => {
                            let temp = images.filter((v) => v !== item)
                            setImages(temp);
                        }} />
                    </View>
                )
            })} */}
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginVertical: 5 }}>
                {(platfrom == 'web') ? (
                    <TouchableOpacity style={styles.texInput} onPress={pickImage}>
                        <Text style={{ color: 'white', fontSize: 16 }}>Pick Image</Text>
                    </TouchableOpacity>) : (
                    <>
                        <TouchableOpacity style={styles.texInput} onPress={() => setOpen(true)}>
                            <Text style={{ color: 'white', fontSize: 16 }}>Pick Image</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.button1]} onPress={handdleUpdate}>
                    <Text style={styles.btnTextblack}> Update </Text>
                </TouchableOpacity>
            </View>

            
        </ScrollView>
    )
}

export default UpdateProductView
