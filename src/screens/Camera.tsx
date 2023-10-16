import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image } from 'react-native';

import { COLORS, FONT, SIZES, images } from '../../constants';
import ListaProfiles from '../../data/profiles';

import FeatherIconButton from '../components/common/FeatherIconButton';
import TwoStateButton from '../components/common/TwoStateButton';

const Camera = () => {

    //Obter de alguma forma do perfil logado
    const profile_name = ListaProfiles[0].name;

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.lightWhite, height: "100%" }}>
            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={{ justifyContent: "center" }}
            >
                <Text style={styles.text}>Camera</Text>
                <Image
                    source={images.dummyCamera}
                    resizeMode='cover'
                />
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

export default Camera;