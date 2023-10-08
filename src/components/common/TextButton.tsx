import React from 'react';
import { TouchableOpacity, StyleSheet, ColorValue, DimensionValue, ViewStyle, Text, TextStyle } from 'react-native';

import { SIZES, COLORS, FONT } from '../../../constants';

interface props {
    sizeX?: DimensionValue;
    sizeY?: DimensionValue;
    handlePress?: () => Promise<void> | any;
    backgroundColor?: string;
    text?: string;
    textColor?: string;
}

const TextButton = ({ sizeX = 35, sizeY = sizeX, handlePress = () => null, backgroundColor = "", text = "", textColor = COLORS.lightWhite }: props) => {
    return (
        <TouchableOpacity
            style={button(sizeX, sizeY, backgroundColor)}
            onPress={handlePress}>
            <Text style={text1(textColor)}>{text}</Text>
        </TouchableOpacity>
    )
}

//Precisa estar fora da styleSheet, nao consegui fazer funcionar dentro (deve ter jeito mas n manjo de typescript)
//(em javascript normal funfa dentro da stylesheet)
const button = (sizeX: DimensionValue, sizeY: DimensionValue, backgroundColor: ColorValue): ViewStyle => ({
    width: sizeX,
    height: sizeY,
    borderRadius: SIZES.small / 1.25,
    backgroundColor: backgroundColor,
    marginVertical: 5,
    padding: 15
});

const text1 = (textColor: string): TextStyle => ({
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: textColor,
    textAlign: "center"
});

const styles = StyleSheet.create({
    btnImg: {
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.blue
    },
});

export default TextButton;