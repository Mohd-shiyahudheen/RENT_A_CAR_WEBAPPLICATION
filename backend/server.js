const express = require('express')
const config = require('./config/mogodb')
const dotenv = require('dotenv')
const userRouter =require('./routers/userRouter')
const adminRouter = require('./routers/adminRouter')
const cors = require('cors')


const app = express()
dotenv.config()
app.use(cors())


app.use(express.json())

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send("welcome node")
})

app.use('/user',userRouter)
app.use('/admin',adminRouter)


app.listen(PORT, () => console.log(`Node.js server started on port ${PORT}`))