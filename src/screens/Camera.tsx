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

const Camera = () => {

    //Obter de alguma forma do perfil logado
    const screenSize = useWindowDimensions();
    const [text, onChangeText] = useState('');

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={cameraContainer(screenSize)}>
                <Image
                    source={images.noImageIcon}
                    resizeMode='stretch'
                    style={styles.camera}
                />
            </View>
            <View style={btnTalkContainer(screenSize)}>
                <FeatherIconButton
                    featherIconName='mic'
                    featherIconColor={COLORS.blue}
                    featherIconSize={50}
                    caption='Falar'
                    captionStyle={{
                        fontFamily: FONT.bold,
                        fontSize: SIZES.medium,
                        color: COLORS.blue,
                        marginTop: 5,
                        textAlign: "center",
                    }}
                />
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

const cameraContainer = (screenSize: ScaledSize): ViewStyle => (
    {
        width: "100%",
        height: screenSize.height - 170, //- tamanho da bottomTab
        alignItems: "center",
        justifyContent: "center"
    }
)

const btnTalkContainer = (screenSize: ScaledSize): ViewStyle => (
    {
        position: "absolute",
        top: screenSize.height - 280,
        right: screenSize.width - 120
    }
)

const btnTextContainer = (screenSize: ScaledSize): ViewStyle => (
    {
        position: "absolute",
        top: screenSize.height - 260,
        left: screenSize.width - 150
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