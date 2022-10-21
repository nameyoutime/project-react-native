import { Text, View, Button, TextInput } from 'react-native'
import React, { useState } from 'react'
import styles from '../../styles/mainStyle.js'
import userApi from '../../api/userApi.js'
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
            <Text>RegisterView</Text>
            <TextInput style={styles.input} placeholder="Username" onChangeText={(text) => setUserName(text)} />
            <TextInput style={styles.input} placeholder="Password" onChangeText={(text) => setPassword(text)} />
            <TextInput style={styles.input} placeholder="Verify Password" onChangeText={(text) => setVerifyPassword(text)} />
            <Button title="Register" onPress={haddleRegister} />
            <Text>{error}</Text>


            <Button
                title="Go to login"
                onPress={() => navigation.navigate('Login')}
            />
        </View>
    )
}

export default RegisterView