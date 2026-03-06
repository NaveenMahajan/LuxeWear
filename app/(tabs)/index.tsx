import BannerScreen from '@/Components/HomeScreen/BannerScreen'
import Categories from '@/Components/HomeScreen/Categories'
import Header from '@/Components/HomeScreen/Header'
import PopularProduct from '@/Components/HomeScreen/PopularProduct'
import React from 'react'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Home() {
    return (
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>

            <Header
                title="LuxeWear"
                showCart
                showMenu
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <BannerScreen />
                <Categories />
                <PopularProduct />
            </ScrollView>

        </SafeAreaView>
    )
}