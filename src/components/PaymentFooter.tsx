import {
    BORDERRADIUS,
    COLORS,
    FONTFAMILY,
    FONTSIZE,
    SPACING,
} from '@/theme/theme';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface PriceProps {
    price: string;
    currency: string;
}
interface PaymentFooterProps {
    price: PriceProps;
    buttonTitle: string;
    buttonPressHandler: any;
}

const PaymentFooter = ({
    price,
    buttonTitle,
    buttonPressHandler,
}: PaymentFooterProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.priceContainer}>
                <Text style={styles.priceTitle}>Price</Text>
                <Text style={styles.priceText}>
                    {price.currency}{' '}
                    <Text style={styles.price}>{price.price}</Text>
                </Text>
            </View>
            <TouchableOpacity
                onPress={() => buttonPressHandler()}
                style={styles.payButton}>
                <Text style={styles.buttonText}>{buttonTitle}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.space_20,
        padding: SPACING.space_20,
    },
    priceContainer: {
        alignItems: 'center',
        width: 100,
    },
    priceTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_14,
        color: COLORS.secondaryLightGreyHex,
    },
    priceText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_24,
        color: COLORS.primaryOrangeHex,
    },
    price: {
        color: COLORS.primaryWhiteHex,
    },
    payButton: {
        flex: 1,
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

export default PaymentFooter;
