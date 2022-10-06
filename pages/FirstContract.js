import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Dimensions,
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Modal,
    Touchable,
    Alert
} from "react-native";
import { Button } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Section } from "../components/Section";
import ModalSelector from 'react-native-modal-selector'
import { Input } from "react-native-elements";
import { ContractModal } from "../components/ContractModal";
import DateTimePicker from '@react-native-community/datetimepicker';
import API from "../env/API";
import { v4 as uuidv4 } from "uuid";
import 'react-native-get-random-values';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export const FirstContract = ({ navigation, route }) => {
    const [userItem, setUserItem] = useState("");
    const [userIdOwner, setUserIdOwner] = useState({});
    const [userIdBorrower, setUesrIdBorrower] = useState({});
    const [totalItem, setTotalItem] = useState(10);
    const [equipment, setEquipment] = useState({});
    const [totalRent, setTotalRent] = useState();
    const [price, setPrice] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [fineLate, setFineLate] = useState();
    const [fineBroken, setFineBroken] = useState();
    const [editStatus, setEditStatus] = useState(false);
    const [itemId, setItemId] = useState("");
    const [totalRentModalVisible, setTotalRentModalVisible] = useState(false);
    const [priceModalVisible, setPriceModalVisible] = useState(false);
    const [fineLateModalVisible, setFineLateModalVisible] = useState(false);
    const [fineBrokenModalVisible, setFineBrokenModalVisible] = useState(false);
    const [startDateModalVisible, setStartDateModalVisible] = useState(false);
    const [endDateModalVisible, setEndDateModalVisible] = useState(false);
    const [editAble, setEditAble] = useState(false);
    const [room, setRoom] = useState([]);
    const [roomNumber, setRoomNumber] = useState(null);
    const [contract, setContract] = useState(null);
    const [equipments, setEquipments] = useState([]);
    const { setNewContract, newContract, values, save, roomId } = route.params;
    const [show, setShow] = useState(false);
    const [serial, setSerial] = useState([]);
    const [isPressAccept, setIsPressAccept] = useState(false);
    const createPDF = async () => {
        const currentDate = new Date();
        const html = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
            <link
              href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
              rel="stylesheet"
              integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
              crossorigin="anonymous" />
              <style>
      @import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@100;200;300;400;500&display=swap');
      body {
        font-family: 'Sarabun', sans-serif;
        font-weight: 400;
      }
    </style>
          </head>
          <body>
            <div class="container">
              <div class="d-flex justify-content-center">
                <h1>สัญญาเช่าอุปกรณ์</h1>
              </div>
              <div class="d-flex justify-content-end">
                <span>ทำที่ ระบบเช่ายืมอุปกรณ์คอมพิวเตอร์</span>
              </div>
              <div class="d-flex justify-content-end">
                <span>วันที่ ${currentDate.getDay()} เดือน ${currentDate.getMonth()} พ.ศ. ${currentDate.getFullYear()} </span>
              </div>
              <div class="text-warp">
                <div class="row">
                  <p>
                    สัญญานี้ทำขึ้นระหว่าง
                    ${userIdBorrower.name} ${userIdBorrower.surname}
                    บัตรประจำตัวประชาชน
                    ${userIdBorrower.idNumber}ถนน
                    ${userIdBorrower.homeAddressModel.road} อำเภอ/เขต
                    ${userIdBorrower.homeAddressModel.district} จังหวัด
                    ${userIdBorrower.homeAddressModel.province}
                    ซึ่งต่อไปในสัญญานี้จะเรียกว่า "ผู้เช่า" ฝ่ายหนึ่ง กับ
                    ${userIdOwner.name} ${userIdOwner.surname} ถนน
                    ${userIdOwner.homeAddressModel.road} 
                    อำเภอ/เขต ${userIdOwner.homeAddressModel.district}
                    จังหวัด
                    ${userIdOwner.homeAddressModel.province} ซึ่งต่อไปในสัญญานี้จะเรียกว่า
                    "ผู้ให้เช่า" อีกฝ่ายหนึ่ง
                  </p>
                </div>
                <div class="d-flex justify-content-center">
                  <p>คู่สัญญาทั้งสองฝ่ายได้ตกลงทำสัญญาเช่ากันมีข้อความดังต่อไปนี้</p>
                </div>
                <div class="d-flex justify-content-start">
                  <p>
                    ข้อ 1. ผู้ให้เช่าตกลงให้เช่าและผู้ตกลงเช่าอุปกรณ์
                    ${equipment.name} หมายเลข serial
                    ${equipment.equipmentSerials[0].serial}
                  </p>
                </div>
                <div class="d-flex justify-content-start">
                  <p>
                    ข้อ 2. คู่สัญญาตกลงเช่าทัพตามสัญญามีกำหนด
                    นับตั้งแต่วันที่
                    ${contract.startDate.split("T")[0].split("-")[2]} เดือน
                    ${contract.startDate.split("T")[0].split("-")[1]}พ.ศ.
                    ${contract.startDate.split("T")[0].split("-")[0]} ถึงวันที่
                    ${contract.endDate.split("T")[0].split("-")[2]} เดือน
                    ${contract.endDate.split("T")[0].split("-")[1]} พ.ศ.
                    ${contract.endDate.split("T")[0].split("-")[0]}
                    โดยผู้เช่าตกลงชำระเงินค่าเช่าให้แก่ผู้ให้เช่าเป็นจำนวนเงิน
                    ${contract.price} ในวันรับอุปกรณ์
                  </p>
                </div> 
                <div class="d-flex justify-content-start">
                  <p>
                    ข้อ 3.
                    ผู้เช่าจะต้องเป็นผู้ชำระค่าเสียหายที่เกิดขึ้นกับอุปกรณ์ที่เกิดจากความเสียหายของผู้เช่าเป็นจำวนเงิน
                    ${contract.fineBroken} บาท
                    ตามที่ได้ตกลงกันไว้
                  </p>
                </div>
                <div class="d-flex justify-content-start">
                  <p>ข้อ 4. ผู้เช่าจะต้องดูและรักษาอุปกรณ์ที่เช่ามิให้ชำรุดทรุดโทรม</p>
                </div>
              </div>
            </div>
          </body>
        </html>
        `;
        const { uri } = await Print.printToFileAsync({ html });
        Sharing.shareAsync(uri);
    }
    const handleSendContract = () => {
        let contract = {
            room: roomNumber,
            item: equipment.itemId,
            totalRent: serial.length,
            price: price,
            startDate: startDate,
            endDate: endDate,
            fineLate: fineLate,
            fineBroken: fineBroken,
            creator: userIdOwner.userId,
            editStatus: false,
            editAble: null,
        }
        setNewContract(contract);
        navigation.goBack();
    }
    const showMode = (currentMode) => {
        if (Platform.OS === 'android') {
            setShow(false);
            // for iOS, add a button that closes the picker
        }
        setMode(currentMode);
    };
    const getEquipment = () => {

    }

    const setValues = async () => {
        const contract = await API.getContract(values);
        const owner = contract.roomModel.userOne.userId === contract.equipmentModel.userId ? contract.roomModel.userOne : contract.roomModel.userTwo;
        const borrower = contract.roomModel.userOne.userId !== contract.equipmentModel.userId ? contract.roomModel.userOne : contract.roomModel.userTwo;
        if (contract) {
            setContract(contract);
            setEquipment(contract.equipmentModel);
            setUserIdOwner(owner);
            setUesrIdBorrower(borrower);
            setTotalRent(contract.totalRent)
            setStartDate(new Date(contract.startDate))
            setEndDate(new Date(contract.endDate))
            setPrice(contract.price)
            setFineLate(contract.fineLate)
            setFineBroken(contract.fineBroken)
            setEditAble(contract.editAble);
            setEditStatus(contract.editStatus);

        }
    }
    //get within room model
    const getRoom = async (roomId) => {
        const data = await API.getRoom(roomId);
        const temp = [];
        temp.push(data.userOne);
        temp.push(data.userTwo);
        setRoom(prev => [...temp]);
    }
    useEffect(() => {
        if (values)
            setValues();
        else {
            getRoom(roomId);
            setRoomNumber(roomId);
        }
    }, []);

    const handleSelectOwner = async (selector) => {
        if (selector.userId !== userIdOwner.userId)
            setEquipment({});
        setUserIdOwner(selector)
        let value = selector.userId === room[0].userId ? 1 : 0;
        setUesrIdBorrower(room[value]);
        const e = await API.getEquipmentByUserId(selector.userId);
        setEquipments(e);
    }
    const handleSerial = () => {
        if (equipment?.name === undefined) {
            return;
        }
        navigation.navigate("Serial", {
            setSelectedType: (e) => setSerial(e),
            itemType: equipment.equipmentSerials,
            selectedType: serial
        })
    }
    const handlePrice = (e) => {
        setPrice(e);
    }
    const handleItemPick = (e) => {
        setEquipment(e);
    }
    const handleTotalRent = (e) => {
        if (e <= equipment.quantity)
            setTotalRent(e);
    }
    const handleFineLate = (e) => {
        setFineLate(e);
    }
    const handleFineBroken = (e) => {
        setFineBroken(e)
    }
    const handleStartDate = (event, selectedDate) => {
        const currentDate = selectedDate;
        if (currentDate < new Date()) {
            Alert.alert("ข้อมูลไม่ถูกต้อง");
            setStartDate(new Date());
        } else {
            setStartDate(currentDate);
            if (startDate > endDate) {
                setEndDate(startDate);
            }
        }
    }

    const handleEndDate = (event, selectedDate) => {
        const currentDate = selectedDate;
        if (currentDate < startDate) {
            Alert.alert("ข้อมูลไม่ถูกต้อง")
            setEndDate(startDate);
        } else {
            setEndDate(currentDate);
        }
    }
    const acceptTheContract = () => {
        API.acceptTheContract(contract.contractId);
        setEditAble(false);
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                }}>
                <View style={{ flex: 1 }}>
                    {room &&
                        <ModalSelector
                            disabled={save ? false : true}
                            onChange={(selector) => {
                                handleSelectOwner(selector)
                            }}
                            ref={selector => {
                                selector = selector;
                            }}
                            data={room}
                            keyExtractor={item => uuidv4()}
                            labelExtractor={item => item.name}
                        >
                            <TouchableOpacity>
                                <Section marginTop={10}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 16 }}>เจ้าของ</Text>
                                            <Text style={{ color: "#FF6820" }}> *</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text>{userIdOwner.name}</Text>
                                            {save &&
                                                <Ionicons name="chevron-forward" size={30} color={"#B4B4B4"} />
                                            }
                                        </View>
                                    </View>
                                </Section>
                            </TouchableOpacity>
                        </ModalSelector>
                    }
                    <Section marginTop={2}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: 16 }}>ผู้เช่า</Text>
                                <Text style={{ color: "#FF6820" }}> *</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text>{userIdBorrower.name}</Text>
                            </View>
                        </View>
                    </Section>
                    <View style={{ flexDirection: 'row', height: 30, alignItems: 'center' }}>
                        <Text style={{ textAlignVertical: 'center' }}>การเช่า</Text>
                    </View>
                    <ModalSelector
                        disabled={save ? false : true}
                        onChange={(selector) => {
                            handleItemPick(selector)
                        }}
                        ref={selector => {
                            selector = selector;
                        }}
                        data={equipments}
                        keyExtractor={item => uuidv4()}
                        labelExtractor={item => item.name}
                    >
                        <TouchableOpacity>
                            <Section>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 16 }}>อุปกรณ์</Text>
                                        <Text style={{ color: "#FF6820" }}> *</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 16 }}>{equipment.name}</Text>
                                        {save &&
                                            <Ionicons name="chevron-forward" size={30} color={"#B4B4B4"} />
                                        }
                                    </View>
                                </View>
                            </Section>
                        </TouchableOpacity>
                    </ModalSelector>
                    {equipment &&
                        <ContractModal
                            visible={totalRentModalVisible}
                            setVisible={setTotalRentModalVisible}
                            defaultValue={totalRent}
                            placeholder={"จำนวนที่เช่า"}
                            handleItem={handleTotalRent}
                            totalItem={equipment.quantity}
                        />
                    }
                    {/* <TouchableOpacity
                        onPress={() =>{
                            if(!save)
                                return;
                            handleSerial()
                        }
                        }
                    >
                        <Section>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={{fontSize: 16}}>ซีเรียล</Text>
                                    <Text style={{color: "#FF6820"}}> *</Text>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Text>{serial.length} ชิ้น</Text>
                                    {save &&
                                        <Ionicons name="chevron-forward" size={30} color={"#B4B4B4"}/>
                                    }
                                </View>
                            </View>
                        </Section>
                    </TouchableOpacity> */}
                    <TouchableOpacity
                        onPress={() => {
                            setTotalRentModalVisible(save ? true : false);
                        }}
                    >
                        <Section>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 16 }}>จำนวนที่เช่า</Text>
                                    <Text style={{ color: "#FF6820" }}> *</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 16 }}>{totalRent}</Text>
                                    {save &&
                                        <Ionicons name="chevron-forward" size={30} color={"#B4B4B4"} />
                                    }
                                </View>
                            </View>
                        </Section>
                    </TouchableOpacity>
                    <ContractModal
                        visible={priceModalVisible}
                        setVisible={setPriceModalVisible}
                        defaultValue={price}
                        placeholder={"ราคาต่อวัน"}
                        handleItem={handlePrice}
                    />
                    <TouchableOpacity
                        onPress={() => setPriceModalVisible(save ? true : false)}
                    >
                        <Section>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 16 }}>ราคา</Text>
                                    <Text style={{ color: "#FF6820" }}> *ต่อวันต่อชิ้น</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 16 }}>{price}</Text>
                                    {save &&
                                        <Ionicons name="chevron-forward" size={30} color={"#B4B4B4"} />
                                    }
                                </View>
                            </View>
                        </Section>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', height: 30, alignItems: 'center' }}>
                        <Text style={{ textAlignVertical: 'center' }}>ค่าปรับต่อวันต่อชิ้น</Text>
                    </View>
                    <ContractModal
                        visible={fineLateModalVisible}
                        setVisible={setFineLateModalVisible}
                        defaultValue={fineLate}
                        placeholder={"ค่าปรับล่าช้า"}
                        handleItem={handleFineLate}
                    />
                    <TouchableOpacity
                        onPress={() => setFineLateModalVisible(save ? true : false)}
                    >
                        <Section>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 16 }}>ค่าปรับล่าช้า</Text>
                                    <Text style={{ color: "#FF6820" }}> *</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 16 }}>{fineLate}</Text>
                                    {save &&
                                        <Ionicons name="chevron-forward" size={30} color={"#B4B4B4"} />
                                    }
                                </View>
                            </View>
                        </Section>
                    </TouchableOpacity>
                    <ContractModal
                        visible={fineBrokenModalVisible}
                        setVisible={setFineBrokenModalVisible}
                        defaultValue={fineBroken}
                        placeholder={"ค่าปรับความเสียหาย"}
                        handleItem={handleFineBroken}
                    />
                    <TouchableOpacity
                        onPress={() => setFineBrokenModalVisible(save ? true : false)}
                    >
                        <Section>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 16 }}>ค่าปรับเสียหาย</Text>
                                    <Text style={{ color: "#FF6820" }}> *</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 16 }}>{fineBroken}</Text>
                                    {save &&
                                        <Ionicons name="chevron-forward" size={30} color={"#B4B4B4"} />
                                    }
                                </View>
                            </View>
                        </Section>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', height: 30, alignItems: 'center' }}>
                        <Text style={{ textAlignVertical: 'center' }}>ระยะเวลา</Text>
                    </View>
                    <ContractModal
                        visible={startDateModalVisible}
                        setVisible={setStartDateModalVisible}
                        defaultValue={startDate}
                        placeholder={"วันที่"}
                        handleItem={handleStartDate}
                        type="date"
                    />
                    <TouchableOpacity
                    >
                        <Section>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 16 }}>วันเริ่มต้น</Text>
                                    <Text style={{ color: "#FF6820" }}> *</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    {!save ?
                                        <Text>{startDate.getDate() + "/" + startDate.getMonth() + "/" + startDate.getFullYear()}</Text>
                                        :
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <DateTimePicker
                                                style={{ width: 100 }}
                                                testID="dateTimePicker"
                                                value={startDate}
                                                mode={"date"}
                                                is24Hour={true}
                                                onChange={handleStartDate}
                                            />
                                            <Ionicons name="chevron-forward" size={30} color={"#B4B4B4"} />
                                        </View>
                                    }
                                </View>
                            </View>
                        </Section>
                    </TouchableOpacity>
                    <TouchableOpacity

                    >
                        <Section>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 16 }}>วันสิ้นสุด</Text>
                                    <Text style={{ color: "#FF6820" }}> *</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    {!save ?
                                        <Text>{endDate.getDate() + "/" + endDate.getMonth() + "/" + endDate.getFullYear()}</Text>
                                        :
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <DateTimePicker
                                                style={{ width: 100 }}
                                                testID="dateTimePicker"
                                                value={endDate}
                                                mode={"date"}
                                                is24Hour={true}
                                                onChange={handleEndDate}
                                            />
                                            <Ionicons name="chevron-forward" size={30} color={"#B4B4B4"} />
                                        </View>

                                    }

                                </View>
                            </View>
                        </Section>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            {
                save ?
                    <View
                        style={{ backgroundColor: 'white', height: 70, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => handleSendContract()}
                        >
                            <View style={{
                                backgroundColor: "#FF6280",
                                width: 300,
                                height: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 30
                            }}>
                                <Text style={{ color: 'white', fontSize: 20 }}>บันทึกและเสนอ</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    :
                    editAble ?
                        <View style={{
                            backgroundColor: 'white',
                            height: 70,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <TouchableOpacity
                                onPress={() => acceptTheContract()}
                            >
                                <View style={{
                                    backgroundColor: "#FF6280",
                                    width: 300,
                                    height: 50,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 30
                                }}>
                                    <Text style={{ color: 'white', fontSize: 20 }}>เห็นชอบสัญญานี้</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        :
                        editStatus ?
                            <View style={{
                                backgroundColor: 'white',
                                height: 70,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <TouchableOpacity
                                    onPress={() => createPDF()}
                                >
                                    <View style={{
                                        backgroundColor: "#FF6280",
                                        width: 300,
                                        height: 50,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 30
                                    }}>
                                        <Text style={{ color: 'white', fontSize: 20 }}>พิมพ์</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            :
                            <View>
                            </View>
            }
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
});