import Routes from './src/routes/index'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { useEffect } from 'react';

export default function App() {

  //Carregamento de fontes (MUDAR DE LUGAR DEPOIS, SE POSSIVEL)
  const [fontsLoaded] = useFonts(
    {
      DMBold: require('./assets/fonts/DMSans-Bold.ttf'),
      DMMedium: require('./assets/fonts/DMSans-Medium.ttf'),
      DMRegular: require('./assets/fonts/DMSans-Regular.ttf')
    }
  )

  //Espera o carregamento das fontes para carregar SplashScreen
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded])

  if (!fontsLoaded) return null;

  return (
    <Routes />
  );
}