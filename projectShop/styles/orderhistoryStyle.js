import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        height: 100,
        width: 300,
        // marginTop: 50,
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
        backgroundColor: '#FFD3B6',
    },
    btnTextblack: {
        fontWeight: 'bold',
        color: "#293462",
    },
    label: {
        fontSize: 16,
        color: "#000000",
        paddingLeft: 10,
    },
    labelInner: {
        fontSize: 20,
        color: "#293462",
        fontWeight: 'bold',
    },
    // card with shadow
    card1: {
        width: 350,
        // height: 500,
        backgroundColor: '#FFAAA5',
        margin: 10,
        padding: 10,
        borderRadius: 12.8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: 'column'
    },
    card2: {
        width: 310,
        height: 120,
        backgroundColor: '#FCF8F3',
        margin: 10,
        padding: 10,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: 'row'
    },
    // card image
    cardImage: {
        width: 100,
        height: 100,
        borderRadius: 5,
    },
});
