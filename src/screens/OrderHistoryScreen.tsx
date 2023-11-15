import EmptyListAnimation from '@/components/EmptyListAnimation';
import HeaderBar from '@/components/HeaderBar';
import OrderHistoryCard from '@/components/OrderHistoryCard';
import PopUpAnimation from '@/components/PopUpAnimation';
import {useStore} from '@/stores/store';
import {
    BORDERRADIUS,
    COLORS,
    FONTFAMILY,
    FONTSIZE,
    SPACING,
} from '@/theme/theme';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const OrderHistoryScreen = () => {
    const navigation: any = useNavigation();
    const tabBarHeight = useBottomTabBarHeight();
    const orderHistoryList = useStore((state: any) => state.OrderHistoryList);

    const [showAnimation, setShowAnimation] = useState(false);

    const navigationHandler = ({index, id, type}: any) => {
        navigation.push('Details', {
            index,
            id,
            type,
        });
    };

    const buttonPressHandler = () => {
        setShowAnimation(true);

        setTimeout(() => setShowAnimation(false), 2000);
    };

    return (
        <SafeAreaView
            style={{flex: 1, backgroundColor: COLORS.primaryBlackHex}}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />
            <View style={styles.container}>
                {showAnimation && (
                    <PopUpAnimation
                        style={styles.lottieAnimation}
                        source={require('../lottie/download.json')}
                    />
                )}

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollViewFlex}>
                    <View
                        style={[
                            styles.scrollViewInnerView,
                            {marginBottom: tabBarHeight},
                        ]}>
                        <View style={styles.itemContainer}>
                            <HeaderBar title="Order History" />

                            {orderHistoryList.length === 0 ? (
                                <EmptyListAnimation title="No Order History" />
                            ) : (
                                <View style={styles.listItemContainer}>
                                    {orderHistoryList.map(
                                        (data: any, index: any) => (
                                            <OrderHistoryCard
                                                key={index}
                                                navigationHandler={
                                                    navigationHandler
                                                }
                                                cartList={data.CartList}
                                                cartListPrice={
                                                    data.CartListPrice
                                                }
                                                orderDate={data.OrderDate}
                                            />
                                        ),
                                    )}
                                </View>
                            )}
                        </View>
                        {orderHistoryList.length > 0 && (
                            <TouchableOpacity
                                onPress={() => buttonPressHandler()}
                                style={styles.downloadButton}>
                                <Text style={styles.buttonText}>Download</Text>
                            </TouchableOpacity>
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
        backgroundColor: COLORS.primaryBlackHex,
    },
    lottieAnimation: {
        height: 250,
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
        gap: SPACING.space_30,
    },
    downloadButton: {
        maring: SPACING.space_20,
        backgroundColor: COLORS.primaryOrangeHex,
        alignItems: 'center',
        justifyContent: 'center',
        height: SPACING.space_36 * 2,
        borderRadius: BORDERRADIUS.radius_20,
    },
    buttonText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex,
    },
});

export default OrderHistoryScreen;
