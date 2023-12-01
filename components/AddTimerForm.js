import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import {Formik, Form, useField} from 'formik';
import { gloabalStyles } from '../styles/GlobalStyles';
import { getDateTime, formatDate } from './Utils';


export default function AddTimerForm({addTimer, cancelAddingTimer}) {
    const checkTitle = (title) => {
        const titlePattern = /^[a-zA-Z0-9\s]*$/;
        return titlePattern.test(title);
    }

    const checkDate = (date) => {
        const datePattern = /^\d{1,2}\.\d{1,2}\.\d{4}$/;
        return datePattern.test(date);
    }

    const checkDates = (startDate, endDate) => {
        const startDateTime = getDateTime(formatDate(startDate));
        const endDateTime = getDateTime(formatDate(endDate));
        return startDateTime < endDateTime;
    }

    const checkForm = (values) => {
        if (checkTitle(values.title) && checkDate(values.startDate) && checkDate(values.endDate) && checkDates(values.startDate, values.endDate)) {
            return true;
        }
        else {
            return false;
        }
    }

  return (
    
    <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.background} onPress={cancelAddingTimer}></TouchableOpacity>
        <View style={{flex:1, width: '100%'}}>
        </View>
        <View style={styles.content}>
            <Formik
                initialValues={{title: '', startDate: '', endDate: ''}}
                onSubmit={(values, action) => {addTimer(values); action.resetForm();}}>
                    {(props, action) => {

                        return(
                            <View>
                                <Text style={[gloabalStyles.subTitle, styles.title]}>Create new timer</Text>
                                <View style={gloabalStyles.hr}></View>
                                <View style={styles.mainLocalContainer}>
                                    <Text style={[gloabalStyles.text, styles.localLeftObj]}>Name:</Text>
                                    <TextInput 
                                        style={[styles.input, styles.localCenterObj]}
                                        placeholder='Timer Title'
                                        placeholderTextColor={'gray'}
                                        onChangeText={props.handleChange('title')}
                                        value={props.values.title}
                                    />
                                </View>
                                <View style={styles.mainLocalContainer}>
                                    <Text style={[gloabalStyles.text, styles.localLeftObj]}>Start Date</Text>
                                    <TextInput 
                                        style={[styles.input, styles.localCenterObj]}
                                        placeholder='01.01.2021'
                                        placeholderTextColor={'gray'}
                                        onChangeText={props.handleChange('startDate')}
                                        value={props.values.startDate}
                                    />
                                </View>
                                
                                <View style={styles.mainLocalContainer}>
                                    <Text style={[gloabalStyles.text, styles.localLeftObj]}>End Date</Text>
                                    <TextInput 
                                        style={[styles.input, styles.localCenterObj]}
                                        placeholder='01.01.2021'
                                        placeholderTextColor={'gray'}
                                        onChangeText={props.handleChange('endDate')}
                                        value={props.values.endDate}
                                    />
                                </View>
                                
                                <TouchableOpacity style={[styles.button, {marginTop: 40,}]} onPress={() => {
                                    if(checkForm(props.values)){
                                        props.values.startDate = formatDate(props.values.startDate);
                                        props.values.endDate = formatDate(props.values.endDate);
                                        props.handleSubmit();
                                    } 
                                    else {
                                        alert('Please check your input');
                                    }
                                }}>
                                    <Text style={styles.buttonText}>ADD</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.simpleButton, {marginTop: 20,}]} onPress={cancelAddingTimer}>
                                    <Text style={[styles.buttonText, {color: 'gray'}]}>cancel</Text>
                                </TouchableOpacity>
                            </View>
                        )
                        }
                    }

            </Formik>
        </View>
        
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    background: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
      },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    content: {
        flex: 1.5,
        width: '95%',
        backgroundColor: 'rgba(30,30,30,1)',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        
        
    },
    title:{
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: 'white',
        padding: 5,
        paddingLeft: 15,
        fontSize: 18,
        color: 'white',

    },
    mainLocalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    localLeftObj: {
        flex: 1,
        textAlign: 'left',
    },
    localCenterObj: {
        flex: 2.5,
        alignSelf: 'center',
    },
    button:{
        borderWidth: 2,
        borderColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 5,
        justifyContent: 'center',
        width: '50%',
        alignSelf: 'center',
    },
    simpleButton:{
        paddingHorizontal: 20,
        paddingVertical: 5,
        justifyContent: 'center',
        width: '50%',
        alignSelf: 'center',
    },
    buttonText:{
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        letterSpacing: 1,
    },
});
