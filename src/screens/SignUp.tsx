import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image } from 'react-native';
import { images, COLORS, FONT, SIZES, icons } from '../../constants';

import { StackNavigationProp } from '@react-navigation/stack';

import { useState } from 'react';

import CustomInput from '../components/common/customInput';
import TextButton from '../components/common/TextButton';
import { useNavigation } from '@react-navigation/native';
import { SERVER_IP } from '../../constants';
import axios from 'axios';

import LoadingComponent from '../components/common/LoadingComponent';
import { Alert } from 'react-native';

type StackNavigation = {
    SignIn: undefined;
}

export type StackTypes = StackNavigationProp<StackNavigation>;

const validInputs = (username: string, password: string, email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (username == "" || password == "" || email == "" || !emailRegex.test(email)) {
        return false;
    }

    return true;
}

const SignUp = () => {
    const navigation = useNavigation<StackTypes>();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const createUser = async () => {

        if (!validInputs(username, password, email)) {
            alert("Campos inválidos.");
            return;
        }

        try {
            setIsLoggingIn(true);
            await axios.post(`http://${SERVER_IP}/users`, { name: username, password, email });
            navigation.navigate("SignIn");
            Alert.alert("Sucesso", "Cadastro realizado!")
        } catch (error) {
            alert(error);
        } finally {
            setIsLoggingIn(false);
        }
    }

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.lightWhite }}>
            {isLoggingIn ? (
                <LoadingComponent text='Cadastrando...' />
            ) : (
                <View style={styles.container}>
                    <Image
                        source={images.logo}
                        resizeMode='contain'
                        style={styles.logo}
                    />
                    <CustomInput
                        value={username}
                        setValue={setUsername}
                        placeholder={"Username"}
                        secureTextEntry={false}
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
                    </View>
                    <TextButton
                        sizeX={"100%"}
                        sizeY={"auto"}
                        backgroundColor={COLORS.blue}
                        text='Sign Up'
                        handlePress={async () => await createUser()}
                    />

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

export default SignUp;