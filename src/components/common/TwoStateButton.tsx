import React from 'react';
import { TouchableOpacity, StyleSheet, DimensionValue, ViewStyle, View, Text } from 'react-native';
import { useState } from 'react';

import { SIZES, COLORS, FONT } from '../../../constants';

import Icon from 'react-native-vector-icons/Feather';

interface props {
    featherIconName1: string;
    featherIconName2: string;
    featherIconSize?: number;
    featherIconColor?: string;
    caption1?: string;
    caption2?: string;
    handlePress?: () => void;
}

const TwoStateButton = ({ featherIconName1, featherIconName2, featherIconSize = 24, featherIconColor = "black", caption1 = "", caption2 = "", handlePress = () => null }: props) => {

    const [toggle, setToggle] = useState(false);
    let currentIcon = "";
    let currentCaption = "";

    toggle ? (currentIcon = featherIconName1) : (currentIcon = featherIconName2)
    toggle ? (currentCaption = caption1) : (currentCaption = caption2)

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={button(featherIconSize)}
                onPress={() => { handlePress; setToggle(!toggle) }}>
                <Icon
                    style={styles.btnImg}
                    name={currentIcon}
                    size={featherIconSize}
                    color={featherIconColor}
                />
            </TouchableOpacity>
            {currentCaption !== "" && <Text style={styles.caption}>{currentCaption}</Text>}
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

const styles = StyleSheet.create({
    btnImg: {
        width: "100%",
        height: "100%",
    },
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    caption: {
        fontFamily: FONT.regular,
        fontSize: SIZES.medium,
        color: COLORS.primary,
        marginTop: 5,
        textAlign: "center"
    }
});

export default TwoStateButton;