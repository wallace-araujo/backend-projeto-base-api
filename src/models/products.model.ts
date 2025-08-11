import { query } from '../config/database';

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    promotional_price: number;
    quantity: number;
    created_at: Date;
    updated_at: Date;
}

export const getProductById = async (id: number): Promise<Product | null> => {
    const result = await query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows[0] || null;
};

export const getAllProducts = async (): Promise<Product[]> => {
    const result = await query('SELECT * FROM products');
    return result.rows;
};