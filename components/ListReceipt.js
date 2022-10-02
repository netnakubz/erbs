import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
export const ListReceipt = ({ receipt }) => {
    const naviation = useNavigation();
    const handleOnPressReceipt = (item) => {
        naviation.navigate("SaveReceipt", { receipt: item });
    }
    return (
        receipt.map((item) => (
            <TouchableOpacity key={item.receiptId}
                style={[styles.col, {
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignContent: 'flex-start'
                }]}
                onPress={() => handleOnPressReceipt(item)}
            >
                <View>
                    <Text style={{ fontSize: 18, textAlign: 'center' }}>
                        Invoice ID  {item.receiptId}
                    </Text>
                </View>
                <Text style={{ textAlign: 'left' }}>
                    item : {item.contractModel.equipmentModel.name}
                </Text>
                <Text style={{ textAlign: 'left' }}>
                    Borrower : {item.contractModel.equipmentModel.user.userId === item.contractModel.roomModel.userOne.userId ? item.contractModel.roomModel.userTwo.name : item.contractModel.roomModel.userOne.name}
                </Text>
            </TouchableOpacity>
        ))
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start"
    },
    col: {
        flexDirection: 'column',
        alignItems: 'center',
        width: `33.33%`,
        borderWidth: 0.5,
        height: 200
    },
})