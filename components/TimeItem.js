import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import { gloabalStyles } from '../styles/GlobalStyles';
import ProgressBar from './ProgressBar';
import { getDateTime } from './Utils';

export default function TimeItem({isFilled, index}) {
    const colors = ['white', 'red', 'orange', 'green'];
    const [color, setColor] = useState('white');

    const nextColor = () => {
        let i = colors.indexOf(color);
        if (i == colors.length - 1) {
            i = 0;
        }
        else {
            i++;
        }
        setColor(colors[i]);
    }
    if (isFilled) {
        return (
            <TouchableOpacity style={[styles.item, styles.filledItem, {backgroundColor: color}]} onPress={nextColor}>
                <IndexText isFilled={isFilled} index={index}/>
            </TouchableOpacity>
        );
    }
    else {
        return (
            <TouchableOpacity style={[styles.item, styles.emptyItem]}>
                <IndexText isFilled={isFilled} index={index}/>
            </TouchableOpacity>
        );
    }
}

function IndexText({isFilled, index}) {
    if (index % 10 == 0) {
        if(isFilled) {
            return <Text style={[styles.itemText, styles.filledItemText]}>{index + 1}</Text>;
        }
        else {
            return <Text style={[styles.itemText, styles.emptyItemText]}>{index + 1}</Text>;
        }
    }
}

const styles = StyleSheet.create({
    block:{
        height: 20,
        width: 20,
        borderWidth: 2,
        borderColor: 'white',
    },
    body:{
        backgroundColor: 'white',
        flex: 1,
    },
    item:{
        height: 24,
        width: 24,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyItem: {
      borderWidth: 2,
      borderColor: 'white',
    },
    filledItem: {
      backgroundColor: 'white',
    },
    itemText:{
        fontSize: 10,
    },
    filledItemText: {
        color: 'black',
    },
    emptyItemText: {
        color: 'white',
    },
    
    
});
