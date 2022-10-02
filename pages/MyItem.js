import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from '@expo/vector-icons/Ionicons';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const Allproduct = () => {
    return <View>
        <Text>Temp</Text>
    </View>
}
const Type = () => {
    return <View>
        <Text>Type</Text>
    </View>
}

export const MyItem = ({ navigation }) => {
    const handleSearch = () => {
    }
    useEffect(() => {
        navigation.setOptions({
            title: "อุปกรณ์",
            headerTitleStyle: {
                fontSize: 20,
                color: "#464646"
            },
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => handleSearch()}
                >
                    <Ionicons name="search-outline" color={"#FF6820"} size={20} />
                </TouchableOpacity>
            )
        })
    }, []);
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarLabelStyle: { fontSize: 16 },
                tabBarItemStyle: { width: 100 },
                tabBarActiveTintColor: "#FF6280",
                tabBarInactiveTintColor: "#464646",
                tabBarIndicatorStyle: {
                    backgroundColor: "#FF6280"
                },
                tabBarScrollEnabled: true
            }}
        >
            <Tab.Screen name="All" component={Allproduct} options={{ title: "ทั้งหมด" }} />
            <Tab.Screen name="Type" component={Type} options={{ title: "ประเภท" }} />
        </Tab.Navigator>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})