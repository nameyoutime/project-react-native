import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import CartView from './CartView';
import CheckOutView from './CheckOutView';



const Stack = createStackNavigator();
const CartLayoutView = () => {
    return (
        <Stack.Navigator initialRouteName="Cart view" screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Cart view" component={CartView} />
            <Stack.Screen name="Checkout" component={CheckOutView} />
        </Stack.Navigator>
    )
}

export default CartLayoutView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})