import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, ScrollView, Image, Button, Text, TouchableOpacity, Dimensions } from "react-native";
import Chat from "../components/Chat";
import axios from "axios";
import { Card } from 'react-native-paper';
const screenWidth = Dimensions.get('window').width;
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import API from "../env/API";
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});
export default function Room({ navigation }) {

    //Notification
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
        } else {
            alert('Must use physical device for Push Notifications');
        }

        return token;
    }
    async function schedulePushNotification(message) {
        let string = JSON.parse(message.body);
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "ข้อความ",
                body: string,
                data: { data: 'goes here' },
            },
            trigger: { seconds: 2 },
        });
    }
    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    const SOCKET_URL = `${API.domain}/ws`;
    var socket = '';
    var stompClient = '';
    var connected = false;
    socket = new SockJS(SOCKET_URL);
    const [rooms, setRoom] = useState([]);
    const [userProfile, setUserProfile] = useState([]);
    const deleteBtn = () => {
        console.log("delete")
    }
    const muteBtn = () => {
        console.log("mute");
    }
    const renderLeftActions = (progress, dragX) => {
        const trans = dragX.interpolate({
            inputRange: [0, 50, 100, 101],
            outputRange: [0, 0, 0, 1],
        });
        return (
            <View style={styles.rightBtn}>

                <View>
                    <TouchableOpacity
                        onPress={() => deleteBtn()}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            transform: [{ translateX: trans }]
                        }}
                    >
                        <View style={{
                            width: 60,
                            height: 40,
                            backgroundColor: "#FF0031",
                            borderRadius: 30,
                            justifyContent: 'center',
                        }}>
                            <Text
                                style={{
                                    textAlign: "center",
                                    margin: 'auto',
                                    color: 'white',
                                    fontSize: 18,
                                    fontWeight: "bold"
                                }}
                            >
                                ลบ
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => muteBtn()}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            transform: [{ translateX: trans }]
                        }}
                    >
                        <View style={{
                            width: 50,
                            height: 40,
                            backgroundColor: "#FED15C",
                            borderRadius: 30,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Ionicons name="notifications-off-outline" size={18} />
                        </View>
                    </TouchableOpacity>
                </View >
            </View >
        );
    }
    const getListChat = async () => {
        setRoom(await API.getListChat());
    };
    const getUserProfile = async () => {
        const data = await API.getUserProfile();
        setUserProfile(data);
    }
    const connectSocket = async () => {
        const data = await API.getUserProfile();
        stompClient = Stomp.over(socket);
        stompClient.connect(
            {},
            (frame) => {
                connected = true;
                stompClient.subscribe(`/roomList/user-${data.userId}`, async (val) => {
                    const newRoom = JSON.parse(val.body);
                    setRoom(newRoom);
                });
            },
            (error) => {
                console.log(error);
                connected = false;
            }
        );
    }
    useEffect(() => {
        getListChat();
        getUserProfile();
        connectSocket();
    }, []);
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View>
                <GestureHandlerRootView>
                    {rooms.map((room, index) => (
                        <Swipeable
                            key={index}
                            renderRightActions={renderLeftActions}
                        >
                            <Chat
                                props={room}
                                user={userProfile}
                                navigation={navigation}
                            />
                        </Swipeable>
                    ))}
                </GestureHandlerRootView>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    col: {
        flexDirection: 'column',
        flexWrap: 'wrap',
    },
    card: {
        padding: 10,
    },
    chatName: {
        fontWeight: 'bold',
    },
    rightBtn: {
        flexDirection: 'row'
    }
});
