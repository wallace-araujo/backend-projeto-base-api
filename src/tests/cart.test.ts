import { getCart, addToCart, clearCart, removeFromCart } from '../models/cart.model';
import { getCartItems, addProductToCart } from '../services/cart.service';
import { getProductById } from '../models/products.model';
import { query } from '../config/database';

jest.mock('../config/database', () => ({
    query: jest.fn()
}));
jest.mock('../models/products.model');

describe('Cart', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getCart', () => {
        it('should return existing cart with items', async () => {
            const mockCart = { id: 1, user_id: 1 };
            const mockItems = [
                { id: 1, cart_id: 1, product_id: 1, quantity: 2 },
                { id: 2, cart_id: 1, product_id: 2, quantity: 1 }
            ];

            (query as jest.Mock)
                .mockResolvedValueOnce({ rows: [mockCart] })
                .mockResolvedValueOnce({ rows: mockItems });

            const result = await getCart(1);
            expect(result).toEqual({
                ...mockCart,
                items: mockItems
            });
        });

        it('should create new cart if none exists', async () => {
            const newCart = { id: 1, user_id: 1 };

            (query as jest.Mock)
                .mockResolvedValueOnce({ rows: [] })
                .mockResolvedValueOnce({ rows: [newCart] })
                .mockResolvedValueOnce({ rows: [] });

            const result = await getCart(1);
            expect(result).toEqual({
                ...newCart,
                items: []
            });
        });
    });

    describe('addToCart', () => {
        it('should add new product to cart', async () => {
            const mockProduct = { id: 1, stock_quantity: 10 };
            const mockCart = { id: 1, user_id: 1 };
            const mockNewItem = { id: 1, cart_id: 1, product_id: 1, quantity: 1 };

            (getProductById as jest.Mock).mockResolvedValue(mockProduct);
            (query as jest.Mock)
                .mockResolvedValueOnce({ rows: [mockCart] })
                .mockResolvedValueOnce({ rows: [] })
                .mockResolvedValueOnce({ rows: [mockNewItem] });

            const result = await addProductToCart(1, 1);
            expect(result).toEqual(mockNewItem);
        });

        it('should update quantity if product already in cart', async () => {
            const mockProduct = { id: 1, quantity: 10, price: 100 };
            const mockExistingItem = { id: 1, cart_id: 1, product_id: 1, quantity: 1 };
            const mockUpdatedItem = { id: 1, cart_id: 1, product_id: 1, quantity: 2 };

            (getProductById as jest.Mock).mockResolvedValue(mockProduct);

            (query as jest.Mock)
                .mockResolvedValueOnce({ rows: [mockExistingItem] })
                .mockResolvedValueOnce({ rows: [mockUpdatedItem] })
                .mockResolvedValueOnce({ rows: [] });

            const result = await addToCart(1, 1, 1);

            expect(result).toEqual(mockUpdatedItem);
            expect(query).toHaveBeenCalledTimes(3);
        })

        it('should throw error for insufficient stock', async () => {
            const mockProduct = { id: 1, quantity: 5 };
            const mockCart = { id: 1, user_id: 1 };

            (getProductById as jest.Mock).mockResolvedValue(mockProduct);
            (query as jest.Mock).mockResolvedValueOnce({ rows: [mockCart] });

            await expect(addProductToCart(1, 10)).rejects.toThrow('Insufficient stock');
        });


    });


    describe('clearCart', () => {
        it('should remove all items and reset cart total', async () => {
            (query as jest.Mock)
                .mockResolvedValueOnce({ rowCount: 2 })
                .mockResolvedValueOnce({ rowCount: 1 });

            await clearCart(1);

            expect(query).toHaveBeenCalledWith(
                'DELETE FROM cart_items WHERE cart_id = $1',
                [1]
            );
            expect(query).toHaveBeenCalledWith(
                'DELETE FROM cart WHERE id = $1',
                [1]
            );
        });
    });

});