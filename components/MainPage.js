import React, {useState, useEffect} from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Modal, TouchableOpacity} from 'react-native';
import { gloabalStyles } from '../styles/GlobalStyles';
import { AntDesign } from '@expo/vector-icons';
import TimerItem from './TimerItem';
import AddTimerForm from './AddTimerForm';
import { getDateTime } from './Utils';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function MainPage() {
    const [timers, setTimers] = useState([
        
    ]);

    useEffect(() => {
        AsyncStorage.getItem('timers').then((value) => {
            if (value != null) {
                setTimers(JSON.parse(value));
            }
        }
        );
    }, []);

    useEffect(() => {
        AsyncStorage.setItem('timers', JSON.stringify(timers));
    }, [timers]);

    const addTimer = (timer) => {
        timer.id = Math.random().toString();
        timer.progress = (Math.abs(new Date() - getDateTime(timer.startDate)) ) / (getDateTime(timer.endDate) - getDateTime(timer.startDate)) * 100;
        setTimers((currentTimers) => {
            return [timer, ...currentTimers];
        });
        setModalOpen(false);
    }

    const removeTimer = (id) => {
        setTimers((currentTimers) => {
            return currentTimers.filter(timer => timer.id != id);
        });
    }
    

    const [modalOpen, setModalOpen] = useState(false);
    const cancelAddingTimer = () => {
        setModalOpen(false);
    }

    return (

        <SafeAreaView style={styles.mainBlock}>
            
            <Modal 
                visible={modalOpen} 
                animationType="slide" 
                transparent={true}>
                <AddTimerForm addTimer={addTimer} cancelAddingTimer={cancelAddingTimer} style={styles.modalContent}/>
            </Modal>
            <View style={gloabalStyles.header}>
                <Text style={gloabalStyles.title}>XdaysTo...</Text>
            </View>
            <View style={gloabalStyles.body}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text style={gloabalStyles.subTitle}>Timers: </Text>
                    <AntDesign name={'plussquareo'} size={24} color={'white'} style={gloabalStyles.addIcon} onPress={() => setModalOpen(true)}/>
                </View>
                
                <View style={gloabalStyles.hr}></View>

                <FlatList 
                    data={timers}  
                    numColumns={2} 
                    columnWrapperStyle={styles.columnWrapper}
                    renderItem={({item}) => (
                        <TimerItem item={item} removeTimer={() => removeTimer(item.id)}/>
                    )} 
                />
            </View>
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    mainBlock:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    timersList:{
        backgroundColor: 'lightgrey',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    modalContainer: {
        // Стилі для самого модального вікна
        justifyContent: 'center',
        alignItems: 'center',
      },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    
    
});
