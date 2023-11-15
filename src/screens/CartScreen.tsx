import CartItem from '@/components/CartItem';
import EmptyListAnimation from '@/components/EmptyListAnimation';
import HeaderBar from '@/components/HeaderBar';
import PaymentFooter from '@/components/PaymentFooter';
import {useStore} from '@/stores/store';
import {COLORS, SPACING} from '@/theme/theme';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const CartScreen = () => {
    const navigation: any = useNavigation();
    const tabBarHeight = useBottomTabBarHeight();

    const cartList = useStore((state: any) => state.CartList);
    const cartPrice = useStore((state: any) => state.CartPrice);
    const incrementCartItemQuantity = useStore(
        (state: any) => state.incrementCartItemQuantity,
    );
    const decrementCartItemQuantity = useStore(
        (state: any) => state.decrementCartItemQuantity,
    );
    const calculateCartPrice = useStore(
        (state: any) => state.calculateCartPrice,
    );

    const payButtonPressHandler = () => {
        navigation.push('Payment', {
            amount: cartPrice
        });
    };

    // console.log(JSON.stringify(cartList, null, 2));

    const incrementCartItemQuantityHandler = (id: string, size: string) => {
        incrementCartItemQuantity(id, size);
        calculateCartPrice();
    };
    const decrementCartItemQuantityHandler = (id: string, size: string) => {
        decrementCartItemQuantity(id, size);
        calculateCartPrice();
    };
    return (
        <SafeAreaView
            style={{flex: 1, backgroundColor: COLORS.primaryBlackHex}}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />
            <View style={styles.container}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollViewFlex}>
                    <View
                        style={[
                            styles.scrollViewInnerView,
                            {marginBottom: tabBarHeight},
                        ]}>
                        <View style={styles.itemContainer}>
                            <HeaderBar title="Cart" />
                            {cartList.length === 0 ? (
                                <EmptyListAnimation title={'Cart is empty'} />
                            ) : (
                                <View style={styles.listItemContainer}>
                                    {cartList.map((data: any) => (
                                        <TouchableOpacity
                                            key={data.id}
                                            onPress={() => {
                                                navigation.push('Details', {
                                                    index: data.index,
                                                    id: data.id,
                                                    type: data.type,
                                                });
                                            }}>
                                            <CartItem
                                                id={data.id}
                                                name={data.name}
                                                imagelink_square={
                                                    data.imagelink_square
                                                }
                                                special_ingredient={
                                                    data.special_ingredient
                                                }
                                                roasted={data.roasted}
                                                prices={data.prices}
                                                type={data.type}
                                                incrementCartItemQuantityHandler={
                                                    incrementCartItemQuantityHandler
                                                }
                                                decrementCartItemQuantityHandler={
                                                    decrementCartItemQuantityHandler
                                                }
                                            />
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </View>
                        {cartList.length !== 0 ? (
                            <PaymentFooter
                                buttonTitle="Pay"
                                price={{price: cartPrice, currency: '$'}}
                                buttonPressHandler={payButtonPressHandler}
                            />
                        ) : (
                            <></>
                        )}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewFlex: {
        flexGrow: 1,
    },
    scrollViewInnerView: {
        flex: 1,
        justifyContent: 'space-between',
    },
    itemContainer: {
        flex: 1,
    },
    listItemContainer: {
        paddingHorizontal: SPACING.space_20,
        gap: SPACING.space_20,
    },
});

export default CartScreen;
