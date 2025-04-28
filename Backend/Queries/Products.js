import express from 'express';
import multer from 'multer';
import { Sequelize, DataTypes } from 'sequelize';
import path from 'path';
import fs from 'fs';

// Initialize express router
const Products = () => {
    const goods = express.Router();

    // Multer storage configuration
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            const uploadDir = 'public/uploads/products/';
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
            cb(null, uploadDir); // Directory where files will be uploaded
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const ext = path.extname(file.originalname);
            cb(null, 'product-' + uniqueSuffix + ext); // Creating unique filenames
        }
    });

    // Set up file upload limits and filter
    const upload = multer({
        storage: storage,
        limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
        fileFilter: (req, file, cb) => {
            if (file.mimetype.startsWith('image/')) {
                cb(null, true);
            } else {
                cb(new Error('Only image files are allowed!'), false);
            }
        }
    });

    // Initialize Sequelize for database connection
    const sequelize = new Sequelize("Products", "root", "password", {
        host: "localhost",
        dialect: "mysql"
    });

    // Define Goods table
    const Goods = sequelize.define("Goods", {
        productId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        serialNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        item: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        stock: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price:{
            type:DataTypes.DECIMAL, 
            allowNull:false
        }
    }, {
        tableName: "Goods",
        timestamps: false
    });

    // Synchronize the database
    sequelize.sync()
        .then(() => console.log("Connected to Goods successfully"));

    // Middleware for handling product creation with image upload
    goods.post('/api/products', upload.single('image'), async (req, res) => {
        try {
            const { serialNumber, item, category, stock } = req.body;
            
            // Generate the URL for the uploaded image
            const imageUrl = req.file ? `/uploads/products/${req.file.filename}` : null;

            // Insert product into database
            const result = await Goods.create({
                serialNumber: serialNumber,
                item: item,
                image: imageUrl,
                category: category,
                stock: stock
            });

            // Send success response with product details
            res.status(201).json({
                success: true,
                message: 'Product added successfully',
                product: {
                    productId: result.productId,
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
    goods.get("/api/products", async(req, res) => 
    {
        try{
                const fetchData = await Goods.findAll()
                console.log("Successfully fetched data")
                return res.status(200).json(fetchData)
        }
        catch{
            console.log("Error fetching data from Goods")
            return res.status(500).json({message:"Error fetching data from Goods", success:false})
        }
    })

    return goods;
};

export default Products;
