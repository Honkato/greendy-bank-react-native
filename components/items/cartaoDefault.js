import { useEffect } from "react";
import { View, Image, Text } from "react-native";

function CarTaoDefault({ tipo, nome, numeros, bandeira }) {
    let tipoNome = ''
    if (tipo == 'd') {
        tipoNome = 'Débito'
    }else if (tipo == 'c'){
        tipoNome = 'Crédito'
    }else if (tipo == 'b'){
        tipoNome = "Crébito"
    }

    return (
        <View className='bg-slate-400 flex flex-col flex-wrap justify-center'>
            <View className='absolute z-50 w-11/12 h-52 p-3 flex flex-col justify-between'>
                <View className='flex flex-row justify-between'>
                    <Text className='text-white-100 font-semibold text-2xl'>Greendy Bank</Text>
                    <Text className='text-white-100 font-semibold text-xl'>{tipoNome}</Text>
                </View>
                <View>
                    <Text className='text-white-100 font-semibold text-xl'></Text>
                    <Text className='text-white-100 font-semibold text-xl'>{numeros}</Text>
                    <Text className='text-white-100 font-semibold text-xl'>00/00</Text>
                </View>
                <View className='flex flex-row justify-between'>
                    <Text className='text-white-100 font-semibold text-2xl'>{nome}</Text>
                    <Text className='text-white-100 font-semibold text-xl'>{bandeira}</Text>
                </View>
            </View>
            <Image className="w-11/12 h-52 rounded-3xl z-400" source={require('../../assets/cartao.png')}></Image>
        </View>
    );
}

export default CarTaoDefault;