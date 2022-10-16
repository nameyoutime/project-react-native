import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import TagViewAll from './TagViewAll';
import EditTagView from './EditTagView';
import CreateTagView from './CreateTagView';

const Stack = createStackNavigator();
const TagManagementView = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="ViewAll">
                <Stack.Screen name="ViewAll" component={TagViewAll} options={{ title: "Tag" }} />
                <Stack.Screen name="Create" component={CreateTagView} options={{ title: "Create tag" }} />
                <Stack.Screen name="Edit" component={EditTagView} options={{ title: "Edit tag" }} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default TagManagementView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})