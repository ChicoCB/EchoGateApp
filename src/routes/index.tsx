import { NavigationContainer } from '@react-navigation/native';

import ProfileDrawer from './drawer.routes';

const Routes = () => {
    return (
        <NavigationContainer>
            <ProfileDrawer />
        </NavigationContainer>
    )
}

export default Routes;