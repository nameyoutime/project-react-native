import { Text, View, Image, Button, Platform, TextInput,StatusBar,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

import styles from '../../styles/loginStyle.js'
import userApi from '../../api/userApi.js';
import asyncStorage from '../../api/asynStorage';
import { useDispatch } from 'react-redux'
import { setCurrentUser } from '../../actions/userActions';
import Icon from 'react-native-vector-icons/FontAwesome'


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
            <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: "#293462", justifyContent: 'center', alignItems: 'center' }}>
                <Icon name='user' color='#eee' size={36} />
            </View>
            <Text style={{ color: '#D61C4E', fontSize: 30, marginVertical: 15 }}>Sign in</Text>
            <View>
                <TextInput placeholder="Username" onChangeText={(text) => setUserName(text)} style={{ padding: 10, borderWidth: 1, borderColor: '#293462', width: 300, borderRadius: 5 }} />
                <TextInput secureTextEntry={true} placeholder="Password" onChangeText={(text) => setPassword(text)} style={{ marginVertical: 15, padding: 10, borderWidth: 1, borderColor: '#293462', width: 300, borderRadius: 5 }} />
                <Text style={{color:'red',fontWeight:'bold',textAlign:'center'}}>{error}</Text>
                <TouchableOpacity style={{ backgroundColor: '#1CD6CE',  padding: 15, marginVertical: 15, width: 300, borderRadius: 10 }} onPress={()=>{console.log('button is clicked!')}} >
                    <Text style={{ color: '#eee', fontSize: 15, fontWeight: 'bold', textAlign: 'center' }} onPress={login}>Log In</Text>
                </TouchableOpacity>
                {/* <View style={{ marginBottom: 15 }}>
                    <Button title='Login' onPress={login} />
                </View> */}
                <View>
                    <Text onPress={() => { navigation.navigate('Register') }} style={{ textAlign: 'right', color: '#D61C4E' }}>Don't have an account? Sign up</Text>
                </View>
            </View>
            <StatusBar style="auto" />
        </View>
        // <View style={styles.container}>
        //     <Text>LoginView</Text>
        //     <TextInput placeholder="Username" onChangeText={(text) => setUserName(text)} />
        //     <TextInput placeholder="Password" onChangeText={(text) => setPassword(text)} />
        //     <Text>{error}</Text>
        //     <Button title="Login" onPress={login} />
        //     <Button title="Go to register"
        //         onPress={() => navigation.navigate('Register')} />
        //     {/* <Button
        //         title="Go to home"
        //         onPress={() => navigation.navigate('Home')}
        //     /> */}
        // </View>

    )
}

export default LoginView