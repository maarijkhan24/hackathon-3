import { create } from "zustand"
import { persist } from "zustand/middleware"

interface CartItem {
 id: string
 name: string
 price: number
 image: string
 quantity: number
}

interface CartStore {
 cart: CartItem[]
 addToCart: (item: CartItem) => void
 removeItem: (id: string) => void
 increaseQuantity: (id: string) => void
 decreaseQuantity: (id: string) => void
 totalItems: () => number
 totalPrice: () => number
}

export const useCartStore = create<CartStore>()(
 persist(
 (set, get) => ({
 cart: [],
 addToCart: (item) => {
 set((state) => {
 const existingItem = state.cart.find((i) => i.id === item.id)
 if (existingItem) {
 return {
 cart: state.cart.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)),
 }
 }
 return { cart: [...state.cart, item] }
 })
 },
 removeItem: (id) => {
 set((state) => ({
 cart: state.cart.filter((item) => item.id !== id),
 }))
 },
 increaseQuantity: (id) => {
 set((state) => ({
 cart: state.cart.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)),
 }))
 },
 decreaseQuantity: (id) => {
 set((state) => ({
 cart: state.cart
 .map((item) => (item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item))
 .filter((item) => item.quantity > 0),
 }))
 },
 totalItems: () => {
 return get().cart.reduce((total, item) => total + item.quantity, 0)
 },
 totalPrice: () => {
 return get().cart.reduce((total, item) => total + item.price * item.quantity, 0)
 },
 }),
 {
 name: "cart-storage", // unique name for localStorage
 },
 ),
)