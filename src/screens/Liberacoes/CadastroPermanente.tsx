import { StyleSheet, Text, View, SafeAreaView, ScrollView, TextInput } from 'react-native';
import { StackTypes } from '../../routes/stackliberar.routes';

import { COLORS, SIZES, FONT, icons } from "../../../constants";

import GenericButton from '../../components/common/GenericButton';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

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
                    <View style={styles.inputsContainer}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.text}>Nome:   </Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={onChangeText}
                                value={text}
                                placeholder='Seu nome'
                            />
                        </View>
                    </View>
                    <View style={styles.btnsContainer}>
                        <View style={styles.buttonContainer}>
                            <GenericButton name={"camera"} size={30} color={"black"} handlePress={() => null} />
                            <Text style={styles.text2}>Fotos</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <GenericButton name={"check-square"} size={30} color={"green"} handlePress={() => null} />
                            <Text style={styles.text2}>Finalizar</Text>
                        </View>
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
    inputsContainer: {
        padding: 10,
        width: "100%",

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
        justifyContent: "space-around",
        marginBottom: 20,
        marginTop: 30,
        alignItems: "center",
    },
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center"
    }
});

export default CadastroPermanente;