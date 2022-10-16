import { StyleSheet, Text, View, TextInput,Pressable } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createTag } from '../actions/tagActions';
import { useNavigation } from '@react-navigation/native';

const CreateTagView = () => {
    const navigation = useNavigation();

    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const haddleNewTag = () => {
        dispatch(createTag({ id: parseInt(id), name: name }));
    }
    return (
        <View style={styles.container}>
            <View >
                <TextInput style={styles.inputText} placeholder='Tag id' placeholderTextColor='gray'
                    onChangeText={(id) => setId(id)} />
            </View>
            <View>
                <TextInput style={[styles.inputText,{marginBottom:10}]} placeholder='Tag name' placeholderTextColor='gray'
                    onChangeText={(name) => setName(name)}
                />
            </View>

            <Pressable style={styles.button} onPress={() => {
                haddleNewTag();
                setId(0);
                setName('');
                navigation.navigate('ViewAll')
            }}>
                <Text style={styles.buttonText}>CREATE TAG</Text>
            </Pressable>
        </View>
    )
}

export default CreateTagView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputText: {
        borderBottomWidth: 2,
        borderBottomColor: '#d81b60',
        paddingVertical: 10,
        fontSize: 20,
        width:260,
    },
    button: {
        backgroundColor: 'red',
        borderRadius: 15,
        padding: 10,
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        marginBottom: 10
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
    },
})