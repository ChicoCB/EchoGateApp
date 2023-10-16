import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

import Home from '../screens/Home';
import Camera from '../screens/Camera';

const Stack = createStackNavigator();

type StackNavigation = {
    Camera: undefined;
}

export type StackTypes = StackNavigationProp<StackNavigation>;

const StackHome = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false }}
                name="Home"
                component={Home}
            />
            <Stack.Screen
                options={{ headerTitle: "Home" }}
                name="Camera"
                component={Camera}
            />
        </Stack.Navigator>
    )
}

export default StackHome;
