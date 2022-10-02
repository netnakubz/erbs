import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, KeyboardAvoidingView, Modal, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { GiftedChat, InputToolbar, Send, Actions, Bubble } from 'react-native-gifted-chat';
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';
import API from '../env/API';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { Contract } from './FirstContract';

export default function DirectMessage({ route, navigation }) {
  const [messages, setMessages] = useState([]);
  const [isInputPressed, setIsInputPressed] = useState(false);
  const [contractModalShow, setContractModalShow] = useState(false);
  const [newContract, setNewContract] = useState();
  const { destination, roomId, user, data } = route.params;
  const SOCKET_URL = `${API.domain}/ws`;
  var socket = '';
  var stompClient = '';
  var connected = false;
  socket = new SockJS(SOCKET_URL);
  const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  const getChat = async () => {
    let messages = await API.getChat(roomId);
    messages.filter(message => {
      if (message.function) {
        message.text = <TouchableOpacity onPress={() => {
          navigation.navigate('firstContract', {
            values: message.function,
            save: false,
            roomId: roomId
          })
        }}>
          <Text style={{ color: 'red', fontSize: 18 }}>ตรวจสอบสัญญา</Text>
        </TouchableOpacity>
      }
    });
    if (data !== undefined) {
      let systemMessage = {
        _id: uuid(),
        text: 'ข้อความจากระบบ',
        createdAt: new Date(),
        quickReplies: {
          type: 'radio', // or 'checkbox',
          keepIt: true,
          values: [
            {
              title: '😋 สนใจสินค้า ',
              text: '😋 สนใจ ' + data.equipment.name,
              user: {
                _id: user
              }
            },
            {
              title: '👋 ต้องกาติดต่อเพิ่มเติม',
              text: '👋 ต้องกาติดต่อเพิ่มเติม',
              user: {
                _id: user
              }
            },
          ],
        },
        user: {
          _id: 1,
          name: 'System',
        },
      }
      setMessages([...messages, systemMessage].reverse());
    } else {
      setMessages([...messages].reverse());
    }
  }
  const sendContract = async () => {
    let contract = {
      roomModel: {
        roomId: newContract.room,
      },
      equipmentModel: {
        itemId: newContract.item,
      },
      totalRent: newContract.totalRent,
      price: newContract.price,
      startDate: newContract.startDate,
      endDate: newContract.endDate,
      fineLate: newContract.fineLate,
      fineBroken: newContract.fineBroken,
      creator: newContract.creator,
      editStatus: false
    }
    let data = await API.createContract(contract);
    systemMessage(data.contractId)
  }

  const systemMessage = async (contractId) => {
    let message = [{
      _id: uuid(),
      createdAt: new Date(),
      text: "",
      user: {
        _id: 1,
        name: "system"
      },
      function: JSON.stringify(contractId),
      system: true
    }]
    if (message[0].createdAt === null) {
      message[0].createdAt = new Date();
    }
    onSend(message);
  }
  // Chat pattern
  // Array [
  // Object {
  //   "_id": "1bceb2f7-4d0f-4c75-9131-d38c2124897e",
  //   "createdAt": 2022-04-16T14:00:58.791Z,
  //   "text": "ราร",
  //   "user": Object {
  //     "_id": 1,
  //   },
  // },
  // ]
  useEffect(() => {
    sendContract()
  }, [newContract]);

  useEffect(() => {
    getChat();

    navigation.setOptions({ title: destination });
    stompClient = Stomp.over(socket);
    stompClient.connect(
      {},
      (frame) => {
        connected = true;
        stompClient.subscribe(`/chat/private-${roomId}`, (val) => {
          const newMessage = JSON.parse(val.body);
          const object = [{
            _id: newMessage._id,
            createdAt: newMessage.createdAt,
            text: newMessage.function ? <TouchableOpacity onPress={() => {
              navigation.navigate('firstContract', {
                values: newMessage.function,
                save: false,
                roomId: roomId
              })
            }}>
              <Text style={{ color: 'red', fontSize: 18 }}>ตรวจสอบสัญญา</Text>
            </TouchableOpacity> :
              newMessage.text,
            user: {
              _id: newMessage.user._id,
            },
            system: newMessage.system,
          }]
          onReceiveMessage(object);
        });
      },
      (error) => {
        console.log(error);
        connected = false;
      }
    );


  }, []);

  const onReceiveMessage = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  const onSend = useCallback((messages = []) => {

    stompClient.send(`/app/send-${roomId}`, JSON.stringify(messages[0]));
  }, []);

  return (
    <GiftedChat
      // renderSend={(props) => }
      renderInputToolbar={(props) => {
        return (
          <KeyboardAvoidingView style={{ flex: 1 }}>
            <InputToolbar
              {...props}
              containerStyle={{
                borderRadius: "40%",
              }}
            />
          </KeyboardAvoidingView>
        );
      }
      }

      renderActions={(props) => {
        return (
          <Actions {...props} onPressActionButton={() => {
            navigation.navigate('firstContract', {
              setNewContract: (contract) => setNewContract(contract),
              save: true,
              roomId: roomId
            })
          }}
          />
        );
      }
      }
      messages={messages}
      isTyping={true}
      onQuickReply={(message) => {
        let newMessage = [
          {
            _id: uuid(),
            createdAt: new Date(),
            user: {
              _id: user
            },
            text: message[0].text,
          },
        ]
        onSend(newMessage);
      }
      }

      placeholder={"พิมพ์ข้อความ"}
      onSend={(message) => {
        onSend(message)
      }}
      user={{
        _id: user,
      }}
    />
  );
}



const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
})