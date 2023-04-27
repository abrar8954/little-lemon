import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const ItemCardDeg = ({name, price}) => {
    return (
        <View style={{ height: 230, width: 180, backgroundColor: '#fff', borderRadius: 10, borderWidth: 1, borderColor: '#495E57' }}>
            <Image source={{ uri: 'https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/greekSalad.jpg?raw=true' }} style={{ width: 180, height: 150, }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingHorizontal: 10, alignItems: 'center' }}>
                <Text style={{ fontSize: 22, fontWeight: '500' }}>{name}</Text>
                <Text style={{ fontSize: 18, fontWeight: '500' }}>{price}</Text>
            </View>
            <Text style={{ fontSize: 18, fontWeight: '500', alignSelf: 'center', marginTop: 8, color: '#F5CF14' }}>Free Delevery!</Text>
        </View>
    )
}

export default ItemCardDeg

const styles = StyleSheet.create({})