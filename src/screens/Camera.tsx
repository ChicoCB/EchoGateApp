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

import { SERVER_IP } from '../../constants';

const ws = new WebSocket('ws://192.168.0.173:3000/websocket');

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
            console.log(e.data);
            setSubtitles(e.data);
        }
    };

    const sendText = async () => {
        try {
            console.log("Enviando texto...")
            await axios.post(`http://${SERVER_IP}/send-text`, { text: text });
            console.log("Enviado.")
        } catch (error) {
            alert(error);
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={{ height: "100%", width: "100%" }}>
                <WebView source={{ uri: "http://jitsi.member.fsf.org/echogate-streaming3#config.prejoinPageEnabled=false&config.startWithVideoMuted=true&config.disableDeepLinking=true" }} javaScriptEnabled={true} mediaPlaybackRequiresUserAction={false} allowsInlineMediaPlayback={true}
                />
            </View>
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
        right: 10
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
    camera: {
        width: "100%",
        height: "100%"
    }
});

export default Camera;
