

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    texInput: {
        height: 40,
        width: 300,
        // margin: 10,
        fontSize: 20,
        padding: 10,
        backgroundColor: '#eee',
        borderRadius: 5,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonContainer: {
        height: 200,
        width: 300,
        marginTop: 25,
        flexDirection: "column",
        justifyContent: 'center',
    },
    button: {
        height: 40,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button1: {
        backgroundColor: '#1CD6CE',
    },
    button2: {
        backgroundColor: '#D61C4E',
    },
    btnTextblack: {
        fontWeight: 'bold',
        color: "#293462",
    },
    btnTextwhite: {
        fontWeight: 'bold',
        color: "#fafafa",
    },
    texInput: {
        height: 40,
        width: 300,
        fontSize: 20,
        color: "#fafafa",
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#293462',
        // borderColor: "#293462",
        borderWidth: 2,
        borderRadius: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        fontStyle: 'italic',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 40,
    },
    dropdown: {
        marginLeft:45,
        height: 50,
        backgroundColor: 'transparent',
        borderColor: 'gray',
        borderRadius: 12.8,
        borderWidth: 1,
        width:300
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 14,

    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});
