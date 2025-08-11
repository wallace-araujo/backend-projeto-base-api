import { Request, ResponseToolkit } from '@hapi/hapi';
import { getProductDetails, getAllProductDetails } from '../../services/products.service';

export const getProduct = async (req: Request, h: ResponseToolkit) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await getProductDetails(productId);
    return h.response(product).code(200);
  } catch (error: any) {
    return h.response({ message: error.message }).code(404);
  }
};
export const getAllProduct = async (req: Request, h: ResponseToolkit) => {
  try {
    const products = await getAllProductDetails();
    return h.response(products).code(200);
  } catch (error: any) {
    return h.response({ message: error.message }).code(404);
  }
};






