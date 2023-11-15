import {
    BORDERRADIUS,
    COLORS,
    FONTFAMILY,
    FONTSIZE,
    SPACING,
} from '@/theme/theme';
import React from 'react';
import {
    ImageBackground,
    ImageProps,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import CustomIcon from './CustomIcon';
import GradientBGIcon from './GradientBGIcon';

interface ImageBackGroundInfoProps {
    enableBackButtonHandler: boolean;
    backButtonHandler?: any;
    toggleFavorite: any;
    imagelink_portrait: ImageProps;
    type: string;
    id: string;
    favorite: boolean;
    name: string;
    special_ingredient: string;
    ingredients: string;
    average_rating: number;
    ratings_count: string;
    roasted: string;
}

const ImageBackGroundInfo = ({
    enableBackButtonHandler,
    backButtonHandler,
    toggleFavorite,
    imagelink_portrait,
    type,
    id,
    favorite,
    name,
    special_ingredient,
    ingredients,
    average_rating,
    ratings_count,
    roasted,
}: ImageBackGroundInfoProps) => {
    // console.log(JSON.stringify(imagelink_portrait, null, 2));
    return (
        <View style={styles.container}>
            <ImageBackground
                source={imagelink_portrait}
                style={styles.itemBackGroundImage}>
                {enableBackButtonHandler ? (
                    <View style={styles.imageHeaderBarContainerWithBack}>
                        <TouchableOpacity onPress={backButtonHandler}>
                            <GradientBGIcon
                                name="left"
                                color={COLORS.primaryLightGreyHex}
                                size={FONTSIZE.size_16}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => toggleFavorite(favorite, type, id)}>
                            <GradientBGIcon
                                name="like"
                                color={
                                    favorite
                                        ? COLORS.primaryRedHex
                                        : COLORS.primaryLightGreyHex
                                }
                                size={FONTSIZE.size_16}
                            />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.imageHeaderBarContainerWithOutBack}>
                        <TouchableOpacity
                            onPress={() => toggleFavorite(favorite, type, id)}>
                            <GradientBGIcon
                                name="like"
                                color={
                                    favorite
                                        ? COLORS.primaryRedHex
                                        : COLORS.primaryLightGreyHex
                                }
                                size={FONTSIZE.size_16}
                            />
                        </TouchableOpacity>
                    </View>
                )}

                <View style={styles.imageInfoOuterContainer}>
                    <View style={styles.imageInfoInnerContainer}>
                        <View style={styles.infoContainerRow}>
                            <View>
                                <Text style={styles.itemTitleText}>{name}</Text>
                                <Text style={styles.itemSubTitleText}>
                                    {special_ingredient}
                                </Text>
                            </View>
                            <View style={styles.itemPropertiesContainer}>
                                <View style={styles.propertyFirst}>
                                    <CustomIcon
                                        name={
                                            type === 'Bean' ? 'bean' : 'beans'
                                        }
                                        size={
                                            type === 'Bean'
                                                ? FONTSIZE.size_18
                                                : FONTSIZE.size_24
                                        }
                                        color={COLORS.primaryOrangeHex}
                                    />
                                    <Text
                                        style={[
                                            styles.propertyTextFirst,
                                            {
                                                marginTop:
                                                    type === 'Bean'
                                                        ? SPACING.space_4 +
                                                          SPACING.space_2
                                                        : 0,
                                            },
                                        ]}>
                                        {type}
                                    </Text>
                                </View>
                                <View style={styles.propertyFirst}>
                                    <CustomIcon
                                        name={
                                            type === 'Bean'
                                                ? 'location'
                                                : 'drop'
                                        }
                                        size={FONTSIZE.size_16}
                                        color={COLORS.primaryOrangeHex}
                                    />
                                    <Text style={styles.propertyTextLast}>
                                        {ingredients}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.infoContainerRow}>
                            <View style={styles.ratingContainer}>
                                <CustomIcon
                                    name="star"
                                    color={COLORS.primaryOrangeHex}
                                    size={FONTSIZE.size_20}
                                />
                                <Text style={styles.ratingText}>
                                    {average_rating}
                                </Text>
                                <Text
                                    style={
                                        styles.ratingCountText
                                    }>{`{${ratings_count}}`}</Text>
                            </View>
                            <View style={styles.roastedContainer}>
                                <Text style={styles.roastedText}>
                                    {roasted}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    itemBackGroundImage: {
        width: '100%',
        aspectRatio: 20 / 25,
        justifyContent: 'space-between',
    },
    imageHeaderBarContainerWithBack: {
        padding: SPACING.space_30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    imageHeaderBarContainerWithOutBack: {
        padding: SPACING.space_30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    imageInfoOuterContainer: {
        paddingVertical: SPACING.space_24,
        paddingHorizontal: SPACING.space_30,
        backgroundColor: COLORS.primaryBlackRGBA,
        borderTopLeftRadius: BORDERRADIUS.radius_20 * 2,
        borderTopRightRadius: BORDERRADIUS.radius_20 * 2,
    },
    imageInfoInnerContainer: {
        justifyContent: 'space-between',
        gap: SPACING.space_15,
    },
    infoContainerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemTitleText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_24,
        color: COLORS.primaryWhiteHex,
    },
    itemSubTitleText: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_12,
        color: COLORS.primaryWhiteHex,
    },
    itemPropertiesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.space_20,
    },
    propertyFirst: {
        height: 55,
        width: 55,
        borderRadius: BORDERRADIUS.radius_15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primaryBlackHex,
    },
    propertyTextFirst: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_10,
        color: COLORS.primaryWhiteHex,
    },
    propertyTextLast: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_10,
        color: COLORS.primaryWhiteHex,
        marginTop: SPACING.space_2 + SPACING.space_4,
    },
    ratingContainer: {
        flexDirection: 'row',
        gap: SPACING.space_10,
        alignItems: 'center',
    },
    ratingText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex,
    },
    ratingCountText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_12,
        color: COLORS.primaryWhiteHex,
    },
    roastedContainer: {
        height: 55,
        width: 55 * 2 + SPACING.space_20,
        borderRadius: BORDERRADIUS.radius_15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primaryBlackHex,
    },
    roastedText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_10,
        color: COLORS.primaryWhiteHex,
    },
});

export default ImageBackGroundInfo;