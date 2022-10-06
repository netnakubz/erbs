import React, { useCallback, useState, useEffect, useRef } from 'react';
import Checkbox from 'expo-checkbox';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    SafeAreaView,
    RefreshControl,
    TouchableOpacity,
    Alert,
} from 'react-native';
import ViewShot from 'react-native-view-shot';
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import API from '../env/API';

const Hr = ({ size }) => {
    const [hr, setHr] = useState();
    useEffect(() => {
        let temp = "";
        for (let i = 0; i < size; i++) {
            temp += "_";
        }
        setHr(temp);
    }, []);
    return <Text style={{ textAlign: "center" }}>{hr}</Text>
}
export const SaveReceipt = ({ route }) => {
    const [isChecked, setChecked] = useState(false);
    const { receipt, status } = route.params;
    const [borrower, setBorrower] = useState();
    const [period, setPeriod] = useState();
    const ref = useRef();
    const saveImg = async () => {
        ref.current.capture().then(uri => {
            MediaLibrary.saveToLibraryAsync(uri).then(res => {
                Alert.alert("บันทึกรูปภาพแล้ว");
            });
        });
    }
    useEffect(() => {
        let owner = receipt.contractModel.equipmentModel.user.userId;
        let bo = receipt.contractModel.roomModel.userOne.userId === owner ? receipt.contractModel.roomModel.userTwo : receipt.contractModel.roomModel.userOne;
        setBorrower(bo);
    }, [])
    const navigation = useNavigation();
    const returnItem = async () => {
        const itemId = receipt.receiptId;
        const data = await API.returnItem(itemId);
        updateButtonTopRight()
    }
    const updateButtonTopRight = () => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <TouchableOpacity>
                        <Text>ยืนยันการคืนแล้ว</Text>
                    </TouchableOpacity>
                )
            }
        })
    }
    useEffect(() => {
        if (receipt.status === true) {
            updateButtonTopRight();
        } else if (status === "owner")
            navigation.setOptions({
                headerRight: () => {
                    return (
                        <TouchableOpacity onPress={async () => returnItem()}>
                            <Text>ยืนยันการคืน</Text>
                        </TouchableOpacity>
                    )
                }
            })

    }, []);
    return (
        <View style={styles.container}>
            <ViewShot ref={ref}
                options={{ fileName: "Hello", format: "jpg", quality: 1.0 }}
                style={[styles.column, { justifyContent: 'center', marginTop: 50 }]}>
                <View style={{ backgroundColor: "#FFFFFF", height: 400, padding: 20 }}>
                    <View style={styles.column}>
                        <View style={[styles.row]}>
                            <Text>Invoice ID</Text>
                            <Text style={{
                                marginLeft: 10,
                                color: "#464646",
                                fontWeight: 'bold'
                            }}>{receipt.receiptId}</Text>
                        </View>
                        <View style={[styles.row]}>
                            <Text>{receipt.createDate.split("T")[0]}</Text>
                        </View>
                    </View>
                    <View style={[styles.column, { marginTop: 20 }]}>
                        <View style={[styles.row, { justifyContent: 'space-evenly' }]}>
                            <View style={{ width: "40%" }}>
                                <Text style={{ textAlign: 'right', color: "#464646", fontWeight: 'bold' }}>Owner
                                    Name</Text>
                            </View>
                            <View style={{ width: "10%" }}></View>
                            <View style={{ width: "50%" }}>
                                <Text
                                    style={{ textAlign: 'right' }}>{receipt.contractModel.equipmentModel.user.name + " " + receipt.contractModel.equipmentModel.user.surname}</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={{ width: "40%" }}>
                                <Text style={{ textAlign: 'right', color: "#464646", fontWeight: 'bold' }}>Borrower
                                    Name</Text>
                            </View>
                            <View style={{ width: "10%" }}></View>
                            <View style={{ width: "50%" }}>
                                {borrower &&
                                    <Text style={{ textAlign: 'right' }}>{borrower.name + " " + borrower.surname}</Text>
                                }
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Hr size={42} />
                        <View style={[styles.row]}>
                            <View style={{ width: "20%" }}>
                                <Text style={{ textAlign: 'center' }}>Quantity</Text>
                            </View>
                            <View style={{ width: "40%" }}>
                                <Text style={{ textAlign: 'center' }}>Name</Text>
                            </View>
                            <View style={{ width: "20%" }}>
                                <Text style={{ textAlign: 'center' }}>Period</Text>
                            </View>
                            <View style={{ width: "20%" }}>
                                <Text style={{ textAlign: 'center' }}>Price</Text>
                            </View>
                        </View>
                        <Hr size={42} />
                        <View style={[styles.row]}>
                            <View style={{ width: "20%" }}>
                                <Text style={{
                                    textAlign: 'center',
                                    color: "#464646"
                                }}>{receipt.contractModel.totalRent === 0 ? 1 : receipt.contractModel.totalRent}</Text>
                            </View>
                            <View style={{ width: "40%" }}>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={{
                                        textAlign: 'center',
                                        color: "#464646"
                                    }}>{receipt.contractModel.equipmentModel.name}</Text>
                                    {/* {
                                        receipt.contractModel.equipmentModel.equipmentSerials.map((r) => {
                                            return (
                                                <View style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                </View>
                                            );
                                        })
                                    } */}

                                </View>
                            </View>
                            <View style={{ width: "20%" }}>
                                <Text style={{
                                    textAlign: 'center',
                                    color: "#464646"
                                }}>{receipt.contractModel.endDate.split("T")[0].split("-")[2] - receipt.contractModel.startDate.split("T")[0].split("-")[2]}</Text>
                            </View>
                            <View style={{ width: "20%" }}>
                                <Text
                                    style={{ textAlign: 'center', color: "#464646" }}>{receipt.contractModel.price}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 30 }}>
                        <Hr size={42} />
                        <View style={[styles.row, { justifyContent: "space-between", padding: 10 }]}>
                            <View>
                                <Text style={{
                                    color: "#FF6280",
                                    fontWeight: 'bold',
                                    fontSize: 16
                                }}>Total</Text>
                            </View>
                            <View>
                                <Text style={{
                                    color: "#FF6280",
                                    fontWeight: 'bold',
                                    fontSize: 16
                                }}>
                                    {parseInt(receipt.contractModel.price) * (parseInt(receipt.contractModel.totalRent) === 0 ? 1 : receipt.contractModel.totalRent)}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ViewShot>
            <View style={[
                styles.row,
                {
                    justifyContent: 'center',
                    marginTop: 10
                }]}>
                <TouchableOpacity
                    onPress={() => saveImg()}
                >
                    <Ionicons name='download' size={60} color="#FF6280" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flexDirection: 'row'
    },
    column: {
        flexDirection: 'column',
    }
});

