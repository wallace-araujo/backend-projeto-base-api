
import { Server } from '@hapi/hapi'
import * as dotenv from 'dotenv'
import HapiSwagger from 'hapi-swagger'
import Vision from '@hapi/vision'
import Inert from '@hapi/inert'
import Package from '../package.json'
import { registerPlugins } from './utils/registerPlugins'

dotenv.config()

const init = async () => {
  const server: Server = new Server({
    port: process.env.PORT,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-with']
      }
    }
  })

  const swaggerOptions: HapiSwagger.RegisterOptions = {
    info: {
      title: 'API BASE',
      version: Package.version,
      description: 'Documentação da API BASE'
    },
    grouping: 'tags',
  }

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ])

  await registerPlugins(server)

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err: Error) => {
  console.error(err)
  process.exit(1)
})

init()