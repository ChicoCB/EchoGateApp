import { NavigationContainer } from '@react-navigation/native';

import MainStack from './mainstack.routes';

const Routes = () => {
    return (
        <NavigationContainer>
            <MainStack />
        </NavigationContainer>
    )
}

export default Routes;