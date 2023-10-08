import { StyleSheet, Text, View, SafeAreaView, ScrollView, TextInput, Button } from 'react-native';
import { StackTypes } from '../../routes/stackliberar.routes';

import { COLORS, SIZES, FONT, icons } from "../../../constants";

import FeatherIconButton from '../../components/common/FeatherIconButton';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import TextButton from '../../components/common/TextButton';
import CustomInput from '../../components/common/customInput';

import * as ImagePicker from 'expo-image-picker'

import Icon from 'react-native-vector-icons/Feather';

interface props {
    name: string;
    images: ImagePicker.ImagePickerAsset[];
    imagesPicked: boolean;
    init_date: string;
    end_date: string;
    init_time: string;
    end_time: string;
    navigation: StackTypes;
}

const cadastrar = async ({ name, images, imagesPicked, init_date, end_date, init_time, end_time, navigation }: props) => {
    if (name == "" || !imagesPicked) {
        alert("Campos inválidos.");
        return;
    }
    alert("Funfou.");
    // try {
    //     await axios.post("http://192.168.0.173:3000/users/", { name: username, password, email });
    //     navigation.navigate("SignIn");
    //     alert("Funfou");
    // } catch (error) {
    //     console.log(error);
    // }
}

const CadastroTemporario = () => {
    const navigation = useNavigation<StackTypes>();
    const [name, onChangeName] = useState('');
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [startTime, setStartTime] = useState<Date>(new Date());
    const [endTime, setEndTime] = useState<Date>(new Date());
    const [showStartDate, setShowStartDate] = useState(false);
    const [showEndDate, setShowEndDate] = useState(false);
    const [showStartTime, setShowStartTime] = useState(false);
    const [showEndTime, setShowEndTime] = useState(false);
    const [startDatePicked, setStartDatePicked] = useState(false);
    const [endDatePicked, setEndDatePicked] = useState(false);
    const [startTimePicked, setStartTimePicked] = useState(false);
    const [endTimePicked, setEndTimePicked] = useState(false);


    const [imagesPicked, setImagesPicked] = useState(false);
    let images: ImagePicker.ImagePickerAsset[];

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
            images = result.assets;
            setImagesPicked(true);
        }
    };

    const onChangeStartDate = (selectedDate: Date) => {
        setShowStartDate(false);
        setStartDate(selectedDate);
        setStartDatePicked(true);
    };

    const onChangeStartTime = (selectedDate: Date) => {
        setShowStartTime(false);
        setStartTime(selectedDate);
        setStartTimePicked(true);
    };

    const onChangeEndDate = (selectedDate: Date) => {
        setShowEndDate(false);
        setEndDate(selectedDate);
        setEndDatePicked(true);
    };

    const onChangeEndTime = (selectedDate: Date) => {
        setShowEndTime(false);
        setEndTime(selectedDate);
        setEndTimePicked(true);
    };

    //TERMINAR
    const cadastrar = async () => {
        if (name == "" ||
            !imagesPicked ||
            !startDatePicked ||
            !startTimePicked ||
            !endDatePicked ||
            !endTimePicked) {
            alert("Campos inválidos.");
            return;
        }
        alert("Funfou.");
        // try {
        //     await axios.post("http://192.168.0.173:3000/users/", { name: username, password, email });
        //     navigation.navigate("SignIn");
        //     alert("Funfou");
        // } catch (error) {
        //     console.log(error);
        // }
    }


    return (
        <SafeAreaView style={{ backgroundColor: COLORS.lightWhite }}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
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
                            {showStartDate && (
                                <DateTimePicker
                                    testID="startDatePicker"
                                    value={startDate}
                                    mode={'date'}
                                    is24Hour={true}
                                    onChange={() => onChangeStartDate(startDate)}
                                />
                            )}
                            <View style={styles.dateTimeBtnContainer}>
                                <TextButton
                                    sizeX="auto"
                                    text="Horário"
                                    backgroundColor={COLORS.blue}
                                    handlePress={() => setShowStartTime(true)}
                                />
                                {startTimePicked && <Text style={styles.dateTimeText}>{startTime.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}</Text>}
                            </View>
                            {showStartTime && (
                                <DateTimePicker
                                    testID="startTimePicker"
                                    value={startTime}
                                    mode={'time'}
                                    is24Hour={true}
                                    onChange={() => onChangeStartTime(startTime)}
                                />
                            )}
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
                            {showEndDate && (
                                <DateTimePicker
                                    testID="EndDatePicker"
                                    value={endDate}
                                    mode={'date'}
                                    is24Hour={true}
                                    onChange={() => onChangeEndDate(endDate)}
                                />
                            )}
                            <View style={styles.dateTimeBtnContainer}>
                                <TextButton
                                    sizeX="auto"
                                    text="Horário"
                                    backgroundColor={COLORS.blue}
                                    handlePress={() => setShowEndTime(true)}
                                />
                                {endTimePicked && <Text style={styles.dateTimeText}>{endTime.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}</Text>}
                            </View>
                            {showEndTime && (
                                <DateTimePicker
                                    testID="endTimePicker"
                                    value={endTime}
                                    mode={'time'}
                                    is24Hour={true}
                                    onChange={() => onChangeEndTime(endTime)}
                                />
                            )}
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