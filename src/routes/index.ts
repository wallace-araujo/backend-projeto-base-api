export interface PathsConfig {
  plugin: string
  prefix: string
}

const pathsRoutes: PathsConfig[] = [
  {
    plugin: '../routes/cart/cart.routes',
    prefix: '/api/v1/cart'
  },
  {
    plugin: '../routes/products/products.routes',
    prefix: '/api/v1/products',


  }
]

export default pathsRoutes
