import { COLORS, FONTFAMILY, FONTSIZE } from '@/theme/theme';
import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface EmptyListAnimationProps {
    title: string;
}

const EmptyListAnimation = ({title}:EmptyListAnimationProps) => {
   
    return (
        <View style={styles.container}>
            <LottieView
                source={require('../lottie/coffeecup.json')}
                style={styles.lottieStyle}
                autoPlay
                loop
            />
            <Text style={styles.lottieText}>{ title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    lottieStyle: {
        height: 300
    },
    lottieText: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryOrangeHex,
        textAlign: 'center'
        
    }
});

export default EmptyListAnimation;
