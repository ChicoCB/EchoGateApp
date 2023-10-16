import { StyleSheet, Text, View, SafeAreaView, ScrollView, TextInput, Image, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker'

import { StackTypes } from '../../routes/stackliberar.routes';

import { COLORS, SIZES, FONT, icons } from "../../../constants";

import FeatherIconButton from '../../components/common/FeatherIconButton';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import TextButton from '../../components/common/TextButton';

import LoadingComponent from '../../components/common/LoadingComponent';
import CustomInput from '../../components/common/customInput';
import Icon from 'react-native-vector-icons/Feather';
import { SERVER_IP } from '../../../constants';
import axios from 'axios';

const convertToBase64StringArray = (imageAssets: ImagePicker.ImagePickerAsset[]) => {
    let stringImages = [];

    for (const imageAsset of imageAssets) {
        stringImages.push(imageAsset.base64);
    }

    return stringImages;
}

const CadastroPermanente = () => {
    const navigation = useNavigation<StackTypes>();
    const [name, onChangeName] = useState('');
    const [imagesPicked, setImagesPicked] = useState(false);
    const [selectedImages, setSelectedImages] = useState<(string | null | undefined)[]>([]);
    const [sendingImage, setSendingImage] = useState(false);


    const cadastrar = async () => {
        if (name == "" || !imagesPicked) {
            Alert.alert('Erro', 'Campos inválidos!')
            return;
        }
        try {
            setSendingImage(true);
            console.log("Cadastrando permanente...")
            await axios.post(`http://${SERVER_IP}/users/`, { name: name, pictures: selectedImages, validFrom: new Date() });
            //FUSO HORARIO TA ERRADO
            console.log("Cadastro realizado.")
            Alert.alert('Sucesso', 'Cadastro realizado!');
            setSelectedImages([]);
            setImagesPicked(false);
            onChangeName('');
            navigation.navigate("Liberar");
        } catch (error) {
            alert(error)
        } finally {
            setSendingImage(false);
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

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.lightWhite, height: "100%" }}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {sendingImage ?
                    <LoadingComponent text='Processando...' />
                    :
                    <View>
                        <Text style={styles.headerText}>Novo Cadastro</Text>
                        <View style={styles.container}>
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputText}>Nome:   </Text>
                                <CustomInput
                                    sizeX={"60%"}
                                    setValue={onChangeName}
                                    value={name}
                                    placeholder='Seu nome'
                                />
                            </View>
                            <View style={styles.btnsContainer}>
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
                                        size={35}
                                    />
                                }
                                <TextButton
                                    sizeX={"auto"}
                                    backgroundColor={COLORS.blue}
                                    text="Cadastrar"
                                    handlePress={() => cadastrar()}
                                />
                            </View>
                        </View>
                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        backgroundColor: "#fff",
        margin: 10,
        marginTop: "20%",
        borderRadius: 5,
        minHeight: 300,
        justifyContent: "center",
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