import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image } from 'react-native';
import { images, COLORS, FONT, SIZES, icons } from '../../constants';

import { useEffect, useState } from 'react';

import CustomInput from '../components/common/customInput';
import TextButton from '../components/common/TextButton';
import { useNavigation } from '@react-navigation/native';

import { StackTypes } from '../routes/stacksignin.routes';

import axios, { AxiosRequestConfig } from 'axios';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import LoadingComponent from '../components/common/LoadingComponent';
import { SERVER_IP } from '../../constants';
import { Header } from '@react-navigation/stack';
import useGetFromDatabase from '../../data/useGetFromDatabase';

const SignIn = () => {
    const navigation = useNavigation<StackTypes>();

    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [isRemembered, setIsRemembered] = useState(false);

    const checkIsRemembered = async () => {
        try {
            const remember = await AsyncStorage.getItem('remember');
            console.log(remember)
            return remember;
        } catch (error) {
            console.log(error)
        }
    }
    //COMO COMPARAR PROMESSA COM STRING?
    const userData = useGetFromDatabase("users");

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [rememberCheckBox, setRememberCheckBox] = useState(false);

    const signInPress = async () => {
        try {
            setIsLoggingIn(true);
            console.log("Obtendo token...")
            const accessToken = await axios.post(`http://${SERVER_IP}/users/login`, { email: email, password: password });
            console.log("Token obtido.")
            console.log("Armazenando localmente token e remember...")
            await AsyncStorage.setItem('token', accessToken.data.token);
            await AsyncStorage.setItem('remember', rememberCheckBox ? "true" : "false") //Precisa ser assim pq so armazena string
            console.log("Token e remember armazenados.")
            setPassword("");
            setEmail("");
            setRememberCheckBox(false);
            navigation.navigate("ProfileDrawer");

        } catch (error) {
            console.log(error);
            Alert.alert("Erro", "Credenciais incorretas.")
        } finally {
            setIsLoggingIn(false);
        }
    }

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.lightWhite }}>
            {isLoggingIn ? (
                <LoadingComponent text='Entrando...' />
            ) : (
                <View style={styles.container}>
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
                    <View style={{ marginTop: "2%" }}>
                        <BouncyCheckbox
                            size={25}
                            fillColor={COLORS.blue}
                            unfillColor="#FFFFFF"
                            text="Lembrar meu login"
                            iconStyle={{ borderColor: "red" }}
                            innerIconStyle={{ borderWidth: 2 }}
                            textStyle={styles.text}
                            onPress={() => { setRememberCheckBox(!rememberCheckBox) }}
                        />
                    </View>
                    <View style={styles.btnContainer}>
                        <TextButton
                            sizeX={"100%"}
                            sizeY={50}
                            backgroundColor={COLORS.blue}
                            text="Sign in"
                            handlePress={() => { signInPress() }}
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
                </View>
            )}
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