import { dummyWishlist } from "@/assets/assets";
import { Product, WishlistContextType } from "@/constants/types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";


const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export default function WishlistProvider({ children }: { children: ReactNode }) {

    const [wishlist, setWishlist] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const featchWishlist = async () => {
        setLoading(true);
        setWishlist(dummyWishlist)
        setLoading(false);
    }
    const toggleWishlist = async (product: Product) => {
        const exists = wishlist.some((item) => item._id === product._id);
        setWishlist((prev) => {
            if (exists) {
                return prev.filter((item) => item._id !== product._id);
            }
            return [...prev, product]
        })
    }
    const isInWishlist = (productId: string) => {
        return wishlist.some((item) => item._id === productId);
    }

    useEffect(() => {
        featchWishlist();
    }, [])




    return (
        <WishlistContext.Provider value={{ wishlist, loading, isInWishlist, toggleWishlist }}>
            {children}
        </WishlistContext.Provider>
    )
}
export function useWishlist() {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error("useWishlist must be used within a WishlistProvider")
    } return context;
}