import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import api from "../../components/services/api";
import { ScrollView } from "react-native-gesture-handler";

function Extrato({ navigation }) {
    const [extrato, setExtrato] = useState([])
    const [user, setUser] = useState(0)
    const [token, setToken] = useState()
    useEffect(() => {
        AsyncStorage.getItem('dados').then((res) => { setToken(JSON.parse(res).access) })
    }, [])

    useEffect(() => {
        if (token == undefined) {
            return
        }
        api.get('auth/users/me/', { headers: { Authorization: "JWT " + token } })
            .then((res) => {
                setUser(res.data.id)
                api.get("bank/movimentacao/", { headers: { Authorization: "JWT " + token } }
                )
                    .then((response) => {
                        console.log(response)
                        setExtrato(response.data)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })
            .catch((res) => {

            })

    }, [token]);
    return ( 
        <View>
            <Text>
                EXTRATO
            </Text>
            {extrato.length == 0 ?
                                    <View className="flex flex-1 justify-center">
                                        <Text className="text-center text-2xl font-bold">
                                            Não há extratos
                                        </Text>
                                    </View>
                                    : <ScrollView className='h-screen pb-20'>
                                        {extrato.map((item) =>
                                            <View className="flex flex-col m-3">
                                                <View className={item.remetente == user ? "flex flex-col p-2 border-2 border-rose-600 rounded-lg" : "flex flex-col p-2 border-2 rounded-lg"} key={item.id}>
                                                    <Text>
                                                        <Text className="font-bold">Nome: </Text>{item.remetente == user ? item.destinatarioNome : item.remetenteNome}
                                                    </Text>
                                                    <Text>
                                                        <Text className="font-bold">Chave Pix:</Text>{item.remetente == user ? item.chavePix : " To You "}
                                                    </Text>
                                                    <Text>
                                                        <Text className="font-bold">Valor: </Text>{item.remetente == user ? "-" : '+'}R${item.valor}
                                                    </Text>
                                                    <Text>
                                                        <Text className="font-bold">Observação: </Text>{item.descricao}
                                                    </Text>
                                                </View>
                                            </View>
                                        )}
                                    </ScrollView>}
        </View>
     );
}

export default Extrato;