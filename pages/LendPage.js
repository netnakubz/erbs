import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Picker, Button } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons';
import ModalSelector from 'react-native-modal-selector'
import { Section } from "../components/Section";
import { TouchableOpacity } from "react-native-gesture-handler";
import API from "../env/API";
import { DismissKeyboard } from "../components/DismissKeybord";
import { v4 as uuidv4 } from "uuid";
export default function LendPage({ route }) {
    const [textValue, setTextValue] = useState("");
    const [open, setOpen] = useState(false);
    const [myItems, setMyItems] = useState();
    // const { val } = route.params;
    const { params } = route;
    const [value, setValue] = useState({});
    const handleText = (text) => {
        setTextValue(text);
    }
    const navigation = useNavigation();

    const updateVal = (val) => {
        setValue(val);
    }
    const handlePostBtn = async () => {
        await API.lendPost({
            details: textValue,
            itemId: value.itemId,
            userId: value.userId
        })
        navigation.goBack();
    }
    const getEquipment = async () => {
        API.getMyItems()
            .then(data => {
                setMyItems(data);
                setValue(prev => data[0]);
            });
    }
    const handleSelectItem = (selector) => {
        setValue(selector);
    }
    useEffect(() => {
        getEquipment();
    }, []);
    useEffect(() => {
        setValue(params ? params.val : value);
    }, [params])
    return (
        <DismissKeyboard>
            <View style={styles.container}>
                {value &&
                    <View style={{ flex: 0.9 }}>
                        <ModalSelector
                            onChange={(selector) => {
                                handleSelectItem(selector);
                            }}
                            ref={selector => { selector = selector; }}
                            data={myItems}
                            keyExtractor={item => uuidv4()}
                            labelExtractor={item => item.name}
                        >
                            <Section marginTop={5}>
                                <View style={[styles.row, { justifyContent: 'space-between', alignContent: 'center' }]}>
                                    <View>
                                        <Text style={{ color: "#464646" }}>อุปกรณ์*</Text>
                                    </View>
                                    <TouchableOpacity>
                                        <View style={[styles.row, { alignContent: 'center', justifyContent: 'center' }]}>
                                            <View>
                                                <Text style={{ color: "#777777" }}>{value?.name}</Text>
                                            </View>
                                            <View>
                                                <Ionicons name="chevron-forward-outline" size={20} />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </Section>
                        </ModalSelector>
                        <Section marginTop={5}>
                            <View style={styles.column}>
                                <View style={[styles.row, { justifyContent: 'space-between' }]}>
                                    <View>
                                        <Text>รายละเอียดอุปกรณ์*</Text>
                                    </View>
                                    <View>
                                        <Text>{textValue.length}/500</Text>
                                    </View>
                                </View>
                                <View>
                                    <TextInput
                                        placeholder="Type text..."
                                        multiline
                                        numberOfLines={4}
                                        onChangeText={(text) => handleText(text)}
                                        value={textValue}
                                        style={styles.textInput}
                                        maxLength={500}
                                        editable
                                    />
                                </View>
                            </View>
                        </Section>
                    </View>
                }
                <View style={{ flex: 0.1 }}>
                    <View style={[styles.saveBtn, styles.row]}>
                        <View style={{ width: '90%', height: '100%', justifyContent: 'center' }}>
                            <TouchableOpacity
                                style={styles.btnStyle}
                                onPress={() => handlePostBtn()}
                            >
                                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>โพสต์</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </View >
        </DismissKeyboard>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    dropdown: {
        marginTop: 10,
        borderWidth: 1,
        width: 200,
        height: 30,
        borderRadius: 30,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
    },
    textInput: {
        height: 40,
        width: 300,
        borderRadius: 20,
        height: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
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
});