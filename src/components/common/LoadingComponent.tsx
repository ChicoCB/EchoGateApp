import React from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from '../../../constants';

interface props {
    text: string;
}

const LoadingComponent = ({ text }: props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
            <ActivityIndicator size="large" color={COLORS.blue} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontFamily: FONT.bold,
        fontSize: SIZES.large,
        color: COLORS.primary,
        textAlign: "center"
    }
});

export default LoadingComponent;