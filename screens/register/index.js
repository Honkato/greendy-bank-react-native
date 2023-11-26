import React, { useEffect, useState } from "react";
import { Linking, Pressable, Text, TextInput, View } from "react-native";
// import LinearGradient from "react-native-linear-gradient";
import { bgGradient } from "nativewind"
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from 'expo-linear-gradient';
import ColorGradient from "../../components/colorGradient/colorGradient";
import BaseInput from "../../components/items/baseInput";

function Register({ navigation, route }) {
    const menu = <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M20.75 7a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75Zm0 5a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75Zm0 5a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75Z" clip-rule="evenodd" /></svg>

    

    const [name, setName] = useState('')
    const [cpf, setCpf] = useState('')
    const [agencia, setAgencia] = useState('')
    const [conta, setConta] = useState('')
    const [user, setUser] = useState([])
    const [nextId, setNextId] = useState(0)
    const [showLogin, setShowLogin] = useState(false)

    const storageNewUser = (key, value) => {
        AsyncStorage.setItem(key, value)
    }
    const getStorageUsers = (key) => {
        AsyncStorage.getItem(key).then((res) => {
            if (res == undefined || res =='[{}]' || res =='') {
                return
            }
            let tam = JSON.parse(res).length
            setUser(JSON.parse(res))
            setNextId(JSON.parse(res)[tam - 1].id + 1)
            setShowLogin(true)
            navigation.navigate('Login')
        })
    }

    useEffect(() => {
        getStorageUsers('users')
        
    }, [])


    const registrateAnAccount = () => {
        if (name == '' || agencia.length != 4 || conta.length != 6 || cpf.length != 11){
            alert('Dados inválidos')
            return
        }
        setUser([...user, { id: nextId, name: name, agencia: agencia, conta: conta }])
        storageNewUser('users', JSON.stringify([...user, { id: nextId, name: name, cpf:cpf, agencia: agencia, conta: conta }]))
        setNextId(nextId + 1)
        setShowLogin(true)
        alert('conta registrada com sucesso!')
        
    }

    const goCreateAnAccount = () => {

        console.log(user);
        console.log(nextId);

        // Linking.openURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
        Linking.openURL('https://greendy-bank.vercel.app/');
    }
    const alreadyHaveAnAccount = () => {
        navigation.navigate('Login')
    }

    return (
        <View>
            {/* <LinearGradient
            colors={['#5C9794','#22CC91']}
            > */}
            {/* <LinearGradient color={['black','white']}>aaaaaa</LinearGradient> */}
            <LinearGradient colors={[ColorGradient('light-100'), ColorGradient('dark-100')]}>
                <View className="flex flex-col w-full h-[100vh] ">
                    <View className='bg-green-dark-swamp rounded-b-3xl h-48 w-full flex flex-col items-center justify-center'>
                        {menu}
                        <Text className='ml-7 flex font-normal tracking-[29px] text-4xl text-center'>GREENDY BANK</Text>
                    </View>
                    {/* </LinearGradient> */}
                    <View className='flex items-center'>
                        <Text className='font-extralight text-3xl'>Sign In</Text>
                        <Text className='font-light text-2xl text-center'>Enter here your credentials to access your account</Text>
                    </View>
                    <View className='flex flex-col mx-3'>
                        <Text className='font-light text-lg'>Account Name</Text>
                        <BaseInput maxLength={20} param={name} type={"default"} setParam={setName} placeholder={"Text here your account name"}></BaseInput>
                    </View>
                    <View className='flex flex-col mx-3'>
                        <Text className='font-light text-lg'>Account CPF/CNPJ</Text>
                        <BaseInput maxLength={14} param={cpf} type={"numeric"} setParam={setCpf} placeholder={"Text here your CPF/CNPJ"}></BaseInput>
                        {/* <TextInput placeholderTextColor={ColorGradient('dark-thin')} className='bg-[#9AEBA3] rounded-full p-1 pl-2' onChangeText={e => (e)} placeholder= /> */}
                    </View>
                    <View className='flex flex-col mx-3'>
                        <Text className='font-light text-lg'>Agencia e Conta</Text>
                        <View className='flex flex-row'>
                            <BaseInput maxLength={4} type={"numeric"} param={agencia} setParam={setAgencia} placeholder={"Agencia withou Digito"}></BaseInput>
                            <View className='mr-2'></View>
                            <BaseInput maxLength={6} type={"numeric"} param={conta} setParam={setConta} placeholder={"Conta with Digito"}></BaseInput>
                        </View>
                    </View>
                    {/* <TextInput className='bg-[#9AEBA3] border-2 rounded-full p-1 pl-2' onChangeText={e => setPassword(e)} placeholder="password" /> */}
                    <View className='w-screen flex-wrap flex flex-row'>
                        <Pressable className="m-3 p-5 w-max h-6 flex items-center justify-center rounded-lg bg-[#070C0A]" onPress={() => registrateAnAccount()}><Text className='text-green-light-bright'>Registrate</Text></Pressable>
                        {showLogin ?
                            <Pressable className="m-3 p-5 w-max h-6 flex items-center justify-center rounded-lg bg-[#070C0A]" onPress={() => alreadyHaveAnAccount()}><Text className='text-green-light-bright'>Return Login</Text></Pressable>
                            : <View></View>
                        }
                    </View>
                    <Pressable className="m-3 h-6 rounded-lg" onPress={() => goCreateAnAccount()}><Text className='font-semibold text-[#ffff00]'> Create An Account</Text></Pressable>

                </View>
            </LinearGradient>
            {/* </View> */}
        </View >
    );
}

export default Register;