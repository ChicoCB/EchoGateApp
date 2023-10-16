import React from 'react';
import { TouchableOpacity, StyleSheet, ColorValue, DimensionValue, ViewStyle, Text, View } from 'react-native';

import { SIZES, COLORS, FONT } from '../../../constants';

import Icon from 'react-native-vector-icons/Feather';

import { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

interface props {
    featherIconName: string;
    featherIconSize?: number;
    featherIconColor?: string;
    caption?: string;
    captionStyle?: TextStyle;
    handlePress?: () => void;
}

const FeatherIconButton = ({ featherIconName, featherIconSize = 24, featherIconColor = "black", caption = "", captionStyle = captionDefault(), handlePress = () => null }: props) => {
    return (
        <View style={styles.container}>
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
            {caption !== "" && <Text style={captionStyle}>{caption}</Text>}
        </View>
    )
}

//Precisa estar fora da styleSheet, nao consegui fazer funcionar dentro (deve ter jeito mas n manjo de typescript)
//(em javascript normal funfa dentro da stylesheet)
const button = (size: DimensionValue): ViewStyle => ({
    width: size,
    height: size,
    borderRadius: SIZES.small / 1.25,
})

const captionDefault = (): TextStyle => (
    {
        fontFamily: FONT.regular,
        fontSize: SIZES.medium,
        color: COLORS.primary,
        marginTop: 5,
        textAlign: "center"
    }
)

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    btnImg: {
        width: "100%",
        height: "100%",
    },
});

export default FeatherIconButton;