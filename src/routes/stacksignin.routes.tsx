import { createStackNavigator } from '@react-navigation/stack';
import { StackNavigationProp } from '@react-navigation/stack';

import SignIn from '../screens/SignIn';
import ProfileDrawer from './drawer.routes';

const Stack = createStackNavigator();

type StackNavigation = {
    ProfileDrawer: undefined;
}

export type StackTypes = StackNavigationProp<StackNavigation>;

const StackSignIn = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="signIn"
                component={SignIn}
            />
            <Stack.Screen
                name="ProfileDrawer"
                component={ProfileDrawer}
            />
        </Stack.Navigator>
    )
}

export default StackSignIn;
