
//Aqui provavelmente vamos obter esses dados do banco de dados

export interface notificacao {
    id: string;
    data: string;
    conteudo: string;
}


const ListaNotificacoes: notificacao[] = [
    {
        id: "1",
        data: "01/01/2000",
        conteudo: "Fulano foi liberado",
    },
    {
        id: "2",
        data: "02/01/2000",
        conteudo: "Ciclano foi liberado",
    },
    {
        id: "3",
        data: "03/01/2000",
        conteudo: "Beltrano foi liberado",
    },
    {
        id: "4",
        data: "04/01/2000",
        conteudo: "Outra pessoa foi liberada",
    },
    {
        id: "5",
        data: "05/01/2000",
        conteudo: "Mais alguém foi liberado",
    },
    {
        id: "6",
        data: "06/01/2000",
        conteudo: "Alguém mais foi liberado",
    },
    {
        id: "7",
        data: "07/01/2000",
        conteudo: "Nova pessoa foi liberada",
    },
    {
        id: "8",
        data: "08/01/2000",
        conteudo: "Outra pessoa nova foi liberada",
    },
    {
        id: "9",
        data: "09/01/2000",
        conteudo: "Mais uma pessoa foi liberada",
    },
    {
        id: "10",
        data: "10/01/2000",
        conteudo: "Pessoa adicional foi liberada",
    },
    {
        id: "11",
        data: "11/01/2000",
        conteudo: "Última pessoa foi liberada",
    },
]

export default ListaNotificacoes;