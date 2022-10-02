import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { UnderHeader } from "./UnderHeader";
import { Card, Overlay, SearchBar } from 'react-native-elements';
import API from "../env/API";

export const HomePageHeader = ({ content, page, value, setValue, selectedType, setSelectedType }) => {
    const [searchText, setSearchText] = useState('');
    const [typeOfItem, setTypeOfItem] = useState([]);
    const [itemType, setItemType] = useState([]);
    const handleSearchText = e => {
        setSearchText(e);
    };
    const getItemType = async () => {
        const data = await API.getItemType();
        let tempData = [{ label: "ทั้งหมด", value: 0 }]
        data.forEach(e => {
            tempData.push({ label: e.name, value: e.typeId })
        })
        setItemType(tempData);
    }
    useEffect(() => {
        getItemType();
    }, []);
    return (
        <View>
            <View>
                <Text style={styles.textContent}>{content}</Text>
                <Text style={styles.textHeader}>{page === "FindToBorrow" ? "Find To Borrow" : "Find To Lend"}</Text>
                <UnderHeader page={page} />
            </View>
            <View>
                <SearchBar
                    round={true}
                    platform="android"
                    lightTheme={true}
                    placeholder="What are you looking for?"
                    onChangeText={e => handleSearchText(e)}
                    value={searchText}
                />
            </View>
            {page === "FindToBorrow" &&
                <View>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={itemType}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={selectedType}
                        searchPlaceholder="Search..."
                        value={value}
                        onChange={item => {
                            setSelectedType(item.label)
                            setValue(item.value);
                        }}
                    />
                </View>
            }

        </View >
    );
}
const styles = StyleSheet.create({

    textHeader: {
        fontWeight: 'bold',
        fontSize: 30,
    },
    dropdown: {

        width: 100,
        textAlign: 'center',
        margin: 16,
        height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },
    textContent: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    selectedTextStyle: {
        justifyContent: "center",
        alignItems: 'center',
    }
});
