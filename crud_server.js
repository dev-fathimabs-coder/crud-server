let express = require('express')
const connectDb = require('./config/userDb')
const userRoute = require('./routes/userRoute')
let cors = require('cors')

let app = express()
app.use(express.json())
app.use(cors())




connectDb()

app.use('/users', userRoute)




app.listen(5000, () => {
    console.log("Crud-App server Connected");
})