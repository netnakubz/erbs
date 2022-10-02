import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, StyleSheet, Button, Image, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Dimensions } from "react-native";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Ionicons from '@expo/vector-icons/Ionicons';
import Hr from "../components/Hr";
import API from "../env/API";
import { SliderBox } from "react-native-image-slider-box";
export function ProductPage({ navigation, route }) {
    const { postId } = route.params;
    const [isLiked, setIsLiked] = useState(true);
    const [item, setItem] = useState();
    const [itemImg, setItemImg] = useState([]);
    const [owner, setOwner] = useState({
        photo: "https://i.pinimg.com/736x/b1/16/0f/b1160fdd10b71b095c19366845fd6b3e.jpg",
        name: "สมชาย รักดี",
        email: "6210210000@psu.ac.th"
    })
    const handleLikeClick = (postId) => {
        API.like(postId);
        setIsLiked(!isLiked);
    }
    const contactBtn = async () => {
        //if data is null create new room;
        //if not null redirect to direct message 
        let data = await API.searchRoom(item?.equipment.user.userId);
        let tempUser = data.userOne.userId === item.equipment.user.userId ? data.userTwo.userId : data.userOne.userId;
        navigation.navigate("DirectMessage", {
            roomId: data.roomId,
            destination: item?.equipment.user.name + " " + item?.equipment.user.surname,
            user: tempUser,
            data: item
        })
    }
    const liked = async (post) => {
        const data = await API.isLiked(post.postId);
        setIsLiked(data);
    }
    const getPost = async () => {
        const data = await API.getPostById(postId);
        setItem(data);
        let temp = [];
        data?.equipment?.itemImg.forEach(img => {
            temp.push(`${API.domain}/files/${img.location}`);
        })
        setItemImg(temp);
        await liked(data);
    }
    useEffect(() => {
        navigation.setOptions({
            title: '',
            headerTransparent: true,
        });
        getPost();
    }, []);

    return (
        <View>
            <ScrollView
                style={{ backgroundColor: "white" }}
            >
                {item &&
                    <View style={styles.imageZone}>
                        <SliderBox
                            images={itemImg}
                            sliderBoxHeight={"100%"}
                            paginationBoxStyle={{
                                position: "absolute",
                                bottom: 0,
                                padding: 0,
                                alignItems: "center",
                                alignSelf: "center",
                                justifyContent: "center",
                                paddingVertical: 10
                            }}
                            ImageComponentStyle={{ padding: 50 }}
                        />
                        {/* <Image
                            style={styles.postImage}
                            resizeMode="center"
                            source={{
                                uri: `${API.domain}/files/${item?.equipment?.itemImg[0]?.location}`
                            }}
                        /> */}
                    </View>
                }
                <View style={styles.postDetails}>
                    <View style={styles.postContents}>
                        <View style={styles.row}>
                            <View style={{ flex: 0.9 }}>
                                <View style={{ flexDirection: 'row', flexWrap: "wrap" }}>
                                    {item?.equipment.equipmentTypes.map(item =>
                                        <TouchableOpacity key={item.typeModel.typeId}>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    margin: 2
                                                }}
                                            >
                                                <View style={{
                                                    padding: 4,
                                                }}>
                                                    <Text
                                                        style={{
                                                            color: "#43BFF5",
                                                        }}
                                                    >
                                                        #{item.typeModel.name}
                                                    </Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                            <View style={{ flex: 0.1 }}>
                                <View>
                                    <TouchableOpacity
                                        onPress={() => { handleLikeClick(item.postId) }}
                                    >
                                        <Ionicons name={isLiked ? "heart" : "heart-outline"} size={30} color={isLiked ? "#FF6280" : "black"} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text style={[styles.itemName, { color: "#464646" }]}>{item?.equipment?.name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 20, color: "#464646" }}>ราคาที่เสนอ</Text>
                            <Text style={{ fontSize: 20, marginLeft: 10, color: "#FF6280" }}>{item?.equipment?.price} THB</Text>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Text style={{ color: "#464646" }}>
                                {item?.details}
                            </Text>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Text style={{ color: "#464646", fontWeight: "bold" }}>รายละเอียด</Text>
                            <Text style={{ color: "#464646" }}>คลัง : {item?.equipment?.quantity}</Text>
                            <Text style={{ fontSize: 13, color: "#464646" }}>เช่าแล้ว : {item?.equipment?.totalRent} ครั้ง</Text>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Hr size={40} />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={[styles.row,
            {
                backgroundColor: 'white',
                bottom: 10,
                position: 'absolute',
                justifyContent: "space-evenly",
                left: 0,
                right: 0
            }]}
            >
                <View>
                    <Image
                        style={{ width: 50, height: 50, borderRadius: 50 }}
                        source={{
                            uri: owner.photo
                        }}
                    />
                </View>
                <View>
                    <Text style={{ fontWeight: "bold", color: "#464646", fontSize: 16 }}>{item?.equipment.user.name} {item?.equipment.user.surname}</Text>
                    <Text>{item?.equipment.user?.email}</Text>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => contactBtn()}
                    >
                        <View style={{
                            width: 80,
                            height: 40,
                            backgroundColor: "#FF6280",
                            borderRadius: 30,
                            justifyContent: 'center',

                        }}>
                            <Text
                                style={{
                                    textAlign: "center",
                                    margin: 'auto',
                                    color: 'white',
                                    fontSize: 18,
                                    fontWeight: "bold"
                                }}
                            >
                                ติดต่อ
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: 16
    },
    col: {
        flexDirection: "column"
    },
    bottom: {
        position: 'absolute',
        bottom: 0,
    },
    postDetails: {
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: "white",
        height: windowHeight - windowHeight / 2.3
    },
    imageZone: {
        height: windowHeight / 2.3
    },
    postContents: {
        padding: 30,
    },
    postImage: {
        width: windowWidth,
        height: windowHeight / 2
    },
    itemName: {
        fontSize: 32,
    }
});