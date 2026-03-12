import { dummyProducts } from "@/assets/assets";
import { Product } from "@/constants/types";
import { useCart } from "@/hooks/ContextApi/CartContext";
import { useWishlist } from "@/hooks/ContextApi/WishlistContext";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function ProductDetails() {
    const { productId } = useLocalSearchParams<{ productId: string }>();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { addToCart, cartItems, itemCount } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const fetchProductDetails = async () => {
        const foundProduct = dummyProducts.find((item) => item._id === productId);
        setProduct(foundProduct || null);
        setLoading(false);
    };

    useEffect(() => {
        fetchProductDetails();
    }, [productId]);

    if (loading) {
        return (
            <SafeAreaView style={styles.center}>
                <ActivityIndicator size="large" color="#0000ff" />
            </SafeAreaView>
        );
    }

    if (!product) {
        return (
            <SafeAreaView style={styles.center}>
                <Text>Product not found</Text>
            </SafeAreaView>
        );
    }

    const isLiked = isInWishlist(product._id);
    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("Please select a size before adding to cart.");
            return;
        }
        addToCart(product, selectedSize || "");
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <ScrollView>
                {/* IMAGE SLIDER */}
                <View style={styles.imageContainer}>
                    <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={16}
                        onScroll={(event) => {
                            const index = Math.round(
                                event.nativeEvent.contentOffset.x / width,
                            );
                            setActiveImageIndex(index);
                        }}
                    >
                        {product.images?.map((img, index) => (
                            <Image
                                key={index}
                                source={{ uri: img }}
                                style={styles.productImage}
                                resizeMode="cover"
                            />
                        ))}
                    </ScrollView>

                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back" size={24} color="#000" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.heartIcon}
                        onPress={() => toggleWishlist(product)}
                    >
                        <Ionicons
                            name={isLiked ? "heart" : "heart-outline"}
                            size={24}
                            color={isLiked ? "#ff0000" : "#ccc"}
                        />
                    </TouchableOpacity>
                    <View style={styles.pagination}>
                        {product.images?.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.dot,
                                    index === activeImageIndex && styles.activeDot,
                                ]}
                            />
                        ))}
                    </View>
                </View>

                {/* CONTENT */}
                <View style={styles.content}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Text
                            style={[styles.productName, { flex: 1 }]}
                            numberOfLines={2}
                            ellipsizeMode="tail"
                        >
                            {product.name}
                        </Text>
                        <View style={styles.ratingContainer}>
                            <Text>{product.ratings.average}</Text>
                            <Ionicons name="star" size={16} color="#FFD700" />
                            <Text>({product.ratings.count})</Text>
                        </View>
                    </View>

                    <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                    {/* size */}
                    <View style={styles.sizeContainer}>
                        <Text style={styles.sizeTitle}>Select Size</Text>

                        <View style={styles.sizeRow}>
                            {product.sizes?.map((size) => {
                                const isSelected = selectedSize === size;

                                return (
                                    <TouchableOpacity
                                        key={size}
                                        style={[
                                            styles.sizeBox,
                                            isSelected && styles.selectedSizeBox,
                                        ]}
                                        onPress={() => setSelectedSize(size)}
                                    >
                                        <Text
                                            style={[
                                                styles.sizeText,
                                                isSelected && styles.selectedSizeText,
                                            ]}
                                        >
                                            {size}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                    <Text style={styles.description}>{product.description}</Text>
                </View>
            </ScrollView>

            {/* Add to Cart Button */}
            <View style={styles.cartRow}>

                <TouchableOpacity
                    style={styles.cartButton}

                    onPress={() => handleAddToCart()}
                >
                    <Text style={styles.cartButtonText}>Add To Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cartIconButton} onPress={() => router.push("/(tabs)/cart")}>
                    <Ionicons name="cart-outline" size={26} color="#000" />


                    {itemCount > 0 && (
                        <View style={styles.cartBadge}>
                            <Text style={styles.cartBadgeText}>{itemCount}</Text>
                        </View>
                    )}
                </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cartRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        paddingHorizontal: 18,
        paddingBottom: 10,
    },

    cartButton: {
        flex: 1,
        backgroundColor: "#000",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },

    cartButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "600",
    },

    cartIconButton: {
        marginLeft: 12,
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 12,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    cartBadge: {
        position: "absolute",
        top: -6,
        right: -6,
        backgroundColor: "red",
        borderRadius: 10,
        minWidth: 18,
        height: 18,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 4,
    },

    cartBadgeText: {
        color: "#fff",
        fontSize: 10,
        fontWeight: "bold",
    },
    sizeContainer: {
        marginTop: 16,
        marginBottom: 16,
    },

    sizeTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 10,
    },

    sizeRow: {
        flexDirection: "row",
        flexWrap: "wrap",
    },

    sizeBox: {
        borderWidth: 1,
        borderColor: "#ddd",
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginRight: 10,
        marginBottom: 10,
    },

    selectedSizeBox: {
        backgroundColor: "#000",
        borderColor: "#000",
    },

    sizeText: {
        fontSize: 14,
        color: "#333",
    },

    selectedSizeText: {
        color: "#fff",
        fontWeight: "600",
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 6,
        gap: 4,
    },
    activeDot: {
        width: 18,
        backgroundColor: "#000",
    },

    pagination: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 12,
    },

    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#ccc",
        marginHorizontal: 4,
    },
    backButton: {
        position: "absolute",
        top: 50,
        left: 20,
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 50,
        elevation: 5,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    imageContainer: {
        height: 450,
        marginBottom: 16,
        position: "relative",
    },

    productImage: {
        width: width,
        height: 450,
    },

    heartIcon: {
        position: "absolute",
        top: 50,
        right: 20,
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 50,
        elevation: 5,
    },

    content: {
        padding: 16,
    },

    productName: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 8,
        flex: 1,
    },

    price: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 12,
    },

    description: {
        fontSize: 14,
        color: "#666",
        marginBottom: 20,
    },


});
