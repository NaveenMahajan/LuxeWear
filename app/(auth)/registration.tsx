import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function Registration() {
    const router = useRouter();

    const [secure, setSecure] = useState(true);
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (key: string, value: string) => {
        setData({ ...data, [key]: value });
    };

    const handleSubmit = async () => {

        if (!data.name || !data.email || !data.password) {
            alert("Please fill all fields");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                "https://api.escuelajs.co/api/v1/users/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...data,
                        avatar: "https://i.pravatar.cc/150"
                    }),
                }
            );

            const result = await response.json();

            if (response.ok) {
                alert("Signup successful! Please login.");
                router.push("/(auth)/logIn");
            } else {
                alert(result.message || "Signup failed.");
            }

        } catch (error) {
            console.error("Signup Error:", error);
            alert("Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>

                <Text style={styles.brand}>LUXEWEAR</Text>
                <Text style={styles.subtitle}>Create your account</Text>

                <TextInput
                    placeholder="Full Name"
                    placeholderTextColor="#888"
                    style={styles.input}
                    value={data.name}
                    onChangeText={(text) => handleChange("name", text)}
                />

                <TextInput
                    placeholder="Email"
                    placeholderTextColor="#888"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                    value={data.email}
                    onChangeText={(text) => handleChange("email", text)}
                />

                <View style={{ position: "relative" }}>
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="#888"
                        secureTextEntry={secure}
                        style={styles.input}
                        value={data.password}
                        onChangeText={(text) => handleChange("password", text)}
                    />

                    <TouchableOpacity
                        style={styles.showButton}
                        onPress={() => setSecure(!secure)}
                    >
                        <Text style={styles.showText}>
                            {secure ? "Show" : "Hide"}
                        </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>
                        {loading ? "Creating..." : "SIGN UP"}
                    </Text>
                </TouchableOpacity>

                <View style={styles.signupRow}>
                    <Text style={{ color: "#aaa" }}>
                        Already have an account?
                    </Text>

                    <TouchableOpacity
                        onPress={() => router.push("/(auth)/logIn")}
                    >
                        <Text style={styles.signupText}> Login</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        padding: 25,
        backgroundColor: "#0f0f0f",
    },

    card: {
        backgroundColor: "#1c1c1c",
        padding: 28,
        borderRadius: 18,
        elevation: 8,
    },

    brand: {
        fontSize: 34,
        fontWeight: "800",
        textAlign: "center",
        color: "#d4af37",
        letterSpacing: 3,
    },

    subtitle: {
        textAlign: "center",
        color: "#aaa",
        marginBottom: 30,
        marginTop: 5,
    },

    input: {
        height: 52,
        borderWidth: 1,
        borderColor: "#333",
        borderRadius: 12,
        paddingHorizontal: 18,
        marginBottom: 18,
        fontSize: 16,
        backgroundColor: "#2a2a2a",
        color: "#fff",
    },

    showButton: {
        position: "absolute",
        right: 20,
        top: 16,
    },

    showText: {
        color: "#d4af37",
        fontWeight: "600",
    },

    button: {
        backgroundColor: "#d4af37",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
    },

    buttonText: {
        color: "#000",
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 1,
    },

    signupRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 25,
    },

    signupText: {
        color: "#d4af37",
        fontWeight: "600",
    },

});