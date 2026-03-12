import Header from '@/components/home/Header';
import { COLORS, PROFILE_MENU } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {

    const params = useLocalSearchParams();
    const user = params.user ? JSON.parse(params.user as string) : null;
    const router = useRouter()
    const handleLogout = () => {

        router.replace("/(auth)/logIn");
    };
    return (
        <SafeAreaView style={styles.container}>
            <Header title='Profile' showBack />

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={!user ? styles.centerContent : styles.content}
            >

                {!user ? (
                    <View style={styles.card}>

                        <View style={styles.iconContainer}>
                            <Ionicons name="person" size={40} color={COLORS.secondary} />
                        </View>

                        <Text style={styles.title}>Guest User</Text>

                        <Text style={styles.subtitle}>
                            Log in to view your profile, orders and addresses.
                        </Text>

                        <TouchableOpacity style={styles.button} onPress={() => router.push("/(auth)/logIn")}>
                            <Text style={styles.buttonText}>Login / Sign Up</Text>
                        </TouchableOpacity>

                    </View>
                ) : (
                    <>
                        <View style={styles.profileCard}>

                            <Image
                                source={{ uri: user.avatar }}
                                style={styles.profileImage}
                            />

                            <Text style={styles.name}>
                                {user.name}
                            </Text>

                            <Text style={styles.email}>
                                {user.email}
                            </Text>

                            <View style={styles.menuContainer}>
                                {PROFILE_MENU.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.menuItem}
                                        onPress={() => router.push(item.route as any)}
                                    >
                                        <View style={styles.menuLeft}>
                                            <Ionicons
                                                name={item.icon as any}
                                                size={20}
                                                color={COLORS.primary}
                                            />

                                            <Text style={styles.menuText}>
                                                {item.title}
                                            </Text>
                                        </View>

                                        <Ionicons
                                            name="chevron-forward"
                                            size={18}
                                            color={COLORS.secondary}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                                <Ionicons name="log-out-outline" size={20} color="#fff" />
                                <Text style={styles.logoutText}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        backgroundColor: "#ef4444",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 20,
        width: "100%"
    },

    logoutText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600"
    },
    menuContainer: {
        width: "100%",
        marginTop: 20
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
        fontSize: 16,
        fontWeight: "500"
    },
    profileCard: {
        alignItems: "center",
        padding: 25,
        backgroundColor: "#fff",
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
        elevation: 4
    },

    profileImage: {
        width: 90,
        height: 90,
        borderRadius: 45,
        marginBottom: 15
    },

    name: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 5
    },

    email: {
        fontSize: 14,
        color: "#777"
    },

    container: {
        flex: 1,
        backgroundColor: "#fff"
    },

    scroll: {
        flex: 1,
        padding: 20
    },

    centerContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    content: {
        paddingTop: 20
    },

    card: {
        alignItems: "center",
        padding: 25,
        backgroundColor: "#fff",
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
        elevation: 4
    },

    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#f2f2f2",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15
    },

    title: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 5
    },

    subtitle: {
        fontSize: 14,
        color: "#777",
        textAlign: "center",
        marginBottom: 20,
        paddingHorizontal: 10
    },

    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8
    },

    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600"
    }

})