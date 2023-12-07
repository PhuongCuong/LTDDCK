import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import login from './src/component/login';
import home from './src/component/home';
import { Provider } from 'react-redux';
import store from './src/redux/store';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='login' component={login} options={{
            headerShown: false
          }} />
          <Stack.Screen name='home' component={home} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}


