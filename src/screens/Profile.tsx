import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image } from 'react-native';
import { images, COLORS, FONT, SIZES, icons } from '../../constants';

import FeatherIconButton from '../components/common/FeatherIconButton';
import { profile } from '../../data/profiles';
import ListaProfiles from '../../data/profiles';

const Profile = () => {

    //Isso provavelmente vai ser obtido de uma tela de Login
    //(Talvez de para usar um useEffect aqui, ou passar esses parâmetros de outra forma)
    const profile_data = ListaProfiles[0];

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.lightWhite }}>
            <View style={styles.profileContainer}>
                <Text style={styles.headerText}>Seu perfil</Text>
                <View style={styles.infoContainer}>
                    <Image
                        style={styles.pfp}
                        source={profile_data.image}
                        resizeMode='cover'
                    />
                    <View style={styles.textInfoContainer}>
                        <Text style={styles.text}>Nome:   {profile_data.name}</Text>
                        <Text style={styles.text}>Email:   {profile_data.email}</Text>
                        <Text style={styles.text}>Cadastrado em:   {profile_data.data_cadastro}</Text>
                    </View>
                    <View style={styles.btnsContainer}>
                        <FeatherIconButton
                            featherIconName={"edit"}
                            featherIconSize={30}
                            caption='Alterar Dados'
                        />
                        <FeatherIconButton
                            featherIconName={"camera"}
                            featherIconSize={30}
                            caption='Alterar fotos'
                        />
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