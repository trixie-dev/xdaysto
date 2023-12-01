import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import { gloabalStyles } from '../styles/GlobalStyles';
import ProgressBar from './ProgressBar';
import { getDateTime } from './Utils';

export default function TimerItem({item, removeTimer}) {
  return (
    
    <View style={styles.block}>
        <View style={styles.content}>
            <Text style={styles.text}>{item.title}</Text>

            <View style={[styles.dateTimeContainer, styles.text]}>
                <Text style={[styles.dateTimeTextLeft, styles.text]}>Start:</Text>
                <Text style={[styles.dateTimeTextRight, styles.text]}>{formatDate(item.startDate)}</Text>
            </View>

            <View style={[styles.dateTimeContainer, styles.text]}>
            <Text style={[styles.dateTimeTextLeft, styles.text]}>End:</Text>
            <Text style={[styles.dateTimeTextRight, styles.text]}>{formatDate(item.endDate)}</Text>
            </View>

            <ProgressBar progress={item.progress} />

        </View>
        <View>
            <TouchableOpacity style={styles.button} onPress={removeTimer}>
                <Text style={styles.buttonText}>REMOVE</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

export function AddTimerItem({item}) {
    return (
        <View style={styles.block}>
        </View>
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
    block:{
        height: 140,
        width: '48%',
        marginBottom: 10,
        borderWidth: 2,
        borderColor: 'rgba(60,60,60,1)',
        justifyContent: 'space-between',
    },
    content:{
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
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
        flex: 3,
        textAlign: 'center',
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
