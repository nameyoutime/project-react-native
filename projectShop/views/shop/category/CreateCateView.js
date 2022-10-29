import { View, Text, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'
import { createNewCate, deleteCate, setAllCate } from '../../../actions/categoryAction'
import categoryApi from '../../../api/categoryApi'
import { useSelector } from 'react-redux'
import styles from '../../../styles/createcateStyle.js'

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
        <ScrollView style={{ backgroundColor: '#fff' }}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>Admin's function: Create category</Text>
                </View>
                <View>
                    <Text style={styles.label}>Title</Text>
                    <TextInput style={styles.texInput} placeholder='Title' onChangeText={(text) => setCategory({ ...category, title: text })} />
                
                    <Text style={styles.label}>Desscription</Text>
                    <TextInput style={styles.texInput} placeholder='Description' onChangeText={(text) => setCategory({ ...category, description: text })}/>
                </View>
                
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.button1]} onPress={haddleCreateCate}>  
                        <Text style={styles.btnTextblack}> Create a new Catergory </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.button2]} onPress={() => props.navigation.goBack()}>  
                        <Text style={styles.btnTextwhite}> Go back to shop </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* {db.cate} */}
            <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                {db.categories.map((item) => {
                return (
                    <View key={item._id} style={{ display: 'flex', flexDirection: 'row', }}>
                        <View  style={{ marginVertical: 3, borderColor: 'black', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, borderWidth: 1, padding: 3 }}>
                            <Text style={styles.label} onPress={() => navigateUpdate(item)}>{item.title}</Text>
                        </View>
                        <Text onPress={() => haddleDeleteCate(item)} style={[styles.label, { padding: 3, marginVertical: 3, marginRight: 3, textAlign: 'center', borderColor: 'black', backgroundColor: 'red', color: 'black', borderTopRightRadius: 10, borderBottomRightRadius: 10, borderWidth: 1 }]}>X</Text>
                    </View>
                )})}
            </View>
            
        </ScrollView>
    )
}

export default CreateCateView