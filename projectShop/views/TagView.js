import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TagView = (props) => {
    return (
        <View style={{
            borderWidth: 1,
            borderColor: "red",
            padding:10,
            margin:5,
            borderRadius:20
        }}>
            <Text style={{textAlign:'center',fontWeight:'bold'}}>{props.item.name}</Text>
        </View>
    )
}

export default TagView

const styles = StyleSheet.create({})