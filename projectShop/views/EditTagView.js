import { StyleSheet, Text, View, TextInput,Pressable } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateTag,deleteTag } from '../actions/tagActions';
import { useNavigation } from '@react-navigation/native';

const EditTagView = (props) => {
    const navigation = useNavigation();
    const [id, setId] = useState(parseInt(props.route.params.id));
    const [name, setName] = useState(props.route.params.name);
    const dispatch = useDispatch();

    const haddleDeleteTag = (id) => {
        dispatch(deleteTag({ id: id }));
    }
    const haddleUpdateTag = () => {
        dispatch(updateTag({ id: parseInt(id), name: name }));
    }
    return (
        <View style={styles.container}>
            <View>
                <TextInput style={styles.inputText} placeholder='Tag id' placeholderTextColor='gray'
                    onChangeText={(id) => setId(id)} value={id.toString()} />
            </View>
            <View>
                <TextInput style={[styles.inputText,{marginBottom:10}]} placeholder='Tag name' placeholderTextColor='gray'
                    onChangeText={(name) => setName(name)} value={name}
                />
            </View>

            <Pressable style={styles.button} onPress={() => {
                haddleUpdateTag();
                setId(0);
                setName('');
                navigation.navigate('ViewAll')
            }}>
                <Text style={styles.buttonText}>UPDATE</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={() => {
                haddleDeleteTag(id);
                setId(0);
                setName('');
                navigation.navigate('ViewAll')
            }}>
                <Text style={styles.buttonText}>DELETE</Text>
            </Pressable>
        </View >
    )
}

export default EditTagView

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