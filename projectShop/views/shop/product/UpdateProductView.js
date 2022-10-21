import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native'
import React, { useState } from 'react'
import { MultiSelect } from 'react-native-element-dropdown';
import * as Imagepicker from 'expo-image-picker';
import { firebase } from '../../../firebase';
import productApi from '../../../api/productApi';
import { useDispatch } from 'react-redux';
import { setAllProduct, updatedProduct } from '../../../actions/productAction';
import { Platform } from 'react-native';
import { ImagePicker } from 'expo-image-multiple-picker'



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
        <View>
            {/* <Text>UpdateProductView</Text> */}
            <TextInput value={product.title} onChangeText={(text) => setProduct({ ...product, title: text })} />
            <TextInput value={product.price} onChangeText={(text) => setProduct({ ...product, price: text })} />
            <TextInput value={product.description} onChangeText={(text) => setProduct({ ...product, description: text })} />
            <TextInput value={product.quantity} onChangeText={(text) => setProduct({ ...product, quantity: text })} />


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
                    handleCheckCate(item)
                }}
                renderSelectedItem={(item) => (
                    <></>
                )}
                selectedStyle={styles.selectedStyle}
            />
            {productCate.map((item, index) => {
                return (
                    <View key={index}>
                        <Text>{item.title}</Text>
                        <Button title='X' onPress={() => {
                            let temp = productCate.filter((v) => v._id !== item._id)
                            setProductCate(temp);
                        }} />

                    </View>
                )
            })}
            <Text>Images</Text>
            {selectedimages.map((item, index) => {

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

            })}
            {images.map((item, index) => {

                return (
                    <View key={index}>
                        <Image source={{ uri: item.uri }} style={{ width: 100, height: 100 }} />
                        <Button title='X' onPress={() => {
                            let temp = images.filter((v) => v !== item)
                            setImages(temp);
                        }} />
                    </View>
                )
            })}
            {(platfrom == 'web') ? (<Button
                title="pickImage"
                onPress={pickImage}
            />) : (
                <>
                    <Button title='pick Image' onPress={() => setOpen(true)} />
                </>
            )}
            <Button title='Update' onPress={handdleUpdate} />
        </View>
    )
}

export default UpdateProductView

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
})