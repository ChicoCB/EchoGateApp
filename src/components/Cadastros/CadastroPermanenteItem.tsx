import React, { useState } from 'react';
import { Image, View, Text } from 'react-native';
import { StyleSheet } from "react-native";
import { COLORS, SIZES, FONT, images } from '../../../constants';

import FeatherIconButton from '../common/FeatherIconButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig } from 'axios';
import { SERVER_IP } from '../../../constants';
import LoadingComponent from '../common/LoadingComponent';

interface cadastroPermanente {
    id: string;
    name: string;
    validFrom: string;
    picture: string;
    atualizarLista: () => void;
}

const CadastroPermanenteItem = ({ id, name, validFrom, picture, atualizarLista }: cadastroPermanente) => {
    const [isBeingDeleted, setIsBeingDeleted] = useState(false);
    let image;
    if (picture == null) {
        image = images.noImageIcon;
    } else {
        image = { uri: `data:image/jpeg;base64,${picture}` };
    }
    const formatedDate = new Date(validFrom).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
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
                        style={styles.btnImg} />
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Nome: {name}</Text>
                        <Text style={styles.text}>Cadastrado em: {formatedDate} </Text>
                    </View>
                    <FeatherIconButton
                        featherIconName={"trash-2"}
                        featherIconColor={"red"}
                        handlePress={() => { deleteItem() }}
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
        //backgroundColor: COLORS.red
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

export default CadastroPermanenteItem;