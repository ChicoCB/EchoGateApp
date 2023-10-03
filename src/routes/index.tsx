import { NavigationContainer } from '@react-navigation/native';

import StackSignIn from './stacksignin.routes';

const Routes = () => {
    return (
        <NavigationContainer>
            <StackSignIn />
        </NavigationContainer>
    )
}

export default Routes;