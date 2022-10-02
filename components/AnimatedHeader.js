import React from "react";
import { Animated, View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Profile } from "./Profile";
const HEADER_HEIGHT = 200;
export const AnimatedHeader = ({ animatedValue }) => {
    const insets = useSafeAreaInsets();
    const headerHeight = animatedValue.interpolate({
        inputRange: [0, HEADER_HEIGHT + insets.top],
        outputRange: [HEADER_HEIGHT + insets.top, insets.top + 30],
        extrapolate: 'clamp'
    });
    const translateY = animatedValue.interpolate({
        inputRange: [0, HEADER_HEIGHT * 2],
        outputRange: [0, -HEADER_HEIGHT],
        // outputRange: [HEADER_HEIGHT + insets.top, insets.top + 30],
        extrapolate: 'clamp',
    });
    return (
        <Animated.View
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 10,
                height: headerHeight,

            }}
        >
            <Animated.View style={{
                transform: [{ translateY }]
            }}>
                <Profile />
                <View style={[{ borderWidth: 1, height: 45, marginTop: 15, }]}>
                    <View style={[styles.container, styles.row, { justifyContent: 'space-around', alignItems: 'center' }]}>
                        <View>
                            <Text>a</Text>
                        </View>
                        <View>
                            <Text>b</Text>
                        </View>
                        <View>
                            <Text>b</Text>
                        </View>
                    </View>
                </View>
            </Animated.View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    row: {
        flexDirection: 'row'
    }
})