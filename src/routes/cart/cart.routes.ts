import { ServerRoute } from '@hapi/hapi';
import { getCart, addToCart, removeFromCart, clearCart } from './cart.controller';
import Joi from 'joi';

const routes: ServerRoute[] = [
  {
    method: 'GET',
    path: '/',
    handler: getCart,
    options: {
      description: 'Get cart items',
      tags: ['api', 'cart'],
      validate: {
        query: Joi.object({
          userId: Joi.number().optional().description('User ID (optional)')
        })
      }
    }
  },
  {
    method: 'POST',
    path: '/add',
    handler: addToCart,
    options: {
      description: 'Add product to cart',
      tags: ['api', 'cart'],
      validate: {
        payload: Joi.object({
          userId: Joi.number()
            .optional()
            .description('User ID (optional)'),
          productId: Joi.number()
            .required()
            .description('Product ID to add to cart'),
          quantity: Joi.number()
            .min(1)
            .required()
            .description('Quantity to add')
        })
      }
    }
  },
  {
    method: 'PATCH',
    path: '/items/{itemId}/{quantity?}',
    handler: removeFromCart,
    options: {
      description: 'Remove item from cart',
      tags: ['api', 'cart'],
      validate: {
        params: Joi.object({
          itemId: Joi.number().required().description('Item Id'),
          quantity: Joi.number().optional().description('quantity remove'),
        }),
      }
    }
  },
  {
    method: 'DELETE',
    path: '/clear',
    handler: clearCart,
    options: {
      description: 'Clear all items from cart',
      tags: ['api', 'cart']
    }
  }
];

export default routes;