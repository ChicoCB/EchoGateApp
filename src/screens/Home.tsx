import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image } from 'react-native';

import { COLORS, FONT, SIZES, images } from '../../constants';
import ListaProfiles from '../../data/profiles';

import FeatherIconButton from '../components/common/FeatherIconButton';
import TwoStateButton from '../components/common/TwoStateButton';
import { useNavigation } from '@react-navigation/native';

import { StackTypes } from '../routes/homestack.routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';



const Home = () => {
    const navigation = useNavigation<StackTypes>();
    const [profileName, setProfileName] = useState<string | null>('Erro');

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
                        <TwoStateButton
                            featherIconName1='unlock'
                            featherIconName2='lock'
                            featherIconColor='blue'
                            featherIconSize={45}
                            caption1='Travar'
                            caption2='Destravar'
                        />
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
    }
});

export default Home;