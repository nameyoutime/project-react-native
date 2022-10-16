import { Text, View ,Button} from 'react-native'
import React from 'react'
import styles from '../styles/mainStyle.js'

const RegisterView = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>RegisterView</Text>
            <Button
                title="Go to login"
                onPress={() => navigation.navigate('Login')}
            />
        </View>
    )
}

export default RegisterView