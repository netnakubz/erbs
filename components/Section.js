import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

export const Section = ({ children, marginTop }) => {
    return (
        <View style={[styles.section, { marginTop: marginTop }]}>
            {children}
        </View>
    );
}


const styles = StyleSheet.create({
    section: {
        backgroundColor: "white",
        padding: 20,
    }
})