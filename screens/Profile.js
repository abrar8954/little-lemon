import { StyleSheet, Text, View, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, ScrollView, } from 'react-native'
import React, { useState, useEffect } from 'react'
import TextInputRe from '../common/TextInputRe'
import CheckBox from 'react-native-check-box'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaskedTextInput } from "react-native-mask-text";
import { useNavigation } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const Profile = () => {
  const [isChecked, setIsChecked] = useState([false, false, false, false]);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [image, setImage] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    getMultiple();
    // console.log('firstName.charAt(0): ', firstName.charAt(0));
    console.log('isChecked: ', isChecked[0]);
  }, [])

  let getMultiple = async () => {

    let values
    try {
      values = await AsyncStorage.multiGet(['firstName', 'email', 'lastName', 'phoneNo', 'isChecked', 'image'])
      setFirstName(values[0][1]);
      setEmail(values[1][1]);
      setLastName(values[2][1]);
      setPhoneNo(values[3][1]);

      // if (values[4][1]) {
      //   setIsChecked(values[4][1])
      // }


    } catch (e) {
      // read error
      console.log(e);
    }
    console.log('ProfileScrGetDaAsc: ', values)

  }


  // let getMultiple = async () => {

  //   let values
  //   try {
  //     values = await AsyncStorage.multiGet(['lastName', 'email'])
  //     setLoggedIn(values);
  //   } catch (e) {
  //     // read error
  //   }
  //   console.log(values)

  // }

  const gallery = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });
    const image = result.assets.map(img => {
      return img.uri;
    })
    console.log('imageGallery: ', image);
    console.log('result: ', result);
    console.log('imageGalleryimage[0]: ', image[0]);

    setImage(image[0]);
  }

  let multiSet = async () => {
    console.log('firstName: ', firstName);
    console.log('email: ', email);
    console.log('lastName: ', lastName);
    console.log('phoneNo: ', phoneNo);
    console.log('isChecked: ', isChecked);

    const fiPair = ["firstName", firstName]
    const sePair = ["email", email]
    const thPair = ["lastName", lastName]
    const foPair = ["phoneNo", phoneNo]
    const fifPair = ["isChecked", JSON.stringify(isChecked)]
    const siPair = ["image", image]

    try {
      await AsyncStorage.multiSet([fiPair, sePair, thPair, foPair, fifPair, siPair])
    } catch (e) {
      //save error
      console.log(e);
    }

    console.log("Done.")
  }

  const handleItemClick = (index) => {
    const newArrayState = [...isChecked]; // create a copy of the array
    newArrayState[index] = !newArrayState[index]; // update the element at the given index
    setIsChecked(newArrayState); // set the new state of the array
    console.log('BelowisChecked: ', isChecked);
  };


  let clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch (e) {
      // clear error
    }

    console.log('Done.')
  }


  return (

    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{}}>

      <ScrollView >

        <View style={{ backgroundColor: '#fff', height: 230 }}>
          <View style={{ width: '100%', height: 75, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 12, }}>
            <TouchableOpacity style={{ width: 45, height: 45, backgroundColor: '#495E57', borderRadius: 40 / 2, justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.goBack()}>
              <Image source={require('../assests/left_arr.png')} style={{ width: 31, height: 31 }} tintColor={'#fff'} />
            </TouchableOpacity>
            <Image source={require('../assests/Logo.png')} />
            <TouchableOpacity
              onPress={() => {
                clearAll()
                navigation.navigate('Onboarding')
              }}>
              <Image source={require('../assests/logout.png')} style={{ width: 31, height: 31 }} tintColor={'#495E57'} />
            </TouchableOpacity>

          </View>

          <View style={{ flexDirection: 'row', marginTop: 25, }}>
            {image == '' ?
              <View style={{ width: 100, height: 100, marginLeft: 20, borderRadius: 100 / 2, backgroundColor: '#99edc3', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 50, fontWeight: '400', color: '#fff' }}>{firstName.charAt(0)}</Text>
              </View>
              :
              <Image source={{ uri: image }} style={{ width: 100, height: 100, marginLeft: 20, borderRadius: 100 / 2 }} />
            }

            <TouchableOpacity style={{ width: 90, height: 34, backgroundColor: '#495E57', borderRadius: 10, justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end', marginLeft: 20, marginBottom: 8 }}>
              <Text style={{ fontSize: 16, fontWeight: '400', color: '#fff' }}>Remove</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{ width: 31, height: 31, position: 'absolute', bottom: 37, left: 90 }} onPress={() => gallery()}>
            <Image source={require('../assests/plus.png')} style={{ width: 31, height: 31, }} />
          </TouchableOpacity>

        </View>

        <View style={{ backgroundColor: '#495E57', borderTopRightRadius: 15, borderTopLeftRadius: 15, }}>
          <Text style={{ fontSize: 20, fontWeight: '600', color: '#fff', alignSelf: 'center', marginTop: 10 }}>Personal Information</Text>
          <Text style={{ fontSize: 17, fontWeight: '400', color: '#fff', marginTop: 15, marginBottom: 5, marginLeft: 20 }}>First Name</Text>
          <TextInputRe placeholder={'Enter First Name'} value={firstName} onChangeText={(txt) => { setFirstName(txt) }} />

          <Text style={{ fontSize: 17, fontWeight: '400', color: '#fff', marginTop: 15, marginBottom: 5, marginLeft: 20 }}>Last Name</Text>
          <TextInputRe placeholder={'Enter Last Name'} value={lastName} onChangeText={(txt) => { setLastName(txt) }} />

          <Text style={{ fontSize: 17, fontWeight: '400', color: '#fff', marginTop: 15, marginBottom: 5, marginLeft: 20 }}>Email</Text>
          <TextInputRe placeholder={'Enter Email'} value={email} onChangeText={(txt) => { setEmail(txt) }} />

          <Text style={{ fontSize: 17, fontWeight: '400', color: '#fff', marginTop: 15, marginBottom: 5, marginLeft: 20 }}>Phone Number</Text>
          {/* <TextInputRe placeholder={'Enter Ph No'} value={{}} onChangeText={{}} /> */}
          <MaskedTextInput
            mask="(999)999-9999"
            onChangeText={(text, rawText) => {
              console.log(text);
              console.log(rawText);
              setPhoneNo(text);
            }}
            placeholder='(555) 555-1234'
            style={{
              backgroundColor: '#fff', height: 45, width: '75%', borderRadius: 10, paddingLeft: 10, marginLeft: 20
            }}
            keyboardType='numeric'
            value={phoneNo}
          />

          <View style={{ height: 1, width: '90%', backgroundColor: '#fff', alignSelf: 'center', marginTop: 25 }}></View>

          <Text style={{ fontSize: 20, fontWeight: '600', color: '#fff', alignSelf: 'center', marginTop: 10 }}>Email Notifications</Text>

          <CheckBox
            style={{ marginTop: 15, marginLeft: 20 }}
            onClick={() => {
              handleItemClick(0);
            }}
            isChecked={isChecked[0]}
            rightText={'Order statuses'}
            rightTextStyle={{ fontSize: 17, fontWeight: '400', color: '#fff', }}
            checkBoxColor='#F5CF14'
          />

          <CheckBox
            style={{ marginTop: 15, marginLeft: 20 }}
            onClick={() => {
              handleItemClick(1);
            }}
            isChecked={isChecked[1]}
            rightText={'Password changes'}
            rightTextStyle={{ fontSize: 17, fontWeight: '400', color: '#fff', }}
            checkBoxColor='#F5CF14'
          />

          <CheckBox
            style={{ marginTop: 15, marginLeft: 20 }}
            onClick={() => {
              handleItemClick(2);
            }}
            isChecked={isChecked[2]}
            rightText={'Special offers'}
            rightTextStyle={{ fontSize: 17, fontWeight: '400', color: '#fff', }}
            checkBoxColor='#F5CF14'
          />

          <CheckBox
            style={{ marginTop: 15, marginLeft: 20 }}
            onClick={() => {
              handleItemClick(3);
            }}
            isChecked={isChecked[3]}
            rightText={'Newsletter'}
            rightTextStyle={{ fontSize: 17, fontWeight: '400', color: '#fff', }}
            checkBoxColor='#F5CF14'
          />

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, marginBottom: 20 }}>
            <TouchableOpacity style={{ width: 90, height: 34, backgroundColor: '#fff', borderRadius: 10, justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end', marginLeft: 15, marginBottom: 8 }}>
              <Text style={{ fontSize: 16, fontWeight: '400', color: '#000' }}>Discard</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ width: 90, height: 34, backgroundColor: '#F5CF14', borderRadius: 10, justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end', marginLeft: 15, marginBottom: 8 }} onPress={() => { multiSet() }}>
              <Text style={{ fontSize: 16, fontWeight: '400', color: '#fff' }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>

  )
}

export default Profile

