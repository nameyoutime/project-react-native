import { View, Text, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateCate } from '../../../actions/categoryAction';
import cateApi from '../../../api/categoryApi';
import styles from '../../../styles/mainStyle';
const UpdateCateView = (props) => {
    const dispatch = useDispatch();
    const [category, setCategory] = useState(props.route.params.cate);
    const haddleUpdateCate = async () => {
        console.log(category);
        const respone = await cateApi.update(category);
        if (respone.data.error) {
            alert(respone.data.error);
        } else {
            dispatch(updateCate(category));
            props.navigation.goBack();
        }
    }

    return (
        <View style={styles.container}>
            <TextInput style={[styles.texInput,{marginVertical:5}]} placeholder='Title' value={category.title} onChangeText={(text) => setCategory({ ...category, title: text })} />
            <TextInput style={[styles.texInput,{marginVertical:5}]} placeholder='Description' value={category.description} onChangeText={(text) => setCategory({ ...category, description: text })} />
            <Button title='Update' onPress={haddleUpdateCate} />
        </View>
    )
}

export default UpdateCateView