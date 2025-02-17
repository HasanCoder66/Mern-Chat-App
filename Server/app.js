import express from 'express'

const app = express()
const PORT = 3000

app.get("/", (req, res) => {
console.log("Hello World")
})

app.listen(PORT, ()=> {
    console.log(`server listening on ${PORT} `)
})