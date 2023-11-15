import {COLORS} from '@/theme/theme';
import LottieView from 'lottie-react-native';
import React from 'react';
import {StyleSheet, View} from 'react-native';

interface PopUpAnimationProps {
    style: any;
    source: string;
}
const PopUpAnimation = ({style, source}: PopUpAnimationProps) => {
    return (
        <View style={styles.lottieAnimationContainer}>
            <LottieView source={source} style={style} autoPlay loop={false} />
        </View>
    );
};

const styles = StyleSheet.create({
    lottieAnimationContainer: {
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 99999,
        backgroundColor: COLORS.secondaryBlackRGBA,
        justifyContent: 'center',
    },
});

export default PopUpAnimation;
