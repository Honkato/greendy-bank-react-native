import { View, Text } from "react-native";
import Saldo from "../../components/olho/saldo";
import { useSession } from "../../components/services/ApiToken";
import { useEffect, useState } from "react";
import api from "../../components/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BaseInput from "../../components/items/baseInput";
import { Pressable } from "react-native-web";

function Emprestimo({ navigation }) {
    const { user } = useSession(navigation)
    const [valor, setValor] = useState(0)
    const [descricao, setDescricao] = useState('')
    const [token, setToken] = useState('')

    useEffect(() => {
        AsyncStorage.getItem('dados').then((res) => { setToken(JSON.parse(res).access) })
    }, [])

    const makeEmprestimo = () => {
        api.post('bank/emprestimo/', {
            valor: valor,
            observacao: descricao
        }, { headers: { Authorization: "JWT " + token } })
            .then((res) => {
                console.log(res.data)
                if (res.data.aprovado){
                    alert("Emprestimo Aprovado, total a pagar R$"+res.data.valorPagar)
                }else{
                    alert('Emprestimo negado, valor muito alto')
                }
            })
            .catch((res)=>{
                alert(res.response.data)
            })
    }
    return (
        <View>
            <Text>
                Emprestimo
            </Text>

            <View className='flex flex-col mx-3'>
                <Text className='font-light text-lg'>Valor do Emprestimo</Text>
                <BaseInput maxLength={10} param={valor} type={"default"} setParam={setValor} placeholder={"Value"}></BaseInput>
            </View>

            <View className='flex flex-col mx-3'>
                <Text className='font-light text-lg'>Descricao Breve</Text>
                <BaseInput maxLength={20} param={descricao} type={"default"} setParam={setDescricao} placeholder={"Text here a description"}></BaseInput>
            </View>
            <Pressable className="m-3 p-5 w-max h-6 flex items-center justify-center rounded-lg bg-[#070C0A]" onPress={() => makeEmprestimo()}><Text className='text-green-light-bright'> Confirm</Text></Pressable>
            <Saldo saldo={user.conta.saldo} />

        </View>
    );
}

export default Emprestimo;