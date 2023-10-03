import { StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { COLORS, SIZES, FONT, icons, SHADOWS } from '../../../constants';

import ListaPermanentes from '../../../data/acessosPermanentes';
import AcessoPermanenteItem from '../../components/Cadastros/AcessoPermanenteItem';
import ListaTemporarios from '../../../data/acessosTemporarios';
import AcessoTemporarioItem from '../../components/Cadastros/AcessoTemporarioItem';
import FlatListSeparator from '../../components/common/FlatListSeparator';
import TextButton from '../../components/common/TextButton';

import FeatherIconButton from '../../components/common/FeatherIconButton';

import { StackTypes } from '../../routes/stackliberar.routes';

const Liberar = () => {
    const navigation = useNavigation<StackTypes>();

    return (
        <SafeAreaView>
            <Text style={styles.text}>Cadastros Permanentes</Text>
            <View style={styles.listContainer}>
                <FlatList
                    contentContainerStyle={{ paddingBottom: 40 }}
                    style={styles.list}
                    data={ListaPermanentes}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <AcessoPermanenteItem {...item} />}
                    ItemSeparatorComponent={FlatListSeparator}
                />
            </View>
            <Text style={styles.text}>Cadastros Temporários</Text>
            <View style={styles.listContainer}>
                <FlatList
                    contentContainerStyle={{ paddingBottom: 40 }}
                    style={styles.list}
                    data={ListaTemporarios}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <AcessoTemporarioItem {...item} />}
                    ItemSeparatorComponent={FlatListSeparator}
                />
            </View>
            <View style={styles.liberarButtonsContainer}>
                <View style={styles.buttonContainer}>
                    <FeatherIconButton
                        featherIconSize={35}
                        featherIconName={"plus-square"}
                        featherIconColor={"green"}
                        handlePress={() => { navigation.navigate("CadastroPermanente") }} />
                    <Text style={styles.text2}>Permanente</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <FeatherIconButton
                        featherIconSize={35}
                        featherIconName={"plus-square"}
                        featherIconColor={"green"}
                        handlePress={() => { navigation.navigate("CadastroTemporario") }} />
                    <Text style={styles.text2}>Temporário</Text>
                </View>
            </View>
        </SafeAreaView >
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
        height: 200,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: COLORS.black
    },
    list: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 5,
        padding: 10
    },
    liberarButtonsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: 30,
        marginBottom: 30
    },
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
});

export default Liberar;