import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Google from "expo-google-app-auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../env/API';
export const FirstPage = ({ navigation }) => {
    const signInWithGoogleAsync = async () => {
        try {
            const result = await Google.logInAsync({
                iosClientId: '777537428201-gtom0i1vt6d6ji3prin6nr7qfrkt6bp7.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
                responseType: "code",
                shouldAutoExchangeCode: false,
                expire_in:36000,
                extraParams: {
                    access_type: "offline"
                },
            });
            
            if (result.type === 'success') {
                console.log(result);
                try {
                    await AsyncStorage.setItem("token", result.idToken);
                }catch(e){
                    console.log(e);
                }
                console.log(result.refreshToken);
                const isExist = await API.auth();
                console.log(isExist);
                if (!isExist) {
                    navigation.navigate("SignUp", {
                        userInfo: result.user
                    });
                } else {
                    navigation.navigate("BottomNav");
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <View style={styles.container}>
            <View style={[styles.column, { justifyContent: 'center' }]}>
                <View style={styles.topRightCornor}></View>
                <View style={[styles.row, { justifyContent: 'center', marginBottom: 100 }]}>
                    <View style={[styles.column]}>
                        <View>
                            <Text style={{
                                textAlign: 'center',
                                color: "#FF6280",
                                fontSize: 72,
                                fontWeight: 'bold'
                            }}>
                                Yuemna
                            </Text>
                        </View>
                        <View style={{ marginTop: 15 }}>
                            <Text style={{
                                textAlign: 'center',
                                fontSize: 40,
                                color: '#464646'
                            }}>
                                Hi, welcome
                            </Text>
                        </View>
                        <View style={{ marginTop: 15 }}>
                            <Text style={{
                                textAlign: 'center',
                                fontSize: 22,
                                color: '#7B7B7B'

                            }}>
                                เข้าสู่ระบบ
                            </Text>
                            <Text style={{
                                textAlign: 'center',
                                fontSize: 22,
                                color: '#7B7B7B'
                            }}>
                                ด้วยบัญชีมหาลัย
                            </Text>
                        </View>
                        <View style={[styles.row, { justifyContent: 'center', marginTop: 15 }]}>
                            <TouchableOpacity
                                onPress={() => signInWithGoogleAsync()}
                            >
                                <View style={[styles.google]}>
                                    <Text style={{
                                        textAlign: 'center',
                                        fontSize: 40,
                                        color: "white",
                                        fontWeight: 'bold',
                                    }}>G</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.textBottom}>
                    <Text style={{ textAlign: 'center', color: "#C6C6C6" }}>
                        {`Computer Science, Faculty of Science,\nPrince of Songkla university`}
                    </Text>
                </View>
                <View style={styles.bottomLeftCornor}></View>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    topRightCornor: {
        width: 200,
        height: 200,
        backgroundColor: '#FF6280',
        borderRadius: 100,
        position: 'absolute',
        right: -100,
        top: -50
    },
    bottomLeftCornor: {
        width: 200,
        height: 200,
        backgroundColor: '#FF6280',
        borderRadius: 100,
        position: 'absolute',
        left: -70,
        bottom: -30
    },
    textBottom: {
        position: 'absolute',
        bottom: 10,
        right: 0,
        left: 0,
        zIndex: 999
    },
    google: {
        height: 62,
        width: 62,
        borderRadius: 100,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#FF6280',
    },
    row: {
        flexDirection: 'row',
    },
    column: {
        flexDirection: 'column',
        height: '100%',
    },
    container: {
        flex: 1,
    }
})