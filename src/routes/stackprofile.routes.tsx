import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';

import Profile from '../screens/Profile';

const Stack = createStackNavigator();

const StackProfile = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="profile"
                component={Profile}
            />
        </Stack.Navigator>
    )
}

export default StackProfile;
