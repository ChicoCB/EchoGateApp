import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';

import { COLORS, FONT, SIZES, images } from '../../constants';
import { useState } from 'react';
import TextButton from '../components/common/TextButton';
import CustomInput from '../components/common/customInput';
import { Alert } from 'react-native';
import LoadingComponent from '../components/common/LoadingComponent';

import { SERVER_IP } from '../../constants';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

import { StackTypes } from '../routes/stackprofile.routes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const validInputs = (username: string, email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (username == "" || email == "" || !emailRegex.test(email)) {
        return false;
    }

    return true;
}

const Camera = () => {
    const navigation = useNavigation<StackTypes>();

    const [changingData, setChangingData] = useState(false);
    const [name, onChangeName] = useState('');
    const [email, onChangeEmail] = useState('');

    const alterar = async () => {
        if (!validInputs(name, email)) {
            Alert.alert('Erro', 'Campos inválidos!')
            return;
        }
        try {
            setChangingData(true);
            console.log("Alterando dados...")
            const userId = await AsyncStorage.getItem('id');
            const token = await AsyncStorage.getItem('token');
            await axios.put(`http://${SERVER_IP}/users/${userId}`, { name, email }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            await AsyncStorage.setItem('username', name);
            await AsyncStorage.setItem('email', email);
            console.log("Dados alterados.")
            Alert.alert('Sucesso', 'Dados alterados!');
            onChangeName('');
            onChangeEmail('');
            navigation.navigate("Profile");
        } catch (error) {
            alert(error)
        } finally {
            setChangingData(false);
        }
    }

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.lightWhite, height: "100%" }}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {changingData ?
                    <LoadingComponent text='Processando...' />
                    :
                    <View>
                        <Text style={styles.headerText}>Alterar Dados</Text>
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
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputText}>Email:   </Text>
                                <CustomInput
                                    sizeX={"60%"}
                                    setValue={onChangeEmail}
                                    value={email}
                                    placeholder='Seu nome'
                                />
                            </View>
                            <View style={styles.btnsContainer}>
                                <TextButton
                                    sizeX={"auto"}
                                    backgroundColor={COLORS.blue}
                                    text="Alterar"
                                    handlePress={() => alterar()}
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

export default Camera;