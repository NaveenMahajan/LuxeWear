import Header from '@/components/home/Header'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Settings() {

    const settingsOptions = [
        {
            id: 1,
            title: "Edit Profile",
            icon: "person-outline"
        },
        {
            id: 2,
            title: "Change Password",
            icon: "lock-closed-outline"
        },
        {
            id: 3,
            title: "Notifications",
            icon: "notifications-outline"
        },

        {
            id: 4,
            title: "Payment Methods",
            icon: "card-outline"
        },
        {
            id: 5,
            title: "Help & Support",
            icon: "help-circle-outline"
        },
    ]

    return (

        <SafeAreaView>
            <Header title='Setting' showBack />
            <View style={styles.container}>



                {settingsOptions.map((item) => (

                    <TouchableOpacity key={item.id} style={styles.menuItem}>

                        <View style={styles.menuLeft}>
                            <Ionicons name={item.icon as any} size={22} color="#000" />
                            <Text style={styles.menuText}>{item.title}</Text>
                        </View>

                        <Ionicons name="chevron-forward" size={20} color="#777" />

                    </TouchableOpacity>

                ))}



            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({

    container: {

        backgroundColor: "#fff",

        padding: 30,
        paddingVertical: 60,
    },

    title: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 25
    },

    menuItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee"
    },

    menuLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12
    },

    menuText: {
        fontSize: 16
    },

})