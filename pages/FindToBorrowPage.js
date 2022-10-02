import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    Text, View, StyleSheet, ScrollView, TouchableOpacity, FlatList, RefreshControl, TouchableHighlight
} from 'react-native';

import Product from '../components/Product';
import { useNavigation } from '@react-navigation/native';
import { HomePageHeader } from '../components/HomePageHeader';
import LottieView from 'lottie-react-native';
import API from "../env/API";

import { RNHTMLtoPDF } from 'react-native-html-to-pdf-custom';

export const FindToBorrowPage = ({ content, setContent, isHomePage, setHomePage }) => {
    const [visible, setVisible] = useState(false);
    const [fetchingData, setFetchingData] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [totalData, setTotalData] = useState(10);
    const [post, setPost] = useState();
    const [value, setValue] = useState();
    const [selectedType, setSelectedType] = useState('ทั้งหมด');

    const flatListRef = useRef();
    useEffect(() => {
        if (post) {
            flatListRef.current.scrollToOffset({ animated: true, offset: 0 })
            setHomePage(false);
        }
    }, [isHomePage === true]);
    useEffect(() => {
        _NewData();
    }, []);
    const contentType = [{
        type: "All", color: "#00C9A7"

    }, {
        type: 'New Arrivals', color: '#F16B6B',
    }, {
        type: 'Popular', color: '#F9C67A',
    }, {
        type: 'Recommend', color: '#7AC8F9',
    },];

    const handleContent = type => {
        if (content === type) return;
        setContent(type);
    };
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const _onReFresh = async () => {
        setFetchingData(true);
        const data = await API.getPostFindToBorrow(0, 10);

        // setPost(data);
        wait(1000).then(() => setFetchingData(false));
    }
    const _NewData = async () => {
        setTotalData(totalData + 10);
        const data = await API.getPostFindToBorrow(0, totalData);
        setPost(data);
    }

    const navigation = useNavigation();
    return (
        <View style={styles.container} containerStyle={{ background: 'transparent' }}>
            {post ?
                <FlatList
                    ListHeaderComponent={
                        <View>
                            <HomePageHeader
                                content={content}
                                setValue={setValue}
                                value={value}
                                selectedType={selectedType}
                                setSelectedType={setSelectedType}
                                page="FindToBorrow"
                            />
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                {contentType.map((item, index) => (<TouchableOpacity
                                    key={index}
                                    onPress={() => handleContent(item.type)}>
                                    <View
                                        style={[styles.contentType, { backgroundColor: item.color }]}>
                                        <Text style={styles.contentText}>{item.type}</Text>
                                    </View>
                                </TouchableOpacity>))}
                            </ScrollView>
                        </View>
                    }
                    ref={flatListRef}
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={true}
                    data={post.content.filter(e => {
                        if (content !== "All" && selectedType !== "ทั้งหมด") {
                            return e.equipment.suggestion.some(
                                sug => sug.content === content
                            ) && e.equipment.equipmentTypes.some(
                                type => type.typeModel.name === selectedType
                            )
                        } else if (content !== "All") {
                            return e.equipment.suggestion.some(
                                sug => sug.content === content
                            )
                        } else if (selectedType !== "ทั้งหมด") {
                            return e.equipment.equipmentTypes.some(
                                type => type.typeModel.name === selectedType
                            )
                        } else {
                            return e;
                        }
                    }
                    )}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ width: '50%' }}>
                                <Product item={item} />
                            </View>
                        );
                    }}
                    keyExtractor={(item) => item.postId}
                    numColumns={2}
                    initialNumToRender={10}
                    refreshControl={<RefreshControl
                        refreshing={fetchingData}
                        onRefresh={_onReFresh}
                    />}
                    onMomentumScrollEnd={async () => {
                        await _NewData()
                    }}
                    ListFooterComponent={() => {
                        return (<View>
                            <View style={{ height: 50 }} />
                        </View>);
                    }}
                />
                :
                <View >
                </View>
            }

        </View>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1, marginTop: 10,
    }, contentColumn: {
        flex: 1, flexDirection: 'row', flexWrap: 'wrap',
    }, contentType: {
        marginLeft: 5, height: 70, width: 120, borderRadius: 25, alignItems: 'center', justifyContent: 'center',
    }, contentText: {
        textAlign: 'left', fontWeight: 'bold', padding: 5, fontSize: 18, color: 'white',
    },

});
