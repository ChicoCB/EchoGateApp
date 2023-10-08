import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

import Liberar from '../screens/Liberacoes/Liberar';
import CadastroPermanente from '../screens/Liberacoes/CadastroPermanente';
import CadastroTemporario from '../screens/Liberacoes/CadastroTemporario';


const Stack = createStackNavigator();

type StackNavigation = {
    CadastroPermanente: undefined;
    CadastroTemporario: undefined;
    Liberar: undefined;
}

export type StackTypes = StackNavigationProp<StackNavigation>;

const StackLiberar = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false }}
                name="Liberar"
                component={Liberar}
            />
            <Stack.Screen
                options={{ headerTitle: "Cadastro Permanente" }}
                name="CadastroPermanente"
                component={CadastroPermanente}
            />
            <Stack.Screen
                options={{ headerTitle: "Cadastro Temporário" }}
                name="CadastroTemporario"
                component={CadastroTemporario}
            />
        </Stack.Navigator>
    )
}

export default StackLiberar;
