import { View, Text, TextInput, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'
import { createNewCate, deleteCate, setAllCate } from '../../../actions/categoryAction'
import categoryApi from '../../../api/categoryApi'
import { useSelector } from 'react-redux'

const CreateCateView = (props) => {
    const [gotData, setGotData] = useState(false);
    const [category, setCategory] = useState({
        title: '',
        description: ''
    })
    const db = useSelector((store) => store.cate);

    const dispatch = useDispatch();
    const focus = useIsFocused();
    useEffect(() => {
        if (focus && !gotData) {
            console.log('CreateCateView');
            fetchCategories();
            setGotData(true);
        }
    }, [focus])
    const fetchCategories = async () => {
        const response = await categoryApi.getAll();
        console.log(response.data.data);
        dispatch(setAllCate(response.data.data));
    }
    const haddleCreateCate = async () => {
        if (category.title.length != 0 && category.description.length != 0) {
            const respone = await categoryApi.create(category);
            if (respone.data.error) {
                alert(respone.data.error)
            } else {
                dispatch(createNewCate(respone.data));
            }
        }
    }
    const haddleDeleteCate = async (cate) => {
        const respone = await categoryApi.delete(cate._id);
        if (respone.data.error) {
            alert(respone.data.error)
        } else {
            dispatch(deleteCate(cate));
        }
    }
    const navigateUpdate = (cate) => {
        console.log(cate);
        props.navigation.navigate('Update category', { cate: cate });
    }


    return (
        <>
            <TextInput placeholder='Title' onChangeText={(text) => setCategory({ ...category, title: text })} />
            <TextInput placeholder='Description' onChangeText={(text) => setCategory({ ...category, description: text })} />
            <Text>{category.title}</Text>
            <Text>{category.description}</Text>
            <Button title='Create' onPress={haddleCreateCate} />

            {/* {db.cate} */}
            {db.categories.map((item) => {
                return (
                    <View key={item._id}>
                        <Text>{item.title}</Text>
                        <Button title='delete' color={'red'} onPress={() => haddleDeleteCate(item)}/>
                        {/* <Text onPress={() => haddleDeleteCate(item)}>X</Text> */}
                        <Button title='update' onPress={()=>navigateUpdate(item)}/>
                    </View>
                )
            })}
            <Button title='go back' onPress={()=>props.navigation.goBack()}/>
        </>
    )
}

export default CreateCateView