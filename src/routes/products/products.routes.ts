import { ServerRoute } from '@hapi/hapi';
import { getProduct, getAllProduct } from './products.controller';
import Joi from 'joi';

const routes: ServerRoute[] = [
  {
    method: 'GET',
    path: '/{id}',
    handler: getProduct,
    options: {
      description: 'Get product details',
      tags: ['api', 'products'],
      validate: {
        params: Joi.object({
          id: Joi.number().required().description('Product ID')
        })
      }

    }
  },
  {
    method: 'GET',
    path: '/',
    handler: getAllProduct,
    options: {
      description: 'Get product details',
      tags: ['api', 'products'],
    }
  }
];

export default routes;