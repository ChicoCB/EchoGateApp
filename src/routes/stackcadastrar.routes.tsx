import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';

import CadastrarUser from '../screens/CadastrarUser';

const Stack = createStackNavigator();

const StackCadastrar = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="cadastrar"
                component={CadastrarUser}
            />
        </Stack.Navigator>
    )
}

export default StackCadastrar;
