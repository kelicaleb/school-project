import express from 'express'
import dotenv from 'dotenv'
import mysql2 from 'mysql2'
import cors from 'cors'
import Purchase from './Queries/purchase.js'
import Transaction from './Queries/transaction.js'
import bcrypt from 'bcrypt'
import Customer from './Queries/Customer.js'
import Login from './Queries/Login.js'

dotenv.config()
const port = process.env.PORT

const app = express()
app.use(cors())
app.use( express.json())
app.use(express.urlencoded({extended: true}))
const purchases = Purchase()
app.use("/purchase", purchases)
const transaction = Transaction() 
app.use("/transaction", transaction)
const customer = Customer()
app.use("/customer", customer)
const login = Login()
app.use("/Logins", login)


const db = mysql2.createConnection({
    host:"localhost", 
    user:"root",
    password:"password",
    database:"Products"
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
app.get("/carts", (req, res) => 
{
    const selects = `SELECT * FROM Cart;`
    db.query(selects, (err, result) => 
    {
        if(err){
            console.log("There is an error ", err)
           return res.status(400).json({mesage: err})
        }
        else{
            return res.status(200).json(result)
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

const password = "Password"

const salt =  await bcrypt.genSalt(10)

const hash = await bcrypt.hash(password, salt)

const isMatch = await bcrypt.compare('Password', hash)
console.log(isMatch)


app.listen(port, ()=> 
{
    console.log(`Server is running on  port ${port}`)
})