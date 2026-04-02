import { dummyProducts } from '@/assets/assets';
import { CATEGORIES } from '@/constants';
import { Product } from '@/constants/types';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CategoriesList() {

    const { categoriesId } = useLocalSearchParams<{ categoriesId: string }>();
    const [refreshing, setRefreshing] = useState(false);
    const router = useRouter();

    const filteredCategories = CATEGORIES.filter(
        (item) => item.name === categoriesId
    );

    const [data, setData] = useState<Product[]>([]);

    const fetchData = async () => {
        const filteredProducts = dummyProducts.filter(
            (item) => item.category === categoriesId
        );
        setData(filteredProducts);
    };


    const Refreshhandler = () => {
        setRefreshing(true);


        setRefreshing(false);
    }
    useEffect(() => {
        fetchData();
    }, [categoriesId]);

    const renderItem = ({ item }: { item: Product }) => (
        <TouchableOpacity
            style={styles.productCard}
            onPress={() => router.push({
                pathname: '/Products/ProductDetails',
                params: {
                    productId: item._id
                }
            })}
        >

            <Image
                source={{ uri: item.images[0] }}
                style={styles.productImage}
            />

            <View style={styles.productInfo}>

                <Text
                    style={styles.productName}
                    numberOfLines={2}
                >
                    {item.name}
                </Text>

                <View style={styles.ratingRow}>
                    <Text style={styles.ratingText}>
                        {item.ratings.average}
                    </Text>
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Text style={styles.ratingCount}>
                        ({item.ratings.count})
                    </Text>
                </View>

                <Text style={styles.price}>
                    ${item.price.toFixed(2)}
                </Text>

            </View>

        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1 }}>

            <View style={styles.headerBackground} />

            <View style={styles.header} >
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={26} color="#000" />
                </TouchableOpacity>

                <Text style={styles.title}>
                    {filteredCategories[0]?.name}
                </Text>
            </View>

            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                numColumns={2}
                contentContainerStyle={styles.list}
                refreshing={refreshing} onRefresh={Refreshhandler}
            />

        </View>
    );
}

const styles = StyleSheet.create({

    headerBackground: {
        position: "absolute",
        top: 0,
        left: -100,
        width: "160%",
        height: 250,
        backgroundColor: "#989999",
        borderBottomLeftRadius: 300,
        borderBottomRightRadius: 500,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginTop: 50,
        marginBottom: 15,
        paddingHorizontal: 15,
    },

    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
    },

    list: {
        paddingHorizontal: 10,
        paddingBottom: 20
    },

    productCard: {
        flex: 1,
        backgroundColor: "#fff",
        margin: 8,
        borderRadius: 12,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        overflow: "hidden"
    },

    productImage: {
        width: "100%",
        height: 160,
    },

    productInfo: {
        padding: 10
    },

    productName: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 6
    },

    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4
    },

    ratingText: {
        fontSize: 12
    },

    ratingCount: {
        fontSize: 12,
        color: "#666"
    },

    price: {
        marginTop: 6,
        fontSize: 15,
        fontWeight: "700"
    }

});