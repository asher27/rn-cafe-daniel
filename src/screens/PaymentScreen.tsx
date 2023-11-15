import CustomIcon from '@/components/CustomIcon';
import GradientBGIcon from '@/components/GradientBGIcon';
import PaymentFooter from '@/components/PaymentFooter';
import PaymentMethod from '@/components/PaymentMethod';
import PopUpAnimation from '@/components/PopUpAnimation';
import { useStore } from '@/stores/store';
import {
    BORDERRADIUS,
    COLORS,
    FONTFAMILY,
    FONTSIZE,
    SPACING,
} from '@/theme/theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const paymentList = [
    {
        name: 'Wallet',
        icon: 'icon',
        isIcon: true,
    },
    {
        name: 'Google Pay',
        icon: require('../assets/app_images/gpay.png'),
        isIcon: false,
    },
    {
        name: 'Apple Pay',
        icon: require('../assets/app_images/applepay.png'),
        isIcon: false,
    },
    {
        name: 'Amazon Pay',
        icon: require('../assets/app_images/amazonpay.png'),
        isIcon: false,
    },
];

const PaymentScreen = () => {
    const navigation: any = useNavigation();
    const route: any = useRoute();

    const calculateCartPrice = useStore(
        (state: any) => state.calculateCartPrice,
    );
    const addToOrderHistoryListFromCart = useStore(
        (state: any) => state.addToOrderHistoryListFromCart,
    );

    const [paymentMode, setPaymentMode] = useState('Credit Card');
    const [showAnimation, setShowAnimation] = useState(false);

    const buttonPressHandler = () => {
        setShowAnimation(true);

        addToOrderHistoryListFromCart();
        calculateCartPrice();

        setTimeout(() => {
            setShowAnimation(false);
            navigation.navigate('OrderHistory');
        }, 2000);
    };

    return (
        <SafeAreaView
            style={{flex: 1, backgroundColor: COLORS.primaryBlackHex}}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />
            <View style={styles.container}>
                {showAnimation && (
                    <PopUpAnimation
                        source={require('../lottie/successful.json')}
                        style={styles.lottieStyle}
                    />
                )}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollViewFlex}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity onPress={() => navigation.pop()}>
                            <GradientBGIcon
                                name="left"
                                color={COLORS.primaryLightGreyHex}
                                size={FONTSIZE.size_16}
                            />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>Payments</Text>
                        <View style={styles.emptyView} />
                    </View>
                    <View style={styles.paymentOptionsContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                setPaymentMode('Credit Card');
                            }}>
                            <View
                                style={[
                                    styles.creditCardContainer,
                                    {
                                        borderColor:
                                            paymentMode === 'Credit Card'
                                                ? COLORS.primaryOrangeHex
                                                : COLORS.primaryGreyHex,
                                    },
                                ]}>
                                <Text style={styles.creditCardTitle}>
                                    Credit Card
                                </Text>
                                <View style={styles.creditCardBG}>
                                    <LinearGradient
                                        start={{x: 0, y: 0}}
                                        end={{x: 1, y: 1}}
                                        colors={[
                                            COLORS.primaryGreyHex,
                                            COLORS.primaryBlackHex,
                                        ]}
                                        style={styles.linearGradientStyle}>
                                        <View style={styles.creditCardRow}>
                                            <CustomIcon
                                                name="chip"
                                                size={FONTSIZE.size_20 * 2}
                                                color={COLORS.primaryOrangeHex}
                                            />
                                            <CustomIcon
                                                name="visa"
                                                size={FONTSIZE.size_30 * 2}
                                                color={COLORS.primaryWhiteHex}
                                            />
                                        </View>
                                        <View
                                            style={
                                                styles.creditCardNumberContainer
                                            }>
                                            <Text
                                                style={styles.creditCardNumber}>
                                                3879
                                            </Text>
                                            <Text
                                                style={styles.creditCardNumber}>
                                                2346
                                            </Text>
                                            <Text
                                                style={styles.creditCardNumber}>
                                                2467
                                            </Text>
                                            <Text
                                                style={styles.creditCardNumber}>
                                                6324
                                            </Text>
                                        </View>
                                        <View style={styles.creditCardRow}>
                                            <View
                                                style={
                                                    styles.creditCardNameContainer
                                                }>
                                                <Text
                                                    style={
                                                        styles.creditCardNameSubTitle
                                                    }>
                                                    Card Holder Name
                                                </Text>
                                                <Text
                                                    style={
                                                        styles.creditCardNameTitle
                                                    }>
                                                    Robert Evans
                                                </Text>
                                            </View>
                                            <View
                                                style={
                                                    styles.creditCardDateContainer
                                                }>
                                                <Text
                                                    style={
                                                        styles.creditCardNameSubTitle
                                                    }>
                                                    Expiration Date
                                                </Text>
                                                <Text
                                                    style={
                                                        styles.creditCardNameTitle
                                                    }>
                                                    02/30
                                                </Text>
                                            </View>
                                        </View>
                                    </LinearGradient>
                                </View>
                            </View>
                        </TouchableOpacity>
                        {paymentList.map((data: any) => (
                            <TouchableOpacity
                                key={data.name}
                                onPress={() => setPaymentMode(data.name)}>
                                <PaymentMethod
                                    paymentMode={paymentMode}
                                    name={data.name}
                                    icon={data.icon}
                                    isIcon={data.isIcon}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
                <PaymentFooter
                    buttonTitle={`Pay with ${paymentMode}`}
                    price={{price: route.params.amount, currency: '$'}}
                    buttonPressHandler={buttonPressHandler}
                />
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
    headerContainer: {
        paddingHorizontal: SPACING.space_24,
        paddingVertical: SPACING.space_15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_20,
        color: COLORS.primaryWhiteHex,
    },
    emptyView: {
        height: SPACING.space_36,
        width: SPACING.space_36,
        backgroundColor: 'red',
    },
    paymentOptionsContainer: {
        padding: SPACING.space_15,
        gap: SPACING.space_15,
    },
    creditCardContainer: {
        padding: SPACING.space_10,
        gap: SPACING.space_10,
        borderRadius: BORDERRADIUS.radius_15,
        borderWidth: 3,
    },
    creditCardTitle: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryWhiteHex,
        marginLeft: SPACING.space_10,
    },
    creditCardBG: {
        backgroundColor: COLORS.primaryGreyHex,
        borderRadius: BORDERRADIUS.radius_25,
    },
    linearGradientStyle: {
        borderRadius: BORDERRADIUS.radius_25,
        gap: SPACING.space_36,
        paddingHorizontal: SPACING.space_15,
        paddingVertical: SPACING.space_10,
    },
    creditCardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    creditCardNumberContainer: {
        flexDirection: 'row',
        gap: SPACING.space_10,
        alignItems: 'center',
    },
    creditCardNumber: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex,
        letterSpacing: SPACING.space_4 + SPACING.space_2,
    },
    creditCardNameTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex,
    },
    creditCardNameSubTitle: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_12,
        color: COLORS.secondaryLightGreyHex,
    },
    creditCardNameContainer: {
        alignItems: 'flex-start',
    },
    creditCardDateContainer: {
        alignItems: 'flex-end',
    },
    lottieStyle: {
        flex: 1,
    },
});

export default PaymentScreen;
