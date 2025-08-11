import {
    getCart as getCartModel,
    addToCart as addToCartModel,
    removeFromCart as removeFromCartModel,
    clearCart as clearCartModel
} from '../models/cart.model';
import { getProductById } from '../models/products.model';

export const getCartItems = async (userId: number = 1) => {
    return await getCartModel(userId);
};

export const addProductToCart = async (productId: number, quantity: number, userId: number = 1) => {

    const product = await getProductById(productId);
    if (!product) {
        throw new Error('Product not found');
    }


    if (product.quantity < quantity) {
        throw new Error('Insufficient stock');
    }

    const cart = await getCartModel(userId);
    return await addToCartModel(cart.id, productId, quantity);
};


export const removeItemFromCart = async (itemId: number, quantity: number = 1, userId: number = 1) => {
    const cart = await getCartModel(userId);
    await removeFromCartModel(cart.id, itemId, quantity);
    return getCartItems(userId);
};

export const clearUserCart = async (userId: number = 1) => {
    const cart = await getCartModel(userId);
    await clearCartModel(cart.id);
};