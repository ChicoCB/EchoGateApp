import { images } from "../constants";
import { ImageSourcePropType } from 'react-native';

//Aqui provavelmente vamos obter esses dados do banco de dados

export interface profile {
    id: string;
    name: string;
    email: string;
    data_cadastro: string;
    image: ImageSourcePropType;
}


const ListaProfiles: profile[] = [
    {
        id: "1",
        name: "Fulano",
        email: "fulano@gmail.com",
        data_cadastro: "10/10/23",
        image: images.profile
    },
    {
        id: "2",
        name: "Ciclano",
        email: "fulano@hotmail.com",
        data_cadastro: "10/10/23",
        image: images.profile
    },
    {
        id: "3",
        name: "Beltrano",
        email: "fulano@yahoo.com",
        data_cadastro: "10/10/23",
        image: images.profile
    }
]

export default ListaProfiles;