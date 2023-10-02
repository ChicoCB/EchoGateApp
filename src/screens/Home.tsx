import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';

import { COLORS, FONT, SIZES } from '../../constants';
import ListaProfiles from '../../data/profiles';

const Home = () => {

    //Obter de alguma forma do perfil logado
    const profile_name = ListaProfiles[0].name;

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.userName}>Olá {profile_name},</Text>
                    <Text style={styles.welcomeMessage}>Bem vindo ao EchoGate</Text>
                </View>
                <View style={styles.cameraContainer}>
                    <Text style={styles.cameraMessage}>Sua câmera</Text>
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
        marginTop: "20%",
        flex: 1,
        alignItems: "center",
    },
    cameraMessage: {
        fontFamily: FONT.bold,
        fontSize: SIZES.xLarge,
        color: COLORS.primary,
        marginTop: 2,
    }
});

export default Home;