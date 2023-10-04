import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image } from 'react-native';

import { COLORS, FONT, SIZES, images } from '../../constants';
import ListaProfiles from '../../data/profiles';

import FeatherIconButton from '../components/common/FeatherIconButton';
import TwoStateButton from '../components/common/TwoStateButton';

const Home = () => {

    //Obter de alguma forma do perfil logado
    const profile_name = ListaProfiles[0].name;

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.lightWhite }}>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.userName}>Olá {profile_name},</Text>
                    <Text style={styles.welcomeMessage}>Bem vindo ao EchoGate</Text>
                </View>
                <View style={styles.cameraContainer}>
                    <Text style={styles.cameraMessage}>Sua câmera</Text>
                    <View style={styles.cameraImgContainer}>
                        <Image
                            source={images.dummyCamera}
                            resizeMode='contain'
                        />
                    </View>
                </View>
                <View style={styles.fechaduraContainer}>
                    <Text style={styles.fechaduraMessage}>Sua fechadura</Text>
                    <View style={styles.buttonContainer}>
                        <TwoStateButton
                            featherIconName1='unlock'
                            featherIconName2='lock'
                            featherIconSize={45}
                        />
                        <Text style={styles.text}>Abrir/Fechar</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: "2%",
        margin: 20
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
        alignItems: "center",
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