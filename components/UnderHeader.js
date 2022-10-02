import React, { useState, useEffect } from "react";

import { View, Text, StyleSheet } from "react-native";

export const UnderHeader = ({ page }) => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={[styles.line]}>
                    <View style={[styles.lineColor, { right: page === "FindToBorrow" ? null : 0 }]}></View>
                </View>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    line: {
        width: 80,
        height: 5,
        borderWidth: 1,
        borderRadius: 10
    },
    lineColor: {
        backgroundColor: "black",
        width: 40,
        height: 5,
        position: 'absolute',
    },
    row: {
        flexDirection: 'row',
    }
});