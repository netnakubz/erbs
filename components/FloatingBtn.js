import React, { useEffect, useMemo, useState } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Overlay } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import FAB from 'react-native-fab'
export const FloatingBtn = () => {
    const navigation = useNavigation();

    const [visible, setVisible] = useState(false);
    const handlePressAddButton = () => {
        setVisible(!visible);
        console.log('Hello Floting button');
    };
    const handleLendBtn = () => {
        navigation.navigate("LendPage");
        setVisible(false);
    }
    const handleRentBtn = () => {
        navigation.navigate("RentPage");
        setVisible(false);
    }
    return (
        <View style={{ bottom: 50 }}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Overlay
                    overlayStyle={{
                        position: 'absolute',
                        bottom: 130,
                        right: 10,
                    }}
                    width="auto"
                    height="auto"
                    isVisible={visible}
                    onBackdropPress={() => handlePressAddButton()}>
                    <View>
                        <TouchableOpacity
                            onPress={() => handleLendBtn()}
                        >
                            <Text style={{ textAlign: 'center' }}>สร้างโพสต์ปล่อยเช่า</Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            marginTop: 10,
                            marginBottom: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: 'black',
                        }}
                    />
                    <View>
                        <TouchableOpacity
                            onPress={() => handleRentBtn()}
                        >
                            <Text style={{ textAlign: 'center' }}>สร้างโพสต์ขอยืม</Text>
                        </TouchableOpacity>
                    </View>
                </Overlay>
            </View>
            <View>
                <TouchableOpacity
                    style={{
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,0)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 60,
                        height: 60,
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        backgroundColor: '#FF6280',
                        borderRadius: 100,
                    }}
                    onPress={() => handlePressAddButton()}>
                    <Ionicons name="add-outline" size={50} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
