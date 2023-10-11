import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { StackTypes } from '../../routes/stackliberar.routes';

import { COLORS, SIZES, FONT, icons, images } from "../../../constants";

import FeatherIconButton from '../../components/common/FeatherIconButton';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

import TextButton from '../../components/common/TextButton';
import CustomInput from '../../components/common/customInput';
import LoadingComponent from '../../components/common/LoadingComponent';

import * as ImagePicker from 'expo-image-picker'
import axios from 'axios';

import { Alert } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

const convertToBase64StringArray = (imageAssets: ImagePicker.ImagePickerAsset[]) => {
    let stringImages = [];

    for (const imageAsset of imageAssets) {
        stringImages.push(imageAsset.base64);
    }

    return stringImages;
}

const CadastroTemporario = () => {
    const navigation = useNavigation<StackTypes>();
    const [name, onChangeName] = useState('');

    //Dias e horarios
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [startTime, setStartTime] = useState<Date>(new Date());
    const [endTime, setEndTime] = useState<Date>(new Date());

    //Mostrar ou nao o datetimepicker
    const [showStartDate, setShowStartDate] = useState(false);
    const [showStartTime, setShowStartTime] = useState(false);
    const [showEndDate, setShowEndDate] = useState(false);
    const [showEndTime, setShowEndTime] = useState(false);

    //Se ja selecionou ou nao cada dia e horario
    const [startDatePicked, setStartDatePicked] = useState(false);
    const [endDatePicked, setEndDatePicked] = useState(false);
    const [startTimePicked, setStartTimePicked] = useState(false);
    const [endTimePicked, setEndTimePicked] = useState(false);

    //Imagens
    const [imagesPicked, setImagesPicked] = useState(false);
    const [selectedImages, setSelectedImages] = useState<(string | null | undefined)[]>([]);
    const [sendingImage, setSendingImage] = useState(false);

    //TERMINAR
    const cadastrar = async () => {
        if (name == "" ||
            !imagesPicked ||
            !startDatePicked ||
            !startTimePicked ||
            !endDatePicked ||
            !endTimePicked) {
            Alert.alert('Erro', 'Campos inválidos!')
            return;
        }
        try {
            const formatedFromDate = new Date();
            formatedFromDate.setTime(startTime.getTime());
            formatedFromDate.setDate(startDate.getDate());
            formatedFromDate.setMonth(startDate.getMonth());
            formatedFromDate.setFullYear(startDate.getFullYear());
            const formatedUntilDate = new Date();
            formatedUntilDate.setTime(endTime.getTime());
            formatedUntilDate.setDate(endDate.getDate());
            formatedUntilDate.setMonth(endDate.getMonth());
            formatedUntilDate.setFullYear(endDate.getFullYear());

            setSendingImage(true);
            await axios.post("http://10.181.28.13:3000/users/", { name: name, validFrom: formatedFromDate, validUntil: formatedUntilDate });
            setSendingImage(false);
            Alert.alert('Sucesso', 'Cadastro realizado!')
            navigation.navigate("Liberar");

        } catch (error) {
            console.log(error);
        }
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsMultipleSelection: true,
            aspect: [9, 16],
            quality: 1,
            base64: true
        });

        if (!result.canceled) {
            let stringImages = convertToBase64StringArray(result.assets);
            setSelectedImages(stringImages);
            setImagesPicked(true);
        }
    };

    const onChangeStartDate = (event: DateTimePickerEvent, selectedDate?: Date): void => {
        const currentDate = selectedDate || startDate;
        setShowStartDate(false);
        setStartDate(currentDate);
        setStartDatePicked(true);
    };

    const onChangeStartTime = (event: DateTimePickerEvent, selectedTime?: Date): void => {
        const currentTime = selectedTime || startTime;
        setShowStartTime(false);
        setStartTime(currentTime);
        setStartTimePicked(true);
    };

    const onChangeEndDate = (event: DateTimePickerEvent, selectedDate?: Date): void => {
        const currentDate = selectedDate || endDate;
        setShowEndDate(false);
        setEndDate(currentDate);
        setEndDatePicked(true);
    };

    const onChangeEndTime = (event: DateTimePickerEvent, selectedTime?: Date): void => {
        const currentTime = selectedTime || endTime;
        setShowEndTime(false);
        setEndTime(currentTime);
        setEndTimePicked(true);
    };

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.lightWhite, height: "100%" }}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {sendingImage ? (
                    <LoadingComponent text='Processando...' />
                ) : (
                    <View>
                        {showStartDate && (
                            <RNDateTimePicker
                                testID="startDatePicker"
                                value={startDate}
                                mode={'date'}
                                is24Hour={true}
                                onChange={onChangeStartDate}
                            />
                        )}
                        {showStartTime && (
                            <RNDateTimePicker
                                testID="startTimePicker"
                                value={startTime}
                                mode={'time'}
                                is24Hour={true}
                                onChange={onChangeStartTime}
                            />
                        )}
                        {showEndDate && (
                            <RNDateTimePicker
                                testID="endDatePicker"
                                value={endDate}
                                mode={'date'}
                                is24Hour={true}
                                onChange={onChangeEndDate}
                            />
                        )}
                        {showEndTime && (
                            <RNDateTimePicker
                                testID="endTimePicker"
                                value={endTime}
                                mode={'time'}
                                is24Hour={true}
                                onChange={onChangeEndTime}
                            />
                        )}
                        <Text style={styles.headerText}>Novo Cadastro</Text>
                        <View style={styles.container}>
                            <View style={styles.inputsContainer}>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.text}>Nome:   </Text>
                                    <CustomInput
                                        sizeX={"60%"}
                                        setValue={onChangeName}
                                        value={name}
                                        placeholder='Seu nome'
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.text}>Início:   </Text>
                                    <View style={styles.dateTimeBtnContainer}>
                                        <TextButton
                                            sizeX="auto"
                                            text="Dia"
                                            backgroundColor={COLORS.blue}
                                            handlePress={() => setShowStartDate(true)}
                                        />
                                        {startDatePicked && <Text style={styles.dateTimeText}>{startDate.toLocaleDateString(undefined, { day: "2-digit", month: "numeric" })}</Text>}
                                    </View>
                                    <View style={styles.dateTimeBtnContainer}>
                                        <TextButton
                                            sizeX="auto"
                                            text="Horário"
                                            backgroundColor={COLORS.blue}
                                            handlePress={() => setShowStartTime(true)}
                                        />
                                        {startTimePicked && <Text style={styles.dateTimeText}>{startTime.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}</Text>}
                                    </View>
                                </View>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.text}>Fim:   </Text>
                                    <View style={styles.dateTimeBtnContainer}>
                                        <TextButton
                                            sizeX="auto"
                                            text="Dia"
                                            backgroundColor={COLORS.blue}
                                            handlePress={() => setShowEndDate(true)}
                                        />
                                        {endDatePicked && <Text style={styles.dateTimeText}>{endDate.toLocaleDateString(undefined, { day: "2-digit", month: "numeric" })}</Text>}
                                    </View>
                                    <View style={styles.dateTimeBtnContainer}>
                                        <TextButton
                                            sizeX="auto"
                                            text="Horário"
                                            backgroundColor={COLORS.blue}
                                            handlePress={() => setShowEndTime(true)}
                                        />
                                        {endTimePicked && <Text style={styles.dateTimeText}>{endTime.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}</Text>}
                                    </View>
                                </View>
                            </View>
                            <View style={styles.btnsContainer}>
                                <View style={styles.picsButtonContainer}>
                                    <FeatherIconButton
                                        featherIconName={"camera"}
                                        featherIconSize={30}
                                        featherIconColor={COLORS.blue}
                                        caption='Fotos'
                                        handlePress={() => pickImage()}
                                    />
                                    {imagesPicked &&
                                        <Icon
                                            name="check-square"
                                            color="green"
                                            size={24}
                                        />
                                    }
                                </View>
                                <TextButton
                                    sizeX={"auto"}
                                    backgroundColor={COLORS.blue}
                                    text="Cadastrar"
                                    handlePress={() => cadastrar()}
                                />
                            </View>
                        </View>
                    </View>)}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    dateTimeBtnContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    dateTimeText: {
        fontFamily: FONT.regular,
        fontSize: SIZES.small,
        color: COLORS.primary,
        textAlign: "center",
        marginLeft: 5,
        marginRight: 5
    },
    picsButtonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    scrollContainer: {
        backgroundColor: "#fff",
        margin: 10,
        marginTop: "10%",
        borderRadius: 5,
        minHeight: 300,
        justifyContent: "center",
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
        paddingRight: 0,
        fontFamily: FONT.regular,
        fontSize: SIZES.large,
        color: COLORS.secondary,
    },
    btnsContainer: {
        width: "80%",
        justifyContent: "space-around",
        height: 200,
        alignItems: "center",
    },
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 40
    }
});

export default CadastroTemporario;