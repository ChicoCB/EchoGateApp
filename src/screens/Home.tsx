import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image } from 'react-native';

import { COLORS, FONT, SIZES, images } from '../../constants';
import ListaProfiles from '../../data/profiles';

import FeatherIconButton from '../components/common/FeatherIconButton';
import TwoStateButton from '../components/common/TwoStateButton';
import { useNavigation } from '@react-navigation/native';

import { StackTypes } from '../routes/homestack.routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

import { AxiosRequestConfig } from 'axios';
import { SERVER_IP } from '../../constants';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { Alert } from 'react-native';

const Home = () => {
    const navigation = useNavigation<StackTypes>();
    const [profileName, setProfileName] = useState<string | null>('Erro');
    const [lockState, setLockState] = useState<string>('');

    useEffect(() => {
        const getStoredUsername = async () => {
            try {
                const username = await AsyncStorage.getItem('username');
                setProfileName(username);
            } catch (error) {
                console.log(error);
            }
        }

        getStoredUsername();
    })

    const getLockState = async () => {
        try {
            console.log("Obtendo estado da fechadura...")
            const token = await AsyncStorage.getItem('token');
            const options: AxiosRequestConfig<any> = {
                method: "post",
                url: `http://${SERVER_IP}/lock-state`,
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            };
            const response = await axios.request(options);
            console.log("Estado da fechadura obtido: " + response.data)
            setLockState(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useFocusEffect(React.useCallback(() => {
        getLockState();
    }, []))

    const unlock = async () => {
        try {
            console.log("Abrindo fechadura...")
            const token = await AsyncStorage.getItem('token');
            const options: AxiosRequestConfig<any> = {
                method: "post",
                url: `http://${SERVER_IP}/unlock`,
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            };
            await axios.request(options);
            setLockState("unlocked");
            console.log("Fechadura aberta.");
        } catch (error) {
            console.log(error);
        }
    }

    const lock = async () => {
        try {
            console.log("Fechando fechadura...")
            const token = await AsyncStorage.getItem('token');
            const options: AxiosRequestConfig<any> = {
                method: "post",
                url: `http://${SERVER_IP}/lock`,
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            };
            await axios.request(options);
            setLockState("locked");
            console.log("Fechadura fechada.");
        } catch (error) {
            console.log(error);
        }
    }

    const handleLockPress = () => {
        if (lockState === "") {
            Alert.alert("Sua fechadura está desconectada. Recarregue esta página.")
            console.log("Fechadura desconectada.")
            return;
        }

        if (lockState === "locked") {
            unlock();
        }
        else {
            lock();
        }

    }

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.lightWhite, height: "100%" }}>
            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={{ justifyContent: "center" }}
            >
                <View style={styles.container}>
                    <Text style={styles.userName}>Olá {profileName},</Text>
                    <Text style={styles.welcomeMessage}>Bem vindo ao EchoGate</Text>
                </View>
                <View style={styles.cameraContainer}>
                    <Text style={styles.cameraMessage}>Acesse sua câmera:</Text>
                    <FeatherIconButton
                        featherIconName='camera'
                        featherIconColor='blue'
                        featherIconSize={45}
                        handlePress={() => navigation.navigate("Camera")}
                    />
                </View>
                <View style={styles.fechaduraContainer}>
                    <Text style={styles.fechaduraMessage}>Controle sua fechadura:</Text>
                    <View style={styles.buttonContainer}>
                        {lockState !== "" ?
                            <TwoStateButton
                                featherIconName1='unlock'
                                featherIconName2='lock'
                                featherIconColor='blue'
                                featherIconSize={45}
                                caption1='Travar'
                                caption2='Destravar'
                                startOnSecondState={lockState === 'unlocked'}
                                handlePress={() => handleLockPress()}
                            /> :
                            <Text style={styles.text2}>Sua fechadura está desconectada. Recarregue esta página.</Text>
                        }
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        backgroundColor: "#fff",
        margin: 15,
        borderRadius: 10,
    },
    container: {
        width: "100%",
        padding: "2%",
        margin: 20,
        marginBottom: "30%"
    },
    userName: {
        fontFamily: FONT.regular,
        fontSize: SIZES.large,
        color: COLORS.secondary,
    },
    welcomeMessage: {
        fontFamily: FONT.bold,
        fontSize: SIZES.xLarge,
        color: COLORS.primary,
        marginTop: 2,
    },
    cameraContainer: {
        width: "100%",
        marginTop: "5%",
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    cameraImgContainer: {
        width: "60%",
        height: 350,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        marginTop: 20,
    },
    cameraMessage: {
        fontFamily: FONT.bold,
        fontSize: SIZES.xLarge,
        color: COLORS.primary,
        marginTop: 2,
    },
    fechaduraContainer: {
        width: "100%",
        marginTop: "10%",
        flex: 1,
        alignItems: "center",
    },
    fechaduraMessage: {
        fontFamily: FONT.bold,
        fontSize: SIZES.xLarge,
        color: COLORS.primary,
        marginTop: 2,
        marginBottom: 20,
    },
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 40
    },
    text: {
        fontFamily: FONT.bold,
        fontSize: SIZES.medium,
        color: COLORS.primary,
        marginTop: 5,
        textAlign: "center"
    },
    text2: {
        fontFamily: FONT.regular,
        fontSize: SIZES.medium,
        color: COLORS.primary,
        marginTop: 5,
        textAlign: "center"
    }
});

export default Home;