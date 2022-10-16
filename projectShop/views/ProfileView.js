import { View, Text } from 'react-native'
import React,{useEffect} from 'react'
import style from '../styles/mainStyle.js'
import { useSelector } from 'react-redux'
import shopApi from '../api/shopApi.js';
import { useDispatch } from 'react-redux'
import { getAllUser } from '../actions/userActions';

const ProfileView = () => {
    const dispatch = useDispatch();
    const fetchTest = async () => {
        try {
            const response = await shopApi.test('test')
            console.log('Fetch products successfully: ', response.data);
            dispatch(getAllUser(response.data));
        } catch (error) {
            console.log('Failed to fetch product list: ', error);
        }
    }

    useEffect(() => {
        fetchTest();
    }, [])
    const db = useSelector((store) => store.user);
    return (
        <View style={style.container}>
            {db.users.map((user, index) => {
                return (
                    <View key={index}>
                        <Text>{user.name}</Text>
                    </View>
                )
            })}
        </View>
    )
}

export default ProfileView