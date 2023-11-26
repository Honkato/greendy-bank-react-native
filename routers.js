import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Entypo, FontAwesome, Feather } from '@expo/vector-icons';
import Login from "./screens/login";
import Home from "./screens/home";
import { withExpoSnack } from "nativewind";
import Confirmation from "./screens/confirmation";
import Register from "./screens/register";
import Transacoes from "./screens/transacoes";
import Cartao from "./screens/cartao";
import Extrato from "./screens/extrato";
import Emprestimo from "./screens/emprestimo";

const Nav = createBottomTabNavigator()
const Pilha = createStackNavigator()

function NavBar() {
    return (
        <Nav.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#5c5c5c',
                    borderTopColor: 'transparent',
                    paddingVertical: 1,
                },
                tabBarActiveTintColor: '#DAFBDA',
                tabBarInactiveTintColor: '#7f7f7f'
            }}
        >
            <Pilha.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ size, color }) => (
                        <Feather
                            name="home"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
            <Pilha.Screen
                name="Transacoes"
                component={Transacoes}
                initialParams={{title:''}}
            />
            <Pilha.Screen
                name="Cartao"
                component={Cartao}
                initialParams={{title:''}}
            />
            <Pilha.Screen
                name="Emprestimo"
                component={Emprestimo}
                initialParams={{title:''}}
            />
            <Pilha.Screen
                name="Extrato"
                component={Extrato}
                initialParams={{title:''}}
            />

        </Nav.Navigator>
    )
}

function Routers({ navigation }) {

    return (
            <NavigationContainer >
                <Pilha.Navigator screenOptions={{ headerShown: false }}>
                
                    <Pilha.Screen
                        name="Register"
                        component={Register}
                    />
                    <Pilha.Screen
                        name="Login"
                        component={Login}
                    />
                    <Pilha.Screen
                        name="Confirmation"
                        component={Confirmation}
                    />
                    <Nav.Screen name="Nav" component={NavBar} />

                </Pilha.Navigator>
            </NavigationContainer>
    );
}

export default Routers;