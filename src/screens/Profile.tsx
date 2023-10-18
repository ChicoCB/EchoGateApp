import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Alert, Image, ImageSourcePropType } from 'react-native';
import { images, COLORS, FONT, SIZES, icons } from '../../constants';

import FeatherIconButton from '../components/common/FeatherIconButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker'
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../routes/stackprofile.routes';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { SERVER_IP } from '../../constants';
import React from 'react';

const Profile = () => {
    const navigation = useNavigation<StackTypes>();

    const [profileName, setProfileName] = useState<string | null>();
    const [email, setEmail] = useState<string | null>();
    const [validFrom, setValidFrom] = useState<string | null>();
    const [pfp, setPfp] = useState(images.noImageIconBase64);

    const [imagesChanged, setImagesChanged] = useState(false);
    const [changingImage, setChangingImage] = useState(false);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsMultipleSelection: false,
            aspect: [9, 16],
            quality: 1,
            base64: true
        });

        if (!result.canceled) {
            setChangingImage(true);
            const image = result.assets[0].uri;
            const base64Image = result.assets[0].base64;
            setPfp(image);
            const userId = await AsyncStorage.getItem('id');
            const token = await AsyncStorage.getItem('token');
            await axios.put(`http://${SERVER_IP}/users/${userId}`, { picture: base64Image }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            await AsyncStorage.setItem('pfp', pfp);
            console.log("Foto alterada.")
            setImagesChanged(true);
            setChangingImage(false);
        }
    };

    useFocusEffect(React.useCallback(() => {
        const getUserData = async () => {
            try {
                const profileName = await AsyncStorage.getItem('username');
                const email = await AsyncStorage.getItem('email');
                const pfp = await AsyncStorage.getItem('pfp');
                const validFrom = await AsyncStorage.getItem('validFrom');
                if (validFrom !== null) {
                    const formattedDate = new Date(validFrom).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    });
                    setValidFrom(formattedDate);
                }
                setProfileName(profileName);
                setEmail(email);
                if (pfp !== null && pfp != '') {
                    setPfp("data:image/png;base64," + pfp);
                }
            } catch (error) {
                console.log(error);
            }
        }

        getUserData();

    }, []))

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.lightWhite }}>
            <View style={styles.profileContainer}>
                <Text style={styles.headerText}>Seu perfil</Text>
                <View style={styles.infoContainer}>
                    <Image
                        style={styles.pfp}
                        source={{ uri: pfp }}
                        resizeMode='cover'
                    />
                    <View style={styles.textInfoContainer}>
                        <Text style={styles.text}>Nome:   {profileName}</Text>
                        <Text style={styles.text}>Email:   {email}</Text>
                        <Text style={styles.text}>Cadastrado em: {validFrom}</Text>
                    </View>
                    <View style={styles.btnsContainer}>
                        <FeatherIconButton
                            featherIconName={"edit"}
                            featherIconSize={30}
                            featherIconColor={COLORS.blue}
                            caption='Alterar Dados'
                            handlePress={() => navigation.navigate("AlterarDados")}
                        />
                        <View>
                            <FeatherIconButton
                                featherIconName={"camera"}
                                featherIconSize={30}
                                featherIconColor={COLORS.blue}
                                caption='Alterar foto'
                                handlePress={() => pickImage()}
                            />
                            {imagesChanged &&
                                <Text style={{ color: COLORS.green }}>Foto alterada!</Text>
                            }
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    profileContainer: {
        backgroundColor: "#fff",
        margin: 10,
        borderRadius: 5,
        height: 600
    },
    infoContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pfp: {
        width: 170,
        height: 170,
        borderRadius: 10
    },
    headerText: {
        fontFamily: FONT.bold,
        fontSize: SIZES.xLarge,
        color: COLORS.primary,
        marginTop: 2,
        textAlign: "center",
        marginBottom: 40,
        padding: 10
    },
    textInfoContainer: {
        padding: 20,
    },
    text: {
        padding: 20,
        fontFamily: FONT.regular,
        fontSize: SIZES.large,
        color: COLORS.secondary,
    },
    btnsContainer: {
        width: "80%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
        marginTop: 30,
        alignItems: "center",
    },
});

export default Profile;