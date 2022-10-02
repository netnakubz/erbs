import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Picker, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
export default function PickerItemLendRent({ route }) {
    const navigation = useNavigation();
    const { myItems } = route.params;
    const [val, setValue] = useState(myItems[0].name);
    const handleSelectButton = () => {
        navigation.navigate("LendPage", {
            val: val
        });
    }
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    title="เลือก"
                    onPress={() => handleSelectButton()}
                />
            )
        });
    }, []);

    return (
        <View style={styles.conatiner}>
            <View style={styles.col}>
                <Picker
                    selectedValue={val}
                    onValueChange={(itemValue, itemIndex) => {
                        setValue(itemValue);
                    }
                    }
                >
                    {myItems?.map(item => (
                        <Picker.Item label={item.name} value={item.name} key={item.itemId} />
                    ))}
                </Picker >
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1
    },
    col: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
    }
});