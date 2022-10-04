import React, { useEffect, useState, memo } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import { Card, Overlay, SearchBar } from 'react-native-elements';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProductPage } from '../pages/ProductPage';
import { useNavigation } from '@react-navigation/native';
import API from '../env/API';
import { Alert } from 'react-native';
const ProductStack = createNativeStackNavigator();



const ProductLend = ({ item }) => {
    const [usedColors, setUsedColors] = useState([]);
    const [myProfile, setMyProfile] = useState({});
    const navigation = useNavigation();
    const onClickItem = async postId => {
        if (item.userId.userId === myProfile.userId) {
            return Alert.alert("คุณเป็นเจ้าของโพสต์นี้");
        }
        const data = await API.searchRoom(item.userId.userId);
        const des = myProfile.userId === data.userOne.userId ? data.userTwo : data.userOne;
       console.log(item);
        navigation.navigate('DirectMessage', {
            postId: postId,
            roomId: data.roomId,
            destination: des,
            user: myProfile,
        });
    };
    const getMyProfile = async () => {
        const data = await API.getUserProfile();
        setMyProfile(data);
    }
    useEffect(() => {
        getMyProfile();
    }, []);
    function generateRandomColor() {
        const colors = ["#FAC7C0", "#FFDB94", "#CAE3D4", "#F0D7C4", "#B9E4E7", "#FFCADD"];
        const randNumber = Math.floor(Math.random() * colors.length);
        return colors[randNumber];
    }

    return (
        <TouchableOpacity onPress={() => onClickItem(item.postId)}>
            <Card containerStyle={[styles.cardCnt, { backgroundColor: generateRandomColor() }]}>
                <Card.Title
                >
                    <Text style={{ color: "white" }}>{item.details}</Text>
                </Card.Title>
                <View>
                    <Text>ราคา {item.price}</Text>
                </View>
                <View>
                    <Text>
                        {item.create_date.split("T")[0]}
                    </Text>
                </View>
                <View>
                    <Text>
                        {item.details}
                    </Text>
                </View>
                <View>
                    <Text style={{ textAlign: 'right' }}>เช่า {item.period} วัน</Text>
                </View>
            </Card>
        </TouchableOpacity>
    );
};

export default memo(ProductLend);

const styles = StyleSheet.create({
    cardCnt: {
        borderWidth: 0,
        shadowColor: 'rgba(0,0,0, 0.0)', // Remove Shadow for iOS
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0, // Remove Shadow for Android
        borderRadius: 30,
    },
    cardText: {
        textAlign: 'left',
        fontWeight: 'bold',
    },
    contentText: {
        textAlign: 'left',
        fontWeight: 'bold',
        padding: 5,
        fontSize: 18,
        color: 'white',
    },

});