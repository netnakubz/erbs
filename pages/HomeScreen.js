import React, {useEffect, useState} from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import Swiper from 'react-native-swiper'
import {Dimensions} from 'react-native';
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import {FindToBorrowPage} from "./FindToBorrowPage";
import {FindToLendPage} from './FindToLendPage';
import {FloatingBtn} from '../components/FloatingBtn';

const RenderHomeScreen = ({isHomePage, setHomeFalse}) => {
    const [content, setContent] = useState('All');

    return (
        <View
            style={styles.sliderBox}
        >
            <SafeAreaView
                style={styles.sliderBox}>
                <Swiper
                    showsPagination={false}
                    loop={false}
                    scrollEnabled={true}
                    nestedScrollEnabled={true}
                    removeClippedSubviews={false}
                    containerStyle={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}
                >
                    <FindToBorrowPage content={content} setContent={setContent} isHomePage={isHomePage}
                                      setHomePage={setHomeFalse}/>
                    <FindToLendPage/>
                </Swiper>
                <FloatingBtn/>
            </SafeAreaView>
        </View>

    );
}
const HomeStack = createNativeStackNavigator();
export const HomeScreen = ({isHomePage, setHomeFalse}) => {
    return (
        <HomeStack.Navigator screenOptions={{headerShown: false}}>
            <HomeStack.Screen
                children={props => <RenderHomeScreen {...props} isHomePage={isHomePage} setHomeFalse={setHomeFalse}/>}
                name="RenderHomeScreen"/>
        </HomeStack.Navigator>
    );
};

const styles = StyleSheet.create({
    sliderBox: {
        flex: 1
    }
})
