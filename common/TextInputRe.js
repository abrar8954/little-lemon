import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const TextInputRe = ({ placeholder, value, onChangeText }) => {
    return (

        <TextInput style={{ backgroundColor: '#fff', height: 45, width: '75%', borderRadius: 10, paddingLeft: 10, marginLeft: 20}}
            placeholder={placeholder} value={value} onChangeText={(txt) => {onChangeText(txt)}} />

    )
}

export default TextInputRe

