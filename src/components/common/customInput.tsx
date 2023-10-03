import React from 'react';
import { Image, TextInput, View } from 'react-native';
import { StyleSheet } from "react-native";

import { DimensionValue, ViewStyle } from 'react-native';

import { SIZES, COLORS, icons } from '../../../constants';

import Icon from 'react-native-vector-icons/Feather';

interface props {
    sizeX?: DimensionValue;
    value: string;
    setValue: (text: string) => void;
    placeholder: string;
    secureTextEntry?: boolean;
}

const CustomInput = ({ sizeX = "100%", value, setValue, placeholder, secureTextEntry = false }: props) => {
    return (
        <View style={container(sizeX)}>
            <TextInput
                value={value}
                onChangeText={setValue}
                style={styles.input}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
            />
        </View>
    )
}

const container = (sizeX: DimensionValue): ViewStyle => ({
    backgroundColor: COLORS.lightWhite,
    width: sizeX,
    height: 50,
    borderColor: COLORS.gray,
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 5
})

const styles = StyleSheet.create({
    input: {
        height: "100%",
    }
});

export default CustomInput;