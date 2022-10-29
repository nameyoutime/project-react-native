import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        width: 150,
        height: 150, 
        borderRadius: 75, 
        backgroundColor: "#293462", 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    userName: {
        fontSize: 40,
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonContainer: {
        height: 200,
        width: 300,
        marginTop: 50,
        flexDirection: "column",
        justifyContent: 'center',
    },
    button: {
        height: 40,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button1: {
        backgroundColor: '#1CD6CE',
    },
    button2: {
        backgroundColor: '#FEDB39',
    },
    button3: {
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
        borderColor: "#293462",
        borderWidth: 2,
        borderRadius: 15,
    },
});