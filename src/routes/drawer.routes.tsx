import { createDrawerNavigator } from "@react-navigation/drawer";
import { Feather } from '@expo/vector-icons';

import BottomTabs from "./bottomTabs.routes";
import StackCadastrar from "./stackcadastrar.routes";
import StackProfile from "./stackprofile.routes";

import HeaderButton from "../components/common/HeaderButton";
import { images } from "../../constants";

const Drawer = createDrawerNavigator();

const ProfileDrawer = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerRight: () => <HeaderButton iconUrl={images.profile} handlePress={() => null} />,
                headerTitle: ""
            }} >
            <Drawer.Screen
                name="drawerHome"
                component={BottomTabs}
                options={{
                    title: "Home",
                    drawerIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />
                }} />
            <Drawer.Screen
                name="drawerProfile"
                component={StackProfile}
                options={{
                    title: "Meu perfil",
                    drawerIcon: ({ color, size }) => <Feather name="user" color={color} size={size} />
                }} />
        </Drawer.Navigator>
    )
}

export default ProfileDrawer;
