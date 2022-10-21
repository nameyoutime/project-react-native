import { Text, View, Image, Button, Platform, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'

import styles from '../../styles/mainStyle.js'
import userApi from '../../api/userApi.js';
import asyncStorage from '../../api/asynStorage';
import { useDispatch } from 'react-redux'
import { setCurrentUser } from '../../actions/userActions';
// import { Input, Icon } from '@rneui/themed';

const LoginView = ({ navigation }) => {
    const dispatch = useDispatch();

    const [image, setImage] = useState(null);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // make an login function
    const login = async () => {
        // user login with userApi
        try {
            let result = await userApi.login({
                userName: userName,
                password: password
            });
            // console.log(result.data)
            if (result.data.error) {
                setError(result.data.error);
            } else {
                asyncStorage.set('user', result.data.user);
                dispatch(setCurrentUser(result.data.user));
                navigation.navigate('Home');
            }
        } catch (error) {
            console.log(error);
        }
        // navigation.navigate('HomeLayout');
    }



    return (
        <View style={styles.container}>
            <Text>LoginView</Text>
            <TextInput placeholder="Username" onChangeText={(text) => setUserName(text)} />
            <TextInput placeholder="Password" onChangeText={(text) => setPassword(text)} />
            <Button title="Login" onPress={login} />
            <Text>{error}</Text>
            <Button
                title="Go to register"
                onPress={() => navigation.navigate('Register')}
            />
            <Button
                title="Go to home"
                onPress={() => navigation.navigate('Home')}
            />
        </View>

    )
}

export default LoginView