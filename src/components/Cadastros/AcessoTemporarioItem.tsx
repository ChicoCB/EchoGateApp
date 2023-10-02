import React from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import { StyleSheet } from "react-native";

import { COLORS, SIZES, FONT, icons } from '../../../constants';

import { cadastroTemporario } from '../../../data/acessosTemporarios';
import GenericButton from '../common/GenericButton';

const AcessoTemporarioItem = ({ name, data_ini, data_fim, image }: cadastroTemporario) => {
    return (
        <View style={styles.container}>
            <Image source={image}
                resizeMode="cover"
                style={styles.Img} />
            <View style={styles.textContainer}>
                <Text style={styles.text}>Nome: {name}</Text>
                <Text style={styles.text}>Cadastrado em: {data_ini} </Text>
                <Text style={styles.text}>Válido até: {data_fim} </Text>
            </View>
            <GenericButton name={"trash-2"} size={25} color={"red"} handlePress={() => null} />
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
        justifyContent: "center",
    },
    text: {
        fontFamily: FONT.regular,
        fontSize: SIZES.medium,
        color: COLORS.secondary,
        marginLeft: "10%"
    },
    Img: {
        width: "15%",
        height: "70%",
        borderRadius: SIZES.small / 1.25,
        marginBottom: 4,
        marginLeft: 3
    },
});

export default AcessoTemporarioItem;