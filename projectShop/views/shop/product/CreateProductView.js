import { View, Text, Button, StyleSheet, TextInput, Image, ScrollView } from 'react-native'
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
import styles from '../../../styles/mainStyle';
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
    useEffect(() => {
        if (focus) {
            let state = Store.getState();
            let categories = state.cate.categories;
            if (categories) setCateState(categories);
            console.log(categories);
            console.log('CreateProductView');
        }
    }, [focus])



    const pickImage = async () => {
        let result = await Imagepicker.launchImageLibraryAsync({
            mediaTypes: Imagepicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            // allowsEditing: true,
            quality: 0.5,
        });
        // console.log(result);
        if (!result.cancelled) {
            // console.log(result.selected)
            let temp = [];
            for (let i = 0; i < result.selected.length; i++) {
                const element = result.selected[i];
                temp = [...temp, element.uri];
            }
            // console.log(temp);
            setSelectedimages(temp);
        }
    };

    const pickImage2 = async (assets) => {
        let temp = [];
        for (let i = 0; i < assets.length; i++) {
            const element = assets[i];
            temp = [...temp, element.uri];
        }
        // console.log(temp);
        setSelectedimages(temp);

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

    const handleNewProduct = async () => {
        let selectedImagesLength = selectedimages.length;
        if (selectedImagesLength != 0 && selectedCate.length != 0) {
            let newProduct = product;
            let imagesUrl = [];
            for (let i = 0; i < selectedImagesLength; i++) {
                let url = await uploadImage(selectedimages[i]);
                imagesUrl = [...imagesUrl, url]
            }

            newProduct.images = imagesUrl;

            let res = await productApi.create({ product: newProduct });
            // console.log(res.data.data)
            if (!res.data.error) {
                dispatch(setAllProduct(null));
                props.navigation.goBack();
            }
            // console.log(res);

        }

    }

    const handdlePickImage = () => {

    }
    // console.log(open)
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
            <View style={styles.container}>
                <TextInput style={[styles.texInput, { marginVertical: 5 }]} placeholder="Title" onChangeText={(text) => setProduct({ ...product, title: text })} />
                <TextInput style={[styles.texInput, { marginVertical: 5 }]} placeholder="Price" onChangeText={(text) => setProduct({ ...product, price: text })} />
                <TextInput style={[styles.texInput, { marginVertical: 5 }]} placeholder="Description" onChangeText={(text) => setProduct({ ...product, description: text })} />
                <TextInput style={[styles.texInput, { marginVertical: 5 }]} placeholder="Quantity" onChangeText={(text) => setProduct({ ...product, quantity: text })} />
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
                onChange={item => {
                    setSelectedCate(item);
                    setProduct({ ...product, categories: item });
                }}
                selectedStyle={styles.selectedStyle}
            />

            <Text style={styles.label}>Images</Text>
            <View style={{ borderWidth: 1, padding: 5, display: 'flex', flexDirection: 'row' }}>
                <ScrollView horizontal={true}>


                    {selectedimages.map((item, index) => {

                        return (
                            <View key={index} style={{marginLeft:5}}>
                                <Image source={{ uri: item }} style={{ width: 100, height: 100 }} />
                                <Text onPress={() => {
                                    let temp = selectedimages.filter((v) => v !== item)
                                    setSelectedimages(temp);
                                }} style={{ fontSize: 10, textAlign: 'center', borderRadius: 100, backgroundColor: 'red', color: 'black', fontWeight: 'bold', borderWidth: 1, width: 20, height: 20, position: 'absolute', top: 0, right: 0 }}>X</Text>
                            </View>
                        )

                    })}
                </ScrollView>
            </View>
            <View style={{ display: 'flex', justifyContent: 'center', marginVertical: 5 }}>

                {(platfrom == 'web') ? (<Button
                    title="pickImage"
                    onPress={pickImage}
                />) : (

                    <Button title='pick Image' onPress={() => setOpen(true)} />

                )}
            </View>
            <Button title='Create' onPress={handleNewProduct} />

        </ScrollView>
    )
}

export default CreateProductView
