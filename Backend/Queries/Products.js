import express from 'express'
import multer from 'multer'
import {Sequelize, DataTypes}  from 'sequelize'



const Products = () => 
{
    const goods = express.Router()

    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
          cb(null, 'public/uploads/products/');  // Destination folder
        },
        filename: function(req, file, cb) {
          // Create unique filename with original extension
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          const ext = path.extname(file.originalname);
          cb(null, 'product-' + uniqueSuffix + ext);
        }
      });
      
      const upload = multer({ 
        storage: storage,
        limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
        fileFilter: (req, file, cb) => {
          // Accept only images
          if (file.mimetype.startsWith('image/')) {
            cb(null, true);
          } else {
            cb(new Error('Only image files are allowed!'), false);
          }
        }
      });
      const sequelize = new Sequelize("Products", "root", "password", 
        {
            host:"localhost", 
            dialect:"mysql"
        }
      )
      const Goods = sequelize.define("Goods", 
        {
            productId:{
                type:DataTypes.INTEGER, 
                primaryKey:true, 
                autoIncrement:true
            }, 
            serialNumber:{
                type:DataTypes.STRING, 
                allowNull: false
            }, 
            item:{
                type:DataTypes.STRING, 
                allowNull:false
            }, 
            image:{
                type: DataTypes.STRING, 
                allowNull: false
            }, 
            category: 
            {
                type:DataTypes.STRING, 
                allowNull: false
            },
            stock: 
            {
                type: DataTypes.STRING, 
                allowNull:false
            }
        }, 
        {
            tableName: "Goods", 
            timestamps:false
        }
      )
      sequelize.sync()
      .then((res)=> console.log("Connected to Goods succefully"))
      goods.post('/api/products', upload.single('image'), async (req, res) => {
        try {
          const { serialNumber, item, category, stock } = req.body;
          
          // Generate the URL for the uploaded image
          const imageUrl = req.file ? `/uploads/products/${req.file.filename}` : null;
          
          // Insert product into database
         const result = await Goods.create({
            serisalNumber:serailNumber,
            item:items, 
            image:imageUrl,
            category:category, 
            stock:stock 
         })
          
          res.status(201).json({
            success: true,
            message: 'Product added successfully',
            product: {
              productId: result.insertId,
              serialNumber,
              item,
              imageUrl,
              category,
              stock
            }
          });
        } catch (error) {
          console.error('Error adding product:', error);
          res.status(500).json({ success: false, message: 'Server error' });
        }
      });



    return goods 
}


export default Products



