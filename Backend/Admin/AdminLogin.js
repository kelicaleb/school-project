import express from 'express'
import {Sequelize, DataTypes}  from 'sequelize'
import bcrypt from 'bcrypt'




function AdminLogin(){
    const login = express.Router()

    const sequelize = new Sequelize("Products", "root", "password", 
        {
            host:"localhost", 
            dialect:"mysql"
        }
    )
    const Admin = sequelize.define("Admin", 
        {
            adminId:
            {
                type:DataTypes.STRING,
                autoIncrement:true,
                primaryKey:true, 
                unique:true
            }, 
            username:{
                type:DataTypes.STRING, 
                allowNull:false

            }, 
            password:
            {
                type:DataTypes.STRING, 
                allowNull:false
            }
        }, 
        {
            tableName:"Admin", 
            timestamps: false
        }
    )
    sequelize.sync()
    .then((res) => console.log("Connected to table admin successfully", res))
    //get data 

    login.get("/", async (req, res) => {
        try{
            const getDataAdmin = await Admin.findAll()
            return res.status(200).json(getDataAdmin) 
        }
        catch{
            console.log("Error getting data from table admin")
            return res.status(500).json({message: "Error getting data from admin"})
        }
    })
    login.post("/post", async(req, res) => 
    {
        try{
            const {username, password } = req.body
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(password, salt)
            const postAdmin = Admin.create({
                username:username,
                password:hash
            })
            console.log("Users has been created")
            return res.status(200).json(postAdmin)
         }
        catch{
            console.log("Error posting data to Admin")
            return res.status(401).json({Error:"Error posting data to Admin"})
        }
    })
    login.post("/login", async(req, res) =>
    {
        try{
            const {username, password} = req.body
            console.log(username)
            //search by username 
            const search = await Admin.findOne({
                where:{
                    username}
            })
           const checkPassword = await bcrypt.compare(password, search.password)
           console.log(checkPassword)
           if(search.username !== "" && checkPassword){
            console.log("Logged in")
            res.status(200).json([{message:"login"}, {login: true}])
           }
           else
           {
            console.log("Wrong password")
            return res.status(400).json([{message:"Wrong password"}, {login: false}])
           }
        }
        catch{
            console.log("Error Login to Admin")
            return res.status(404).json({message: "Wrong user name"})
        }
    })


    return login

}




export default AdminLogin