import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    Dimensions,
    Animated
} from 'react-native';
import Constants from 'expo-constants';
import Hr from "./Hr";
import { useNavigation } from '@react-navigation/native';
const { interpolate, Extrapolate } = Animated;
const bannerImage = require('../assets/snack-icon.png');
const BANNER_HEIGHT = 180;
import Ionicons from '@expo/vector-icons/Ionicons';
import API from '../env/API';
import { Button } from 'react-native-elements';
export const Profile = ({ isOwnerProfile, items, receipts, setIsReady, isReady }) => {
    const navigation = useNavigation();
    const [isLogout, setIsLogout] = useState(false);

    const [profile, setProfile] = useState({
        userId: 10001,
        firstName: "สมชาย",
        lastName: "รักดี",
        email: "6210210000@psu.ac.th",
        Tel: '0800000000'
    });
    const [toPay, setToPay] = useState(0);
    const handlePressEditProfile = () => {
        navigation.navigate("EditUserProfile", {
            user: profile
        });
    }
    const handlePressAddItem = () => {
        navigation.navigate("AddItem");
    }
    const signOut = async () => {
        const data = await API.logout({ setIsLogout });
        setIsReady(false);
        navigation.navigate("firstPage", {
            ready: (e) => setIsReady(e)
        })
    }
    useLayoutEffect(() => {

    })
    const getMyProfile = async () => {
        const data = await API.getUserProfile();
        navigation.setOptions({
            title: `${data.name} ${data.surname}`,
            headerRight: () => {
                return (
                    <TouchableOpacity onPress={async () => signOut()}>
                        <Ionicons name='exit-outline' size={35} />
                    </TouchableOpacity>
                )
            }
        })
    }
    useEffect(() => {
        getMyProfile();
    }, []);

    return (
        <View style={{ width: "100%" }}>
            <View style={{ flexDirection: 'row', width: "100%", alignItems: "flex-start", justifyContent: 'space-around' }}>
                <View style={{ width: "20%" }}>
                    <Image
                        style={styles.profileImage}
                        resizeMode="cover"
                        source={{ uri: "https://i.pinimg.com/736x/b1/16/0f/b1160fdd10b71b095c19366845fd6b3e.jpg" }}
                    />
                </View>
                <View style={{ flexDirection: 'column', width: "70%" }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Text>{items.length}</Text>
                            <Text>สินค้า</Text>
                        </View>
                        {isOwnerProfile &&
                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <Text>{receipts.length}</Text>
                                <Text>ใบเสร็จ</Text>
                            </View>
                        }
                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Text>{toPay}</Text>
                            <Text>ต้องจ่าย</Text>
                        </View>
                    </View>
                    {isOwnerProfile &&
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                                <TouchableOpacity
                                    style={{
                                        borderWidth: 1,
                                        height: 40,
                                        width: "100%",
                                        borderRadius: "50%",
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                    onPress={() => {
                                        handlePressEditProfile();
                                    }}
                                >
                                    <Text
                                        style={{ color: '#FF6280', fontSize: 18 }}
                                    >แก้ไขข้อมูลส่วนตัว</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                                <TouchableOpacity
                                    style={{
                                        borderWidth: 1,
                                        height: 40,
                                        width: "100%",
                                        borderRadius: "50%",
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                    onPress={() => {
                                        handlePressAddItem()
                                    }}
                                >
                                    <Text
                                        style={{ color: '#FF6280', fontSize: 18 }}
                                    >เพิ่มสินค้า
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        // marginTop: 80 + Constants.statusBarHeight,
        width: Dimensions.get('screen').width,
        height: BANNER_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
    },
    banner: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        width: undefined,
        height: undefined,
    },
    button: {
        height: 50,
        width: 150,
        backgroundColor: 'red',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 50
    }
});