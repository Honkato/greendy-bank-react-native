import { View, Text, Image } from "react-native";
import cartao from '../../assets/cartao.png';
import CarTaoDefault from "../../components/items/cartaoDefault";
import { useEffect, useState } from "react";
import { useSession } from "../../components/services/ApiToken";
import api from "../../components/services/api";
import { Pressable } from "react-native";
import BaseInput from "../../components/items/baseInput";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";

function Cartao({ navigation }) {

    const [open, setOpen] = useState(false);
    // const [atualizar, setAtualizar] = useState(true);
    const [value, setValue] = useState(null);
    const [token, setToken] = useState('');
    const [items, setItems] = useState([
        { label: 'Debito', value: 'd' },
        { label: 'Crédito', value: 'c' },
        { label: 'Crébito', value: 'b' }
    ]);

    const { user } = useSession(navigation)
    const [pedir, setPedir] = useState(false)
    const [cartoes, setCartoes] = useState([{
        id: 1,
        conta: 1,
        tipo: "d",
        numero: "2304.8548.1571.6506",
        bandeira: "G"
    }])
    useEffect(() => {
        AsyncStorage.getItem('dados').then((res) => { setToken(JSON.parse(res).access) })
    }, [])

    const pegarCartao = useEffect(() => {
        console.log(user)
        console.log(cartoes)
        api.get('bank/cartoes/')
            .then((res) => {
                console.log(res)
                setCartoes(res.data)
            })
    }, [user, pedir])

    const pedirCartao = () => {
        if (value == null) {
            alert('selecione um tipo de cartão')
            return
        }
        api.post('bank/cartoes/', {
            tipo: value
        }, { headers: { Authorization: "JWT " + token } })
            .then((res) => {
                // setAtualizar(!atualizar)
                setPedir(!pedir)
                alert('seu cartao foi criado')
            })
            .catch((res) => {
                alert(res.response.data)
                console.log(res);
            })
    }
    return (
        <View className='h-full w-max bg-green-dark-swamp'>

            <Text>
                CARTAO
            </Text>
            {!pedir ?
                <View className='w-max flex flex-col justify-center'>
                    <ScrollView className='h-screen pb-16 w-min'>
                        <View className=''>
                            {cartoes.map((item) =>
                                <View className='py-5 w-max' key={item.id}>
                                    {item.conta == user.conta.id ?
                                        <CarTaoDefault tipo={item.tipo} nome={user.nome} numeros={item.numero} bandeira={item.bandeira} />
                                        : <View></View>
                                    }
                                </View>
                            )}
                            <Pressable className='py-5 w-max' onPress={() => setPedir(!pedir)}>
                                <CarTaoDefault numeros={'Clique aqui para adicionar um cartao'} />
                            </Pressable>
                        </View>
                    </ScrollView>
                </View>
                : <View>
                    <View className='flex flex-col mx-3 h-96'>
                        <Pressable onPress={() => setPedir(!pedir)} className='p-2 rounded-lg bg-[#070C0A]'>
                            <Text className='text-[#9AEBA3] '>
                                voltar
                            </Text>
                        </Pressable>
                        <Text className='font-light text-lg'>tipo</Text>
                        <DropDownPicker
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                        />
                        <Text>This is the rest of the form.</Text>
                        <Pressable onPress={() => pedirCartao()} className='h-10 w-52 rounded-lg bg-[#070C0A]'>
                            <Text className='text-[#9AEBA3] '>
                                Pedir
                            </Text>
                        </Pressable>
                        {/* <BaseInput maxLength={10} type={'number'} placeholder={'value'} param={valor} setParam={setValor} /> */}
                        {/* <TextInput placeholderTextColor={ColorGradient('dark-thin')} className='bg-[#9AEBA3] rounded-full p-1 pl-2' onChangeText={e => (e)} placeholder= /> */}

                    </View>
                </View>
            }

        </View>
    );
}

export default Cartao;