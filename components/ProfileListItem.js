import * as React from 'react';
import {
    StyleSheet,
    View,
    RefreshControl,
    FlatList,
    TextInput,
    Text,
    Animated
} from 'react-native';
// import Animated, { Easing } from 'react-native-reanimated';

import data from './data.js';
import ProfileOptions from './ProfileOptions';

const { interpolate, Extrapolate, event, Value } = Animated;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const BANNER_HEIGHT = 250;

export default function ProfileListItem(props) {
    const { y } = props;
    const [flatListRef, setFlatListRef] = React.useState();
    const height = y.interpolate({
        inputRange: [0, BANNER_HEIGHT * 2],
        outputRange: [BANNER_HEIGHT, 0],
        extrapolate: 'clamp',
    });

    return (
        <Animated.View style={[styles.container]}>
            <Animated.View style={{ height }} />
            <ProfileOptions />
            <AnimatedFlatList
                numColumns={3}
                // contentContainerStyle={{ marginTop: BANNER_HEIGHT }}
                onScroll={event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    y,
                                },
                            },
                        },
                    ],
                )}
                scrollEventThrottle={1}
                data={data}
                ref={ref => {
                    setFlatListRef(ref);
                }}
                refreshing={false}
                onRefresh={() => { }}
                renderItem={({ num }) => (
                    <View style={styles.row}>
                        <Text style={{ padding: 10 }}>LIST ITEM</Text>
                    </View>
                )}
            />
        </Animated.View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    row: {
        paddingVertical: 15,
        backgroundColor: '#f5f5f5',
    },
});
