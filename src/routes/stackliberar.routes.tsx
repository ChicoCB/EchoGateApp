import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

import Liberar from '../screens/Liberacoes/Liberar';
import CadastroPermanente from '../screens/Liberacoes/CadastroPermanente';
import CadastroTemporario from '../screens/Liberacoes/CadastroTemporario';


const Stack = createStackNavigator();

type StackNavigation = {
    CadastroPermanente: undefined;
    CadastroTemporario: undefined;
}

export type StackTypes = StackNavigationProp<StackNavigation>;

const StackLiberar = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="liberar"
                component={Liberar}
            />
            <Stack.Screen
                name="CadastroPermanente"
                component={CadastroPermanente}
            />
            <Stack.Screen
                name="CadastroTemporario"
                component={CadastroTemporario}
            />
        </Stack.Navigator>
    )
}

export default StackLiberar;
