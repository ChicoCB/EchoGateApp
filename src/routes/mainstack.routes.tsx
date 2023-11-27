import { createStackNavigator } from '@react-navigation/stack';
import { StackNavigationProp } from '@react-navigation/stack';

import SignInStack from './stacksignin.routes';
import ProfileDrawer from './drawer.routes';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { check } from 'react-native-permissions';

const Stack = createStackNavigator();

type StackNavigation = {
    ProfileDrawer: undefined;
}

export type StackTypes = StackNavigationProp<StackNavigation>;

const MainStack = () => {
    const navigation = useNavigation<StackTypes>();

    const checkRemember = async () => {
        try {
            console.log("Tentando logar com token armazenado...")
            const token = await AsyncStorage.getItem('token');
            if (token !== null) {
                console.log("Obtendo remember...")
                const remember = await AsyncStorage.getItem('remember');
                console.log("Remember obtido: " + remember);
                if (remember == 'true') {
                    navigation.navigate("ProfileDrawer");
                    console.log("Logado com token armazenado.")
                }
            }
        } catch (error) {
            console.log("Falha ao logar com token armazenado.")
        }
    }

    const remember = checkRemember();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="signInStack"
                component={SignInStack}
            />
            <Stack.Screen
                name="ProfileDrawer"
                component={ProfileDrawer}
            />
        </Stack.Navigator>
    )
}

export default MainStack;
