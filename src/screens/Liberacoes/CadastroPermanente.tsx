import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { StackTypes } from '../../routes/stackliberar.routes';

import { COLORS, SIZES, FONT, icons } from "../../../constants";

import GenericButton from '../../components/common/GenericButton';
import { useNavigation } from '@react-navigation/native';

const CadastroPermanente = () => {
    const navigation = useNavigation<StackTypes>();

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <Text>Cadastro permanente</Text>
                </View>
                <View style={styles.container}>
                    <GenericButton name={"arrow-left"} size={35} color={"black"} handlePress={() => { navigation.goBack() }} />
                </View>
            </ScrollView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default CadastroPermanente;