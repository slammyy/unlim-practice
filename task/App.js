import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import Tasks from './screens/Tasks';
import Request from './screens/Request';
import Theme from './companents/Theme';
import Contacts from './screens/Contacts';
import Person from './screens/Person';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainStack = () => {
    return (
        <Stack.Navigator initialRouteName="Задачи">
            <Stack.Screen name="Новый запрос" component={Request} />
            <Stack.Screen name="Контакты клуба" component={Contacts} />
            <Stack.Screen name="Контакт" component={Person} />
            <Stack.Screen
                name="Задачи"
                component={Tasks}
                options={{
                    headerRight: () => (
                        <MaterialIcons
                            style={{ marginRight: 5 }}
                            name="account-circle"
                            size={30}
                            color="black"
                        />
                    ),
                }}
            />
        </Stack.Navigator>
    )
}

export default function App() {
    return (
        <NavigationContainer theme={Theme}>
            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: {
                        height: 100
                    },
                    tabBarShowLabel: false,
                    headerShown: false
                }}>
                <Tab.Screen
                    name='Tasks'
                    component={MainStack}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome name="check-square" size={35} color={color} />
                        ),
                        tabBarActiveTintColor: '#0762da',
                    }}
                />
                <Tab.Screen
                    name='Новости'
                    component={MainStack}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="newspaper-variant" size={35} color={color} />
                        ),
                        tabBarActiveTintColor: '#0762da',
                    }}
                />
                <Tab.Screen
                    name='Чат'
                    component={MainStack}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Entypo name="chat" size={35} color={color} />
                        ),
                        tabBarActiveTintColor: '#0762da',
                    }}
                />
                <Tab.Screen
                    name='Скидки'
                    component={MainStack}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="sale" size={35} color={color} />
                        ),
                        tabBarActiveTintColor: '#0762da',
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
