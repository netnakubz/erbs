import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState, useEffect } from "react";
import { Keyboard, View, Text, StyleSheet, Image, TouchableOpacity, TextInput, TouchableWithoutFeedback } from "react-native";
import { DismissKeyboard } from "../components/DismissKeybord";
import * as ImagePicker from 'expo-image-picker'

export const EditUserProfile = ({ navigation, route }) => {
    const { name, userId } = route.params;
    const { user } = route.params;
    const [tel, setTel] = useState("0987654321");
    const handleSaveBtn = () => {
        navigation.goBack();
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            // allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            allowsMultipleSelection: true
        });
        let key = (Math.random() + 1).toString(36).substring(2);
        if (!result.cancelled) {
            setImages(prev => [...prev, { key: key, uri: result.uri }]);
        }
    };
    useEffect(() => {
        navigation.setOptions({
            title: "แก้ไขข้อมูลส่วนตัว"
        })
    }, []);
    return (
        <DismissKeyboard>
            <View style={styles.container}>
                <View style={[styles.userImgView, styles.row]}>
                    <View>
                        <Image
                            style={styles.userImg}
                            source={{ uri: "https://i.pinimg.com/736x/b1/16/0f/b1160fdd10b71b095c19366845fd6b3e.jpg" }}
                        />
                    </View>
                    <View>
                        <View>
                            <Text
                                style={styles.titleName}
                            >{user.name}</Text>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => pickImage()}
                            >
                                <Text style={{ color: '#FF6280' }}>เปลี่ยนรุปโปรไฟล์</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View>
                    <View style={[styles.row, styles.inputInfo]}>
                        <View>
                            <Text>
                                Email
                            </Text>
                        </View>
                        <View>
                            <Text>
                                {user.email}
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.row, styles.inputInfo]}>
                        <View>
                            <Text>
                                Tel
                            </Text>
                        </View>
                        <View
                            style={{
                                position: 'absolute',
                                right: 30,
                                width: 1000
                            }}
                        >
                            <TextInput
                                style={styles.input}
                                value={tel}
                                maxLength={10}
                                keyboardType="numeric"
                                textAlign="right"

                                onChange={(e) => {
                                    setTel(e);
                                }}
                            />
                        </View>
                        <Ionicons name="chevron-forward" size={20} />
                    </View>
                </View>
                <View style={[styles.saveBtn, styles.row]}>
                    <TouchableOpacity
                        style={styles.btnStyle}
                        onPress={() => handleSaveBtn()}
                    >
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>บันทึก</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </DismissKeyboard>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    row: {
        flexDirection: 'row',
    },
    userImgView: {
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 20
    },
    titleName: {
        fontSize: 30,
        color: '#464646'
    },
    userImg: {
        width: 120,
        height: 120,
        borderRadius: 120 / 2
    },

    inputInfo: {
        backgroundColor: 'white',
        height: 48,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5
    },
    saveBtn: {
        position: "absolute",
        justifyContent: "center",
        bottom: 10,
        width: '100%',

    },
    btnStyle: {
        backgroundColor: "#FF6280",
        borderRadius: 40,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
    },
})