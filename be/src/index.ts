import express from 'express'
import cors from 'cors'
import routes from "./routes";

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/v1', routes)

app.listen(3000, ()=>{
    console.log("app listening in part 3000")
})