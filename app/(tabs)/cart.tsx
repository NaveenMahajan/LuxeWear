import Header from '@/Components/HomeScreen/Header'
import { useCart } from '@/Hooks/ContextApi/CartContext'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context"

export default function Cart() {

    const { cartItems, cartTotal, removeFromCart, updateQuantity } = useCart()
    const router = useRouter()

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <Header title="Cart" showBack />

            {cartItems.length > 0 ? (

                <>
                    <ScrollView>

                        {cartItems.map((item) => (

                            <View key={item.id} style={styles.cartItem}>

                                {/* Product Image */}
                                <Image
                                    source={{ uri: item.product.images[0] }}
                                    style={styles.productImage}
                                />

                                {/* Product Info */}
                                <View style={{ flex: 1 }}>

                                    <Text
                                        style={styles.productName}
                                        numberOfLines={2}
                                    >
                                        {item.product.name}
                                    </Text>

                                    <Text style={styles.price}>
                                        ${item.price.toFixed(2)}
                                    </Text>

                                    <Text style={styles.size}>
                                        Size: {item.size}
                                    </Text>

                                    {/* Quantity Controls */}
                                    <View style={styles.quantityRow}>

                                        <TouchableOpacity
                                            style={styles.qtyButton}
                                            onPress={() =>
                                                updateQuantity(
                                                    item.productId,
                                                    item.quantity - 1,
                                                    item.size
                                                )
                                            }
                                        >
                                            <Ionicons name="remove" size={18} color="#000" />
                                        </TouchableOpacity>

                                        <Text style={styles.qtyText}>
                                            {item.quantity}
                                        </Text>

                                        <TouchableOpacity
                                            style={styles.qtyButton}
                                            onPress={() =>
                                                updateQuantity(
                                                    item.productId,
                                                    item.quantity + 1,
                                                    item.size
                                                )
                                            }
                                        >
                                            <Ionicons name="add" size={18} color="#000" />
                                        </TouchableOpacity>

                                    </View>

                                </View>

                                {/* Remove Button */}
                                <TouchableOpacity
                                    onPress={() =>
                                        removeFromCart(item.productId, item.size)
                                    }
                                >
                                    <Ionicons name="trash-outline" size={22} color="red" />
                                </TouchableOpacity>

                            </View>

                        ))}

                    </ScrollView>

                    {/* Cart Summary */}
                    <View style={styles.summaryContainer}>

                        <View style={styles.totalRow}>
                            <Text style={styles.totalText}>Total</Text>
                            <Text style={styles.totalPrice}>
                                ${cartTotal.toFixed(2)}
                            </Text>
                        </View>

                        <TouchableOpacity style={styles.checkoutButton}>
                            <Text style={styles.checkoutText}>
                                Proceed to Checkout
                            </Text>
                        </TouchableOpacity>

                    </View>
                </>

            ) : (

                <View style={styles.emptyContainer}>

                    <Ionicons name="cart-outline" size={80} color="#ccc" />

                    <Text style={styles.emptyText}>
                        Your cart is empty
                    </Text>

                    <TouchableOpacity
                        style={styles.shopButton}
                        onPress={() => router.push("/")}
                    >
                        <Text style={styles.shopText}>
                            Start Shopping
                        </Text>
                    </TouchableOpacity>

                </View>

            )}

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    cartItem: {
        flexDirection: "row",
        padding: 16,
        borderBottomWidth: 1,
        borderColor: "#eee",
        alignItems: "center"
    },

    productImage: {
        width: 70,
        height: 70,
        borderRadius: 8,
        marginRight: 12
    },

    productName: {
        fontSize: 14,
        fontWeight: "600"
    },

    price: {
        fontSize: 14,
        marginTop: 4,
        color: "#444"
    },

    size: {
        fontSize: 12,
        marginTop: 2,
        color: "#666"
    },

    quantityRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8
    },

    qtyButton: {
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 6,
        borderRadius: 6
    },

    qtyText: {
        marginHorizontal: 10,
        fontSize: 16
    },

    summaryContainer: {
        padding: 16,
        borderTopWidth: 1,
        borderColor: "#eee"
    },

    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12
    },

    totalText: {
        fontSize: 18,
        fontWeight: "600"
    },

    totalPrice: {
        fontSize: 18,
        fontWeight: "700"
    },

    checkoutButton: {
        backgroundColor: "#000",
        padding: 14,
        borderRadius: 8,
        alignItems: "center"
    },

    checkoutText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600"
    },

    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    emptyText: {
        marginTop: 10,
        fontSize: 16,
        color: "#666"
    },

    shopButton: {
        marginTop: 20,
        backgroundColor: "#000",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 6
    },

    shopText: {
        color: "#fff",
        fontWeight: "600"
    }

})