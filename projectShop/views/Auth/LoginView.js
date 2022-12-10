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
    // Các trường username,password. và error
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // khi login chạy là khi bấm vào nút login
    const login = async () => {
        
        try {
            // chạy login api với kết quả trả về
            let result = await userApi.login({
                userName: userName,
                password: password
            });
            // nếu kết quả có error thì sẽ set vào trường error
            if (result.data.error) {
                setError(result.data.error);
            } else {
                //nếu không có error thì sẽ bỏ vào storage user và set redux kiểu user
                asyncStorage.set('user', result.data.user);
                dispatch(setCurrentUser(result.data.user));
                // điều hướng tới trang home
                navigation.navigate('Home');
            }
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <View style={styles.container}>
            <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: "#293462", justifyContent: 'center', alignItems: 'center' }}>
                <Icon name='shopping-bag' color='#eee' size={40} />
            </View>
            <Text style={{ color: '#D61C4E', fontSize: 25, marginVertical: 15, fontWeight: "bold" }}>Welcome back.</Text>
            <View>
                <View style={{alignItems: "center", justifyContent: "center"}}>
                    <TextInput placeholder="Username" onChangeText={(text) => setUserName(text)} style={{ padding: 10, borderColor: '#293462', width: 250, borderRadius: 3,  backgroundColor: "#FFF", shadowColor: '#171717', shadowOffset: {width: -2, height: 4}, shadowOpacity: 0.2, shadowRadius: 3, }} />
                    <TextInput secureTextEntry={true} placeholder="Password" onChangeText={(text) => setPassword(text)} style={{ marginVertical: 23, padding: 10,  borderColor: '#293462', width: 250, borderRadius: 3, backgroundColor: "#FFF", shadowOffset: {width: -2, height: 4}, shadowOpacity: 0.2, shadowRadius: 3, }} />
                </View>
                
                <Text style={{color:'red',fontWeight:'bold',textAlign:'center'}}>{error}</Text>

                <View style={{alignItems: "center", justifyContent: "center"}}>
                    <TouchableOpacity style={{ backgroundColor: '#1CD6CE',  padding: 15, marginTop: 20, marginBottom: 10, width: 250, borderRadius: 5, shadowOffset: {width: -2, height: 4}, shadowOpacity: 0.2, shadowRadius: 3, }} onPress={()=>{console.log('button is clicked!')}} >
                        <Text style={{ color: '#eee', fontSize: 18, fontWeight: 'bold', textAlign: 'center',  }} onPress={login}>Log In</Text>
                    </TouchableOpacity>
                </View>
                
                {/* <View style={{ marginBottom: 15 }}>
                    <Button title='Login' onPress={login} />
                </View> */}
                <View>
                    <Text  style={{ textAlign: 'center', color: '#293462', fontSize: 15, fontWeight: "500" }}>Don't have an account? <Text style={{fontWeight: "bold", color: "#D61C4E"}} onPress={() => { navigation.navigate('Register') }}> Sign up </Text></Text>
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