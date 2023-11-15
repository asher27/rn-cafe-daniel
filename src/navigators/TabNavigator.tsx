import CustomIcon from '@/components/CustomIcon';
import CartScreen from '@/screens/CartScreen';
import FavoritesScreen from '@/screens/FavoritesScreen';
import HomeScreen from '@/screens/HomeScreen';
import OrderHistoryScreen from '@/screens/OrderHistoryScreen';
import {COLORS} from '@/theme/theme';
import { BlurView } from '@react-native-community/blur';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet} from 'react-native';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBarStyle,
                tabBarBackground: () => (
                    <BlurView
                        overlayColor=""
                        blurAmount={15}
                        style={styles.BlurViewStyle}
                    />
                ),
            }}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({focused, color, size}) => (
                        <CustomIcon
                            name="home"
                            size={25}
                            color={
                                focused
                                    ? COLORS.primaryOrangeHex
                                    : COLORS.primaryGreyHex
                            }
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Cart"
                component={CartScreen}
                options={{
                    tabBarIcon: ({focused, color, size}) => (
                        <CustomIcon
                            name="cart"
                            size={25}
                            color={
                                focused
                                    ? COLORS.primaryOrangeHex
                                    : COLORS.primaryGreyHex
                            }
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Favorites"
                component={FavoritesScreen}
                options={{
                    tabBarIcon: ({focused, color, size}) => (
                        <CustomIcon
                            name="like"
                            size={25}
                            color={
                                focused
                                    ? COLORS.primaryOrangeHex
                                    : COLORS.primaryGreyHex
                            }
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="OrderHistory"
                component={OrderHistoryScreen}
                options={{
                    tabBarIcon: ({focused, color, size}) => (
                        <CustomIcon
                            name="bell"
                            size={25}
                            color={
                                focused
                                    ? COLORS.primaryOrangeHex
                                    : COLORS.primaryGreyHex
                            }
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBarStyle: {
        height: 80,
        position: 'absolute',
        backgroundColor: COLORS.primaryBlackRGBA,
        borderTopWidth: 0,
        elevation: 0,
        borderTopColor: 'transparent',
    },
    BlurViewStyle: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
});

export default TabNavigator;
