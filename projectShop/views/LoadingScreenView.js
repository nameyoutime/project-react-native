import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from "react";
const LoadingScreenView = ({navigation}) => {
    const timer = 100;
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Login')
        }, timer)
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator size="large" color="#00ff00" />
        </View>
    )
}

export default LoadingScreenView