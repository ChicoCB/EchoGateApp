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

const Notificacoes = () => {
    const { data, isLoading, error } = useGetFromDatabase("events")
    const [ListaNotificacoes, setListaNotificacoes] = useState<any>([]);
    useEffect(() => {
        if (data) {
            setListaNotificacoes(data);
        }
    }, [data])

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.lightWhite }}>
            <View>
                {isLoading ? (
                    <LoadingComponent text='Carregando...' />
                ) : (
                    <FlatList
                        contentContainerStyle={{ paddingBottom: 200 }}
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