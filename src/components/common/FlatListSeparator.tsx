import React from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import { StyleSheet } from "react-native";

import { COLORS, SIZES } from '../../../constants';

const FlatListSeparator = () => {
    return (
        <View style={styles.separator} />
    )
}

const styles = StyleSheet.create({
    separator: {
        width: "100%",
        height: "2%",
        backgroundColor: COLORS.gray
    }
});

export default FlatListSeparator;