import { StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { COLORS, SIZES, FONT } from '../../../constants';

import ListaPermanentes from '../../../data/acessosPermanentes';
import AcessoPermanenteItem from '../../components/Cadastros/AcessoPermanenteItem';
import ListaTemporarios from '../../../data/acessosTemporarios';
import AcessoTemporarioItem from '../../components/Cadastros/AcessoTemporarioItem';
import FlatListSeparator from '../../components/common/FlatListSeparator';

import FeatherIconButton from '../../components/common/FeatherIconButton';

import { StackTypes } from '../../routes/stackliberar.routes';

const Liberar = () => {
    const navigation = useNavigation<StackTypes>();

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.lightWhite, height: "100%" }}>
            <Text style={styles.listHeaderText}>Cadastros Permanentes</Text>
            <View style={styles.listContainer}>
                <FlatList
                    contentContainerStyle={{ paddingBottom: 40 }}
                    style={styles.flatList}
                    data={ListaPermanentes}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <AcessoPermanenteItem {...item} />}
                    ItemSeparatorComponent={FlatListSeparator}
                />
            </View>
            <Text style={styles.listHeaderText}>Cadastros Temporários</Text>
            <View style={styles.listContainer}>
                <FlatList
                    contentContainerStyle={{ paddingBottom: 40 }}
                    style={styles.flatList}
                    data={ListaTemporarios}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <AcessoTemporarioItem {...item} />}
                    ItemSeparatorComponent={FlatListSeparator}
                />
            </View>
            <View style={styles.btnsContainer}>
                <FeatherIconButton
                    featherIconSize={35}
                    featherIconName={"plus-square"}
                    featherIconColor={"green"}
                    handlePress={() => { navigation.navigate("CadastroPermanente") }}
                    caption="Permanente"
                />
                <FeatherIconButton
                    featherIconSize={35}
                    featherIconName={"plus-square"}
                    featherIconColor={"green"}
                    handlePress={() => { navigation.navigate("CadastroTemporario") }}
                    caption="Temporário"
                />
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