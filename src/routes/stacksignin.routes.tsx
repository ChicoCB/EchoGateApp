import { createStackNavigator } from '@react-navigation/stack';
import { StackNavigationProp } from '@react-navigation/stack';

import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';

const Stack = createStackNavigator();

type StackNavigation = {
    SignUp: undefined;
    ProfileDrawer: undefined;
}

export type StackTypes = StackNavigationProp<StackNavigation>;

const SignInStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{ headerTitle: "Sign In" }}
            />
        </Stack.Navigator>
    )
}

export default SignInStack;
