import { createStackNavigator } from '@react-navigation/stack';
import { StackNavigationProp } from '@react-navigation/stack';

import Profile from '../screens/Profile';
import AlterarDados from '../screens/AlterarDados';

const Stack = createStackNavigator();

type StackNavigation = {
    AlterarDados: undefined;
    Profile: undefined;
}

export type StackTypes = StackNavigationProp<StackNavigation>;

const StackProfile = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false }}
                name="Profile"
                component={Profile}
            />
            <Stack.Screen
                options={{ headerTitle: "Perfil" }}
                name="AlterarDados"
                component={AlterarDados}
            />
        </Stack.Navigator>
    )
}

export default StackProfile;
