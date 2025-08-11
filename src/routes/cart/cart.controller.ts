import { Request, ResponseToolkit } from '@hapi/hapi';
import { getCartItems, addProductToCart, clearUserCart, removeItemFromCart } from '../../services/cart.service';

export const getCart = async (req: Request, h: ResponseToolkit) => {
  try {
    const cart = await getCartItems(req.params.userId);
    return h.response(cart).code(200);
  } catch (error: any) {
    return h.response({ message: error.message }).code(500);
  }
};

export const addToCart = async (req: Request, h: ResponseToolkit) => {
  try {
    const { productId, quantity, userId } = req.payload as { productId: number; quantity: number; userId: number };
    const cartItem = await addProductToCart(productId, quantity, userId);
    return h.response(cartItem).code(201);
  } catch (error: any) {
    return h.response({ message: error.message }).code(400);
  }
};


export const removeFromCart = async (req: Request, h: ResponseToolkit) => {
  try {
    const { itemId, quantity } = req.params
    const updatedCart = await removeItemFromCart(itemId, quantity);
    return h.response(updatedCart).code(200);

  } catch (error: any) {
    return h.response({ message: error.message }).code(400);
  }
};



export const clearCart = async (req: Request, h: ResponseToolkit) => {
  try {
    await clearUserCart();
    return h.response({ message: 'Cart cleared successfully' }).code(200);
  } catch (error: any) {
    return h.response({ message: error.message }).code(500);
  }
};