import { ImageSourcePropType } from 'react-native';
import { images } from "../constants";

//Aqui provavelmente vamos obter esses dados do banco de dados

export interface cadastroPermanente {
    id: string;
    name: string;
    data_ini: string;
    image: ImageSourcePropType;
}

const ListaPermanentes: cadastroPermanente[] = [
    {
        id: "1",
        name: "Fulano",
        data_ini: "10/10/23",
        image: images.profile
    },
    {
        id: "2",
        name: "Ciclano",
        data_ini: "9/10/23",
        image: images.profile
    },
    {
        id: "3",
        name: "Beltrano",
        data_ini: "8/10/23",
        image: images.profile
    },
    {
        id: "4",
        name: "Beltrano2",
        data_ini: "8/10/23",
        image: images.profile
    },
    {
        id: "5",
        name: "Beltrano3",
        data_ini: "8/10/23",
        image: images.profile
    }
]

export default ListaPermanentes;