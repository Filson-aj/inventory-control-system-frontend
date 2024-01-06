import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalPrice: 0, // Initialize totalPrice as 0
    totalQuantity: 0, // Initialize totalQuantity as 0
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity, priceperunit } = action.payload
      const existingProduct = state.items.find((item) => item.product._id === product._id)
      
      if (existingProduct) {
        existingProduct.quantity += quantity
      } else {
        state.items.push({ product, quantity, priceperunit })
      }

      // Update totalPrice and totalQuantity
      state.totalPrice += quantity * priceperunit
      state.totalQuantity += quantity
    },
    removeFromCart: (state, action) => {
      const productId = action.payload
      const removedProduct = state.items.find((item) => item.product._id === productId)
      
      if (removedProduct) {
        state.totalPrice -= removedProduct.quantity * removedProduct.priceperunit
        state.totalQuantity -= removedProduct.quantity
        state.items = state.items.filter((item) => item.product._id !== productId)
      }
    },
  },
})

export const { addToCart, removeFromCart } = cartSlice.actions

export default cartSlice.reducer


export const selectCurrentCart = state => state.cart
