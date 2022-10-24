import { View, ActivityIndicator } from 'react-native'
import React from 'react'

const LoadingView = () => {
    return (
        <View style={{ flex: 1, justifyContent: "center" }}>

            <ActivityIndicator size="large" color="blue" />
        </View>
    )
}

export default LoadingView