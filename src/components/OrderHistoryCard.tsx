import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '@/theme/theme';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import OrderItemCard from './OrderItemCard';

interface OrderHistoryCardProps {
    navigationHandler: any;
    cartList: any;
    cartListPrice: string;
    orderDate: string;
}
const OrderHistoryCard = ({
    navigationHandler,
    cartList,
    cartListPrice,
    orderDate,
}: OrderHistoryCardProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.cardHeader}>
                <View>
                    <Text style={styles.headerTitle}>Order Time</Text>
                    <Text style={styles.headerSubTitle}>{orderDate}</Text>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.headerTitle}>Total Amount</Text>
                    <Text style={styles.headerPrice}>$ {cartListPrice}</Text>
                </View>
            </View>
            <View style={styles.listContainer}>
                {cartList.map((data: any, index: any) => (
                    <TouchableOpacity
                        key={index.toString + data.id}
                        onPress={() => {
                            navigationHandler({
                                index: data.index,
                                id: data.id,
                                type: data.type,
                            });
                        }}>
                        <OrderItemCard
                            type={data.type}
                            name={data.name}
                            imagelink_square={data.imagelink_square}
                            special_ingredient={data.special_ingredient}
                            prices={data.prices}
                            itemPrice={data.ItemPrice}
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: SPACING.space_10,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: SPACING.space_20,
    },
    headerTitle: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex,
    },
    headerSubTitle: {
        fontFamily: FONTFAMILY.poppins_light,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex,
    },
    priceContainer: {
        alignItems: 'flex-end',
    },
    headerPrice: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryOrangeHex,
    },
    listContainer: {
        gap: SPACING.space_20,
    },
});

export default OrderHistoryCard;
