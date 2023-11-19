import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';

import { COLORS, FONT, SIZES, images } from '../../constants';
import ListaProfiles from '../../data/profiles';
import { useWindowDimensions } from 'react-native';
import { ViewStyle } from 'react-native';
import { ScaledSize } from 'react-native';
import { useEffect, useState } from 'react';
import FeatherIconButton from '../components/common/FeatherIconButton';
import TwoStateButton from '../components/common/TwoStateButton';
import { TextInput } from 'react-native-gesture-handler';
import CustomInput from '../components/common/customInput';
import WebView from 'react-native-webview';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';

const Camera = () => {

    //Obter de alguma forma do perfil logado
    const screenSize = useWindowDimensions();
    const [text, onChangeText] = useState('');
    useEffect(() => {
        const effect = async () => {
            await requestMultiple([PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.RECORD_AUDIO, PERMISSIONS.ANDROID.INTERNET, PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.MODIFY_AUDIO_SETTINGS, PERMISSIONS.ANDROID.INTERNET, PERMISSIONS.ANDROID.VIDEO_CAPTURE, PERMISSIONS.ANDROID.AUDIO_CAPTURE]);
            setPermissionGranted(true)
        };

        effect().catch(console.log);
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={{ height: "100%", width: "100%" }}>
                <WebView source={{ uri: "http://jitsi.member.fsf.org/echogate-streaming3#config.prejoinPageEnabled=false&config.startWithVideoMuted=true&config.disableDeepLinking=true" }} javaScriptEnabled={true} />
            </View>
            {/* <g */}
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

function setPermissionGranted(arg0: boolean) {
    throw new Error('Function not implemented.');
}
