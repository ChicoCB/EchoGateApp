import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';

import { COLORS, SIZES, FONT } from '../../constants';

import ListaNotificacoes from '../../data/notificacoes';
import FlatListSeparator from '../components/common/FlatListSeparator';
import NotificacaoItem from '../components/NotificacaoItem';

const Notificacoes = () => {
    return (
        <SafeAreaView>
            <View style={styles.listContainer}>
                <FlatList
                    contentContainerStyle={{ paddingBottom: 200 }}
                    style={styles.list}
                    data={ListaNotificacoes}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <NotificacaoItem {...item} />}
                    ItemSeparatorComponent={FlatListSeparator}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    text: {
        fontFamily: FONT.bold,
        fontSize: SIZES.xLarge,
        color: COLORS.primary,
        marginTop: 20,
        textAlign: "center"
    },
    text2: {
        fontFamily: FONT.bold,
        fontSize: SIZES.medium,
        color: COLORS.primary,
        marginTop: 5,
        textAlign: "center"
    },
    listContainer: {
        marginTop: 5
    },
    list: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 5,
        padding: 10
    },
    liberarButtonsContainer: {
        flexDirection: "row",
        height: 120,
        justifyContent: "space-around",
        alignItems: "center",
    },
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center"
    }
});

export default Notificacoes;