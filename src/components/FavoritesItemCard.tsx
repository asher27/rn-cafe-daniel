import {
    BORDERRADIUS,
    COLORS,
    FONTFAMILY,
    FONTSIZE,
    SPACING,
} from '@/theme/theme';
import React from 'react';
import {ImageProps, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ImageBackGroundInfo from './ImageBackGroundInfo';

interface FavoritesItemCardProps {
    id: string;
    name: string;
    type: string;
    imagelink_square: ImageProps;
    ingredients: string;
    special_ingredient: string;
    average_rating: number;
    ratings_count: string;
    roasted: string;
    description: string;
    favourite: boolean;
    toggleFavoriteItem: any;
}

const FavoritesItemCard = ({
    id,
    name,
    type,
    imagelink_square,
    ingredients,
    special_ingredient,
    average_rating,
    ratings_count,
    roasted,
    description,
    favourite,
    toggleFavoriteItem,
}: FavoritesItemCardProps) => {
    return (
        <View style={styles.container}>
            <ImageBackGroundInfo
                enableBackButtonHandler={false}
                toggleFavorite={toggleFavoriteItem}
                imagelink_portrait={imagelink_square}
                type={type}
                id={id}
                favorite={favourite}
                name={name}
                special_ingredient={special_ingredient}
                ingredients={ingredients}
                average_rating={average_rating}
                ratings_count={ratings_count}
                roasted={roasted}
            />
            <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                style={styles.containerLinearGradient}>
                <Text style={styles.dscriptionTitle}>Description</Text>
                <Text style={styles.dscriptionText}>{description}</Text>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: BORDERRADIUS.radius_25,
        overflow: 'hidden',
    },
    containerLinearGradient: {
        gap: SPACING.space_10,
        padding: SPACING.space_20,
    },
    dscriptionTitle: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.secondaryLightGreyHex,
    },
    dscriptionText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryWhiteHex,
    },
});

export default FavoritesItemCard;
