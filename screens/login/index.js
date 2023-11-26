import { StatusBar } from 'expo-status-bar';
import { View, Text, Alert, Pressable } from "react-native";
import { withExpoSnack } from 'nativewind';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddIcon from '../../components/icons/addIcon';
import { ScrollView } from 'react-native-gesture-handler';
import CarTaoDefault from '../../components/items/cartaoDefault';
// import { styled } from "nativewind";

// const Text = styled(Text);
// const View = styled(View);
// const StyleTO = styled(Pressable);


export default function Login({ navigation, route }) {
    // useEffect(()=>{
    //     goConfirm()
    // })

    const goConfirm = () => {
        AsyncStorage.setItem('mu', JSON.stringify(mainUser))
        navigation.navigate('Confirmation')
        // verification(mainUser.id)
    }
    const goRegister = () => {
        navigation.navigate('Register')
    }

    // const { name, cpf} = route.params;
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
    const [nome, setnome] = useState('nome')
    const [savedAccounts, setSavedAccounts] = useState([{}])
    const [mainUserId, setMainUserId] = useState(0)
    const a = (x) => {
        let letra = ''
        for (let i = 0; i < x; i++) {
            letra = getRandomInt(0, 9)
            letra += str(letra)
        }
        return
    }
    ///*
    useEffect(() => {
        if (JSON.stringify(savedAccounts) == "[{}]") {
            return
        }
        AsyncStorage.setItem('users', JSON.stringify(savedAccounts))
    }, [savedAccounts])

    useEffect(() => {
        AsyncStorage.getItem('users').then((res) => {
            if ((res == undefined) || (JSON.stringify(res) == '[{}]')) {
                alert("You need to cadastrate at least one account!")
                // Alert.alert("You need to cadastrate at least one account!")
                goRegister()
                return
            }
            console.log(JSON.parse(res))
            setSavedAccounts(JSON.parse(res))
            setMainUser(JSON.parse(res)[mainUserId])
        })
        // savedAccounts = AsyncStorage.getItem(key)
    }, [])
    //*/
    // const savedAccounts =
    // [
    //     {
    //         id: 0,
    //         name: 'Account',
    //         CPF: 'CPF',
    //         // encryptedPassword: 'real'
    //     },
    //         {
    //             id: 1,
    //             name: '',
    //             CPF: '',
    //             // password: password
    //         }
    //     ]
    const [mainUser, setMainUser] = useState({ id: 0 })
    useEffect(() => {
        console.log('aaaaaaaaaaaaaaaaaaaaaabbbbbbbb')
        let id = 0
        if (mainUser.id != undefined) {
            id = mainUser.id
        }
        setMainUserId(id)
        if (JSON.stringify(mainUser) == '[{}]') {
            return
        }
        AsyncStorage.setItem('mu', JSON.stringify(mainUser))
    }, [mainUser.id])

    const [accountName, setAcountName] = useState('Account')
    const [listVisible, setListVisible] = useState(false)
    const removeUser = (id) => {
        if (mainUserId == id) {
            alert('Não é possivel excluir pois voce ja esta usando essa conta')
            return
        }
        const newAccounts = []
        savedAccounts.map((item) => {
            if (item.id == id) {
                console.log(item.id)
            } else {
                newAccounts.push(item)
            }
        })
        setSavedAccounts(newAccounts)
        AsyncStorage.setItem('users', JSON.stringify(newAccounts))
        console.log(newAccounts)
    }
    const changeListVisible = () => {
        setListVisible(!listVisible);
    }
    const menu = <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M20.75 7a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75Zm0 5a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75Zm0 5a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75Z" clip-rule="evenodd" /></svg>

    return (
        // <View className="bg-[#71BD97]">
        //     <Text>aaaa</Text>

        // </View>
        // <View className='bg-[#71BD97] h-screen flex flex-col w-screen justify-around'>
        <View className="bg-[#71BD97] flex flex-col w-screen h-[100vh] justify-">
            
            {listVisible ?
                <View className="absolute z-50 flex flex-1 justify-end w-full h-full bg-[#000000ac]">
                    <View className="bg-[#599e7c] rounded-t-2xl h-[55vh]">
                        <View className="flex flex-col items-center h-full">
                            <Pressable className="flex items-center border-b w-screen" onPress={() => changeListVisible()}>
                                <Text className="font-bold">
                                    \/
                                </Text>
                            </Pressable>
                            <View className='flex flex-col items-center flex-1 justify-between w-screen'>
                                <ScrollView className='w-screen'>
                                    {savedAccounts.map((item) =>
                                        <Pressable key={item.id} onPress={async () => {
                                            savedAccounts.map((res, index) => {
                                                if (res.id == item.id) {
                                                    console.log("aaaaaaaaa")
                                                    setMainUser(savedAccounts[index])
                                                }
                                            })
                                            changeListVisible();
                                        }} className='h-20 w-full border-b-[1px] shadow-lg bg-[#71BD97] flex flex-row items-center justify-between'>
                                            <View className="flex flex-col justify-around h-max"><Text>{item.name}</Text><Text>{item.cpf}</Text><Text>{item.agencia} {item.conta}</Text></View>
                                            <Pressable onPress={() => removeUser(item.id)}>
                                                <Text className='h-10 w-10 bg-red-700 rounded-full flex items-center justify-center text-white-100 font-bold'>X</Text>
                                            </Pressable>
                                        </Pressable>
                                    )}
                                </ScrollView>
                                <View className='w-full shadow-md bg-green-dark-swamp items-center'>
                                    <Pressable className='' onPress={() => goRegister()}>
                                        <AddIcon />
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </View>
                </View> : <></>
            }
            <View className="">
                {menu}
            </View>
            <View className='w-max flex flex-1 justify-around items-center'>
                <View>
                    <Text className="">
                        GREENDY BANK
                    </Text>
                    <Text>
                        Log on
                    </Text>
                    <Text>
                        Select your account to access
                    </Text>
                </View>

                <View>
                    <View className="flex flex-row justify-between">
                        <Text className="flex flex-col">
                            <Text>
                                {mainUser.name}
                            </Text>
                            <Text>
                                {mainUser.cpf}
                            </Text>
                        </Text>
                        <Pressable className="" onPress={changeListVisible}>
                            <Text className="font-bold">
                                \/
                            </Text>
                        </Pressable>

                    </View>
                    <Text>
                        Agencia {mainUser.agencia} Conta {mainUser.conta}
                    </Text>
                </View>

                <Pressable onPress={() => goConfirm()} className='h-10 w-52 rounded-lg bg-[#070C0A]'>
                    <Text className='text-[#9AEBA3] '>
                        Sign In
                    </Text>
                </Pressable>
                <View className='flex flex-row w-screen justify-around'>
                    {/* <Pressable onPress={() => StorageNewUser("01", "aaahoy")}> */}
                    {menu}
                    {/* </Pressable> */}
                    {/* <Pressable onPress={() => getStorageUsers("01")}> */}
                    {menu}
                    {/* </Pressable> */}
                    {menu}
                </View>

            </View>
        </View>
        // </View>
    );


}

