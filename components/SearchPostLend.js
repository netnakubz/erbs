import React, { useEffect, useState, useRef } from "react";
import { View, Text, FlatList } from "react-native";
import API from "../env/API";
import ProductLend from "./ProductLend";
export const SearchPostLend = ({ route }) => {
    const [post, setPost] = useState([]);
    const flatListRef = useRef();
    const getPost = async () => {
        const { searchText } = route.params;
        const data = await API.searchPostLend(searchText);
        setPost(data);
    }
    useEffect(() => {
        getPost();
    }, []);
    return (
        <View>
            {post ?
                <FlatList
                    ref={flatListRef}
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={true}
                    data={post}
                    renderItem={({ item }) => {
                        return (
                            <View
                                style={{ width: '50%' }}
                                key={item.postId} >
                                <ProductLend item={item} />
                            </View>
                        );
                    }}
                    keyExtractor={(item) => item.postId}
                    numColumns={2}
                    initialNumToRender={10}
                // ListFooterComponent={() => {
                //     return (<View>
                //         <View style={{ height: 50 }} />
                //     </View>);
                // }}
                />
                :
                <View>
                    <Text>ไม่พบข้อมูล</Text>
                </View>
            }
        </View>
    );
}