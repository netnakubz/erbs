import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, FlatList, Animated, SafeAreaView } from "react-native";
import { useNavigation } from '@react-navigation/native';
const { Value } = Animated;
import StickyHeaderProfile from '../components/StickyHeaderProfile';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import API from '../env/API';
export function PersonalScreen() {
    const navigation = useNavigation();
    const [ownerItems, setOwnerItems] = useState([]);
    const [isRefresh, setIsRefresh] = useState(false);
    const getMyItems = async () => {
        const data = await API.getMyItems();
        setOwnerItems(data);
    }
    useEffect(() => {
        getMyItems();
    }, []);
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    useEffect(() => {
        getMyItems();
        wait(2000).then(() => setIsRefresh(false));
    }, [isRefresh]);
    useEffect(()=>{
        navigation.setOptions({
            name:"askd"
        })
    },[]);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {
                ownerItems && <StickyHeaderProfile items={ownerItems} setIsRefresh={setIsRefresh} />
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    row: {
        flexDirection: "row",
        display: 'flex'
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 80 / 2
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
        color: '#464646'
    },
    personalInfo: {
        justifyContent: "space-between",
        padding: 15
    },
    personalInfoContents: {
        padding: 20
    },
    itemRent: {
        justifyContent: "space-between",
        padding: 15
    },
    itemRentContents: {
        padding: 20
    },
    moreItem: {
        marginLeft: 10,
        width: 100,
        height: 100,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: 'center',
        borderWidth: 1,
        borderStyle: 'dotted',
        borderColor: "#FF6280"
    },

})
