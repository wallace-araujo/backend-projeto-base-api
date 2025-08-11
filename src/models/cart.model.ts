import { query } from '../config/database';
import { getProductById } from './products.model';

export interface CartItem {
    id: number;
    cart_id: number;
    product_id: number;
    name: string;
    price: number;
    quantity: number;
    created_at: Date;
    updated_at: Date;
}

export interface CartWithItems {
    id: number;
    user_id: number;
    created_at: Date;
    updated_at: Date;
    items: CartItem[];
}

export const getCart = async (userId: number = 1): Promise<CartWithItems> => {
    const cartResult = await query('SELECT * FROM cart WHERE user_id = $1', [userId]);

    if (!cartResult.rows[0]) {
        const newCart = await query('INSERT INTO cart (user_id) VALUES ($1) RETURNING *', [userId]);
        return {
            ...newCart.rows[0],
            items: []
        };
    }
    const itemsResult = await query(
        `SELECT 
       ci.id,
       ci.cart_id,
       ci.product_id,
       ci.quantity, 
       p.name, 
       p.price,
       p.photo
     FROM cart_items ci
     INNER JOIN products p ON ci.product_id = p.id
     WHERE ci.cart_id = $1`,
        [cartResult.rows[0].id]
    );


    return {
        ...cartResult.rows[0],
        items: itemsResult.rows
    };
};

export const addToCart = async (cartId: number, productId: number, quantity: number): Promise<CartItem> => {
    const product = await getProductById(productId);
    if (!product) {
        throw new Error('Product not found');
    }


    const currentPrice = product.promotional_price || product.price;
    const totalPrice = currentPrice * quantity;


    const existingItem = await query(
        'SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2',
        [cartId, productId]
    );


    let result;
    if (existingItem?.rows[0]) {
        result = await query(
            'UPDATE cart_items SET quantity = quantity + $1 WHERE id = $2 RETURNING *',
            [quantity, existingItem.rows[0].id]
        );

    } else {
        result = await query(
            'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
            [cartId, productId, quantity]
        );

    }



    await query(
        `UPDATE cart 
     SET total = total + $1,
         quantity = quantity + $2
     WHERE id = $3`,
        [totalPrice, quantity, cartId]
    );

    return result.rows[0];
};

export const removeFromCart = async (
    cartId: number,
    itemId: number,
    quantity: number
): Promise<void> => {
    const itemResult = await query(
        `SELECT ci.id, ci.quantity, p.price, p.promotional_price 
     FROM cart_items ci
     JOIN products p ON ci.product_id = p.id
     WHERE ci.id = $1 AND ci.cart_id = $2`,
        [itemId, cartId]
    );


    if (!itemResult.rows[0]) {
        throw new Error('Item not found in cart');
    }


    const item = itemResult.rows[0];
    const currentPrice = item.promotional_price || item.price;
    const newQuantity = quantity > 1 ? quantity - item.quantity : item.quantity - 1;
    const totalToSubtract = item.quantity * currentPrice;

    if (newQuantity <= 0) {
        await query(
            'DELETE FROM cart_items WHERE id = $1 AND cart_id = $2',
            [itemId, cartId]
        );


        await query(
            'UPDATE cart SET total = total - $1, quantity = quantity - $2 WHERE id = $3',
            [totalToSubtract, item.quantity, cartId]
        );


    } else {
        await query(
            `UPDATE cart_items 
       SET quantity = $1 
       WHERE id = $2 AND cart_id = $3`,
            [newQuantity, itemId, cartId]
        );

        await query(
            'UPDATE cart SET total = total - $1, quantity = quantity - 1 WHERE id = $2',
            [currentPrice, cartId]
        );
    }

};

export const clearCart = async (cartId: number): Promise<void> => {
    await query('DELETE FROM cart_items WHERE cart_id = $1', [cartId]);
    await query('DELETE FROM cart WHERE id = $1', [cartId]);
    //await query('UPDATE cart SET total = 0, quantity = 0 WHERE id = $1', [cartId]);
};