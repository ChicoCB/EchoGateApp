import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import { StyleSheet } from "react-native";

import { COLORS, SIZES, FONT, icons } from './../../constants';

import FeatherIconButton from './common/FeatherIconButton';
import useGetFromDatabase from '../../data/useGetFromDatabase';
import { Feather } from '@expo/vector-icons';

interface notificacao {
    userId: string;
    timestamp: string;
    description: string;
    user: { name: string };
}

const NotificacaoItem = ({ userId, timestamp, description, user }: notificacao) => {
    const formattedDate = new Date(timestamp).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <View style={styles.container}>
            <Feather name="bell" size={24} color="gray" />
            <View style={styles.textContainer}>
                <Text>{formattedDate}</Text>
                <Text>{description}</Text>
            </View>
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
        marginLeft: 20
    },
});

export default NotificacaoItem;