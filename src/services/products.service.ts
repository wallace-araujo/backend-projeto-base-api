import { getProductById, getAllProducts } from '../models/products.model';

export const getProductDetails = async (productId: number) => {
    const product = await getProductById(productId);

    if (!product) {
        throw new Error('Product not found');
    }

    return product;
};

export const getAllProductDetails = async () => {
    const products = await getAllProducts();

    if (!products || products.length === 0) {
        throw new Error('No products found');
    }

    return products;
};