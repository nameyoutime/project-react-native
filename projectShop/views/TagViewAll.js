import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';


const TagViewAll = ({ }) => {
    const navigation = useNavigation();
    const db = useSelector((store) => store.tag);

    return (
        <View style={styles.container}>
            {/* <View>
                {db.tags != null ? (
                    <FlatGrid
                        itemDimension={90}
                        data={db.tags}
                        style={styles.gridView}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => {
                                navigation.navigate('Edit', { id: item.id, name: item.name })
                            }} style={[styles.itemContainer, { backgroundColor: 'white' }]} >
                                <Text style={styles.itemCode} >{item.name}</Text>
                            </Pressable>
                        )}
                    />
                ) : (
                    <View>
                        <Text>No tags</Text>
                    </View>
                )}

            </View> */}
            <View style={styles.list}>
                {db.tags != null ? (
                    db.tags.map((tag, index) => {
                        return (
                            <Pressable key={index} onPress={() => {
                                navigation.navigate('Edit', { id: tag.id, name: tag.name })
                            }} style={[styles.itemContainer, { backgroundColor: 'white' }]} >
                                <Text style={styles.itemCode} >{tag.name}</Text>
                            </Pressable>

                        )
                    }))
                    : (<View>
                        <Text>No tags</Text>
                    </View>
                    )}
            </View>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Create')}>
                <Text style={styles.buttonText}>ADD NEW</Text>
            </Pressable>
        </View>
    )
}

export default TagViewAll

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: 'red',
        borderRadius: 15,
        padding: 10,
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        marginBottom: 10
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
    },
    list: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    gridView: {
        marginTop: 10,
        flex: 1,
    },
    itemContainer: {
        borderWidth: 1,
        borderColor: "red",
        padding: 10,
        margin: 5,
        borderRadius: 20
    },
    itemName: {
        fontSize: 16,
        // color: '#',
        fontWeight: '600',
        textAlign: 'center'
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        textAlign: 'center'

        // color: '#fff',
    },
})