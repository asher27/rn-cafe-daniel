import CoffeeCard from '@/components/CoffeeCard';
import CustomIcon from '@/components/CustomIcon';
import HeaderBar from '@/components/HeaderBar';
import {useStore} from '@/stores/store';
import {
    BORDERRADIUS,
    COLORS,
    FONTFAMILY,
    FONTSIZE,
    SPACING,
} from '@/theme/theme';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {
    Dimensions,
    FlatList,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const getCategoriesFromData = (data: any) => {
    let temp: any = {};
    for (let i = 0; i < data.length; i++) {
        if (temp[data[i].name] == undefined) {
            temp[data[i].name] = 1;
        } else {
            temp[data[i].name]++;
        }
    }

    let categories = Object.keys(temp);
    categories.unshift('All');
    return categories;
};

const getCoffeeList = (category: string, data: any) => {
    if (category === 'All') {
        return data;
    } else {
        let coffeeList = data.filter((item: any) => item.name === category);
        return coffeeList;
    }
};

const HomeScreen = () => {
    
    const navigation: any = useNavigation();
    
    
    // * 안드로이드의 경우 기존 끝에 다다른 것에서(10개) 다른 리스트를 불러올때 (3개) 안보였다가 왼쪽으로 댕기면 보이는 이슈처리
    const flatListRef = useRef<FlatList>(null);
    const tabBarHeight = useBottomTabBarHeight();

    const coffeeList = useStore((state: any) => state.CoffeeList);
    const beanList = useStore((state: any) => state.BeanList);
    
    const addToCart = useStore((state: any) => state.addToCart);
    const calculateCartPrice = useStore(
        (state: any) => state.calculateCartPrice,
    );
    

    const [categories, setCategories] = useState(
        getCategoriesFromData(coffeeList),
    );
    const [searchText, setSearchText] = useState('');
    const [categoryIndex, setCategoryIndex] = useState({
        index: 0,
        category: categories[0],
    });
    const [sortedCoffee, setSortedCoffee] = useState(
        getCoffeeList(categoryIndex.category, coffeeList),
    );

    // console.log(JSON.stringify(sortedCoffee, null, 2));

    const onSearchCoffee = (search: string) => {
        if (search !== '') {
            // 초기화
            setCategoryIndex({index: 0, category: categories[0]});
            flatListRef.current?.scrollToOffset({animated: true, offset: 0});

            setSortedCoffee([
                ...coffeeList.filter((item: any) =>
                    item.name.toLowerCase().includes(search.toLowerCase()),
                ),
            ]);
        }
    };

    const onResetSearchCoffee = () => {
        // 초기화
        setCategoryIndex({index: 0, category: categories[0]});
        flatListRef.current?.scrollToOffset({animated: true, offset: 0});
        setSortedCoffee([...coffeeList]);
        setSearchText('');
    };
    
    const addToCartHandler = ({
        id,
        index,
        name,
        roasted,
        imagelink_square,
        special_ingredient,
        type,
        prices,
    }: any) => {
        addToCart({
            id,
            index,
            name,
            roasted,
            imagelink_square,
            special_ingredient,
            type,
            prices,
        });

        calculateCartPrice();
        Toast.show({
            type: 'success',
            text1: `${name} is Added to Cart 👋`,
        })
    };

    return (
        <SafeAreaView
            style={{flex: 1, backgroundColor: COLORS.primaryBlackHex}}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />
            <View style={styles.container}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollViewFlex}>
                    {/* App Header */}
                    <HeaderBar />

                    <Text style={styles.screenTitle}>
                        Find the best{'\n'}coffee for you
                    </Text>

                    {/* Search Input */}
                    <View style={styles.inputContainer}>
                        <TouchableOpacity
                            onPress={() => onSearchCoffee(searchText)}>
                            <CustomIcon
                                name="search"
                                size={FONTSIZE.size_18}
                                color={
                                    searchText.length > 0
                                        ? COLORS.primaryOrangeHex
                                        : COLORS.primaryLightGreyHex
                                }
                                style={styles.inputIcon}
                            />
                        </TouchableOpacity>
                        <TextInput
                            placeholder="Find Your Coffee..."
                            placeholderTextColor={COLORS.primaryLightGreyHex}
                            value={searchText}
                            onChangeText={text => {
                                setSearchText(text);
                                onSearchCoffee(text);
                            }}
                            style={styles.textInputContainer}
                        />
                        {searchText.length > 0 ? (
                            <TouchableOpacity onPress={onResetSearchCoffee}>
                                <CustomIcon
                                    style={styles.inputIcon}
                                    name="close"
                                    size={FONTSIZE.size_16}
                                    color={COLORS.primaryLightGreyHex}
                                />
                            </TouchableOpacity>
                        ) : (
                            <></>
                        )}
                    </View>

                    {/* Category Scroller */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoryScrollViewStyle}>
                        {categories.map((category, index) => (
                            <View
                                key={index}
                                style={styles.categoryScrollViewContainer}>
                                <TouchableOpacity
                                    style={styles.categoryScrollViewItem}
                                    onPress={() => {
                                        flatListRef.current?.scrollToOffset({
                                            animated: true,
                                            offset: 0,
                                        });
                                        setCategoryIndex({
                                            index: index,
                                            category: categories[index],
                                        });
                                        setSortedCoffee([
                                            ...getCoffeeList(
                                                categories[index],
                                                coffeeList,
                                            ),
                                        ]);
                                    }}>
                                    <Text
                                        style={[
                                            styles.categoryText,
                                            categoryIndex.index === index
                                                ? {
                                                      color: COLORS.primaryOrangeHex,
                                                  }
                                                : {},
                                        ]}>
                                        {category}
                                    </Text>
                                    {categoryIndex.index === index ? (
                                        <View style={styles.activeCategory} />
                                    ) : (
                                        <></>
                                    )}
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>

                    {/* Coffee Flatlist */}
                    <FlatList
                        ref={flatListRef}
                        data={sortedCoffee}
                        renderItem={({item}) => (
                            <TouchableOpacity onPress={() => {
                                navigation.push('Details', {
                                    index: item.index,
                                    id: item.id,
                                    type: item.type
                                })
                            }}>
                                <CoffeeCard
                                    id={item.id}
                                    index={item.index}
                                    type={item.type}
                                    roasted={item.roasted}
                                    imagelink_square={item.imagelink_square}
                                    name={item.name}
                                    special_ingredient={item.special_ingredient}
                                    average_rating={item.average_rating}
                                    price={item.prices[2]}
                                    buttonPressHandler={addToCartHandler}
                                />
                            </TouchableOpacity>
                        )}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.flatListContainer}
                        ListEmptyComponent={
                            <View style={styles.emptyListContainer}>
                                <Text style={styles.categoryText}>
                                    No Coffee Available
                                </Text>
                            </View>
                        }
                    />

                    <Text style={styles.coffeeBeanTitle}>Coffee Beans</Text>
                    {/* Beans Flatlist */}
                    <FlatList
                        data={beanList}
                        renderItem={({item}) => (
                            <TouchableOpacity onPress={() => 
                                navigation.push('Details', {
                                    index: item.index,
                                    id: item.id,
                                    type: item.type
                                })
                            }>
                                <CoffeeCard
                                    id={item.id}
                                    index={item.index}
                                    type={item.type}
                                    roasted={item.roasted}
                                    imagelink_square={item.imagelink_square}
                                    name={item.name}
                                    special_ingredient={item.special_ingredient}
                                    average_rating={item.average_rating}
                                    price={item.prices[2]}
                                    buttonPressHandler={addToCartHandler}
                                />
                            </TouchableOpacity>
                        )}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={[
                            styles.flatListContainer,
                            {marginBottom: tabBarHeight},
                        ]}
                    />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: COLORS.primaryBlackHex,
    },
    scrollViewFlex: {
        flexGrow: 1,
    },
    screenTitle: {
        fontSize: FONTSIZE.size_28,
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryWhiteHex,
        paddingLeft: SPACING.space_30,
    },
    inputContainer: {
        flexDirection: 'row',
        margin: SPACING.space_30,
        borderRadius: BORDERRADIUS.radius_20,
        backgroundColor: COLORS.primaryDarkGreyHex,
        alignItems: 'center',
    },
    inputIcon: {
        marginHorizontal: SPACING.space_20,
    },
    textInputContainer: {
        flex: 1,
        height: SPACING.space_20 * 3,
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryWhiteHex,
    },
    categoryScrollViewStyle: {
        paddingHorizontal: SPACING.space_20,
        marginBottom: SPACING.space_20,
    },
    categoryScrollViewContainer: {
        paddingHorizontal: SPACING.space_15,
    },
    categoryScrollViewItem: {
        alignItems: 'center',
    },
    categoryText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryLightGreyHex,
        marginBottom: SPACING.space_4,
    },
    activeCategory: {
        height: SPACING.space_10,
        width: SPACING.space_10,
        borderRadius: BORDERRADIUS.radius_10,
        backgroundColor: COLORS.primaryOrangeHex,
    },
    flatListContainer: {
        gap: SPACING.space_20,
        paddingVertical: SPACING.space_20,
        paddingHorizontal: SPACING.space_30,
    },
    coffeeBeanTitle: {
        fontSize: FONTSIZE.size_18,
        marginLeft: SPACING.space_30,
        marginTop: SPACING.space_20,
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryLightGreyHex,
    },
    emptyListContainer: {
        width: Dimensions.get('window').width - SPACING.space_30 * 2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SPACING.space_36 * 3.6,
    },
});

export default HomeScreen;
