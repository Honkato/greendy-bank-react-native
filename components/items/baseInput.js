import { TextInput } from "react-native-gesture-handler";
import ColorGradient from "../colorGradient/colorGradient";
import { View } from "react-native";

function BaseInput({ placeholder, param, setParam, maxLength, type, secureTextEntry }) {
    return (
        <View>
            {secureTextEntry ?
                <TextInput
                    placeholderTextColor={ColorGradient('dark-thin')}
                    className='bg-[#9AEBA3] rounded-lg w-full p-2 pl-2'
                    value={param}
                    secureTextEntry
                    keyboardType={type}
                    maxLength={maxLength}
                    onChangeText={e => setParam(e)}
                    placeholder={placeholder}
                /> :
                <TextInput
                    placeholderTextColor={ColorGradient('dark-thin')}
                    className='bg-[#9AEBA3] rounded-lg w-full p-2 pl-2'
                    value={param}
                    keyboardType={type}
                    maxLength={maxLength}
                    onChangeText={e => setParam(e)}
                    placeholder={placeholder}
                />}
        </View>
    );
}

export default BaseInput;