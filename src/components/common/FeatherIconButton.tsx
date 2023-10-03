import React from 'react';
import { TouchableOpacity, StyleSheet, ColorValue, DimensionValue, ViewStyle, Text } from 'react-native';

import { SIZES, COLORS, FONT } from '../../../constants';

import Icon from 'react-native-vector-icons/Feather';

interface props {
    featherIconName: string;
    featherIconSize?: number;
    featherIconColor?: string;
    handlePress?: () => void;
}

const FeatherIconButton = ({ featherIconName, featherIconSize = 24, featherIconColor = "black", handlePress = () => null }: props) => {
    return (
        <TouchableOpacity
            style={button(featherIconSize)}
            onPress={handlePress}>
            <Icon
                style={styles.btnImg}
                name={featherIconName}
                size={featherIconSize}
                color={featherIconColor}
            />
        </TouchableOpacity>
    )
}

//Precisa estar fora da styleSheet, nao consegui fazer funcionar dentro (deve ter jeito mas n manjo de typescript)
//(em javascript normal funfa dentro da stylesheet)
const button = (size: DimensionValue): ViewStyle => ({
    width: size,
    height: size,
    borderRadius: SIZES.small / 1.25,
})

const styles = StyleSheet.create({
    btnImg: {
        width: "100%",
        height: "100%",
    },
});

export default FeatherIconButton;