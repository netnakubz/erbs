import { useEffect } from 'react';
import {
    Image,
    Text,
    View,
    TouchableOpacity,
    StyleSheet,

} from 'react-native';
import { Card } from 'react-native-paper';


export default function Chat({ props, navigation, user }) {
    const name = props.userOne.userId === user.userId ?  `${props.userTwo.name} ${props.userTwo.surname}`:`${props.userOne.name} ${props.userOne.surname}`;
    const onPressChat = (roomId) => {
        navigation.navigate('DirectMessage', {
            roomId: roomId,
            destination: name,
            user: user
        });
    };
    useEffect(()=>{
    },[]);
    return (
        <TouchableOpacity
            onPress={() => {
                onPressChat(props.roomId);
            }}>
            <Card style={styles.card}>
                <View style={styles.row}>
                    <View>
                        <Image
                            style={{ width: 50, height: 50 }}
                            source={{
                                uri: props.image,
                            }}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <View>
                            <Text style={styles.chatName}>{name}</Text>
                        </View>
                    </View>
                </View>
            </Card>
        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    col: {
        flexDirection: 'column',
        flexWrap: 'wrap',
    },
    card: {
        padding: 10,
    },
    chatName: {
        fontWeight: 'bold',
    },
});
