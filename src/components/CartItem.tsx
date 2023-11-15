import {
    BORDERRADIUS,
    COLORS,
    FONTFAMILY,
    FONTSIZE,
    SPACING,
} from '@/theme/theme';
import React from 'react';
import {
    Image,
    ImageProps,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from './CustomIcon';

interface CartItemProps {
    id: string;
    name: string;
    imagelink_square: ImageProps;
    special_ingredient: string;
    roasted: string;
    prices: any;
    type: string; // Coffee, Bean
    incrementCartItemQuantityHandler: any;
    decrementCartItemQuantityHandler: any;
}

const CartItem = ({
    id,
    name,
    imagelink_square,
    special_ingredient,
    roasted,
    prices,
    type,
    incrementCartItemQuantityHandler,
    decrementCartItemQuantityHandler,
}: CartItemProps) => {
    return (
        <View style={styles.container}>
            {prices.length !== 1 ? (
                <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                    style={styles.cartItemLinearGradient}>
                    <View style={styles.cartItemRow}>
                        <Image
                            source={imagelink_square}
                            style={styles.cartItemImage}
                        />
                        <View style={styles.cartItemInfo}>
                            <View>
                                <Text style={styles.cartItemTitle}>{name}</Text>
                                <Text style={styles.cartItemSubTitle}>
                                    {special_ingredient}
                                </Text>
                            </View>
                            <View style={styles.cartItemRoastedContainer}>
                                <Text style={styles.cartItemRoastedText}>
                                    {roasted}
                                </Text>
                            </View>
                        </View>
                    </View>
                    {prices.map((data: any, index: any) => (
                        <View
                            key={index}
                            style={styles.cartItemSizeRowContainer}>
                            <View style={styles.cartItemSizeValueContainer}>
                                <View style={styles.sizeBox}>
                                    <Text
                                        style={[
                                            styles.sizeText,
                                            {
                                                fontSize:
                                                    type === 'Bean'
                                                        ? FONTSIZE.size_12
                                                        : FONTSIZE.size_16,
                                            },
                                        ]}>
                                        {data.size}
                                    </Text>
                                </View>
                                <Text style={styles.sizeCurrency}>
                                    {data.currency}{' '}
                                    <Text style={styles.sizePrice}>
                                        {data.price}
                                    </Text>
                                </Text>
                            </View>
                            <View style={styles.cartItemSizeValueContainer}>
                                <TouchableOpacity
                                    onPress={() =>
                                        decrementCartItemQuantityHandler(
                                            id,
                                            data.size,
                                        )
                                    }
                                    style={styles.cartItemIcon}>
                                    <CustomIcon
                                        name="minus"
                                        color={COLORS.primaryWhiteHex}
                                        size={FONTSIZE.size_10}
                                    />
                                </TouchableOpacity>
                                <View style={styles.cartItemQuantityContainer}>
                                    <Text style={styles.cartItemQuantityText}>
                                        {data.quantity}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() =>
                                        incrementCartItemQuantityHandler(
                                            id,
                                            data.size,
                                        )
                                    }
                                    style={styles.cartItemIcon}>
                                    <CustomIcon
                                        name="add"
                                        color={COLORS.primaryWhiteHex}
                                        size={FONTSIZE.size_10}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </LinearGradient>
            ) : (
                <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                    style={styles.cartItemSingleLinearGradient}>
                    <View>
                        <Image
                            source={imagelink_square}
                            style={styles.cartItemSingleImage}
                        />
                    </View>
                    <View style={styles.cartItemSingleInfoContainer}>
                        <View>
                            <Text style={styles.cartItemTitle}>{name}</Text>
                            <Text style={styles.cartItemSubTitle}>
                                {special_ingredient}
                            </Text>
                        </View>
                        <View style={styles.cartItemSingleSizeValueContainer}>
                            <View style={styles.sizeBox}>
                                <Text
                                    style={[
                                        styles.sizeText,
                                        {
                                            fontSize:
                                                type === 'Bean'
                                                    ? FONTSIZE.size_12
                                                    : FONTSIZE.size_16,
                                        },
                                    ]}>
                                    {prices[0].size}
                                </Text>
                            </View>
                            <Text style={styles.sizeCurrency}>
                                {prices[0].currency}{' '}
                                <Text style={styles.sizePrice}>
                                    {prices[0].price}
                                </Text>
                            </Text>
                        </View>
                        <View style={styles.cartItemSigleQuantityContainer}>
                            <TouchableOpacity
                                onPress={() =>
                                    decrementCartItemQuantityHandler(
                                        id,
                                        prices[0].size,
                                    )
                                }
                                style={styles.cartItemIcon}>
                                <CustomIcon
                                    name="minus"
                                    color={COLORS.primaryWhiteHex}
                                    size={FONTSIZE.size_10}
                                />
                            </TouchableOpacity>
                            <View style={styles.cartItemQuantityContainer}>
                                <Text style={styles.cartItemQuantityText}>
                                    {prices[0].quantity}
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() =>
                                    incrementCartItemQuantityHandler(
                                        id,
                                        prices[0].size,
                                    )
                                }
                                style={styles.cartItemIcon}>
                                <CustomIcon
                                    name="add"
                                    color={COLORS.primaryWhiteHex}
                                    size={FONTSIZE.size_10}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    cartItemLinearGradient: {
        flex: 1,
        gap: SPACING.space_12,
        padding: SPACING.space_12,
        borderRadius: BORDERRADIUS.radius_25,
    },

    cartItemRow: {
        flexDirection: 'row',
        flex: 1,
        gap: SPACING.space_12,
    },
    cartItemImage: {
        height: 130,
        width: 130,
        borderRadius: BORDERRADIUS.radius_20,
    },

    cartItemInfo: {
        flex: 1,
        paddingVertical: SPACING.space_4,
        justifyContent: 'space-between',
    },
    cartItemTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex,
    },
    cartItemSubTitle: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_12,
        color: COLORS.secondaryLightGreyHex,
    },
    cartItemRoastedContainer: {
        height: 50,
        width: 50 * 2 + SPACING.space_20,
        borderRadius: BORDERRADIUS.radius_15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primaryDarkGreyHex,
    },
    cartItemRoastedText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_10,
        color: COLORS.primaryWhiteHex,
    },
    cartItemSizeRowContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.space_20,
    },
    cartItemSizeValueContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    sizeBox: {
        backgroundColor: COLORS.primaryBlackHex,
        height: 40,
        width: 100,
        borderRadius: BORDERRADIUS.radius_10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sizeText: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.secondaryLightGreyHex,
    },
    sizeCurrency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryOrangeHex,
    },
    sizePrice: {
        color: COLORS.primaryWhiteHex,
    },
    cartItemIcon: {
        backgroundColor: COLORS.primaryOrangeHex,
        padding: SPACING.space_12,
        borderRadius: BORDERRADIUS.radius_10,
    },
    cartItemQuantityContainer: {
        backgroundColor: COLORS.primaryBlackHex,
        width: 80,
        borderWidth: 2,
        borderColor: COLORS.primaryOrangeHex,
        borderRadius: BORDERRADIUS.radius_10,
        alignItems: 'center',
        paddingVertical: SPACING.space_4,
    },
    cartItemQuantityText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex,
    },
    cartItemSingleLinearGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.space_12,
        gap: SPACING.space_12,
        borderRadius: BORDERRADIUS.radius_25,
    },
    cartItemSingleImage: {
        height: 150,
        width: 150,
        borderRadius: BORDERRADIUS.radius_20,
    },
    cartItemSingleInfoContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'space-around',
    },
    cartItemSingleSizeValueContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    cartItemSigleQuantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    }
});

export default CartItem;
