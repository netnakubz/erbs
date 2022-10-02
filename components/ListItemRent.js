import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements"
export default function ListItemRent(props) {
    const { activeTab, setActiveTab, index } = props;
    const icons = ["pricetag-outline", "receipt-outline", "cloud-outline"];
    return (
        <View style={{ flex: 1, backgroundColor: 'white', top: 0 }}>
            {
                index <= 2 ?
                    <TouchableOpacity onPress={() => { setActiveTab(`tab${index}`) }}>
                        <View style={{ flex: 1 }}>
                            <View style={[styles.row, { justifyContent: 'center' }]}>
                                <View style={activeTab === `tab${index}` ? styles.underline : null}>
                                    <View style={{ flex: 1 }}>
                                        <View style={[styles.row, { justifyContent: 'center' }]}>
                                            <Ionicons name={icons[index]} size={30} />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    :
                    <View >
                        <TouchableOpacity
                            onPress={() => {  }}
                        >
                            <View style={styles.item}>
                                <View style={styles.itemBorder}>
                                    <Image
                                        style={styles.itemImage}
                                        source={{ uri: "https://picsum.photos/200/300" }} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
            }
        </View >
    );
}

const styles = StyleSheet.create({
    itemBorder: {
        borderWidth: 0.5
    },
    itemImage: {
        width: '100%',
        height: 150,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: 'center',
    },
    underline: {
        width: 100,
        borderBottomWidth: 2
    },
    row: {
        flexDirection: 'row'
    }
})