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
        <SafeAreaView style={{ backgroundColor: COLORS.lightWhite }}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.headerText}>Novo Cadastro</Text>
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputText}>Nome:   </Text>
                        <CustomInput
                            sizeX={"60%"}
                            setValue={onChangeText}
                            value={text}
                            placeholder='Seu nome'
                        />
                    </View>
                    <View style={styles.btnsContainer}>
                        <FeatherIconButton
                            featherIconName={"camera"}
                            featherIconSize={30}
                            featherIconColor={"black"}
                            caption="Fotos de reconhecimento"
                        />
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
    headerText: {
        fontFamily: FONT.bold,
        fontSize: SIZES.xLarge,
        color: COLORS.primary,
        marginTop: 2,
        textAlign: "center",
        marginBottom: 40,
        paddingTop: 10,
    },
    inputText: {
        padding: 20,
        fontFamily: FONT.regular,
        fontSize: SIZES.large,
        color: COLORS.secondary,
    },
    btnsContainer: {
        width: "100%",
        justifyContent: "space-around",
        height: 250,
        marginTop: 20,
        alignItems: "center",
    },
});

export default CadastroPermanente;