import React, {useState, useEffect} from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Modal, TouchableOpacity} from 'react-native';
import { gloabalStyles } from '../styles/GlobalStyles';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { getDateTime } from './Utils';
import TimeItem from './TimeItem';



export default function TimerPage({ route }) {

    const modes = ['Days', 'Weeks', 'Months', 'Years'];
    const [mode, setMode] = useState('Weeks');
    const daysCount = (new Date(route.params.endDate) - new Date(route.params.startDate)) / (1000 * 60 * 60 * 24);
    const daysToNow = (new Date() - new Date(route.params.startDate)) / (1000 * 60 * 60 * 24);
    console.log('all days: ' + daysCount + ' days to now: ' + daysToNow);

    const weeksCount = Math.floor(daysCount / 7);
    const weeksToNow = Math.floor(daysToNow / 7);
    console.log(weeksCount);

    const monthsCount = Math.floor(daysCount / 30);
    const monthsToNow = Math.floor(daysToNow / 30);

    const yearsCount = Math.floor(daysCount / 365);
    const yearsToNow = Math.floor(daysToNow / 365);

    let timerItems = [];

    const setTimerItems = () => {
        console.log(mode);
        timerItems = [];
        if (mode == 'Days') {
            fillArray(daysToNow, daysCount);
          }
        if (mode == 'Weeks') {
            console.log('weeksToNow: ' + weeksToNow + ' weeksCount: ' + weeksCount);
            fillArray(weeksToNow, weeksCount);
        }
        if (mode == 'Months') {
            fillArray(monthsToNow, monthsCount);
        }
        if (mode == 'Years') {
            fillArray(yearsToNow, yearsCount);
        }
    }

    useEffect(() => {
        setTimerItems();
    }, [mode]);

    const fillArray = (filledCount, allCount) => {
        console.log('fillArray');
        let i;
        for ( i = 0; i < filledCount; i++) {
            console.log('push filled: ' + i);
            timerItems.push({index: i, isFilled: true});
        }
        
        for (let j = 0; j < allCount - filledCount; j++) {
            console.log('push other: ' + j);
            timerItems.push({index: j + i, isFilled: false});
        }
        console.log(timerItems.length);
    };

    const nextMode = () => {
        let index = modes.indexOf(mode);
        if (index == modes.length - 1) {
            index = 0;
        }
        else {
            index++;
        }
        setMode(modes[index]);
    }

    const prevMode = () => {
        let index = modes.indexOf(mode);
        if (index == 0) {
            index = modes.length - 1;
        }
        else {
            index--;
        }
        setMode(modes[index]);
    }

    const getAllModeElementsCount = () => {
        let count = 0;
        if (mode == 'Days') {
            count = Math.round(daysCount);
        }
        if (mode == 'Weeks') {
            count = Math.round(weeksCount);
        }
        if (mode == 'Months') {
            count = Math.round(monthsCount);
        }
        if (mode == 'Years') {
            count = Math.round(yearsCount);
        }
        return count;
    }

    const getFilledModeElementsCount = () => {
        let count = 0;
        if (mode == 'Days') {
            count = Math.round(daysToNow);
        }
        if (mode == 'Weeks') {
            count = Math.round(weeksToNow);
        }
        if (mode == 'Months') {
            count = Math.round(monthsToNow);
        }
        if (mode == 'Years') {
            count = Math.round(yearsToNow);
        }
        return count;
    }

    setTimerItems();

    return (

        <SafeAreaView style={styles.mainBlock}>
            
            <View style={gloabalStyles.header}>
                <Text style={gloabalStyles.title}>{route.params.title}</Text>
                <View style={[styles.dateTimeContainer, styles.text]}>
                    <Text style={[styles.dateTimeTextLeft, styles.text]}>From:</Text>
                    <Text style={[styles.dateTimeTextRight, styles.text]}>{formatDate(route.params.startDate)}</Text>
                </View>
                <View style={[styles.dateTimeContainer, styles.text]}>
                    <Text style={[styles.dateTimeTextLeft, styles.text]}>To:</Text>
                    <Text style={[styles.dateTimeTextRight, styles.text]}>{formatDate(route.params.endDate)}</Text>
                </View>
            </View>
            <View style={gloabalStyles.body}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text style={gloabalStyles.subTitle}>{mode}: {getFilledModeElementsCount()}/{getAllModeElementsCount()}</Text>
                    <Ionicons name="stats-chart" size={24} style={styles.button} color="white" />
                </View>
                
                <View style={gloabalStyles.hr}></View>

                <FlatList
                    style={styles.timersList}
                    data={timerItems}
                    renderItem={({ item }) => (
                      <TimeItem isFilled={item.isFilled} index={item.index}/>
                      
    )}
                    numColumns={10}
                    
                    />
            </View>
            <View style={gloabalStyles.footer}>
                <AntDesign name={'caretleft'} size={24} color={'white'} style={gloabalStyles.addIcon} onPress={prevMode}/>
                <Text style={[gloabalStyles.subTitle, styles.footer]}>{mode}</Text>
                <AntDesign name={'caretright'} size={24} color={'white'} style={gloabalStyles.addIcon} onPress={nextMode}/>
            </View>
        </SafeAreaView>
  );
}
function formatDate(date) {
    date = new Date(date);
    const day = String(date.getDate()).padStart(2, '0'); // Додаємо '0' вперед, якщо число менше 10
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Місяці починаються з 0
    const year = date.getFullYear();
  
    return `${day}.${month}.${year}`;
}

const styles = StyleSheet.create({
    mainBlock:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    timersList:{
        flex: 1,
        alignSelf: 'center',

        
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    footer:{
        marginHorizontal: 30,
    },
    
    dateTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dateTimeTextLeft: {
        flex: 1,
        textAlign: 'left',
    },
    dateTimeTextRight: {
        flex: 6,
        textAlign: 'left',
    },
    button:{
        backgroundColor: 'rgba(60,60,60,1)',
        paddingHorizontal: 20,
        paddingVertical: 5,
        justifyContent: 'center',
    },
    buttonText:{
        color: 'white',
        textAlign: 'center',
        // distance between letters
        letterSpacing: 1,
    },
    text: {
        color: 'white',
    }
    
    
  });