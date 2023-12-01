import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import { gloabalStyles } from '../styles/GlobalStyles';

export default function ProgresBar({progress}) {
    const calculatedWidth = `${progress}%`;

    return (
      <View style={styles.bar}>
        <View style={[styles.progress, { width: calculatedWidth }]}></View>
      </View>
    );
}

const styles = StyleSheet.create({
    bar:{
        height: 20,
        borderWidth: 2,
        borderColor: 'white',
        overflow: 'hidden',
        marginTop: 10,
    },
    progress:{
        height: '100%',
        backgroundColor: 'white',
    },
    
});
