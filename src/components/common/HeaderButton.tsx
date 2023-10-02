import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { StyleSheet } from "react-native";

import { ImageSourcePropType } from 'react-native';

import { COLORS, SIZES } from '../../../constants';

interface props {
    iconUrl: ImageSourcePropType;
    handlePress: () => void;
}

const HeaderButton = ({ iconUrl, handlePress }: props) => {
    return (
        <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
            <Image
                source={iconUrl}
                resizeMode="cover"
                style={styles.btnImg}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btnContainer: {
        width: 40,
        height: 40,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.small / 1.25,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10
    },
    btnImg: {
        width: "100%",
        height: "100%",
        borderRadius: SIZES.small / 1.25,
    },
});

export default HeaderButton;