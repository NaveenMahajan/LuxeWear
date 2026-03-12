
import Header from "@/components/home/Header";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Address() {

    const [address, setAddress] = useState({
        name: "",
        phone: "",
        addressLine: "",
        city: "",
        state: "",
        zip: "",
    });

    const handleChange = (key: string, value: string) => {
        setAddress({ ...address, [key]: value });
    };

    const handleSave = () => {
        console.log("Address Saved:", address);
        alert("Address saved successfully!");
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>

            <Header title="Shipping Address" showBack />

            <View style={styles.container}>

                <TextInput
                    placeholder="Full Name"
                    style={styles.input}
                    value={address.name}
                    onChangeText={(text) => handleChange("name", text)}
                />

                <TextInput
                    placeholder="Phone Number"
                    style={styles.input}
                    keyboardType="phone-pad"
                    value={address.phone}
                    onChangeText={(text) => handleChange("phone", text)}
                />

                <TextInput
                    placeholder="Address Line"
                    style={styles.input}
                    value={address.addressLine}
                    onChangeText={(text) => handleChange("addressLine", text)}
                />

                <TextInput
                    placeholder="City"
                    style={styles.input}
                    value={address.city}
                    onChangeText={(text) => handleChange("city", text)}
                />

                <TextInput
                    placeholder="State"
                    style={styles.input}
                    value={address.state}
                    onChangeText={(text) => handleChange("state", text)}
                />

                <TextInput
                    placeholder="ZIP Code"
                    style={styles.input}
                    keyboardType="numeric"
                    value={address.zip}
                    onChangeText={(text) => handleChange("zip", text)}
                />

                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveText}>Save Address</Text>
                </TouchableOpacity>

            </View>


        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {
        padding: 20,
    },

    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        padding: 12,
        marginBottom: 15,
        fontSize: 16,
    },

    saveButton: {
        backgroundColor: "#000",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },

    saveText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});