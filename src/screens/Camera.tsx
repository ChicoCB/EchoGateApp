import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';

import { COLORS, FONT, SIZES, images } from '../../constants';
import { useWindowDimensions } from 'react-native';
import { ViewStyle } from 'react-native';
import { ScaledSize } from 'react-native';
import { useEffect, useState } from 'react';
import CustomInput from '../components/common/customInput';
import WebView from 'react-native-webview';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import { JitsiMeeting } from '@jitsi/react-native-sdk';

const Camera = () => {

    //Obter de alguma forma do perfil logado
    const screenSize = useWindowDimensions();
    const [text, onChangeText] = useState('');
    const [permissionGranted, setPermissionGranted] = useState(false);
    useEffect(() => {
        const effect = async () => {
            await requestMultiple([PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.RECORD_AUDIO, PERMISSIONS.ANDROID.INTERNET, PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.MODIFY_AUDIO_SETTINGS, PERMISSIONS.ANDROID.INTERNET, PERMISSIONS.ANDROID.VIDEO_CAPTURE, PERMISSIONS.ANDROID.AUDIO_CAPTURE]);
            setPermissionGranted(true)
        };
    
        effect().catch(console.log);
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* <JitsiMeeting
                room={'echogate-streaming3'}
                serverURL={'http://jitsi.member.fsf.org/'} 
                config={{}}
            /> */}
            <View style={{ height: "100%", width: "100%" }}>
                <WebView source={{ uri: "http://jitsi.member.fsf.org/echogate-streaming3#config.prejoinPageEnabled=false&config.startWithVideoMuted=true&config.disableDeepLinking=true" }} javaScriptEnabled={true} />
            </View>

            {/* <View style={btnTextContainer(screenSize)}>
                <CustomInput
                    value={text}
                    setValue={onChangeText}
                    placeholder='Texto para voz'
                    sizeX="100%"
                />
            </View> */}
        </SafeAreaView >
    );
}

const btnTextContainer = (screenSize: ScaledSize): ViewStyle => (
    {
        position: "absolute",
        top: 30,
        width: "100%",
        margin: 30
    }
)

const styles = StyleSheet.create({
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