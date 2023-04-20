import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const SplashScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../assests/Logo.png')} />
        </View>
    )
}

export default SplashScreen

