import React, { useState } from 'react';
import { Image, View, Text } from 'react-native';
import { StyleSheet } from "react-native";
import { COLORS, SIZES, FONT, images } from '../../../constants';

import FeatherIconButton from '../common/FeatherIconButton';
import axios, { AxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SERVER_IP } from '../../../constants';
import LoadingComponent from '../common/LoadingComponent';

interface cadastroTemporario {
    id: string;
    name: string;
    validFrom: string;
    validUntil: string;
    picture: string;
    atualizarLista: () => void;
}

const CadastroTemporarioItem = ({ id, name, validFrom, validUntil, picture, atualizarLista }: cadastroTemporario) => {
    const [isBeingDeleted, setIsBeingDeleted] = useState(false);
    let image;
    if (picture == null) {
        image = images.noImageIcon;
    } else {
        image = { uri: `data:image/jpeg;base64,${picture}` };
    }

    const formatedFromDate = new Date(validFrom).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    const formatedUntilDate = new Date(validUntil).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    const deleteItem = async () => {
        try {
            setIsBeingDeleted(true);
            const token = await AsyncStorage.getItem('token');
            const options: AxiosRequestConfig<any> = {
                method: "delete",
                url: `http://${SERVER_IP}/users/${id}`,
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            };
            await axios.request(options);
        } catch (error) {
            alert(error)
        } finally {
            setIsBeingDeleted(false);
            atualizarLista();
        }
    }

    return (
        <View style={{ height: 100 }}>
            {isBeingDeleted ? (
                <LoadingComponent text='Deletando...' />
            ) : (
                <View style={styles.container}>
                    <Image source={image}
                        resizeMode="contain"
                        style={styles.Img} />
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Nome: {name}</Text>
                        <Text style={styles.text}>Válido de: {formatedFromDate} </Text>
                        <Text style={styles.text}>Válido até: {formatedUntilDate} </Text>
                    </View>
                    <FeatherIconButton
                        featherIconName={"trash-2"}
                        featherIconColor={"red"}
                        handlePress={() => deleteItem()}
                    />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        padding: 3,
        height: "100%",
    },
    textContainer: {
        flex: 0.85,
        marginBottom: 4,
        height: "100%",
        justifyContent: "center",
    },
    text: {
        fontFamily: FONT.regular,
        fontSize: SIZES.xMedium,
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

export default CadastroTemporarioItem;