import EmptyListAnimation from '@/components/EmptyListAnimation';
import FavoritesItemCard from '@/components/FavoritesItemCard';
import HeaderBar from '@/components/HeaderBar';
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

const FavoritesScreen = () => {
    const navigation: any = useNavigation();
    const tabBarHeight = useBottomTabBarHeight();

    const favoritesList = useStore((state: any) => state.FavoritesList);
    const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
    const deleteFromFavoriteList = useStore(
        (state: any) => state.deleteFromFavoriteList,
    );

    const toggleFavorite = (favorite: boolean, type: string, id: String) => {
        favorite
            ? deleteFromFavoriteList(type, id)
            : addToFavoriteList(type, id);
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
                            <HeaderBar title="Favorites" />
                            {favoritesList.length === 0 ? (
                                <EmptyListAnimation
                                    title={'No Favorites ⭐️'}
                                />
                            ) : (
                                <View style={styles.listItemContainer}>
                                    {favoritesList.map((data: any) => (
                                        <TouchableOpacity
                                            key={data.id}
                                            onPress={() => {
                                                navigation.push('Details', {
                                                    index: data.index,
                                                    id: data.id,
                                                    type: data.type,
                                                });
                                            }}>
                                            <FavoritesItemCard
                                                id={data.id}
                                                name={data.name}
                                                type={data.type}
                                                imagelink_square={
                                                    data.imagelink_square
                                                }
                                                ingredients={data.ingredients}
                                                special_ingredient={
                                                    data.special_ingredient
                                                }
                                                average_rating={
                                                    data.average_rating
                                                }
                                                ratings_count={
                                                    data.ratings_count
                                                }
                                                roasted={data.roasted}
                                                description={data.description}
                                                favourite={data.favourite}
                                                toggleFavoriteItem={
                                                    toggleFavorite
                                                }
                                            />
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </View>
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

export default FavoritesScreen;
