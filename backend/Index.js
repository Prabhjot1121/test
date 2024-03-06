const express = require('express')
const connectToMongo = require("./db/db")
const cors = require('cors')
const port = 8000

connectToMongo()
const app = express()

app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))

app.use(cors())

app.get("/", (req, res) => {
    return res.send("Hello World")
})

// adding routes
app.use('/api/auth', require('./routes/auth'))

app.listen(port, () => {
    console.log(`utsav backend running on http://localhost:${port}`);
})
