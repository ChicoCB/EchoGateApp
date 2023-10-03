import { StyleSheet, Text, View, SafeAreaView, ScrollView, TextInput, Button } from 'react-native';
import { StackTypes } from '../../routes/stackliberar.routes';

import { COLORS, SIZES, FONT, icons } from "../../../constants";

import FeatherIconButton from '../../components/common/FeatherIconButton';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import TextButton from '../../components/common/TextButton';
import CustomInput from '../../components/common/customInput';

const CadastroTemporario = () => {
    const navigation = useNavigation<StackTypes>();
    const [text, onChangeText] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [showStartDate, setShowStartDate] = useState(false);
    const [showEndDate, setShowEndDate] = useState(false);
    const [showStartTime, setShowStartTime] = useState(false);
    const [showEndTime, setShowEndTime] = useState(false);

    const onChangeStartDate = (selectedDate: any) => {
        setShowStartDate(false);
        setStartDate(selectedDate);
    };

    const onChangeStartTime = (selectedDate: any) => {
        setShowStartTime(false);
        setStartTime(selectedDate);
    };

    const onChangeEndDate = (selectedDate: any) => {
        setShowEndDate(false);
        setEndDate(selectedDate);
    };

    const onChangeEndTime = (selectedDate: any) => {
        setShowEndTime(false);
        setEndTime(selectedDate);
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
                            <Text style={styles.text}>Início:   </Text>
                            <TextButton
                                sizeX="auto"
                                text="Dia"
                                backgroundColor={COLORS.blue}
                                handlePress={() => setShowStartDate(true)}
                            />
                            {showStartDate && (
                                <DateTimePicker
                                    testID="startDatePicker"
                                    value={startDate}
                                    mode={'date'}
                                    is24Hour={true}
                                    onChange={onChangeStartDate}
                                />
                            )}
                            <TextButton
                                sizeX="auto"
                                text="Horário"
                                backgroundColor={COLORS.blue}
                                handlePress={() => setShowStartTime(true)}
                            />
                            {showStartTime && (
                                <DateTimePicker
                                    testID="startTimePicker"
                                    value={startTime}
                                    mode={'time'}
                                    is24Hour={true}
                                    onChange={onChangeStartTime}
                                />
                            )}
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.text}>Fim:   </Text>
                            <TextButton
                                sizeX="auto"
                                text="Dia"
                                backgroundColor={COLORS.blue}
                                handlePress={() => setShowEndDate(true)}
                            />
                            {showEndDate && (
                                <DateTimePicker
                                    testID="EndDatePicker"
                                    value={endDate}
                                    mode={'date'}
                                    is24Hour={true}
                                    onChange={onChangeEndDate}
                                />
                            )}
                            <TextButton
                                sizeX="auto"
                                text="Horário"
                                backgroundColor={COLORS.blue}
                                handlePress={() => setShowEndTime(true)}
                            />
                            {showEndTime && (
                                <DateTimePicker
                                    testID="endTimePicker"
                                    value={endTime}
                                    mode={'time'}
                                    is24Hour={true}
                                    onChange={onChangeEndTime}
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
        marginTop: "10%",
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
        justifyContent: "space-between"
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
        justifyContent: "space-around",
        marginBottom: 20,
        marginTop: 30,
        alignItems: "center",
    },
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 40
    }
});

export default CadastroTemporario;