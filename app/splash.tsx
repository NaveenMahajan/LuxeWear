import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function SplashScreen() {

    useEffect(() => {

        const checkLogin = async () => {

            const user = await SecureStore.getItemAsync("user");

            if (user) {
                router.replace("/(tabs)");
            } else {
                router.replace("/(auth)/logIn");
            }

        };

        setTimeout(checkLogin, 1500);

    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>LUXEWEAR</Text>
            <ActivityIndicator size="large" color="#d4af37" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0f0f0f",
        justifyContent: "center",
        alignItems: "center"
    },

    logo: {
        fontSize: 36,
        fontWeight: "800",
        color: "#d4af37",
        letterSpacing: 4,
        marginBottom: 20
    }
});