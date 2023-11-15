import {
    BORDERRADIUS,
    COLORS,
    FONTFAMILY,
    FONTSIZE,
    SPACING,
} from '@/theme/theme';
import React from 'react';
import {
    Dimensions,
    ImageBackground,
    ImageProps,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BGIcon from './BGIcon';
import CustomIcon from './CustomIcon';

const CARD_WIDTH = Dimensions.get('window').width * 0.32;

interface CoffeeCardProps {
    id: string;
    index: number;
    type: string; // Coffee, Bean
    roasted: string;
    imagelink_square: ImageProps;
    name: string;
    special_ingredient: string;
    average_rating: number;
    price: any;
    buttonPressHandler: any;
}

const CoffeeCard = ({
    id,
    index,
    type,
    roasted,
    imagelink_square,
    name,
    special_ingredient,
    average_rating,
    price,
    buttonPressHandler,
}: CoffeeCardProps) => {
    // console.log(imagelink_square);

    return (
        <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0, y: 0}}
            style={styles.cardLinearGradientContainer}
            colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
            <ImageBackground
                source={imagelink_square}
                style={styles.cardImage}
                resizeMode="cover">
                <View style={styles.cardRatingContainer}>
                    <CustomIcon
                        name="star"
                        color={COLORS.primaryOrangeHex}
                        size={FONTSIZE.size_16}
                    />
                    <Text style={styles.cardRatingText}>{average_rating}</Text>
                </View>
            </ImageBackground>
            <Text style={styles.cardTitle}>{name}</Text>
            <Text style={styles.cardSubTitle}>{special_ingredient}</Text>
            <View style={styles.cardFooterRow}>
                <Text style={styles.cardPriceCurrency}>
                    $ <Text style={styles.cardPrice}>{price.price}</Text>
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        buttonPressHandler({
                            id,
                            index,
                            name,
                            roasted,
                            imagelink_square,
                            special_ingredient,
                            type,
                            prices: [{...price, quantity: 1}],
                        });
                    }}>
                    <BGIcon
                        name="add"
                        color={COLORS.primaryWhiteHex}
                        size={FONTSIZE.size_10}
                        BGColor={COLORS.primaryOrangeHex}
                    />
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    cardLinearGradientContainer: {
        padding: SPACING.space_15,
        borderRadius: BORDERRADIUS.radius_25,
    },
    cardImage: {
        width: CARD_WIDTH,
        height: CARD_WIDTH,
        borderRadius: BORDERRADIUS.radius_20,
        marginBottom: SPACING.space_15,
        overflow: 'hidden',
    },
    cardRatingContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.primaryBlackRGBA,
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.space_10,
        paddingHorizontal: SPACING.space_15,
        position: 'absolute',
        top: 0,
        right: 0,
        borderBottomLeftRadius: BORDERRADIUS.radius_20,
        borderTopRightRadius: BORDERRADIUS.radius_20,
    },
    cardRatingText: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryWhiteHex,
        lineHeight: 22,
        fontSize: FONTSIZE.size_14,
    },

    cardTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_16,
    },
    cardSubTitle: {
        fontFamily: FONTFAMILY.poppins_light,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_10,
    },
    cardFooterRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: SPACING.space_15,
    },
    cardPriceCurrency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryOrangeHex,
        fontSize: FONTSIZE.size_18,
    },
    cardPrice: {
        color: COLORS.primaryWhiteHex,
    },
});

export default CoffeeCard;
