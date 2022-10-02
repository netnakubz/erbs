import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { DismissKeyboard } from "../components/DismissKeybord";
import { Section } from "../components/Section";
import API from "../env/API";
import { useNavigation } from "@react-navigation/native";
const InputField = (props) => {
    const { value, onChange, type, name, placeholder } = props;
    return (
        <Section marginTop={1}>
            <View style={[styles.row]}>
                <View style={[styles.row, { width: "35%" }]}>
                    <Text>{name}</Text>
                    <Text style={{ color: "#FF6280" }}> *</Text>
                </View>
                <View style={{ width: "100%", height: '100%' }}>
                    <TextInput
                        placeholder={placeholder}
                        placeholderTextColor={"grey"}
                        value={value}
                        keyboardType="default"
                        onChangeText={(e) => onChange(e)}
                    />
                </View>
            </View>
        </Section>
    );
}

export const SignUp = ({ route }) => {
    const navigation = useNavigation();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const handleFirstName = (e) => {
        setFirstName(e);
    }
    const handleLastName = (e) => {
        setLastName(e);
    }
    const handleEmail = (e) => {
        setEmail(e);
    }
    const handlePhoneNumber = (e) => {
        setPhoneNumber(e);
    }
    const updateInfo = async () => {
        const user = {
            name: firstName,
            surname: lastName,
            email: email,
            tel: phoneNumber,
        }
        await API.addOrUpdateUser(user);
        navigation.navigate("BottomNav");
    }
    useState(() => {
        const { userInfo } = route.params;
        setFirstName(userInfo.givenName);
        setLastName(userInfo.familyName);
        setEmail(userInfo.email);
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <DismissKeyboard>
                <View style={{height:"100%"}}>
                    <KeyboardAvoidingView>
                        <View style={{ marginTop: 30 }}>
                            <Text>กรอกข้อมูลเพื่อลงชื่อเข้าใจงาน</Text>
                        </View>
                        <InputField
                            value={firstName}
                            onChange={handleFirstName}
                            name="ชื่อจริง"
                            placeholder={"กรอกชื่อจริง"}
                        />
                        <InputField
                            value={lastName}
                            onChange={handleLastName}
                            name="นามสกุล"
                            placeholder="กรอกนามสกุล"
                        />
                        <InputField
                            value={email}
                            onChange={handleEmail}
                            type="email-address"
                            name="อีเมล"
                            placeholder="อีเมล"
                        />
                        <InputField
                            value={phoneNumber}
                            onChange={handlePhoneNumber}
                            type="phone-pad"
                            name="เบอร์โทรศัพท์"
                            placeholder="080-000-0000"
                        />
                    </KeyboardAvoidingView>
                    <View style={{
                        backgroundColor: 'white',
                        height: 70,
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: "absolute",
                        bottom: 0,
                        width: "100%"
                    }}>
                        <TouchableOpacity
                            onPress={() => updateInfo()}
                        >
                            <View style={{
                                backgroundColor: "#FF6280",
                                width: 300,
                                height: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 30
                            }}>
                                <Text style={{ color: 'white', fontSize: 20 }}>ยืนยัน</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </DismissKeyboard>
        </SafeAreaView >
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flexDirection: 'row'
    },
    col: {
        flexDirection: 'column'
    }
});