import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image } from 'react-native';
import { images, COLORS, FONT, SIZES, icons } from '../../constants';

import GenericButton from '../components/common/GenericButton';
import { profile } from '../../data/profiles';
import ListaProfiles from '../../data/profiles';

const Profile = () => {

    //Isso provavelmente vai ser obtido de uma tela de Login
    //(Talvez de para usar um useEffect aqui, ou passar esses parâmetros de outra forma)
    const profile_data = ListaProfiles[0];

    return (
        <SafeAreaView>
            <ScrollView
                contentContainerStyle={{ backgroundColor: "#fff", margin: 10, borderRadius: 5 }}
            >
                <Text style={styles.headerText}>Seu perfil</Text>
                <View style={styles.container}>
                    <Image
                        style={styles.pfp}
                        source={profile_data.image}
                        resizeMode='cover'
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Nome:   {profile_data.name}</Text>
                        <Text style={styles.text}>Email:   {profile_data.email}</Text>
                        <Text style={styles.text}>Cadastrado em:   {profile_data.data_cadastro}</Text>
                    </View>
                    <View style={styles.btnsContainer}>
                        <View style={styles.buttonContainer}>
                            <GenericButton name={"edit"} size={30} color={"black"} handlePress={() => null} />
                            <Text style={styles.text2}>Alterar dados</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <GenericButton name={"camera"} size={30} color={"black"} handlePress={() => null} />
                            <Text style={styles.text2}>Alterar fotos</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
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
    textContainer: {
        padding: 20,
    },
    text: {
        padding: 20,
        fontFamily: FONT.regular,
        fontSize: SIZES.large,
        color: COLORS.secondary,
    },
    text2: {
        fontFamily: FONT.bold,
        fontSize: SIZES.medium,
        color: COLORS.primary,
        marginTop: 5,
        textAlign: "center"
    },
    btnsContainer: {
        width: "80%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
        marginTop: 30,
        alignItems: "center",
    },
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center"
    }
});

export default Profile;