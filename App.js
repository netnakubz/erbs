import React, { useState, useRef } from 'react';
import {
    Image, View, StyleSheet, SafeAreaView, TouchableOpacity, useColorScheme, ScrollView, Button, LogBox
} from 'react-native';
// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
import ListChat from './pages/ListChat';
import 'react-native-gesture-handler';
import {
    Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
//Screen
import { Navbar } from './components/Navbar';
import { HomeScreen } from './pages/HomeScreen';
import { LikeScreen } from './pages/LikeScreen';
import { PersonalScreen } from './pages/ProfileScreen';
import { BottomNavigation, Text } from 'react-native-paper';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ProductPage } from './pages/ProductPage';
import DirectMessage from './pages/DirectMessage';
import LendPage from './pages/LendPage';
import PickerItemLendRent from './pages/PickerItemLendRent';
import { EditUserProfile } from './pages/EditUserProfile';
import { MyItem } from "./pages/MyItem";
import { AddItem } from './pages/AddItem';
import { Category } from './pages/Category';
import { EquipmentSettings } from './pages/EquipmentSettings';
import { RentPage } from './pages/RentPage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
import * as ImagePicker from 'expo-image-picker'
import { useEffect } from 'react';
import API from './env/API';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { FirstContract } from './pages/FirstContract';
import { SecContract } from './pages/SecContract';
import { Receipt } from './pages/Receipt';
import { FirstPage } from './pages/FirstPage';
import { SaveReceipt } from './pages/SaveReceipt';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SignUp } from './pages/SignUp';
import { Serial } from "./pages/Serial";
const BottomNav = ({ setIsReady, isReady }) => {
    const [homePage, setHomePage] = useState(true);
    const navigation = useNavigation();
    const checkToken = async () => {
        let token = await AsyncStorage.getItem("token");
        // await AsyncStorage.clear("token");
        // await AsyncStorage.clear("refreshToken");
        if (token === null) {
            navigation.navigate("firstPage", {
                ready: (e) => setIsReady(e)
            });
        } else {
            setIsReady(true);
        }
    }

    useEffect(() => {
        checkToken()
    }, []);
    return (<View style={{ flex: 1 }}>
        {isReady && <Tab.Navigator
            initialRouteName='Home'
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = 'home-outline';
                    } else if (route.name === 'Like') {
                        iconName = 'heart-outline';
                    } else if (route.name === 'PersonalScreen') {
                        iconName = 'person-outline';
                    } else if (route.name === 'Chat') {
                        iconName = 'chatbubbles-outline';
                    }
                    if (focused) {
                        color = '#FF6280';
                    }
                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                }, tabBarShowLabel: false, tabBarStyle: [{
                    position: "absolute", bottom: 0, left: 0, right: 0, display: 'flex',
                }, null,],
            })}>
            <Tab.Screen name="Home" options={{ headerShown: false }}
                listeners={() => ({
                    tabPress: (e) => {
                        if (e.type === "tabPress") {
                            setHomePage(true);
                        }
                    }
                })}
                children={props => <HomeScreen isHomePage={homePage}
                    setHomeFalse={setHomePage}  {...props} />}
            />
            <Tab.Screen name="Like" options={{ title: "สิ่งที่ฉันถูกใจ" }} component={LikeScreen} />
            <Tab.Screen name="Chat" options={{ headerShown: false }} component={ListChat} />
            <Tab.Screen name="PersonalScreen"
                children={props => < PersonalScreen setIsReady={setIsReady} isReady={isReady} {...props} />}
            />
        </Tab.Navigator>}
    </View>);
}

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';
import { SearchPostBorrow } from './components/SearchPostBorrow';
import { SearchPostLend } from './components/SearchPostLend';
import { UpdateItem } from './pages/UpdateItem';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true, shouldPlaySound: true, shouldSetBadge: false,
    }),
});
export default function App() {
    LogBox.ignoreAllLogs()
    const [isReady, setIsReady] = useState(false);
    const SOCKET_URL = `${API.domain}/ws`;
    var socket = '';
    var stompClient = '';
    var connected = false;
    socket = new SockJS(SOCKET_URL);
    const connectSocket = async () => {
        const data = await API.getUserProfile();
        stompClient = Stomp.over(socket);
        stompClient.connect({}, (frame) => {
            connected = true;

            stompClient.subscribe(`/notification-${data.userId}`, async (val) => {
                console.log(val);
                await schedulePushNotification(val);
            })
        }, (error) => {
            console.log(error);
            connected = false;
        });
    }
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    async function registerForPushNotificationsAsync() {
        let token;
        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        return token;
    }

    async function schedulePushNotification(message) {
        let string = JSON.parse(message.body);
        await Notifications.scheduleNotificationAsync({
            content: {
                title: string.sender, body: string.message, data: { data: 'goes here' }, sound: true
            }, trigger: { seconds: 2 },
        });
    }

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);
    useEffect(() => {
        if (isReady === true) connectSocket();
    }, [isReady === true]);
    return (<SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen children={() => <BottomNav setIsReady={setIsReady} isReady={isReady} />}
                    options={{ headerShown: false }} name="BottomNav" />
                <Stack.Screen component={ProductPage} name="ProductPage" />
                <Stack.Screen component={DirectMessage} name="DirectMessage" />
                <Stack.Screen component={LendPage} name="LendPage" options={{ title: "โพสต์ปล่อยเช่า" }} />
                <Stack.Screen component={RentPage} name="RentPage" options={{ title: "โพสต์ขอยืม" }} />
                <Stack.Screen component={PickerItemLendRent} name="PickerItemLendRent" />
                <Stack.Screen component={EditUserProfile} name="EditUserProfile" />
                <Stack.Screen component={MyItem} name="MyItem" options={{ title: "อุปกรณ์ของฉัน" }} />
                <Stack.Screen component={AddItem} name="AddItem" options={{ title: "เพิ่มอุปกรณ์" }} />
                <Stack.Screen component={Category} name="Category" options={{ title: "หมวดหมู่" }} />
                <Stack.Screen component={FirstContract} name="firstContract" options={{ title: "ข้อตกลง" }} />
                <Stack.Screen component={SecContract} name="secContract" options={{ title: "ข้อตกลง" }} />
                <Stack.Screen component={EquipmentSettings} name="EquipmentSettings"
                    options={{ title: "ตั้งค่าอุปกรณ์" }} />
                <Stack.Screen component={SaveReceipt} name="SaveReceipt" />
                <Stack.Screen component={Receipt} name="ใบเสร็จ" />
                <Stack.Screen component={SignUp} options={{ headerShown: false }} name="SignUp" />
                <Stack.Screen component={FirstPage} name="firstPage" options={{ headerShown: false }} />
                <Stack.Screen component={Serial} name="Serial" />
                <Stack.Screen component={SearchPostBorrow} name="SearchPostBorrow" options={{ title: "ค้นหา" }} />
                <Stack.Screen component={SearchPostLend} name="SearchPostLend" options={{ title: "ค้นหา" }} />
                <Stack.Screen component={UpdateItem} name="updateItem" options={{ title: "อุปกรณ์" }} />
            </Stack.Navigator>
        </NavigationContainer>
    </SafeAreaProvider>);
}