import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    RefreshControl
} from 'react-native';

import { Dropdown } from 'react-native-element-dropdown';
import Ionicons from '@expo/vector-icons/Ionicons';
import Swiper from 'react-native-swiper'


import axios from 'axios';
import { Card, Overlay, SearchBar } from 'react-native-elements';
import ProductLend from '../components/ProductLend';
import { ProductPage } from "./ProductPage"
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { UnderHeader } from '../components/UnderHeader';
import { HomePageHeader } from '../components/HomePageHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FloatingBtn } from '../components/FloatingBtn';
import API from '../env/API';

export const FindToLendPage = () => {
    const [searchText, setSearchText] = useState('');
    const [reFreshing, setRefreshing] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [visible, setVisible] = useState(false);
    const [content, setContent] = useState('All');
    const [post, setPost] = useState();
    const [totalData, setTotalData] = useState(10);
    const getPost = async () => {
        const data = await API.getPostFindToLend(0, 10);
        setPost(data.content);
    }
    useEffect(() => {
        getPost();
    }, []);
    const handleSearchText = e => {
        setSearchText(e);
    };
    const handlePressAddButton = () => {
        setVisible(!visible);
    };
    const handleContent = type => {
        if (content === type) return;
        setContent(type);
    };
    const navigation = useNavigation();
    const handleLendBtn = () => {
        navigation.navigate("RentPage");
        setVisible(false);
    }
    const handleRentBtn = () => {
        navigation.navigate("RentPage");
        setVisible(false);
    }
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const _onReFresh = async () => {
        reFreshing(true);
        const data = await API.getPostFindToLend(0, totalData);
        if (data !== post)
            setPost(data.content);
        wait(1000).then(() => setRefreshing(false));
    }
    const _NewData = async () => {
        setFetching(true);
        setTotalData(totalData + 10);
        const data = await API.getPostFindToLend(0, totalData);
        if (data !== post)
            setPost(data.content);
        wait(1000).then(() => setFetching(false));
    }
    return (
        <View style={styles.container}>
            {post ?
                <FlatList
                    ListHeaderComponent={
                        <HomePageHeader content={content} page="FindToLend" />
                    }
                    data={post}
                    contentContainerStyle={{
                        flexGrow: 1
                    }}
                    onMomentumScrollEnd={async () => {
                        await _NewData();
                    }}
                    initialNumToRender={10}
                    columnWrapperStyle={{ flexWrap: 'wrap' }}
                    numColumns={2}
                    renderItem={({ item }) => {
                        return (
                            <View
                                style={{ width: '50%' }}
                                key={item.postId} >
                                <ProductLend item={item} />
                            </View>
                        );
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={reFreshing}
                            onRefresh={_onReFresh}
                        />
                    }
                    keyExtractor={(item) => item.postId}
                    ListFooterComponent={<View style={{ height: 50 }} />}
                />
                :
                <View />
            }

        </View>
    );
}

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    textHeader: {
        fontWeight: 'bold',
        fontSize: 30,
    },
    container: {
        flex: 1,
        flexGrow: 1,
    },
    contentColumn: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    row: {
        flex: 1,
        justifyContent: 'space-around',
    },
    card: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
        backgroundColor: 'transparent',
        opacity: 0,
    },
    cardCnt: {
        borderWidth: 0,
        shadowColor: 'rgba(0,0,0, 0.0)', // Remove Shadow for iOS
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0, // Remove Shadow for Android
        backgroundColor: 'transparent',
    },
    // cardImg: {
    //   width: width,
    //   borderRadius: 40,
    // },
    cardText: {
        textAlign: 'left',
        fontWeight: 'bold',
    },
    contentType: {
        marginLeft: 5,
        height: 70,
        width: 120,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentText: {
        textAlign: 'left',
        fontWeight: 'bold',
        padding: 5,
        fontSize: 18,
        color: 'white',
    },
    dropdown: {
        width: 70,
        textAlign: 'center',
        margin: 16,
        height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        textAlign: 'center',
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    textContent: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
