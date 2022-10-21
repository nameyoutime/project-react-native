import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        // console.log(jsonValue)
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        // saving error
        console.log(e);
    }
}
const getData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        // console.log(JSON.parse(jsonValue));
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(e)
        // error reading value
    }
}


const asyncStorage = {
    set: (key,payload) => {
        let res = storeData(key, payload);
        return res;
    },
    get: (key) => {
        return getData(key);
    }
}

export default asyncStorage;
