import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function ProfileOptions() {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <TouchableOpacity onPress={() => { }}>
                    <View>
                        <Text>asd</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { }}>
                    <View>
                        <Text>asd</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { }}>
                    <View>
                        <Text>asd</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        height: 60,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    searchBox: {
        backgroundColor: '#f5f5f5',
        borderRadius: 5,
        paddingLeft: 15
    }
});
