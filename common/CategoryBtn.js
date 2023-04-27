import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const CategoryBtn = ({text, selectedMenuIndex, onPress, btnColor,}) => {
    return (
        <TouchableOpacity style={{ marginHorizontal: 10, alignSelf: 'center', padding: 10, backgroundColor: btnColor ? '#F5CF14' : '#EDEFEE', borderRadius: 10 }} onPress={() => onPress(selectedMenuIndex)}>
            <Text style={{ fontSize: 18, fontWeight: '500', color: btnColor ? '#fff' : '#000' }}>{text}</Text>
        </TouchableOpacity>
    )
}

export default CategoryBtn
