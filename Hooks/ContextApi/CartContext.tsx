import { dummyCart } from "@/assets/assets";
import { Product } from "@/constants/types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export type CartItem = {
    id: string;
    productId: string;
    quantity: number;
    size: string;
    product: Product;
    price: number;
};

type CartContextType = {
    cartItems: CartItem[];
    addToCart: (product: Product, size: string) => Promise<void>;
    removeFromCart: (productId: string, size: string) => Promise<void>;
    updateQuantity: (productId: string, quantity: number, size: string) => Promise<void>;
    clearCart: () => Promise<void>;
    cartTotal: number;
    itemCount: number;
    isLoading: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export default function CartProvider({ children }: { children: ReactNode }) {

    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [cartTotal, setCartTotal] = useState(0);

    const fetchCart = async () => {
        setIsLoading(true);

        const serverCart = dummyCart;

        const mappedItems: CartItem[] = serverCart.items.map((item: any) => ({
            id: item.product._id,
            productId: item.product._id,
            quantity: item.quantity,
            size: item.size || "M",
            product: item.product,
            price: item.price,
        }));

        setCartItems(mappedItems);
        setCartTotal(serverCart.totalAmount);

        setIsLoading(false);
    };

    const addToCart = async (product: Product, size: string) => {
        const exists = cartItems.find(
            (item) => item.productId === product._id && item.size === size
        );

        if (exists) {
            updateQuantity(product._id, exists.quantity + 1, size);
            return;
        }

        const newItem: CartItem = {
            id: product._id + size,
            productId: product._id,
            quantity: 1,
            size,
            product,
            price: product.price,
        };

        setCartItems((prev) => [...prev, newItem]);
        setCartTotal((prev) => prev + product.price);
    };

    const removeFromCart = async (productId: string, size: string) => {
        const item = cartItems.find(
            (i) => i.productId === productId && i.size === size
        );

        if (!item) return;

        setCartItems((prev) =>
            prev.filter((i) => !(i.productId === productId && i.size === size))
        );

        setCartTotal((prev) => prev - item.price * item.quantity);
    };

    const updateQuantity = async (
        productId: string,
        quantity: number,
        size: string
    ) => {

        if (quantity <= 0) {
            removeFromCart(productId, size);
            return;
        }

        setCartItems((prev) =>
            prev.map((item) =>
                item.productId === productId && item.size === size
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const clearCart = async () => {
        setCartItems([]);
        setCartTotal(0);
    };

    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartTotal,
                itemCount,
                isLoading,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }

    return context;
}