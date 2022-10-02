import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Section } from "../components/Section";
import Ionicons from "@expo/vector-icons/Ionicons";
export const Category = ({ navigation, route }) => {
    const { setSelectedType, itemType, selectedType } = route.params
    const [value, setValue] = useState(selectedType);

    const addItem = (id) => {
        if (!value.includes(id))
            setValue(oldValue => [...oldValue, id]);
        else {
            setValue(value.filter(val => val != id));
        }
    }
    useEffect(() => {
        setSelectedType(value);
    }, [value])
    return (
        <View style={styles.container}>
            <ScrollView>
                {itemType.map(item => {
                    return (
                        <View key={item.typeId}>
                            <TouchableOpacity
                                onPress={() => addItem(item.typeId)}
                            >
                                <Section marginTop={2}>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between'
                                    }}>
                                        <View>
                                            <Text>{item.name}</Text>
                                        </View>
                                        <View>
                                            {
                                                value.includes(item.typeId) &&
                                                <Ionicons
                                                    color={"green"}
                                                    size={16}
                                                    name="checkmark-outline"
                                                />
                                            }
                                        </View>
                                    </View>
                                </Section>
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})