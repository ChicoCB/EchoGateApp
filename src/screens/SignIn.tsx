import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image } from 'react-native';
import { images, COLORS, FONT, SIZES, icons } from '../../constants';

import { useState } from 'react';

import CustomInput from '../components/common/customInput';
import TextButton from '../components/common/TextButton';
import { useNavigation } from '@react-navigation/native';

import { StackTypes } from '../routes/stacksignin.routes';

const SignIn = () => {
    const navigation = useNavigation<StackTypes>();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={images.dummyLogo}
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
                    handlePress={() => { navigation.navigate("ProfileDrawer") }}
                />
            </View>
            <TextButton
                sizeX={"auto"}
                text="Esqueceu sua senha?"
                textColor={COLORS.gray}
            />
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
        fontFamily: FONT.bold,
        fontSize: SIZES.large,
        color: COLORS.primary,
        textAlign: "center"
    },
    text2: {
        fontFamily: FONT.regular,
        fontSize: SIZES.medium,
        color: COLORS.primary,
        textAlign: "center"
    },
});

export default SignIn;