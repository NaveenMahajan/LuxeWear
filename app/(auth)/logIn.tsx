import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function LoginPage() {
    const router = useRouter();
    const [secure, setSecure] = useState(true);

    const [data1, setData1] = useState({
        email: "",
        password: "",
    });

    const handleChange = (key: string, value: string) => {
        setData1({ ...data1, [key]: value });
    };

    const handleSubmit = async () => {
        console.log("Form Data:", data1);

        if (!data1.email || !data1.password) {
            alert("Please fill all fields");
            return;
        }

        try {
            const response = await fetch(
                "https://api.escuelajs.co/api/v1/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data1),
                }
            );

            const result = await response.json();
            console.log("Login Response:", result);

            if (response.ok) {
                const token = result.access_token;

                const profileResponse = await fetch(
                    "https://api.escuelajs.co/api/v1/auth/profile",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const user = await profileResponse.json();
                console.log("User Profile:", user);

                alert("Login Successful 🚀");

                router.replace({
                    pathname: "/(tabs)/profile",
                    params: { user: JSON.stringify(user) },
                });
            } else {
                alert(result.message || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>

                <Text style={styles.brand}>LUXEWEAR</Text>
                <Text style={styles.subtitle}>Sign in to your account</Text>

                <TextInput
                    placeholder="Email"
                    placeholderTextColor="#888"
                    style={styles.input}
                    value={data1.email}
                    onChangeText={(text) => handleChange("email", text)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#888"
                    secureTextEntry={secure}
                    style={styles.input}
                    value={data1.password}
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

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>

                <View style={styles.signupRow}>
                    <Text style={{ color: "#aaa" }}>Don’t have an account? </Text>

                    <TouchableOpacity
                        onPress={() => router.push("/(auth)/registration")}
                    >
                        <Text style={styles.signupText}>Signup</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.guestButton}
                    onPress={() => router.push("/(tabs)")}
                >
                    <Text style={styles.guestText}>Continue as Guest</Text>
                </TouchableOpacity>

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
        width: "100%",
        backgroundColor: "#1c1c1c",
        padding: 28,
        borderRadius: 18,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 8,
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
        right: 40,
        top: 210,
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

    guestButton: {
        marginTop: 20,
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: "#d4af37",
        borderRadius: 12,
        alignItems: "center",
    },

    guestText: {
        color: "#d4af37",
        fontSize: 15,
        fontWeight: "600",
    },
});