import TabNavigator from '@/navigators/TabNavigator';
import DetailsScreen from '@/screens/DetailsScreen';
import PaymentScreen from '@/screens/PaymentScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();

const App = () => {
    useEffect(() => {
        setTimeout(() => {
          SplashScreen.hide();
        }, 1000); //스플래시 활성화 시간
      });

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    <Stack.Screen
                        name="Tab"
                        component={TabNavigator}
                        options={{animation: 'slide_from_bottom'}}
                    />
                    <Stack.Screen
                        name="Details"
                        component={DetailsScreen}
                        options={{animation: 'slide_from_bottom'}}
                    />
                    <Stack.Screen
                        name="Payment"
                        component={PaymentScreen}
                        options={{animation: 'slide_from_bottom'}}
                    />
                </Stack.Navigator>
            </NavigationContainer>
            {/* Toast message */}
            <Toast />
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default App;
