import React, { useEffect, useState, memo } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import { Card, Overlay, SearchBar } from 'react-native-elements';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProductPage } from '../pages/ProductPage';
import { useNavigation } from '@react-navigation/native';
const ProductStack = createNativeStackNavigator();
import API from '../env/API';
const Product = ({ item }) => {
    const navigation = useNavigation();
    const onClickItem = postId => {
        navigation.navigate('ProductPage', {
            postId: postId
        });
    };
    return (
        <TouchableOpacity onPress={() => onClickItem(item.postId)}>
            <Card containerStyle={[styles.cardCnt, {
            }]}>
                <Card.Image
                    style={{
                        borderRadius: 30,
                    }}
                    resizeMode="contain"
                    source={{ uri: `${API.domain}/files/${item?.equipment?.itemImg[0]?.location}` }}
                />
                <View>
                    <Text style={styles.cardText}>{item.details}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{ flexWrap: 'wrap' }}>{item.equipment?.price} ฿ / วัน</Text>
                </View>
            </Card>
        </TouchableOpacity>
    );
};
export default memo(Product);
const styles = StyleSheet.create({
    cardCnt: {
        borderWidth: 0,
        shadowColor: 'rgba(0,0,0, 0.0)', // Remove Shadow for iOS
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0, // Remove Shadow for Android
        backgroundColor: 'white',
        borderRadius: 30
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