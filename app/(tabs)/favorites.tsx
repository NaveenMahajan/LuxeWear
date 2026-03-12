import Header from '@/components/home/Header'
import { useWishlist } from '@/hooks/ContextApi/WishlistContext'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Favorites() {

    const { wishlist, toggleWishlist } = useWishlist()
    const router = useRouter()

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>

            <View style={{ padding: 5 }}>

                <Header title='Favorites' showBack />
            </View>

            {wishlist.length > 0 ? (

                <ScrollView contentContainerStyle={styles.container}>

                    {wishlist.map((product) => (

                        <TouchableOpacity
                            key={product._id}
                            style={styles.card}
                            onPress={() =>
                                router.push({
                                    pathname: '/Products/ProductDetails',
                                    params: {
                                        productId: product._id
                                    }
                                })
                            }
                        >

                            {/* Product Image */}
                            <Image
                                source={{ uri: product.images[0] }}
                                style={styles.image}
                            />

                            {/* Remove Wishlist */}
                            <TouchableOpacity
                                style={styles.heartIcon}
                                onPress={() => toggleWishlist(product)}
                            >
                                <Ionicons name="heart" size={20} color="red" />
                            </TouchableOpacity>

                            {/* Product Info */}
                            <View style={styles.info}>

                                <Text
                                    style={styles.name}
                                    numberOfLines={2}
                                >
                                    {product.name}
                                </Text>

                                <View style={styles.ratingRow}>
                                    <Text>{product.ratings.average}</Text>
                                    <Ionicons name="star" size={16} color="#FFD700" />
                                    <Text>({product.ratings.count})</Text>
                                </View>

                                <Text style={styles.price}>
                                    ${product.price.toFixed(2)}
                                </Text>

                            </View>

                        </TouchableOpacity>

                    ))}

                </ScrollView>

            ) : (

                <View style={styles.emptyContainer}>

                    <Ionicons name="heart-outline" size={80} color="#ccc" />

                    <Text style={styles.emptyText}>
                        Your wishlist is empty
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



    title: {
        fontSize: 20,
        fontWeight: "700"
    },

    container: {
        padding: 16
    },

    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 10,
        marginBottom: 14,
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 3 }
    },

    image: {
        width: 90,
        height: 90,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },

    info: {
        flex: 1,
        padding: 10
    },

    name: {
        fontSize: 14,
        fontWeight: "600"
    },

    price: {
        marginTop: 6,
        fontSize: 15,
        fontWeight: "700"
    },

    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
        gap: 4
    },

    heartIcon: {
        position: "absolute",
        right: 10,
        top: 10
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