import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from '@expo/vector-icons';

import StackLiberar from "./stackliberar.routes";
import Home from '../screens/Home';
import Notificacoes from "../screens/Notificacoes";

const Tabs = createBottomTabNavigator();

const BottomTabs = () => {

    return (
        <Tabs.Navigator
            screenOptions={{ headerShown: false, tabBarStyle: { height: 60 } }}
        >
            <Tabs.Screen
                name="tabHome"
                component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />,
                    tabBarLabel: "Home"
                }} />
            <Tabs.Screen
                name="stackliberar"
                component={StackLiberar}
                options={{
                    tabBarIcon: ({ color, size }) => <Feather name="user-plus" color={color} size={size} />,
                    tabBarLabel: "Liberações"
                }} />
            <Tabs.Screen
                name="notificacoes"
                component={Notificacoes}
                options={{
                    tabBarIcon: ({ color, size }) => <Feather name="bell" color={color} size={size} />,
                    tabBarLabel: "Notificações"
                }} />
        </Tabs.Navigator>
    )
}
export default BottomTabs;