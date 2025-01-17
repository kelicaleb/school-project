import express from 'express'
import dotenv from 'dotenv'
import mysql2 from 'mysql2'
import cors from 'cors'


dotenv.config()
const port = process.env.PORT

const app = express()
app.use(cors())
app.use( express.json())
app.use(express.urlencoded({extended: true}))

const db = mysql2.createConnection({
    host:"localhost", 
    user:"root",
    password:"root",
    database:"test"
})


db.connect((err) => 
{
    if(err){
        console.log(`error connecting ${err}`)
    }
})

app.post("/cart", (req, res) => 
{
    const {title, price, formed, category, image} = req.body
    const inserts = `INSERT INTO Cart(title, price, formed, category, image) VALUES(?,?,?,?,?)`
    const values = [title, price, formed, category, image]
    db.query(inserts, values, (err, result) => 
    {
        if(err)
        {
            res.status(500).json({message: err})
        }
        else{
           res.status(200).json(result) 
        }
    })

})

app.get("/products", (req, res) => 
{
    const products = `SELECT * FROM Cart`
    db.query(products, (err, result) => 
    {
        if(err)
        {
            res.status(500).json({message: err})
        }
        else{
            res.status(200).json(result)
        }
    })
})
app.delete("/delete/:id", (req, res) => 
{
    const id = req.params.id
    const deletes = `DELETE FROM Cart WHERE cartId = ? `
    const values = [id]
    db.query(deletes, values, (err, result) => 
    {
        if(err) 
        {
            res.status(500).json({message: err})
        }
        else{ 
            res.status(200).json(result)
        }
    })
})


app.listen(port, ()=> 
{
    console.log(`Server is running on ${port}`)
})