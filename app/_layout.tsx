import CartProvider from "@/Hooks/ContextApi/CartContext";
import WishlistProvider from "@/Hooks/ContextApi/WishlistContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <WishlistProvider>
      <CartProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />;
      </CartProvider>
    </WishlistProvider>
  )
}
