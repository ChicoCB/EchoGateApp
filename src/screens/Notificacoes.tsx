import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';

import { COLORS, SIZES, FONT } from '../../constants';

import ListaNotificacoes from '../../data/notificacoes';
import FlatListSeparator from '../components/common/FlatListSeparator';
import NotificacaoItem from '../components/NotificacaoItem';
import useGetFromDatabase from '../../data/getFromDatabase';

const Notificacoes = () => {
    //const {ListaNotificacoes, isLoading, error} = getFromDatabase("");

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.lightWhite }}>
            <View>
                <FlatList
                    contentContainerStyle={{ paddingBottom: 200 }}
                    style={styles.list}
                    data={ListaNotificacoes}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <NotificacaoItem {...item} />}
                    ItemSeparatorComponent={FlatListSeparator}
                />
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