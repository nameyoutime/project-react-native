import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from "react";
import asyncStorage from '../../api/asynStorage';
import { useDispatch } from 'react-redux'
import { setCurrentUser } from '../../actions/userActions';

const LoadingScreenView = ({ navigation }) => {
    const timer = 100;
    const dispatch = useDispatch();
    const fetchUser = async () => {
        try {
            // lấy user trong local storage của máy nếu user không có thì sẽ điều hướng tới trang login nếu có điều hướng thẳng tới trang home
            const user = await asyncStorage.get('user');
            if (user) { 
                dispatch(setCurrentUser(user));
                navigation.navigate('Home');
            } else {
                navigation.navigate('Login');
            }
        } catch (error) {
            console.log(error);
        }
    }
    // Chạy khi bắt đầu vào trang như ngon init, nó sẽ chạy hàm fetchuser
    useEffect(() => {
        fetchUser();
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator size="large" color="#00ff00" />
        </View>
    )
}

export default LoadingScreenView