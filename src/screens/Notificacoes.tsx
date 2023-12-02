import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';

import { COLORS, SIZES, FONT } from '../../constants';

import FlatListSeparator from '../components/common/FlatListSeparator';
import NotificacaoItem from '../components/NotificacaoItem';
import useGetFromDatabase from '../../data/useGetFromDatabase';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_IP } from '../../constants';
import LoadingComponent from '../components/common/LoadingComponent';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosRequestConfig } from 'axios';

const Notificacoes = () => {
    const [ListaNotificacoes, setListaNotificacoes] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);

    useFocusEffect(React.useCallback(() => {
        atualizaNotificacoes();
    }, []))

    const atualizaNotificacoes = async () => {
        try {
            console.log("Atualizando Notificacoes...")
            const token = await AsyncStorage.getItem('token');
            const options: AxiosRequestConfig<any> = {
                method: "get",
                url: `http://${SERVER_IP}/events`,
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            };
            setIsLoading(true);
            const response = await axios.request(options);
            const lastNotifications = response.data.slice(0, 10);
            setListaNotificacoes(lastNotifications);
            console.log("Notificacoes atualizadas.")
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.lightWhite }}>
            <View>
                {isLoading ? (
                    <LoadingComponent text='Carregando...' />
                ) : (
                    <FlatList
                        contentContainerStyle={{ paddingBottom: 500 }}
                        style={styles.list}
                        data={ListaNotificacoes}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <NotificacaoItem {...item} />}
                        ItemSeparatorComponent={FlatListSeparator}
                    />
                )}
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: COLORS.lightWhite,
        padding: 10
    },
});

export default Notificacoes;