import {BORDERRADIUS, SPACING} from '@/theme/theme';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomIcon from './CustomIcon';

interface BGIconProps {
    name: string;
    color: string;
    size: number;
    BGColor: string;
}

const BGIcon = ({name, color, size, BGColor}: BGIconProps) => {
    return (
        <View style={[styles.container, {backgroundColor: BGColor}]}>
            <CustomIcon name={name}  color={color} size={size}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: SPACING.space_30,
        width: SPACING.space_30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: BORDERRADIUS.radius_8,
    },
});

export default BGIcon;
