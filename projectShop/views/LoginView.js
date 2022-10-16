import { Text, View, Image, Button, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../firebase';
import styles from '../styles/mainStyle.js'
const LoginView = ({ navigation }) => {
    const [image, setImage] = useState(null);


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,

        });
        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const uploadImage = async () => {
        try {
            let name = firebase.firestore().collection('name').doc().id;
            const response = await fetch(image);
            const blob = await response.blob();
            let ref = firebase.storage().ref().child("images/" + name);
            let upload = await ref.put(blob);
            let url = await ref.getDownloadURL();
            console.log(url);
            
        } catch (error) {
            
        }
    }

    const deleteImage = async(name) => {
        try {
            let ref = await firebase.storage().ref().child("images/" + name).delete();
        } catch (error) {
            
        }
    }


    return (
        <View style={styles.container}>
            <Text>LoginView</Text>
            <Button
                title="pickImage"
                onPress={pickImage}
            />
            <Button
                title="deleteImage"
                onPress={()=>deleteImage('VMtIjDbfpeaOMeDiphub')}
            />
            <Button
                title="uploadImage"
                onPress={uploadImage}
            />
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