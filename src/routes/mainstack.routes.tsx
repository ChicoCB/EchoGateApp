import { createStackNavigator } from '@react-navigation/stack';
import { StackNavigationProp } from '@react-navigation/stack';

import SignInStack from './stacksignin.routes';
import ProfileDrawer from './drawer.routes';

const Stack = createStackNavigator();

type StackNavigation = {
    ProfileDrawer: undefined;
}

export type StackTypes = StackNavigationProp<StackNavigation>;

const MainStack = () => {
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
