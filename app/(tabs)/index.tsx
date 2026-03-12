import BannerScreen from '@/components/home/BannerScreen'
import Categories from '@/components/home/Categories'
import Header from '@/components/home/Header'
import PopularProduct from '@/components/home/PopularProduct'
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