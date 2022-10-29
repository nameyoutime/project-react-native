

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    texInput: {

    },
    label: {
        fontSize: 16,
        color: "#BCABA2",
    },
    labelInner: {
        fontSize: 16,
        color: "#293462",
        fontWeight: 'bold',
    },
    // card with shadow
    card: {
        width: 300,
        height: 120,
        backgroundColor: '#EAEAE9',
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
    },
    // card image
    cardImage: {
        width: 100,
        height: 100,
        borderRadius: 12.8,
        borderWidth: 3,
        borderColor: "#BCABA2",
    },
    dropdown: {
        height: 50,
        backgroundColor: 'transparent',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
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
    icon: {
        marginRight: 5,
    },
    selectedStyle: {
        borderRadius: 12,
    },
    item: {
        padding: 20,
        marginVertical: 8
    },
    header: {
        fontSize: 32,
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 24,
        color: "#E78D7E"
    },
    description: {
        marginTop: 5
    },
    dot: {
        fontWeight: "bold",
        fontSize: 20,
        marginHorizontal: 5,
        color: "#E78D7E"
    },
    navButton: {
        width: "33%",
        height: 100,
        fontSize: 100, color: 'red',
        margin: 10,
        padding: 10,
    },

    //NEW
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        fontStyle: 'italic',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 40,
    },
        
});
