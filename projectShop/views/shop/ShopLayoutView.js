import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ShopView from './ShopView';
import CreateCateView from './category/CreateCateView';
import UpdateCateView from './category/UpdateCateView';
import CreateProductView from './product/CreateProductView';
import ProductDetailView from './product/ProductDetailView';
import UpdateProductView from './product/UpdateProductView';
import SearchView from './SearchView';



const Stack = createStackNavigator();
const ShopLayoutView = () => {
    return (
        <Stack.Navigator initialRouteName="Main shop" screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Main shop" component={ShopView} />
            <Stack.Screen name="Create category" component={CreateCateView} />
            <Stack.Screen name="Update category" component={UpdateCateView} />
            <Stack.Screen name="Create product" component={CreateProductView} />
            <Stack.Screen name="Product detail" component={ProductDetailView} />
            <Stack.Screen name="Update product" component={UpdateProductView} />
            <Stack.Screen name="Search" component={SearchView} />
            



        </Stack.Navigator>
    )
}

export default ShopLayoutView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})