import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { StyleSheet } from "react-native";

import { ViewStyle, TextStyle, ImageStyle } from 'react-native';

import { SIZES } from '../../../constants';

import Icon from 'react-native-vector-icons/Feather';

interface props {
    name: string;
    size: number;
    color: string;
    handlePress: () => void;
}

const GenericButton = ({ name, size, color, handlePress }: props) => {
    return (
        <TouchableOpacity style={btnContainer(size)} onPress={handlePress}>
            <Icon style={styles.btnImg} name={name} size={size} color={color} />
        </TouchableOpacity>
    )
}

//Precisa estar fora da styleSheet, nao consegui fazer funcionar dentro (deve ter jeito mas n manjo de typescript)
const btnContainer = (size: number): ViewStyle => ({
    width: size,
    height: size,
    borderRadius: SIZES.small / 1.25,
    justifyContent: "center",
    alignItems: "center",
})

const styles = StyleSheet.create({
    btnContainer: {
        width: 35,
        height: 35,
        borderRadius: SIZES.small / 1.25,
        justifyContent: "center",
        alignItems: "center",
    },
    btnImg: {
        width: "100%",
        height: "100%",
    },
});

export default GenericButton;