import { StyleSheet, Text, View, SafeAreaView, ScrollView, TextInput, Button } from 'react-native';
import { StackTypes } from '../../routes/stackliberar.routes';

import { COLORS, SIZES, FONT, icons } from "../../../constants";

import FeatherIconButton from '../../components/common/FeatherIconButton';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

import DateTimePicker from '@react-native-community/datetimepicker';

import CustomInput from '../../components/common/customInput';

const CadastroTemporario = () => {
    const navigation = useNavigation<StackTypes>();
    const [text, onChangeText] = useState('');
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode: any) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };


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
                            <CustomInput
                                sizeX={"60%"}
                                setValue={onChangeText}
                                value={text}
                                placeholder='Seu nome'
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.text}>Valido até:   </Text>
                            <Button onPress={showDatepicker} title="Show date picker!" />
                            {show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode={'date'}
                                    is24Hour={true}
                                    onChange={onChange}
                                />
                            )}
                        </View>
                    </View>
                    <View style={styles.btnsContainer}>
                        <View style={styles.buttonContainer}>
                            <FeatherIconButton
                                featherIconName={"camera"}
                                featherIconSize={30}
                                featherIconColor={"black"} />
                            <Text style={styles.text2}>Fotos</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <FeatherIconButton
                                featherIconName={"check-square"}
                                featherIconSize={30}
                                featherIconColor={"green"}
                            />
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

export default CadastroTemporario;