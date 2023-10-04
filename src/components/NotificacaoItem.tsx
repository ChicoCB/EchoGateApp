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
});

export default AcessoPermanenteItem;