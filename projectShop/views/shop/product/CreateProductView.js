import { View, Text, Button, StyleSheet, TextInput,Image } from 'react-native'
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
        <>
            <TextInput placeholder="Title" onChangeText={(text) => setProduct({ ...product, title: text })} />
            <TextInput placeholder="Price" onChangeText={(text) => setProduct({ ...product, price: text })} />
            <TextInput placeholder="Description" onChangeText={(text) => setProduct({ ...product, description: text })} />
            <TextInput placeholder="Quantity" onChangeText={(text) => setProduct({ ...product, quantity: text })} />

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
                placeholder="Select item"
                searchPlaceholder="Search..."
                value={selectedCate}
                onChange={item => {
                    setSelectedCate(item);
                    setProduct({ ...product, categories: item });
                }}
                // renderLeftIcon={() => (
                //     <Text>x</Text>
                // )}
                selectedStyle={styles.selectedStyle}
            />
            {(platfrom == 'web') ? (<Button
                title="pickImage"
                onPress={pickImage}
            />) : (
                <>
                    <Button title='pick Image' onPress={() => setOpen(true)} />
                </>
            )}
            <Text>Images</Text>
            {selectedimages.map((item, index) => {

                return (
                    <View key={index}>
                        <Image source={{ uri: item }} style={{ width: 100, height: 100 }} />
                        <Button title='X' onPress={() => {
                            let temp = selectedimages.filter((v) => v !== item)
                            setSelectedimages(temp);
                            // setDeletedImages([...deletedImages, item]);
                        }} />
                    </View>
                )

            })}
            <Button title='Create' onPress={handleNewProduct} />

        </>
    )
}

export default CreateProductView
const styles = StyleSheet.create({
    container: { padding: 16 },
    dropdown: {
        height: 50,
        backgroundColor: 'transparent',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 14,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    icon: {
        marginRight: 5,
    },
    selectedStyle: {
        borderRadius: 12,
    },
});