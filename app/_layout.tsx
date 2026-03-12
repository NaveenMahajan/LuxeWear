import CartProvider from "@/hooks/ContextApi/CartContext";
import WishlistProvider from "@/hooks/ContextApi/WishlistContext";
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
