import LoginPage from '@/app/(auth)/logIn'
import React from 'react'
import { View } from 'react-native'

export default function index() {
    return (
        <View style={{ flex: 1 }}>
            <LoginPage />
        </View>
    )
}