import React, { useState, useEffect, useMemo } from "react";
import { View, Text } from "react-native";
const Tab = createMaterialTopTabNavigator();
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Section } from "../components/Section";
const All = () => {
    return (
        <View>
            <Section marginTop={1}>
                <Text>RC123123 7 มีนาคม 2565</Text>
            </Section>
            <Section marginTop={1}>
                <Text>RC123123 7 มีนาคม 2565</Text>
            </Section>
        </View>
    );
}
const ReceiveRent = () => {
    return (
        <View>
            <Text>รับ-เช่า</Text>
        </View>
    );
}
const ReturnRent = () => {
    return (
        <View>
            <Text>คืน-เช่า</Text>
        </View>
    );
}
const ReceiveLend = () => {
    return (
        <View>
            <Text>รับ-ให้เช่า</Text>
        </View>
    );
}
export const Receipt = ({ navigation }) => {
    return (
        <Tab.Navigator
            screenOptions={{
                swipeEnabled: false
            }}>
            <Tab.Screen name="ทั้งหมด" component={All} />
            <Tab.Screen name="รับ-เช่า" component={ReceiveRent} />
            <Tab.Screen name="คืน-เช่า" component={ReturnRent} />
            <Tab.Screen name="รับ-ให้เช่า" component={ReceiveLend} />
        </Tab.Navigator>
    );
}