import ImageBackGroundInfo from '@/components/ImageBackGroundInfo';
import PaymentFooter from '@/components/PaymentFooter';
import {useStore} from '@/stores/store';
import {
    BORDERRADIUS,
    COLORS,
    FONTFAMILY,
    FONTSIZE,
    SPACING,
} from '@/theme/theme';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const DetailsScreen = () => {
    const navigation: any = useNavigation();
    const route: any = useRoute();

    const item = useStore((state: any) =>
        route.params.type === 'Coffee' ? state.CoffeeList : state.BeanList,
    )[route.params.index];

    const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
    const deleteFromFavoriteList = useStore(
        (state: any) => state.deleteFromFavoriteList,
    );
    const addToCart = useStore((state: any) => state.addToCart);
    const calculateCartPrice = useStore(
        (state: any) => state.calculateCartPrice,
    );

    const [fullDesc, setFullDesc] = useState(false);
    const [price, setPrice] = useState(item.prices[0]);

    const backButtonHandler = () => {
        navigation.pop();
    };

    const toggleFavorite = (favorite: boolean, type: string, id: String) => {
        favorite
            ? deleteFromFavoriteList(type, id)
            : addToFavoriteList(type, id);
    };

    const addToCartHandler = ({
        id,
        index,
        name,
        roasted,
        imagelink_square,
        special_ingredient,
        type,
        price,
    }: any) => {
        addToCart({
            id,
            index,
            name,
            roasted,
            imagelink_square,
            special_ingredient,
            type,
            prices: [{...price, quantity: 1}],
        });

        calculateCartPrice();
        navigation.navigate('Cart');
    };

    return (
        <SafeAreaView
            style={{flex: 1, backgroundColor: COLORS.primaryBlackHex}}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />

            <View style={styles.container}>
                <ScrollView
                    showsVerticalScrollIndicator={true}
                    contentContainerStyle={styles.scrollViewFlex}>
                    <ImageBackGroundInfo
                        enableBackButtonHandler={true}
                        backButtonHandler={backButtonHandler}
                        toggleFavorite={toggleFavorite}
                        imagelink_portrait={item.imagelink_portrait}
                        type={item.type}
                        id={item.id}
                        favorite={item.favourite}
                        name={item.name}
                        special_ingredient={item.special_ingredient}
                        ingredients={item.ingredients}
                        average_rating={item.average_rating}
                        ratings_count={item.ratings_count}
                        roasted={item.roasted}
                    />

                    <View style={styles.footerInfoArea}>
                        <Text style={styles.infoTitle}>Description</Text>
                        {fullDesc ? (
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    setFullDesc(prev => !prev);
                                }}>
                                <Text style={styles.descriptionText}>
                                    {item.description}
                                </Text>
                            </TouchableWithoutFeedback>
                        ) : (
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    setFullDesc(prev => !prev);
                                }}>
                                <Text
                                    style={styles.descriptionText}
                                    numberOfLines={3}>
                                    {item.description}
                                </Text>
                            </TouchableWithoutFeedback>
                        )}
                        <Text style={styles.infoTitle}>Size</Text>
                        <View style={styles.sizeOuterContainer}>
                            {item.prices.map((data: any) => (
                                <TouchableOpacity
                                    key={data.size}
                                    onPress={() => {
                                        setPrice(data);
                                    }}
                                    style={[
                                        styles.sizeBox,
                                        {
                                            borderColor:
                                                data.size === price.size
                                                    ? COLORS.primaryOrangeHex
                                                    : COLORS.primaryDarkGreyHex,
                                        },
                                    ]}>
                                    <Text
                                        style={[
                                            styles.sizeText,
                                            {
                                                fontSize:
                                                    item.type === 'Bean'
                                                        ? FONTSIZE.size_14
                                                        : FONTSIZE.size_16,
                                                color:
                                                    data.size === price.size
                                                        ? COLORS.primaryOrangeHex
                                                        : COLORS.secondaryLightGreyHex,
                                            },
                                        ]}>
                                        {data.size}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                    <PaymentFooter
                        price={price}
                        buttonTitle="Add to Cart"
                        buttonPressHandler={() => {
                            addToCartHandler({
                                id: item.id,
                                index: item.index,
                                name: item.name,
                                roasted: item.roasted,
                                imagelink_square: item.imagelink_square,
                                special_ingredient: item.special_ingredient,
                                type: item.type,
                                price,
                            });
                        }}
                    />
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
        justifyContent: 'space-between',
    },
    footerInfoArea: {
        padding: SPACING.space_20,
    },
    infoTitle: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex,
        marginBottom: SPACING.space_10,
    },
    descriptionText: {
        letterSpacing: 0.5,
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryWhiteHex,
        marginBottom: SPACING.space_30,
    },
    sizeOuterContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: SPACING.space_20,
    },
    sizeBox: {
        flex: 1,
        backgroundColor: COLORS.primaryDarkGreyHex,
        alignItems: 'center',
        justifyContent: 'center',
        height: SPACING.space_24 * 2,
        borderRadius: BORDERRADIUS.radius_10,
        borderWidth: 2,
    },
    sizeText: {
        fontFamily: FONTFAMILY.poppins_medium,
    },
});

export default DetailsScreen;
