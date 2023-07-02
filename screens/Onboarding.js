import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Onboarding = () => {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [errFirstNme, setErrFirstNme] = useState('false');
    const [errEmail, setErrEmail] = useState('false');
    const [disability, setDisability] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        // console.log('Open');
        // console.log('errEmail: ', errEmail);
        // console.log('errFirstNme: ', errEmail);
        // console.log('firstName.length: ', firstName.length);
        // console.log('email.length: ', email.length);

        if (errEmail == 'allowed' && errFirstNme == 'allowed' && firstName.length > 0 && email.length > 0) {
            setDisability(true);
        } else {
            setDisability(false);
        }

    }, [errFirstNme, errEmail, firstName, email])


    const ftNmeValid = (ftNamePr) => {
        let validStr = /^[a-zA-Z]*$/;

        setFirstName(ftNamePr);
        if (!ftNamePr.match(validStr)) {
            console.log("Not Valid");
            setErrFirstNme('true');
        }
        else {
            console.log("Valid");
            setErrFirstNme('allowed');
        }

    }

    const emailValid = emailPr => {
        let re = /\S+@\S+\.\S+/;
        let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

        setEmail(emailPr);
        if (re.test(emailPr) || regex.test(emailPr)) {
            setErrEmail('allowed');
            console.log("Valid");
        } else {
            setErrEmail('true');
            console.log("Not Valid");
        }
    };

    let multiSet = async () => {
        const firstPair = ["firstName", firstName]
        const secondPair = ["email", email]
        try {
            await AsyncStorage.multiSet([firstPair, secondPair])
        } catch (e) {
            //save error
        }

        console.log("Done.")
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <View style={{ flex: 1, }}>
                <View style={{ width: '100%', height: 75, backgroundColor: '#DEE3E9', justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../assests/Logo.png')} />
                </View>
                <View style={{ flex: 0.75, backgroundColor: '#CBD2D9', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Text style={{ fontSize: 25, color: '#314551' }}>Let us get to know you</Text>
                    <Text style={{ fontSize: 25, marginTop: 90, color: '#314551' }}>First Name</Text>
                    <TextInput style={{ borderWidth: 1, borderColor: '#455968', width: '70%', borderRadius: 10, height: 55, marginTop: 15, paddingLeft: 10 }} onChangeText={(txt) => ftNmeValid(txt)} placeholder='Enter First Name' placeholderTextColor={'#314551'} />
                    {errFirstNme == 'true' ? <Text style={{ fontSize: 16, marginTop: 3, color: 'red' }}>Name must contain alphabets..</Text> : null}
                    <Text style={{ fontSize: 25, marginTop: 15, color: '#314551' }}>Email</Text>
                    <TextInput style={{ borderWidth: 1, borderColor: '#455968', width: '70%', borderRadius: 10, height: 55, marginTop: 15, marginBottom: errEmail == 'true' ? 3 : 45, paddingLeft: 10 }} placeholder='Enter Email' placeholderTextColor={'#314551'} onChangeText={(txt) => emailValid(txt)} />
                    {errEmail == 'true' ? <Text style={{ fontSize: 16, marginBottom: errEmail == 'true' ? 45 : null, color: 'red' }}>Email not correct..</Text> : null}
                </View>
                <View style={{ flex: 0.25, backgroundColor: '#F1F4F7', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <TouchableOpacity style={{ backgroundColor: '#CBD2D9', paddingVertical: 10, width: 120, alignItems: 'center', justifyContent: 'center', marginBottom: 35, marginRight: 30, borderRadius: 10 }}
                        onPress={() => {
                            // console.warn("Hi there")
                            multiSet();
                            navigation.navigate('Home');
                        }} disabled={disability ? false : true}>
                        <Text style={{ fontSize: 25, color: '#314551', }}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Onboarding

const styles = StyleSheet.create({})