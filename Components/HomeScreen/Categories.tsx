import { CATEGORIES } from "@/constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
export default function Categories() {
    const router = useRouter();
    return (
        <View style={styles.container}>

            <View style={styles.headerRow}>
                <Text style={styles.title}>Categories</Text>

            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            >
                {CATEGORIES.map((item, id) => (
                    <TouchableOpacity key={item.id} style={styles.categoryItem} onPress={() => router.push({
                        pathname: '/categories_list',
                        params: {
                            categoriesId: item.name
                        }

                    })}>
                        <Ionicons name={item.icon} size={22} color="#333" />

                        <Text style={styles.categoryText}>{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    categoryItem: {
        backgroundColor: "#f2f2f2",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginRight: 12,
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
    },

    categoryText: {
        fontSize: 12,
        fontWeight: "500",
    },
    container: {
        marginTop: 10,
    },

    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
    },

    title: {
        fontSize: 18,
        fontWeight: "700",
    },

    viewText: {
        fontSize: 14,
        fontWeight: "400",
        color: "#888",
    },

    scrollContainer: {
        paddingHorizontal: 16,
        marginTop: 12,
    },
});
