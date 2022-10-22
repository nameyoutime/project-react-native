import { View, Text, Button, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../../styles/mainStyle.js'
import { useDispatch } from 'react-redux'
import asyncStorage from '../../api/asynStorage.js';
import userApi from '../../api/userApi.js'
import { useIsFocused } from "@react-navigation/native";
import { setCurrentUser } from '../../actions/userActions';
import { useNavigation, useRoute } from '@react-navigation/native';
// import styles from '../../styles/styles.js';

const ProfileView = (props) => {
    const Route = useRoute();
    const [routerName, setRouterName] = useState(Route.name);
    const focus = useIsFocused();  // useIsFocused as shown   
    const initProfile = {
        address: "",
        email: "",
        isAdmin: false,
        name: "",
        phone: 0,
        _id: ""
    }
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(initProfile);
    const [loading, setLoading] = useState(false);

    const fetchUser = async () => {
        const response = await asyncStorage.get('user');
        if (response != null) {
            setLoading(true);
            let result = await userApi.getUser(response._id);
            await asyncStorage.set('user', result.data.data);
            dispatch(setCurrentUser(result.data.data));
            setUser({ userName: result.data.data.userName, password: result.data.data.password, _id: result.data.data._id });
            setProfile(result.data.data.user);
            setLoading(false);
        } else {
            setUser(null)
        }
    }


    const handdleLogout = async () => {
        try {
            await asyncStorage.set('user', null);
            setUser(null);
            setProfile(initProfile);
            dispatch(setCurrentUser({}));
            props.navigation.navigate('Login');
        } catch (error) {
            console.log(error);
        }
    }
    const checkUser = async () => {
        const response = await asyncStorage.get('user');
        console.log(response);
    }
    const handdleUpdate = async () => {
        // console.log(profile)
        if (profile.name.length == 0 || profile.address.length == 0 || profile.phone.length == 0 || profile.email.length == 0) {
            alert('Please fill all the fields');
        } else {
            try {
                let result = await userApi.updateProfile({ _id: profile._id, profile: profile });
                if (result.data.error) {
                    console.log(result.data.error);
                } else {
                    let user = await asyncStorage.get('user');
                    let temp = { ...user, user: result.data.data };
                    await asyncStorage.set('user', temp);
                    props.navigation.navigate('Home');
                }
            } catch (error) {
                console.log(error);
            }
        }

    }
    const renderUser = () => {
        return (
            <>
                <Button title='Order History' onPress={() => { props.navigation.navigate('Order history', { userId: user._id, isAdmin: profile.isAdmin }) }} />
                <View >
                    <Text style={styles.label}>User Name : {user.userName}</Text>
                    <Text style={styles.label}>Name</Text>
                    <TextInput style={styles.texInput} placeholder='name' defaultValue={profile.name} onChangeText={(e) => setProfile({ ...profile, name: e })} />
                    <Text style={styles.label}>Address</Text>
                    <TextInput style={styles.texInput} placeholder='address' defaultValue={profile.address} onChangeText={(e) => setProfile({ ...profile, address: e })} />
                    <Text style={styles.label}>Email</Text>

                    <TextInput style={styles.texInput} placeholder='email' defaultValue={profile.email} onChangeText={(e) => setProfile({ ...profile, email: e })} />
                    <Text style={styles.label}>Phone</Text>

                    <TextInput style={styles.texInput} keyboardType='numeric' placeholder='phone' defaultValue={profile.phone} onChangeText={(e) => setProfile({ ...profile, phone: e })} />
                    <View style={{marginVertical:10}}>
                        <Button title="update" onPress={handdleUpdate} />

                    </View>
                </View>

            </>
        )
    }

    const renderAdmin = () => {
        return (
            <Button title="Check" onPress={checkUser} />
        )
    }


    useEffect(() => {
        console.log(focus)
        if (focus && user == null) {
            fetchUser();
        }
    }, [focus])
    if (loading) {

        return (<><Text>loading...</Text></>)
    }
    else {
        // console.log(loading)
        return (
            <>
                <View style={styles.container}>
                    {user != null ? (renderUser()) : (<Text>Not found</Text>)}
                    <Button title="Logout" onPress={handdleLogout} />
                    {/* <View>{(user != null && profile.isAdmin) ? (renderAdmin()) : (<Text>not admin</Text>)}</View> */}

                </View>

            </>
        )
    }
}

export default ProfileView