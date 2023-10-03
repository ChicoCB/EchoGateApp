import React from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import { StyleSheet } from "react-native";

import { COLORS, SIZES, FONT, icons } from '../../../constants';

import { cadastroPermanente } from '../../../data/acessosPermanentes';
import FeatherIconButton from '../common/FeatherIconButton';

const AcessoPermanenteItem = ({ name, data_ini, image }: cadastroPermanente) => {
    return (
        <View style={styles.container}>
            <Image source={image}
                resizeMode="cover"
                style={styles.btnImg} />
            <View style={styles.textContainer}>
                <Text style={styles.text}>Nome: {name}</Text>
                <Text style={styles.text}>Cadastrado em: {data_ini} </Text>
            </View>
            <FeatherIconButton featherIconName={"trash-2"} featherIconColor={"red"} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        padding: 3,
        height: 100
    },
    textContainer: {
        flex: 0.85,
        marginBottom: 4,
        height: "100%",
        justifyContent: "center"
    },
    text: {
        fontFamily: FONT.regular,
        fontSize: SIZES.medium,
        color: COLORS.secondary,
        marginLeft: "10%"
    },
    btnImg: {
        width: "15%",
        height: "70%",
        borderRadius: SIZES.small / 1.25,
        marginBottom: 4,
        marginLeft: 3
    },
});

export default AcessoPermanenteItem;