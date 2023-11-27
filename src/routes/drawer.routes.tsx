import { createDrawerNavigator } from "@react-navigation/drawer";
import { Feather } from '@expo/vector-icons';

import BottomTabs from "./bottomTabs.routes";
//import StackCadastrar from "./stackcadastrar.routes";
import StackProfile from "./stackprofile.routes";
import { DrawerContentScrollView, DrawerItemList, DrawerItem, DrawerContentComponentProps } from "@react-navigation/drawer";

import { COLORS } from "../../constants";

import HeaderButton from "../components/common/HeaderButton";
import { images } from "../../constants";

const Drawer = createDrawerNavigator();

import { StackTypes } from "../screens/SignUp";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    const navigation = useNavigation<StackTypes>();

    const signOut = async () => {
        try {
            console.log("Removendo token...")
            await AsyncStorage.removeItem('token');
            console.log("Token removido");
            navigation.navigate("SignIn")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
                label="Sair"
                onPress={() => signOut()}
                icon={({ size, color }) => <Feather name="log-out" size={size} color={color} />}
            />
        </DrawerContentScrollView>
    );
}

const ProfileDrawer = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerRight: () => <HeaderButton iconUrl={images.profile} handlePress={() => null} />,
                headerTitle: ""
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
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
