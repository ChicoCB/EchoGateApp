import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';

import { COLORS, FONT, SIZES, images } from '../../constants';
import ListaProfiles from '../../data/profiles';
import { useWindowDimensions } from 'react-native';
import { ViewStyle } from 'react-native';
import { ScaledSize } from 'react-native';
import { useState } from 'react';
import FeatherIconButton from '../components/common/FeatherIconButton';
import TwoStateButton from '../components/common/TwoStateButton';
import { TextInput } from 'react-native-gesture-handler';
import CustomInput from '../components/common/customInput';
import WebView from 'react-native-webview';

const Camera = () => {

    //Obter de alguma forma do perfil logado
    const screenSize = useWindowDimensions();
    const [text, onChangeText] = useState('');

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={{ height: "100%", width: "100%" }}>
                <WebView source={{ uri: "http://jitsi.member.fsf.org/echogate-streaming3#config.prejoinPageEnabled=false&config.startWithVideoMuted=true&config.disableDeepLinking=true" }} />
            </View>
            <View style={btnTextContainer(screenSize)}>
                <CustomInput
                    value={text}
                    setValue={onChangeText}
                    placeholder='Texto para voz'
                    sizeX="100%"
                />
            </View>
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