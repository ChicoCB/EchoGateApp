import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image } from 'react-native';
import { images, COLORS, FONT, SIZES, icons } from '../../constants';

import { useEffect, useState } from 'react';

import CustomInput from '../components/common/customInput';
import TextButton from '../components/common/TextButton';
import { useNavigation } from '@react-navigation/native';

import { StackTypes } from '../routes/stacksignin.routes';

import axios from 'axios';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import LoadingComponent from '../components/common/LoadingComponent';
import { isLoaded } from 'expo-font';

const SignIn = () => {
    const navigation = useNavigation<StackTypes>();

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [rememberCheckBox, setRememberCheckBox] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const signInPress = async () => {
        try {
            setIsLoggingIn(true);
            const accessToken = await axios.post("http://192.168.0.173:3000/users/login", { email: email, password: password });
            console.log(accessToken.data.token)
            await AsyncStorage.setItem('token', accessToken.data.token);
            await AsyncStorage.setItem('remember', rememberCheckBox ? "true" : "false") //Precisa ser assim pq so armazena string
            setIsLoggingIn(false);
            navigation.navigate("ProfileDrawer");

        } catch (error) {
            console.log(error);
            Alert.alert("Erro", "Credenciais incorretas.")
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