import React, { useEffect, useState } from 'react';
import { Text, Button, Image, TouchableOpacity, TextInput, View, Pressable } from 'react-native';
import { styled } from 'nativewind';
import BaseInput from '../../components/items/baseInput';
import api from '../../components/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSession } from '../../components/services/ApiToken';

export default function Transacoes({ navigation }) {
    const { user } = useSession(navigation)
    // const { title } = route.params
    const [next, setNext] = useState(false)
    const [pessoa, setPessoa] = useState('')
    const [chavePix, setChavePix] = useState('')
    const [valor, setValor] = useState('')
    const [descricao, setDescricao] = useState('')
    const [token, setToken] = useState('')
    const confirmChavePix = () => {
        if (chavePix.length == 0) {
            return
        }
        api.get(`bank/contas/${chavePix}`)
            .then((res) => {
                console.log(res.data);
                if (res.data[0].id == undefined) {
                    alert('u can not pass')
                } else {
                    setNext(!next)
                }
                api.get(`bank/clientes/${res.data[0].cliente}/`)
                .then((res)=>setPessoa(res.data.nome))

            })
    }
    useEffect(() => {
        AsyncStorage.getItem('dados').then((res) => setToken(JSON.parse(res).access))
    }, [])
    const sendPix = () => {
        if (isNaN(valor)){
            alert("valor precisa ser um numero")
            return
        }
        if (valor <= 0) {
            alert("não é possivel mandar essa quantidade")
            return
        }
        if (descricao.length <= 0) {
            alert("É preciso ter uma drescrição")
            return
        }
        console.log(token);
        api.post('bank/movimentacao/', {
            remetente: '',
            remetenteNome: '',
            destinatario: '',
            destinatarioNome: '',
            chavePix: chavePix,
            tipo: 'p',
            valor: valor,
            descricao: descricao,
        }, {
            headers: {
                Authorization: "JWT "+ token,
            },
        })
            .then((res) => {
                // alert(res)
                alert('Transferencia realizada com sucesso')
            })
            .catch((res) => {
                console.log(res);
            })
    }

    return (
        <View className={'bg-green-dark-water flex-1'}>
            {/* <Text>{title}</Text> */}

            {!next ?
                <>
                    <View className='flex flex-col mx-3'>
                        <Text className='font-light text-lg'>Pix Key</Text>
                        <BaseInput maxLength={14} placeholder={'Pix key...'} param={chavePix} setParam={setChavePix} />
                        {/* <TextInput placeholderTextColor={ColorGradient('dark-thin')} className='bg-[#9AEBA3] rounded-full p-1 pl-2' onChangeText={e => (e)} placeholder= /> */}
                    </View>
                    <Pressable onPress={() => confirmChavePix()} className='h-10 w-52 rounded-lg bg-[#070C0A]'>
                        <Text className='text-[#9AEBA3] '>
                            Continue
                        </Text>
                    </Pressable>
                </> : <>
                    <View>
                        <Text>
                            pix para: {pessoa}
                        </Text>
                    </View>
                    <View className='flex flex-col mx-3'>
                        <Text className='font-light text-lg'>Value</Text>
                        <BaseInput maxLength={10} type={'number'} placeholder={'value'} param={valor} setParam={setValor} />
                        {/* <TextInput placeholderTextColor={ColorGradient('dark-thin')} className='bg-[#9AEBA3] rounded-full p-1 pl-2' onChangeText={e => (e)} placeholder= /> */}
                    </View>
                    <View className='flex flex-col mx-3'>
                        <Text className='font-light text-lg'>Description</Text>
                        <BaseInput maxLength={100} placeholder={'description'} param={descricao} setParam={setDescricao} />
                        {/* <TextInput placeholderTextColor={ColorGradient('dark-thin')} className='bg-[#9AEBA3] rounded-full p-1 pl-2' onChangeText={e => (e)} placeholder= /> */}
                    </View>
                    <Pressable onPress={() => sendPix()} className='h-10 w-52 rounded-lg bg-[#070C0A]'>
                        <Text className='text-[#9AEBA3] '>
                            Continue
                        </Text>
                    </Pressable>
                </>}

        </View>
    )
}