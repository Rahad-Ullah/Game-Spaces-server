import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import router from './app/routes'
import globalErrorhandler from './app/middlewares/globalErrorhandler'
import notFound from './app/middlewares/notFound'
const app: Application = express()

// parsers
app.use(express.json())
app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.send('Sports Facility Booking Server is running...')
})

// application routes
app.use('/api', router)

// Global Error handler middleware
app.use(globalErrorhandler)

// Not found middleware
app.use(notFound)

export default app
