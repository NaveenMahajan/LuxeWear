
import { dummyProducts } from '@/assets/assets'
import { Product } from '@/constants/types'
import { useWishlist } from '@/Hooks/ContextApi/WishlistContext'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
    ActivityIndicator,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

export default function PopularProduct() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { toggleWishlist, isInWishlist } = useWishlist()

    const fetchProducts = async () => {
        setLoading(true)

        setTimeout(() => {
            setProducts(dummyProducts)
            setLoading(false)
        }, 500)
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <View style={styles.mainContainer}>

            {/* HEADER */}
            <View style={styles.header}>
                <Text style={styles.title}>Popular Products</Text>

                <TouchableOpacity>
                    <Text style={styles.viewText}>View Details</Text>
                </TouchableOpacity>
            </View>

            {/* PRODUCTS */}
            <View style={styles.productContainer}>
                {loading ? (
                    <ActivityIndicator size="large" color="#000" />
                ) : (
                    products.slice(0, 8).map((product) => {
                        const isLiked = isInWishlist(product._id)

                        return (
                            <TouchableOpacity key={product._id} style={styles.productCard} onPress={() => router.push({
                                pathname: '/Products/ProductDetails',
                                params: {
                                    productId: product._id
                                }
                            })}>

                                <View style={styles.imageContainer}>
                                    <Image
                                        source={{ uri: product.images[0] }}
                                        style={styles.productImage}
                                    />

                                    <TouchableOpacity
                                        style={styles.heartIcon}
                                        onPress={() => toggleWishlist(product)}
                                    >
                                        <Ionicons
                                            name={isLiked ? 'heart' : 'heart-outline'}
                                            size={20}
                                            color={isLiked ? '#ff0000' : '#ccc'}
                                        />
                                    </TouchableOpacity>
                                </View>

                                {/* Rating */}
                                <View style={styles.ratingContainer}>
                                    <Text>{product.ratings.average}</Text>
                                    <Ionicons name="star" size={16} color="#FFD700" />
                                </View>

                                {/* Product Name */}
                                <Text style={styles.productName} numberOfLines={1}>
                                    {product.name}
                                </Text>

                                {/* Price */}
                                <Text style={styles.price}>
                                    ${product.price.toFixed(2)}
                                </Text>

                            </TouchableOpacity>
                        )
                    })
                )}
            </View>

            {/* NEWSLETTER CTA */}
            <View style={styles.newsletterContainer}>
                <Text style={styles.newsletterTitle}>Join the Revolution</Text>

                <Text style={styles.subtitle}>
                    Subscribe to our newsletter and get 10% off your first purchase.
                </Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 10,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginTop: 20,
    },

    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111',
    },

    viewText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },

    productContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 16,
        marginTop: 12,
        justifyContent: 'space-between',
    },

    productCard: {
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 10,
        marginBottom: 14,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
    },

    imageContainer: {
        position: 'relative',
    },

    productImage: {
        width: '100%',
        height: 170,
        borderRadius: 10,
    },

    heartIcon: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: '#fff',
        padding: 4,
        borderRadius: 20,
    },

    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
        gap: 4,
    },

    productName: {
        marginTop: 8,
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },

    price: {
        marginTop: 4,
        fontSize: 15,
        fontWeight: '700',
        color: '#000',
    },

    newsletterContainer: {
        backgroundColor: '#f3f4f6',
        padding: 24,
        borderRadius: 16,
        marginTop: 20,
        marginHorizontal: 16,
        alignItems: 'center',
    },

    newsletterTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
    },

    subtitle: {
        fontSize: 14,
        textAlign: 'center',
        color: '#6b7280',
    },
})