import AntDesign from "@expo/vector-icons/AntDesign";
import { Tabs } from "expo-router";
import React from "react";
export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: "#fff",
                    borderTopWidth: 1,
                    borderTopColor: "#F0F0F0",
                    height: 68,
                    paddingTop: 5,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <AntDesign
                            name="home"
                            size={size}
                            color={focused ? "black" : "#a2a2a7"}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <AntDesign
                            name="shopping-cart"
                            size={size}
                            color={focused ? "black" : "#83838a"}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="favorites"
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <AntDesign
                            name="heart"
                            size={size}
                            color={focused ? "red" : "#83838a"}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <AntDesign
                            name="user"
                            size={size}
                            color={focused ? "black" : "#83838a"}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
