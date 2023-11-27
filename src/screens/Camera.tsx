import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';

import { COLORS, FONT, SIZES, images } from '../../constants';
import { useWindowDimensions } from 'react-native';
import { ViewStyle } from 'react-native';
import { ScaledSize } from 'react-native';
import { useEffect, useState } from 'react';
import CustomInput from '../components/common/customInput';
import WebView from 'react-native-webview';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import TextButton from '../components/common/TextButton';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SERVER_IP } from '../../constants';
import { AxiosRequestConfig } from 'axios';

const ws = new WebSocket(`ws://${SERVER_IP}/websocket`);

ws.onopen = () => {
    // connection opened
    ws.send(JSON.stringify({ event: 'appClient', data: 'registerAppClient' }))
};

const Camera = () => {

    //Obter de alguma forma do perfil logado
    const screenSize = useWindowDimensions();
    const [text, onChangeText] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [subtitles, setSubtitles] = useState('');

    useEffect(() => {
        const effect = async () => {
            await requestMultiple([PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.RECORD_AUDIO, PERMISSIONS.ANDROID.INTERNET, PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.MODIFY_AUDIO_SETTINGS, PERMISSIONS.ANDROID.INTERNET, PERMISSIONS.ANDROID.VIDEO_CAPTURE, PERMISSIONS.ANDROID.AUDIO_CAPTURE]);
        };

        effect().catch(console.log);
    }, []);

    useFocusEffect(React.useCallback(() => {
        setIsFocused(true);
    }, []))

    ws.onmessage = e => {
        // a message was received
        if (isFocused) {
            console.log(JSON.parse(e.data));
            setSubtitles(JSON.parse(e.data).ddata);
        }
    };

    const sendText = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const options: AxiosRequestConfig<any> = {
                method: "post",
                url: `http://${SERVER_IP}/send-text`,
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                data: {
                    text: text,
                }
            };
            console.log("Enviando texto...")
            await axios.request(options);
            onChangeText('');
            console.log("Enviado.")
        } catch (error) {
            alert(error);
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.cameraContainer}>
                <WebView source={{ uri: "http://142.93.4.38:80/camera2/stream.mjpg" }} javaScriptEnabled={true} mediaPlaybackRequiresUserAction={false} allowsInlineMediaPlayback={true}
                />
            </View>
            <View style={styles.jitsiContainer}>
                <WebView source={{ uri: "https://meet.mayfirst.org/echogate-streaming#config.prejoinPageEnabled=false&config.startWithVideoMuted=true&config.disableDeepLinking=true" }} javaScriptEnabled={true} mediaPlaybackRequiresUserAction={false} allowsInlineMediaPlayback={true}
                />
            </View>
            <View style={styles.aux} />
            <View style={styles.sendTextContainer}>
                <CustomInput
                    value={text}
                    setValue={onChangeText}
                    placeholder='Texto para voz'
                    sizeX="75%"
                />
                <TextButton
                    sizeX={80}
                    sizeY={50}
                    backgroundColor={COLORS.blue}
                    text='Enviar'
                    handlePress={() => sendText()} />
            </View>
            <View style={styles.subtitlesContainer}>
                <Text style={styles.subtitles}> {subtitles} </Text>
            </View>

            {/* <g */}
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    aux: {
        position: "absolute",
        bottom: 0,
        left: "61%",
        height: "11%",
        width: "100%",
        backgroundColor: "#000000"
    },
    cameraContainer: {
        width: "100%",
        height: "100%",
    },
    jitsiContainer: {
        position: "absolute",
        bottom: 0,
        left: "40%",
        height: "11%",
        width: "100%"
    },
    subtitlesContainer: {
        width: "95%",
        height: 100,
        position: "absolute",
        bottom: 50,
    },
    sendTextContainer: {
        flexDirection: "row",
        position: "absolute",
        justifyContent: "space-between",
        top: 10,
        width: "95%",
        right: 10,
    },
    subtitles: {
        fontFamily: FONT.regular,
        fontSize: SIZES.large,
        color: COLORS.lightWhite,
        textAlign: "center"
    },
    safeArea: {
        backgroundColor: COLORS.lightWhite,
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
});

export default Camera;
