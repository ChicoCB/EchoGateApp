import React from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import { StyleSheet } from "react-native";

import { COLORS, SIZES, FONT, icons } from './../../constants';

import { notificacao } from '../../data/notificacoes';

import FeatherIconButton from './common/FeatherIconButton';

const AcessoPermanenteItem = ({ data, conteudo }: notificacao) => {
    return (
        <View style={styles.container}>
            <Image
                source={icons.bell}
            />
            <View style={styles.textContainer}>
                <Text>{data}: {conteudo}</Text>
            </View>
            <FeatherIconButton featherIconName={"trash-2"} featherIconColor={"red"} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        padding: 3,
        height: 70
    },
    textContainer: {
        flex: 0.85,
        height: "100%",
        justifyContent: "center",
        marginLeft: 5
    },
    text: {
        fontFamily: FONT.regular,
        fontSize: SIZES.medium,
        color: COLORS.secondary,
        marginLeft: "10%"
    },
    btnImg: {
        width: "15%",
        height: "100%",
        borderRadius: SIZES.small / 1.25,
        marginBottom: 4,
        marginLeft: 3
    },
});

export default AcessoPermanenteItem;