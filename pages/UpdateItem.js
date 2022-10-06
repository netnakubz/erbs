import React, { useState, useEffect, useMemo } from "react";
import { View, Text, StyleSheet, Image, Button, TouchableOpacity, TextInput, ScrollView, DeviceEventEmitter } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Section } from "../components/Section";
import { DismissKeyboard } from "../components/DismissKeybord";
import * as ImagePicker from 'expo-image-picker'
import API from "../env/API";
export const UpdateItem = ({ navigation, route }) => {
    const [lenName, setLenName] = useState(0);
    const [itemName, setItemName] = useState("");
    const [images, setImages] = useState([]);
    const [itemType, setItemType] = useState([]);
    const [selectedType, setSelectedType] = useState([]);
    const [itemSettings, setItemSettings] = useState({});
    const getTotalLength = useMemo(() => {
        return lenName;
    }, [lenName]);
    const handleText = (e) => {
        setItemName(e);
        setLenName(e.length);
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

    const handleDeleteImage = (key) => {
        const index = images.findIndex(item => item.key === key);
        images.splice(index, 1);
        setImages(prev => [...prev]);
    }

    const handleSaveBtn = () => {
        API.updateItem({
            totalRent: parseInt(itemSettings.quantity),
            price: parseInt(itemSettings.price),
            equipmentSerials: itemSettings.serials,
            name: itemName,
            equipmentTypes: selectedType,
            itemId: itemId
        }).then(() => {
            navigation.goBack();
        });
    }
    const handlePressCategory = () => {
        navigation.navigate("Category",
            {
                selectedType: selectedType,
                setSelectedType: setSelectedType,
                itemType: itemType
            }
        );
    }
    const { itemId } = route.params;
    const getItem = async () => {
        const data = await API.getEquipmentById(itemId);
        let serials = [];
        data.equipmentSerials.forEach((e) => {
            serials.push(e.id);
        })
        setItemName(data.name)
        setSelectedType(serials);
    }
    useEffect(() => {
        getItem();
    }, []);

    const handlePressEquipmentSettings = () => {
        navigation.navigate("EquipmentSettings");
    }
    const itemSetting = () => {
        DeviceEventEmitter.addListener("itemSettings", (event) => setItemSettings(event));
    }
    useEffect(() => {
        itemSetting();
    }, []);
    const getImages = useMemo(() => {
        return images.map((e, index) => (
            <View key={e.key} style={{ padding: 3 }}>
                <Image
                    resizeMode="cover"
                    source={{ uri: e.uri }}
                    style={{ width: 100, height: 100 }}
                />
                <View
                    style={{
                        position: 'absolute',
                        right: 0,
                        backgroundColor: "#464646",
                        borderRadius: 50,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => handleDeleteImage(e.key)}
                    >
                        <Ionicons name="close-outline" size={20} color={"white"} />
                    </TouchableOpacity>
                </View>
            </View>
        ))
    }, [images]);

    useEffect(() => {
    }, [images]);

    const getItemType = async () => {
        const data = await API.getItemType();
        setItemType(data);
    }
    const deleteItem =async(itemId)=>{
        const data = await API.deleteItem(itemId);
        
    }
    useEffect(() => {
        getItemType();
    }, []);
    return (
        <DismissKeyboard>
            <View style={styles.container}>
                <ScrollView>
                    <View >
                        <Section marginTop={10}>
                            <View>
                                <View style={[styles.row, { justifyContent: 'space-between' }]}>
                                    <View style={styles.row}>
                                        <Text>ชื่ออุปกรณ์</Text>
                                        <Text style={{ color: "#FF6820" }}> *</Text>
                                    </View>
                                    <View>
                                        <Text>{getTotalLength}/30</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <TextInput
                                    placeholder="เพิ่มชื่ออุปกรณ์"
                                    value={itemName}
                                    placeholderTextColor={"#B4B4B4"}
                                    onChangeText={(e) => handleText(e)}
                                    maxLength={30}
                                />
                            </View>
                        </Section>
                    </View >
                </ScrollView>
                <View style={[styles.saveBtn, styles.row]}>
                    <TouchableOpacity
                        style={styles.btnStyle}
                        onPress={() => handleSaveBtn()}
                    >
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>บันทึก</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </DismissKeyboard >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    moreItem: {
        width: 100,
        height: 100,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: 'center',
        borderWidth: 1,
        borderStyle: 'dotted',
        borderColor: "#FF6280",
    },
    row: {
        flexDirection: "row"
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