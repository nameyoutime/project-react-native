import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { Store } from './store/store.js';
import AuthLayout from './views/Auth/AuthLayout.js';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>

      <Provider store={Store}>
      {/* Đầu tiên nó sẽ chạy vào auth layout để check người dùng có đăng nhập chưa nếu đăng nhập rồi thì sẽ chuyển trược tiếp tới trang chính */}
        <AuthLayout />
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
