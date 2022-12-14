import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import ModalSelector from "react-native-modal-selector";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView } from "react-native";
import { DismissKeyboard } from "../components/DismissKeybord";
import { Section } from "../components/Section";
import API from "../env/API";
import { useNavigation } from "@react-navigation/native";
import { v4 as uuidv4 } from "uuid";
const InputField = (props) => {
    const { value, onChange, type = "default", name, placeholder, minLength,maxLength } = props;
    return (
        <Section marginTop={1}>
            <View style={[styles.row]}>
                <View style={[styles.row, { width: "35%" }]}>
                    <Text>{name}</Text>
                    <Text style={{ color: "#FF6280" }}> *</Text>
                </View>
                <View style={{ width: "100%", height: '100%' }}>
                    <TextInput
                        minLength={minLength}
                        maxLength={maxLength}
                        placeholder={placeholder}
                        placeholderTextColor={"grey"}
                        value={value}
                        keyboardType={type}
                        onChangeText={(e) => onChange(e)}
                    />
                </View>
            </View>
        </Section>
    );
}

export const SignUp = ({ route }) => {
    const { ready } = route.params;
    const navigation = useNavigation();
    const [isReady, setIsReady] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [idNumber, setIdNumber] = useState("");
    const [postCode, setPostCode] = useState("");
    const [road, setRoad] = useState("");
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [province, setProvince] = useState("");
    const [district, setDistrict] = useState("");
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
    const handleIdNumber = (e) => {
        setIdNumber(e);
    }
    const handlePostCode = (e) => {
        setPostCode(e);
    }
    const handleRoad = (e) => {
        setRoad(e);
    }
    const handleProvince = async (e) => {
        setDistricts([]);
        setProvince(e.province);
        await getDistrict();
    }
    const handleDistrict = (e) => {
        setDistrict(e);
    }
    const updateInfo = async () => {
        const user = {
            "email": email,
            "name": firstName,
            "surname": lastName,
            "tel": phoneNumber,
            "idNumber": idNumber,
            "homeAddressModel": {
                "district": district,
                "postCode": postCode,
                "road": road,
                "province": province
            }
        }
        await API.addOrUpdateUser(user);
        ready(true);
        navigation.navigate("BottomNav");
    }
    useEffect(() => {
        const { userInfo } = route.params;
        setFirstName(userInfo.givenName);
        setLastName(userInfo.familyName);
        setEmail(userInfo.email);
    }, []);
    const getProvinces = async () => {
        const data = await API.getProvice();
        setProvinces(data.data);
    }
    const getDistrict = async () => {
        const data = await API.getDistrict(province);
        setDistricts(data.data);
    }
    useEffect(() => {
        getProvinces();
    }, []);

    return (
        <KeyboardAvoidingView style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
        }}
            behavior="padding" enabled keyboardVerticalOffset={10}
        >
            <ScrollView >
                <DismissKeyboard>
                    <View style={{ height: "100%" }}>
                        <View style={{ marginTop: 30 }}>
                            <Text>??????????????????????????????????????????????????????????????????????????????????????????</Text>
                        </View>
                        <InputField
                            value={idNumber}
                            onChange={handleIdNumber}
                            name="?????????????????????????????????"
                            type="number-pad"
                            minLength={13}
                            maxLength={13}
                            placeholder={"?????????????????????????????????"}
                        />
                        <InputField
                            value={firstName}
                            onChange={handleFirstName}
                            name="????????????????????????"
                            placeholder={"????????????????????????????????????"}
                        />
                        <InputField
                            value={lastName}
                            onChange={handleLastName}
                            name="?????????????????????"
                            placeholder="?????????????????????????????????"
                        />
                        <InputField
                            value={email}
                            onChange={handleEmail}
                            type="email-address"
                            name="???????????????"
                            placeholder="???????????????"
                        />
                        <InputField
                            value={phoneNumber}
                            onChange={handlePhoneNumber}
                            type="phone-pad"
                            name="???????????????????????????????????????"
                            minLength={10}
                            maxLength={10}
                            placeholder="080-000-0000"
                        />
                        <Text>???????????????????????????????????????????????????????????????</Text>

                        <ModalSelector
                            onChange={(selector) => {
                                handleProvince(selector)
                            }}
                            ref={selector => { selector = selector; }}
                            data={provinces}
                            keyExtractor={item => uuidv4()}
                            labelExtractor={item => item.province}
                        >
                            <InputField
                                value={province}
                                onChange={handleProvince}
                                name="?????????????????????"
                                placeholder="?????????????????????"
                            />
                        </ModalSelector>
                        <ModalSelector
                            onChange={(selector) => {
                                handleDistrict(selector)
                            }}
                            ref={selector => { selector = selector; }}
                            data={districts}
                            keyExtractor={item => uuidv4()}
                            labelExtractor={item => item}
                        >
                            <InputField
                                value={district}
                                onChange={handleDistrict}
                                name="???????????????/????????????"
                                placeholder="???????????????"
                            />
                        </ModalSelector>
                        <InputField
                            value={road}
                            onChange={handleRoad}
                            name="?????????"
                            placeholder="???????????????????????????"
                        />
                        <InputField
                            value={postCode}
                            onChange={handlePostCode}
                            type="number-pad"
                            name="????????????????????????????????????"
                            placeholder="80000"
                        />

                    </View>
                </DismissKeyboard>
            </ScrollView >
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
                        <Text style={{ color: 'white', fontSize: 20 }}>??????????????????</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
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