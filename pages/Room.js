import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Image, Button, Text, TouchableOpacity, Dimensions } from "react-native";
import Chat from "../components/Chat";
import axios from "axios";
import { Card } from 'react-native-paper';
const screenWidth = Dimensions.get('window').width;

import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import API from "../env/API";
export default function Room({ navigation }) {
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
    useEffect(() => {
        getListChat();
        getUserProfile();
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
