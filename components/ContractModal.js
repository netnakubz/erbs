import React, { useState, useEffect } from "react";
import { View, Modal, Text, KeyboardAvoidingView, StyleSheet, Dimensions, TouchableWithoutFeedback } from "react-native"
import { Input } from "react-native-elements";
import DateTimePicker from '@react-native-community/datetimepicker';
export const ContractModal = (props) => {
    const { visible, setVisible, handleItem, defaultValue, placeholder, totalItem, type } = props;
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
        // handleItem(currentDate)
    };
    const showMode = (currentMode) => {
        if (Platform.OS === 'android') {
            setShow(false);
            // for iOS, add a button that closes the picker
        }
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setVisible(!visible);
            }}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <TouchableWithoutFeedback
                    onPress={() => {
                        setVisible(!visible);
                    }}
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
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            {totalItem &&
                                <View>
                                    <Text style={{ fontSize: 20, color: 'red' }}>สินค้าทั้งหมด {totalItem}</Text>
                                </View>
                            }
                            <Input
                                textAlign="center"
                                defaultValue={defaultValue}
                                onChangeText={(e) => handleItem(e)}
                                keyboardType="number-pad"
                                placeholder={placeholder}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </Modal>
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