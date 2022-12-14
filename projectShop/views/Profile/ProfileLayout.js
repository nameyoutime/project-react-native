import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileView from './ProfileView';
import OrderHistoryView from './OrderHistoryView';
import GetUserDetailView from './GetUserDetailView';



const Stack = createStackNavigator();
const ProfileLayoutView = () => {
    return (
        <Stack.Navigator initialRouteName="Profile view" screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Profile view" component={ProfileView} />
            <Stack.Screen name="Order history" component={OrderHistoryView} />
            <Stack.Screen name="User detail" component={GetUserDetailView} />

        </Stack.Navigator>
    )
}

export default ProfileLayoutView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})