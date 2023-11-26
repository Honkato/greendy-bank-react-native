import { StatusBar } from 'expo-status-bar';
import { View, Text, Pre, Pressable } from "react-native";
import { withExpoSnack } from 'nativewind';
import { styled } from "nativewind";
import GoBack from '../../components/items/goBack.js';
import BaseInput from '../../components/items/baseInput.js';
import { useEffect, useState } from 'react';
import api from '../../components/services/api.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const Text = styled(Text);
// const View = styled(View);
// const StyleTO = styled(Pressable);


export default function Confirmation({ navigation }) {
    const menu = <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M20.75 7a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75Zm0 5a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75Zm0 5a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75Z" clip-rule="evenodd" /></svg>
    const [password, setPassword] = useState('S#nha123456')
    const [cpf, setCpf]=useState(0)
    // useEffect(()=>{
    //     withPassword()
    // })
    useEffect(()=>{
        AsyncStorage.getItem('mu').then((res)=>{
            setCpf(JSON.parse(res).cpf)
        })
    })
    const goLogin = () => {
        navigation.navigate(-1)
    }
    const goHome = () => {
        navigation.navigate('Nav')
    }
    const withPassword = () => {
        api.post('auth/jwt/create/', {
            identifier: cpf,
            password: password
        }).then((res)=>{
            AsyncStorage.setItem('dados', JSON.stringify(res.data))
            goHome()
        }).catch(()=>{
            alert('senha errada')
        })
        
    }
    return (
        // <View className="bg-[#71BD97]">
        //     <Text>aaaa</Text>

        // </View>
        // <View className='bg-[#71BD97] h-screen flex flex-col w-screen justify-around'>
        <View className="bg-[#71BD97] flex flex-col w-screen h-[100vh] justify-">
            <GoBack />
            <View>
                <Pressable onPress={withPassword}>
                    <Text>PASSWORD</Text>
                </Pressable>
            </View>
            <View className='flex justify-end flex-1'>
            <View className='flex flex-col mx-3 mb-[50%]'>
                <Text className='font-light text-lg'>Password {cpf}</Text>
                <BaseInput secureTextEntry={true} param={password} setParam={setPassword} maxLength={200} type={'default'} placeholder={'Text here your password'} />
                <Pressable className="m-3 p-5 w-max h-6 flex items-center justify-center rounded-lg bg-[#070C0A]" onPress={() => withPassword()}><Text className='text-green-light-bright'>Login</Text></Pressable>
            </View>
            </View>
            

        </View>
    );


}

