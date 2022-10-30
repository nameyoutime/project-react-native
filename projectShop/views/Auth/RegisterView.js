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
        // check if vertifypassword is equal to password
        if (password === verifyPassword) {
            // register with userApi
            try {
                let result = await userApi.register({
                    userName: userName,
                    password: password
                })
                console.log(result.data);
                if (result.data.error) {
                    setError(result.data.error);
                } else {
                    navigation.navigate('Login');
                }

                // navigation.navigate('Login');
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
            <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: "#293462", justifyContent: 'center', alignItems: 'center' }}>
                <Icon name='user-plus' color='#eee' size={36} />
            </View>
            <Text style={{ color: '#D61C4E', fontSize: 30, marginVertical: 15 }}>Register</Text>
            <View>
                <TextInput  placeholder="User name" onChangeText={(text) => setUserName(text)} style={{ marginVertical: 15, padding: 12, borderWidth: 1, margin: 12, borderColor: '#293462', width: 300, borderRadius: 5 }} />
                <TextInput secureTextEntry={true} placeholder="Password" onChangeText={(text) => setPassword(text)}  style={{ marginVertical: 15, padding: 12, borderWidth: 1, margin: 12, borderColor: '#293462', width: 300, borderRadius: 5 }} />
                <TextInput secureTextEntry={true} placeholder="Verify Password" onChangeText={(text) => setVerifyPassword(text)}  style={{ marginVertical: 15, padding: 12, borderWidth: 1, margin: 12, borderColor: '#293462', width: 300, borderRadius: 5 }} />
                <Text style={{color:'red',fontWeight:'bold',textAlign:'center'}}>{error}</Text>
                <TouchableOpacity style={{ backgroundColor: '#1CD6CE',  padding: 15, marginLeft: 13, marginVertical: 15, width: 300, borderRadius: 5, }} onPress={()=>{console.log('button is clicked!')}}>
                    <Text style={{ color: '#eee', fontSize: 15, fontWeight: 'bold', textAlign: 'center' }} onPress={haddleRegister}>Register</Text>
                </TouchableOpacity>
                {/* <View style={{ marginBottom: 15 }}>
                    <Button title="Register" onPress={haddleRegister}  />
                </View> */}
                <Text style={{ textAlign: 'right', color: '#D61C4E' }} onPress={() => navigation.navigate('Login')}>Already have an account? Login now</Text>
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

