import express from 'express'
import cors, { type CorsOptions } from 'cors'
import routerApi from './routes/index.js'
import {
  logErrors,
  errorHandler,
  boomErrorHandler,
} from './middleware/error.handler.js'

const app = express()
const port = process.env.PORT ?? 3000
const whitelist = [
  'http://localhost:3000',
  'http://localhost:8080',
  'http://localhost:4321',
]
const options: CorsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  },
}

app.use(express.json())
app.disable('x-powered-by')
app.use(cors(options))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/v2', (req, res) => {
  res.send('Hello World! V2')
})

routerApi(app)

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
