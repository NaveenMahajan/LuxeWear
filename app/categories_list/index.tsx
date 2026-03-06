import { dummyProducts } from '@/assets/assets';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CategoriesList() {

    const { categoriesId } = useLocalSearchParams();
    const router = useRouter();

    const product = dummyProducts.find(
        (item) => item.id === Number(categoriesId)
    );

    return (
        <View style={{ flex: 1 }}>
            {/* Background shape */}
            <View style={styles.headerBackground} />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Image
                        source={require("../../assets/images/Arrowleft.png")}
                        style={styles.backIcon}
                    />
                </TouchableOpacity>

                <Text style={styles.title}>
                    {product?.name}
                </Text>
            </View>

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
        backgroundColor: "#38bdf8",
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
    backIcon: {
        width: 35,
        height: 35,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
    },

});
