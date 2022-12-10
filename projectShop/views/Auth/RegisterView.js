import { Text, View, Button, TextInput,StatusBar,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
// import styles from '../../styles/mainStyle.js'
import userApi from '../../api/userApi.js'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from '../../styles/loginStyle.js'

const RegisterView = ({ navigation }) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [error, setError] = useState('');
    const haddleRegister = async () => {
        // kiểm tra xem nếu password có bằng với nhau
        if (password === verifyPassword) {
            // gọi api register
            try {
                let result = await userApi.register({
                    userName: userName,
                    password: password
                })
                // nếu có error thì hiện lên nếu không thì điều hướng tới trang login
                if (result.data.error) {
                    setError(result.data.error);
                } else {
                    navigation.navigate('Login');
                }
            } catch (error) {
                console.log(error);
            }

        } else {
            setError('Password does not match');
        }

        // navigation.navigate('Login');
    }
    return (
        <View style={styles.container}>
            <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: "#293462", justifyContent: 'center', alignItems: 'center' }}>
                <Icon name='user-plus' color='#eee' size={40} />
            </View>
            <Text style={{ color: '#D61C4E', fontSize: 30, marginVertical: 15, fontWeight: "500" }}>Create user</Text>
            <View style={{alignItems: "center", justifyContent:"center"}}>
                <TextInput  placeholder="User name" onChangeText={(text) => setUserName(text)} style={{ padding: 10, borderColor: '#293462', width: 280, borderRadius: 3,  backgroundColor: "#FFF", shadowColor: '#171717', shadowOffset: {width: -2, height: 4}, shadowOpacity: 0.2, shadowRadius: 3, }} />
                <TextInput secureTextEntry={true} placeholder="Password" onChangeText={(text) => setPassword(text)}  style={{ marginVertical: 20, padding: 10, borderColor: '#293462', width: 280, borderRadius: 3,  backgroundColor: "#FFF", shadowColor: '#171717', shadowOffset: {width: -2, height: 4}, shadowOpacity: 0.2, shadowRadius: 3, }} />
                <TextInput secureTextEntry={true} placeholder="Verify Password" onChangeText={(text) => setVerifyPassword(text)}  style={{ padding: 10, borderColor: '#293462', width: 280, borderRadius: 3,  backgroundColor: "#FFF", shadowColor: '#171717', shadowOffset: {width: -2, height: 4}, shadowOpacity: 0.2, shadowRadius: 3, }} />
                <Text style={{color:'red',fontWeight:'bold',textAlign:'center'}}>{error}</Text>
                <TouchableOpacity style={{ backgroundColor: '#1CD6CE',  padding: 15, marginTop: 30, width: 280, borderRadius: 5, shadowColor: '#171717', shadowOffset: {width: -2, height: 4}, shadowOpacity: 0.2, shadowRadius: 3  }} onPress={()=>{console.log('button is clicked!')}}>
                    <Text style={{ color: '#eee', fontSize: 15, fontWeight: 'bold', textAlign: 'center' }} onPress={haddleRegister}>SIGN UP</Text>
                </TouchableOpacity>
                {/* <View style={{ marginBottom: 15 }}>
                    <Button title="Register" onPress={haddleRegister}  />
                </View> */}
                <View style={{marginTop: 20}}>
                    <Text style={{ color: '#293462', fontSize: 15, fontWeight: "500" }}>Already have an account? <Text style={{ color: '#D61C4E', fontWeight:"bold"}} onPress={() => navigation.navigate('Login')}>Login now</Text> </Text>
                </View>
            </View>
            <StatusBar style="auto" />
        </View>
        // <View style={styles.container}>
        //     <Text>RegisterView</Text>
        //     <TextInput style={styles.input} />
        //     <TextInput style={styles.input} />
        //     <TextInput style={styles.input} />
        //     <Button />
        //     


        //     <Button
        //         title="Go to login"
        //         onPress={}
        //     />
        // </View>
    )
}

export default RegisterView

