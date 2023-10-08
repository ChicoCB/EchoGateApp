import { StyleSheet, Text, View, SafeAreaView, ScrollView, TextInput, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker'

import { StackTypes } from '../../routes/stackliberar.routes';

import { COLORS, SIZES, FONT, icons } from "../../../constants";

import FeatherIconButton from '../../components/common/FeatherIconButton';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import TextButton from '../../components/common/TextButton';

import CustomInput from '../../components/common/customInput';
import Icon from 'react-native-vector-icons/Feather';

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

    const cadastrar = async () => {
        if (name == "" || !imagesPicked) {
            Alert.alert('Erro', 'Campos inválidos!')
            return;
        }
        try {
            await axios.post("http://192.168.0.173:3000/users/", { name: name, pictures: selectedImages });
            Alert.alert('Sucesso', 'Cadastro realizado!');
            setSelectedImages([]);
            setImagesPicked(false);
            onChangeName('');
            navigation.navigate("Liberar");
        } catch (error) {
            alert(error)
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
        <SafeAreaView style={{ backgroundColor: COLORS.lightWhite }}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
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