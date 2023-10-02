import { images } from "../constants";
import { ImageSourcePropType } from 'react-native';

//Aqui provavelmente vamos obter esses dados do banco de dados

export interface cadastroTemporario {
    id: string;
    name: string;
    data_ini: string;
    data_fim: string;
    image: ImageSourcePropType;
}


const ListaTemporarios: cadastroTemporario[] = [
    {
        id: "1",
        name: "Fulano",
        data_ini: "10/10/23",
        data_fim: "12/10/23",
        image: images.profile
    },
    {
        id: "2",
        name: "Ciclano",
        data_ini: "9/10/23",
        data_fim: "11/10/23",
        image: images.profile
    },
    {
        id: "3",
        name: "Beltrano",
        data_ini: "8/10/23",
        data_fim: "10/10/23",
        image: images.profile
    }
]

export default ListaTemporarios;