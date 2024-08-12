import "dotenv/config"
import express from "express"
import cors from "cors"
import taskRouter from "./routes/task.routes"
import userRouter from "./routes/user.routes"

const app = express()

app.use(express.json())
app.use(cors())
app.use((_req, res, next) => {
  res.setHeader("Content-Type", "application/json")
  next()
})

app.use(taskRouter)
app.use(userRouter)

app.listen(process.env.PORT, () => console.log(`API listening on port ${process.env.PORT}`))
