import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Modal, TouchableWithoutFeedback, KeyboardAvoidingView } from "react-native";
import { Input } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DismissKeyboard } from "../components/DismissKeybord";
import { Section } from "../components/Section";
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../env/API';
import { useNavigation } from '@react-navigation/native';

export const RentPage = () => {
    const [postDetails, setPostDetails] = useState("");
    const [itemPrice, setItemPrice] = useState(0);
    const [itemDate, setItemDate] = useState(0);
    const [descModalVisible, setDescModalVisible] = useState(false);
    const [priceModalVisible, setPriceModalVisible] = useState(false);
    const [dateModalVisible, setDateModalVisible] = useState(false);
    const navigation = useNavigation();
    const handlePostDetails = (e) => {
        setPostDetails(e);
    }
    const handlePricePerDay = (e) => {
        let data = parseInt(e);
        setItemPrice(data);
    }
    const handlePeriod = (e) => {
        let data = parseInt(e);
        setItemDate(data);
    }
    const handleSaveBtn = async () => {
        let post = {
            "details": postDetails,
            "userId": 10001,
            "price": itemPrice,
            "period": itemDate
        }
        API.borrowPost(post).then(() => {
            navigation.goBack();
        });
    }
    const setData = async () => {

    }
    useEffect(() => {
        setData();
    }, []);
    return (
        <DismissKeyboard>
            <View style={styles.container}>
                <View style={{ flex: 0.9 }}>
                    <Section marginTop={10}>
                        <View>
                            <View style={[styles.row, styles.postDetails]}>
                                <View style={styles.row}>
                                    <Text>รายละเอียดโพสต์</Text>
                                    <Text style={{ color: "#FF6280" }}> *</Text>
                                </View>
                                <View>
                                    <Text style={{
                                        color: "#464646"
                                    }}>
                                        {postDetails.length}/500
                                    </Text>
                                </View>
                            </View>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={descModalVisible}
                                onRequestClose={() => {
                                    Alert.alert("Modal has been closed.");
                                    setDescModalVisible(!descModalVisible);
                                }}
                            >
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <TouchableOpacity
                                                style={[styles.button, styles.buttonClose]}
                                                onPress={() => {
                                                    setDescModalVisible(!descModalVisible);
                                                    setPostDetails("");
                                                }}
                                            >
                                                <Ionicons name="close-outline" size={40} />
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={[styles.button, styles.buttonClose]}
                                                onPress={() =>
                                                    setDescModalVisible(!descModalVisible)
                                                }
                                            >
                                                <View style={{
                                                    borderWidth: 1,
                                                    width: 70,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    padding: 5,
                                                    borderRadius: 20,
                                                }}>
                                                    <Text>เสร็จสิ้น</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ padding: 20 }}>
                                            <Input
                                                onPressIn={() => setDescModalVisible(true)}
                                                multiline={true}
                                                defaultValue={postDetails}
                                                maxLength={500}
                                                containerStyle={{
                                                    height: Dimensions.get('window').height,
                                                }}
                                                inputContainerStyle={{
                                                    borderBottomColor: "#00000000"
                                                }}
                                                placeholder="เพิ่มรายละเอียดอุปกรณ์"
                                                onChangeText={(e) => handlePostDetails(e)}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                            <View
                                style={[styles.row, { maxHeight: 1000 }]}
                            >
                                <TouchableOpacity
                                    onPress={() => setDescModalVisible(true)}
                                >
                                    <Text style={{ color: '#898989', fontSize: 20, flexWrap: 'wrap' }}>{postDetails ? postDetails : "เพิ่มรายละเอียดอุปกรณ์"}</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </Section >
                    <Section marginTop={5}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={priceModalVisible}
                            onRequestClose={() => {
                                Alert.alert("Modal has been closed.");
                                setPriceModalVisible(!priceModalVisible);
                            }}


                        >
                            <KeyboardAvoidingView
                                behavior={Platform.OS === "ios" ? "padding" : "height"}
                                style={{ flex: 1 }}
                            >

                                <View style={styles.centeredView}>
                                    <View style={{
                                        width: Dimensions.get('window').width - 50,
                                        height: Dimensions.get('window').height / 2.5,
                                        backgroundColor: "white",
                                        borderRadius: 20,
                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 2
                                        },
                                        shadowOpacity: 0.25,
                                        shadowRadius: 4,
                                        elevation: 5,
                                    }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <TouchableOpacity
                                                style={[styles.button, styles.buttonClose]}
                                                onPress={() => {
                                                    setPriceModalVisible(!priceModalVisible);
                                                    setItemPrice("0");
                                                }}
                                            >
                                                <Ionicons name="close-outline" size={40} />
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={[styles.button, styles.buttonClose]}
                                                onPress={() => setPriceModalVisible(!priceModalVisible)}
                                            >
                                                <View style={{
                                                    borderWidth: 1,
                                                    width: 70,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    padding: 5,
                                                    borderRadius: 20,
                                                }}>
                                                    <Text>เสร็จสิ้น</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ padding: 20 }}>
                                            <Input
                                                onPressIn={() => {
                                                    setPriceModalVisible(true)
                                                }}
                                                multiline={true}
                                                defaultValue={itemPrice}
                                                keyboardType={"number-pad"}
                                                maxLength={500}
                                                containerStyle={{
                                                    height: Dimensions.get('window').height,
                                                }}
                                                placeholder="ราคา"
                                                onChangeText={(e) => handlePricePerDay(e)}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </KeyboardAvoidingView>
                        </Modal>
                        <TouchableOpacity
                            onPress={() => {
                                handlePricePerDay();
                                setPriceModalVisible(true);
                            }}
                        >
                            <View style={[styles.row, { justifyContent: 'space-between' }]}>
                                <View style={styles.row}>
                                    <View>
                                        <Ionicons name="pricetag-outline" size={30} color="#464646" />
                                    </View>
                                    <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                                        <View style={styles.row}>
                                            <Text> ราคาต่อวัน</Text>
                                            <Text style={{ color: '#FF6280' }}> * ไม่เกิน</Text>
                                        </View>
                                        <View style={styles.row}>
                                            <Text style={{ fontSize: 20 }}> {itemPrice} </Text>
                                            <Text style={{ color: '#FF6280' }}>บาท/วัน</Text>
                                        </View>
                                    </View>

                                </View>
                                <View>
                                    <Text style={{ color: "#464646" }}>ตั้งค่า</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Section>
                    <Section marginTop={2}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={dateModalVisible}
                            onRequestClose={() => {
                                Alert.alert("Modal has been closed.");
                                setDateModalVisible(!dateModalVisible);
                            }}
                        >
                            <KeyboardAvoidingView
                                behavior={Platform.OS === "ios" ? "padding" : "height"}
                                style={{ flex: 1 }}
                            >


                                <View style={styles.centeredView}>
                                    <View style={{
                                        width: Dimensions.get('window').width - 50,
                                        height: Dimensions.get('window').height / 2.5,
                                        backgroundColor: "white",
                                        borderRadius: 20,
                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 2
                                        },
                                        shadowOpacity: 0.25,
                                        shadowRadius: 4,
                                        elevation: 5,
                                    }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <TouchableOpacity
                                                style={[styles.button, styles.buttonClose]}
                                                onPress={() => {
                                                    setDateModalVisible(!dateModalVisible);
                                                    setItemDate('0');
                                                }}
                                            >
                                                <Ionicons name="close-outline" size={40} />
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={[styles.button, styles.buttonClose]}
                                                onPress={() => setDateModalVisible(!dateModalVisible)}
                                            >
                                                <View style={{
                                                    borderWidth: 1,
                                                    width: 70,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    padding: 5,
                                                    borderRadius: 20,
                                                }}>
                                                    <Text>เสร็จสิ้น</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ padding: 20 }}>
                                            <Input
                                                onPressIn={() => setDateModalVisible(true)}
                                                multiline={true}
                                                defaultValue={itemDate}
                                                keyboardType={"number-pad"}
                                                maxLength={500}
                                                containerStyle={{
                                                    height: Dimensions.get('window').height,
                                                }}
                                                placeholder="วัน"
                                                onChangeText={(e) => handlePeriod(e)}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </KeyboardAvoidingView>
                        </Modal>
                        <TouchableOpacity
                            onPress={() => {
                                handlePeriod()
                                setDateModalVisible(true);
                            }}
                        >
                            <View style={[styles.row, { justifyContent: 'space-between' }]}>
                                <View style={styles.row}>
                                    <View>
                                        <Ionicons name="time-outline" size={30} color="#464646" />
                                    </View>
                                    <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                                        <View style={styles.row}>
                                            <Text> ระยะเวลา(วัน)</Text>
                                            <Text style={{ color: '#FF6280' }}> * </Text>
                                        </View>
                                        <View style={styles.row}>
                                            <Text style={{ fontSize: 20 }}> {itemDate} </Text>
                                            <Text style={{ color: '#FF6280' }}> วัน </Text>
                                        </View>
                                    </View>

                                </View>
                                <View>
                                    <Text style={{ color: "#464646" }}>ตั้งค่า</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Section>
                </View >
                <View style={{ flex: 0.1 }}>
                    <View style={[styles.saveBtn, styles.row]}>
                        <View style={{ width: '90%', height: '100%', justifyContent: 'center' }}>
                            <TouchableOpacity
                                style={styles.btnStyle}
                                onPress={() => handleSaveBtn()}
                            >
                                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>โพสต์</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </View >
        </DismissKeyboard >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    row: {
        flexDirection: 'row'
    },
    postDetails: {
        justifyContent: 'space-between'
    },
    btnStyle: {
        backgroundColor: "#FF6280",
        borderRadius: 40,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveBtn: {
        position: "absolute",
        justifyContent: "center",
        bottom: 10,
        width: '100%',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        marginLeft: 10,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});