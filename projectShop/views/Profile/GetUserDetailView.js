import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'

const GetUserDetailView = (props) => {
    const [user, setUser] = useState(props.route.params.user)
    console.log(user);
    return (
        <View>
            <Text>GetUserDetailView</Text>
        </View>
    )
}

export default GetUserDetailView