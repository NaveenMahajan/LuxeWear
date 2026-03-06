import { COLORS } from '@/constants';
import { HeaderProps } from '@/constants/types';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Header({
    title,
    showBack,
    showSearch,
    showCart,
    showMenu,
    showLogo
}: HeaderProps) {

    const router = useRouter();
    const { itemCount } = { itemCount: 0 }

    return (
        <View style={styles.container}>

            {/* LEFT */}
            <View style={styles.leftSection}>
                {showBack && (
                    <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
                        <AntDesign name="arrow-left" size={22} color={COLORS.primary} />
                    </TouchableOpacity>
                )}

                {showMenu && (
                    <TouchableOpacity style={styles.iconBtn}>
                        <AntDesign name="menu" size={22} color={COLORS.primary} />
                    </TouchableOpacity>
                )}
            </View>

            {/* CENTER */}
            <View style={styles.centerSection}>
                {showLogo ? (
                    <Image
                        source={require('@/assets/logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                ) : (
                    title && <Text style={styles.title}>{title}</Text>
                )}
            </View>

            {/* RIGHT */}
            <View style={styles.rightSection}>
                {showSearch && (
                    <TouchableOpacity style={styles.iconBtn}>
                        <AntDesign name="search" size={22} color={COLORS.primary} />
                    </TouchableOpacity>
                )}

                {showCart && (
                    <TouchableOpacity style={styles.cartContainer} onPress={() => router.push('/(tabs)/cart')}>
                        <AntDesign name="shopping-cart" size={22} color={COLORS.primary} />

                        {itemCount > 0 && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>
                                    {itemCount > 99 ? '99+' : itemCount}
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                )}
            </View>

        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 14,
        elevation: 4,
    },

    leftSection: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },

    centerSection: {
        flex: 1,
        alignItems: 'center',
    },

    rightSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    iconBtn: {
        padding: 6,
        marginRight: 10,
    },

    logo: {
        width: 110,
        height: 28,
    },

    title: {
        fontSize: 20,
        fontWeight: '700',
        fontStyle: "italic",
        color: COLORS.primary,
    },
    cartContainer: {
        padding: 6,
        position: 'relative',
    },

    badge: {
        position: 'absolute',
        top: -5,
        right: -8,
        backgroundColor: '#FF3B30',
        minWidth: 18,
        height: 18,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
    },

    badgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '700',
    },
});