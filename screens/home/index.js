import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity } from "react-native";
import { withExpoSnack } from 'nativewind';
import { styled } from "nativewind";
import { useSession } from '../../components/services/ApiToken';
import Saldo from '../../components/olho/saldo';
import { useEffect } from 'react';

// const Text = styled(Text);
// const View = styled(View);
// const StyleTO = styled(TouchableOpacity);


export default function Home({ navigation }) {
    const menu = <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M20.75 7a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75Zm0 5a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75Zm0 5a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75Z" clip-rule="evenodd" /></svg>
    const { user } = useSession(navigation)
    const goLogin = () => {
        navigation.navigate('Login')
    }
    const nd = () => {

    }
    
    const goPix = () => {
        navigation.navigate('Transacoes')
    }
    const goCartao = () => {
        navigation.navigate('Cartao')
    }
    const goEmprestimo = () => {
        navigation.navigate('Emprestimo')
    }
    const goExtrato = () => {
        navigation.navigate('Extrato')
    }
    useEffect(() => { console.log(user) }, [user])
    return (
        // <View className="bg-[#71BD97]">
        //     <Text>aaaa</Text>

        // </View>
        // <View className='bg-[#71BD97] h-screen flex flex-col w-screen justify-around'>
        <View className="bg-[#71BD97] flex flex-col w-screen h-[100vh] justify-">

            <View className='flex flex-col h-44 justify-between bg-green-light-gradient-200 p-2 rounded-b-xl'>
                <View className='flex flex-row justify-between items-center'>
                    <TouchableOpacity onPress={goLogin}>
                        {menu}
                        <Text>
                            VOLTAR
                        </Text>
                    </TouchableOpacity>
                    <Text className='font-medium text-xl'>
                        GREENDY BANK
                    </Text>
                    <View>
                        {menu}
                        <Text>
                            NOTI...
                        </Text>
                    </View>
                </View>
                <View className=''>
                    <Text className='mb-2'>
                        Olá, {user.nome}
                    </Text>
                    <Text className=''>
                        <Saldo corText={"text-white"} tema={"black"} saldo={user.conta.saldo} />

                    </Text>
                </View>
            </View>
            <View className='flex flex-col h-2/6 w-max justify-around'>
                <View className='flex flex-row w-max justify-around'>

                    <TouchableOpacity className='flex text-center items-center justify-center' onPress={goPix}>
                        {menu}
                        <Text>
                            Transacoes Pix
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='flex text-center items-center justify-center' onPress={goCartao}>
                        {menu}
                        <Text>
                            Cartao
                        </Text>
                    </TouchableOpacity>
                </View>
                <View className='flex flex-row w-max justify-around'>
                    <TouchableOpacity className='flex text-center items-center justify-center' onPress={goEmprestimo}>
                        {menu}
                        <Text>
                            Emprestimo
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='flex text-center items-center justify-center' onPress={goExtrato}>
                        {menu}
                        <Text>
                            Extrato
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );


}

