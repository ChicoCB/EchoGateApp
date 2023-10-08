import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image } from 'react-native';
import { images, COLORS, FONT, SIZES, icons } from '../../constants';

import { useState } from 'react';

import CustomInput from '../components/common/customInput';
import TextButton from '../components/common/TextButton';
import { useNavigation } from '@react-navigation/native';

import { StackTypes } from '../routes/stacksignin.routes';

import axios from 'axios';

interface login {
    email: string;
    password: string;
    navigation: StackTypes;
}

const signInPress = async ({ email, password, navigation }: login) => {
    // try {
    //      await axios.post("http://192.168.0.173:3000/users/", { name: username, password, email });
    //      navigation.navigate("ProfileDrawer");
    //      alert("Funfou");
    // } catch (error) {
    //     console.log(error);
    // }

    navigation.navigate("ProfileDrawer");
}

const SignIn = () => {
    const navigation = useNavigation<StackTypes>();

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={images.logo}
                resizeMode='contain'
                style={styles.logo}
            />
            <CustomInput
                value={email}
                setValue={setEmail}
                placeholder={"Email"}
                secureTextEntry={false}
            />
            <CustomInput
                value={password}
                setValue={setPassword}
                placeholder={"Password"}
                secureTextEntry={true}
            />
            <View style={styles.btnContainer}>
                <TextButton
                    sizeX={"100%"}
                    sizeY={50}
                    backgroundColor={COLORS.blue}
                    text="Sign in"
                    handlePress={() => { signInPress({ email, password, navigation }) }}
                />
            </View>
            <View style={styles.cadastroContainer}>
                <Text style={styles.text}>Não possui uma conta? </Text>
                <TextButton
                    sizeX={"auto"}
                    text="Cadastre-se já"
                    textColor={COLORS.blue}
                    handlePress={() => { navigation.navigate("SignUp") }}
                />
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: "center"
    },
    logo: {
        width: "70%",
        maxWidth: 300,
        height: "100%",
        maxHeight: 200,
    },
    btnContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
        width: "100%"
    },
    btnsContainer: {
        width: "100%",
    },
    text: {
        fontFamily: FONT.regular,
        fontSize: SIZES.medium,
        color: COLORS.gray,
        textAlign: "center",
        textAlignVertical: "center"
    },
    text2: {
        fontFamily: FONT.regular,
        fontSize: SIZES.medium,
        color: COLORS.primary,
        textAlign: "center",
    },
    cadastroContainer: {
        flexDirection: "row",
        marginTop: 50
    }
});

export default SignIn;