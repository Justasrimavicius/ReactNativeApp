import React from 'react';
import { View, StatusBar, Platform } from 'react-native';

interface props{
    backgroundColor: string,
    barStyle: any
}

export default function (props: props) {
    const height = (Platform.OS === 'ios') ? 20 : 0;
    const { backgroundColor } = props;

    return (
        <View style={{ height, backgroundColor }}>
            <StatusBar { ...props } />
        </View>
    );
}