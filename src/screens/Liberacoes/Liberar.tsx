import { StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { COLORS, SIZES, FONT } from '../../../constants';

import AcessoPermanenteItem from '../../components/Cadastros/CadastroPermanenteItem';
import AcessoTemporarioItem from '../../components/Cadastros/CadastroTemporarioItem';
import FlatListSeparator from '../../components/common/FlatListSeparator';

import FeatherIconButton from '../../components/common/FeatherIconButton';

import { StackTypes } from '../../routes/stackliberar.routes';
import useGetFromDatabase from '../../../data/useGetFromDatabase';
import { useEffect, useState } from 'react';
import LoadingComponent from '../../components/common/LoadingComponent';
import { SERVER_IP } from '../../../constants';
import axios, { AxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

const getListaPermanentes = (ListaCadastros: any) => {
    const ListaPermanentes = [];
    if (ListaCadastros != null) {
        for (const cadastro of ListaCadastros) {
            if (cadastro.validUntil == null && cadastro.validFrom != null) {
                ListaPermanentes.push(cadastro);
            }
        }
    }

    return ListaPermanentes;
}

const getListaTemporarios = (ListaCadastros: any) => {
    const ListaPermanentes = [];
    if (ListaCadastros != null) {
        for (const cadastro of ListaCadastros) {
            if (cadastro.validUntil != null && cadastro.validFrom != null) {
                ListaPermanentes.push(cadastro);
            }
        }
    }

    return ListaPermanentes;
}

const Liberar = () => {
    const navigation = useNavigation<StackTypes>();
    //const { data, isLoading: isFetching, error } = useGetFromDatabase("users/all");

    const [isUpdatingPerms, setIsUpdatingPerms] = useState(false);
    const [isUpdatingTemps, setIsUpdatingTemps] = useState(false);
    const [ListaPermanentes, setListaPermanentes] = useState<any>([]);
    const [ListaTemporarios, setListaTemporarios] = useState<any>([]);

    // useEffect(() => {
    //     if (data) {
    //         setListaPermanentes(getListaPermanentes(data));
    //         setListaTemporarios(getListaTemporarios(data));
    //     }
    // }, [data])

    useFocusEffect(React.useCallback(() => {
        updateListas();
        //updateListaTemporarios();
    }, []))

    const updateListas = async () => {
        try {
            console.log("Atualizando Listas...")
            const token = await AsyncStorage.getItem('token');
            const options: AxiosRequestConfig<any> = {
                method: "get",
                url: `http://${SERVER_IP}/users/all`,
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            };

            setIsUpdatingPerms(true);
            setIsUpdatingTemps(true);
            const response = await axios.request(options);
            setListaPermanentes(getListaPermanentes(response.data));
            setListaTemporarios(getListaTemporarios(response.data));
            console.log("Listas atualizadas.")
            // console.log(ListaPermanentes);
        } catch (error) {
            console.log(error);
        } finally {
            setIsUpdatingPerms(false);
            setIsUpdatingTemps(false);
        }
    }

    // const updateListaTemporarios = async () => {
    //     try {
    //         console.log("Atualizando Lista de Temporários...")
    //         const token = await AsyncStorage.getItem('token');
    //         const options: AxiosRequestConfig<any> = {
    //             method: "get",
    //             url: `http://${SERVER_IP}/users/all`,
    //             headers: {
    //                 "Authorization": `Bearer ${token}`
    //             }
    //         };
    //         setIsUpdatingTemps(true);
    //         const response = await axios.request(options);
    //         setListaTemporarios(getListaTemporarios(response.data));
    //         console.log("Lista de temporários atualizada.")
    //         //console.log(ListaPermanentes);
    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         setIsUpdatingTemps(false);
    //     }
    // }

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.lightWhite, height: "100%" }}>
            <View style={{ height: "100%" }}>
                <Text style={styles.listHeaderText}>Cadastros Permanentes</Text>
                <View style={styles.listContainer}>
                    {isUpdatingPerms ? (
                        <LoadingComponent text="Carregando..." />
                    ) : (
                        <FlatList
                            contentContainerStyle={{ paddingBottom: 500 }}
                            style={styles.flatList}
                            data={ListaPermanentes}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => <AcessoPermanenteItem {...item} atualizarLista={() => updateListas()} />}
                            ItemSeparatorComponent={FlatListSeparator}
                        />
                    )}
                </View>
                <Text style={styles.listHeaderText}>Cadastros Temporários</Text>
                <View style={styles.listContainer}>
                    {isUpdatingTemps ? (
                        <LoadingComponent text="Carregando..." />
                    ) : (
                        <FlatList
                            contentContainerStyle={{ paddingBottom: 500, paddingTop: 10 }}
                            style={styles.flatList}
                            data={ListaTemporarios}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => <AcessoTemporarioItem {...item}
                                atualizarLista={() => updateListas()}
                            />}
                            ItemSeparatorComponent={FlatListSeparator}
                        />
                    )}
                </View>
                <View style={styles.btnsContainer}>
                    <FeatherIconButton
                        featherIconSize={35}
                        featherIconName={"plus-square"}
                        featherIconColor={"green"}
                        handlePress={() => {
                            navigation.navigate("CadastroPermanente");
                        }}
                        caption="Permanente"
                    />
                    <FeatherIconButton
                        featherIconSize={35}
                        featherIconName={"plus-square"}
                        featherIconColor={"green"}
                        handlePress={() => {
                            navigation.navigate("CadastroTemporario");
                        }}
                        caption="Temporário"
                    />
                </View>
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({

    listHeaderText: {
        fontFamily: FONT.bold,
        fontSize: SIZES.xLarge,
        color: COLORS.primary,
        marginTop: 20,
        textAlign: "center"
    },
    listContainer: {
        height: "30%",
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 10,
        elevation: 10, //Android sombra

        //ios sombra (tem q testar)
        shadowColor: COLORS.black,
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 4,
    },
    flatList: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10
    },
    btnsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: "10%",
    },
});

export default Liberar;