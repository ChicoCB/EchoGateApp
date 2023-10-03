import { StyleSheet, Text, View, SafeAreaView, ScrollView, TextInput } from 'react-native';
import { StackTypes } from '../../routes/stackliberar.routes';

import { COLORS, SIZES, FONT, icons } from "../../../constants";

import FeatherIconButton from '../../components/common/FeatherIconButton';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import TextButton from '../../components/common/TextButton';

import CustomInput from '../../components/common/customInput';

const CadastroPermanente = () => {
    const navigation = useNavigation<StackTypes>();
    const [text, onChangeText] = useState('');
    const [number, onChangeNumber] = useState('');


    return (
        <SafeAreaView>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
            >
                <Text style={styles.headerText}>Novo Cadastro</Text>
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.text}>Nome:   </Text>
                        <CustomInput
                            sizeX={"60%"}
                            setValue={onChangeText}
                            value={text}
                            placeholder='Seu nome'
                        />
                    </View>
                    <View style={styles.btnsContainer}>
                        <View style={styles.buttonContainer}>
                            <FeatherIconButton
                                featherIconName={"camera"}
                                featherIconSize={30}
                                featherIconColor={"black"} />
                            <Text style={styles.text2}>Fotos de reconhecimento</Text>
                        </View>
                        <TextButton
                            sizeX={"auto"}
                            backgroundColor={COLORS.blue}
                            text="Cadastrar"
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        backgroundColor: "#fff",
        margin: 10,
        marginTop: "20%",
        borderRadius: 5
    },
    input: {
        flex: 0.9,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    inputContainer: {
        flexDirection: "row",
        width: "100%",
        padding: 10,
    },
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
        paddingTop: 10,
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
        width: "100%",
        justifyContent: "space-around",
        marginBottom: 20,
        marginTop: 30,
        alignItems: "center",
    },
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 100
    }
});

export default CadastroPermanente;