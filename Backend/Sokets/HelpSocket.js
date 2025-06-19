import express from 'express'
import dotenv from 'dotenv'
import http from 'http'
import { WebSocketServer } from 'ws'
import { Sequelize, DataTypes } from 'sequelize'
import cors from 'cors'




function HelpSocket()
{
    dotenv.config()
    const help = express.Router()
    const server = http.createServer(help)
    const wss = new WebSocketServer({ server })
    const port = process.env.SOCKET
    help.use(express.json())
    console.log("this is  the socket server", port )
    help.use(cors())
    

    const sequelize = new Sequelize("Products", "root", "password", 
        {
            host:"localhost", 
            dialect:"mysql"
        }
    )

    const Help = sequelize.define("Help", 
        {
            helpId: 
            {
                type: DataTypes.INTEGER, 
                autoIncrement:true, 
                primaryKey:true
            }, 
            messages:{
                type:DataTypes.STRING, 
                allowNull:false
            }
        }, 
        {
            tableName:"Help", 
            timestamps:false
        }
    )
    sequelize.sync()
    .then((res) => console.log("Connected to table Help"))

    

    wss.on('connection', (ws) => 
    {
        console.log("Connected to socket successfully")
        ws.on("message", async(messages) => 
        {
            console.log("The message passed is", messages.toString())
            try{
                const inserts = await Help.create({
                    messages: messages.toString()
                })
                console.log("Message inserted successfully", inserts)
            }
            catch(err)
            {
                console.log("An error occured while inserting message", err)
            }
            
        })
        ws.on("close", (message) => 
        {
            console.log("The connection has been closed", message)
        })
    })
    help.post("/posts", async(req, res) => 
    {
        try{
            const { messages } = req.body 
            wss.clients.forEach((client) => 
            {
                if(client.readyState === 1)
                {
                    client.send(messages)
                }
            })
            console.log("Message:", messages)

            const inserts = await Help.create({
                messages
            })
            return res.status(200).json({ success:true, message:inserts})
        }
        catch(err)
        {
            console.log("An error passing message", err)
            return res.status(500).json({ success:false})
        }
    } )

    help.get("/gets", async(req, res) => 
    {
        try{
            const selects = await Help.findAll()
            return res.status(200).json(selects)
        }
        catch(err){
            console.log("An error occured", err)
            return res.status(500).json({success:false, err:err})
        }
    })




    server.listen(port, ()=> 
    {
        console.log(`The socket is running on ${port}`)
    })





return help
}


export default HelpSocket