import express from "express";
import mongoose from 'mongoose';
import dotenv from "dotenv";
import morgan from 'morgan';
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import customerRoutes from "./routes/customerRoutes.js";
import salesRoutes from "./routes/salesRoutes.js";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from "url";
import colors from "colors"; // Assuming you still want to use colors
import Product from './models/productModel.js'; // Import the Product model
import Sales from './models/salesModel.js'; // Import the Sales model
import Customer from './models/customerModel.js';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// MongoDB connection string
const MONGO_URL = 'mongodb+srv://shanmukh:Mongodb2023@cluster1.zzvny7m.mongodb.net/ecommerce';

// Connect to MongoDB Atlas
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));



// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './client/build')));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/customer', customerRoutes);
app.use('/api/v1/sales', salesRoutes);

// Define API endpoint to fetch products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find({}, { name: 1, price: 1, photo: 1, _id: 0 }); // Fetch name, price, and photo fields
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define API endpoint to fetch customers
app.get('/customers', async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.json(customers);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Define API endpoint to fetch a specific customer
app.get('/customers/:customerId/', async (req, res) => {
  const customerId = req.params.customerId;

  try {
    const customer = await Customer.findOne({ customer_id: customerId });
    if (customer) {
      res.json(customer);
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (err) {
    console.error('Error fetching customer:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define API endpoint to update customer balance
app.put('/customers/:customerId', async (req, res) => {
  const customerId = req.params.customerId;
  const { balance } = req.body;

  try {
    const updatedCustomer = await Customer.findOneAndUpdate({ customer_id: customerId }, { balance: balance },
      { new: true } // To return the updated customer document
    );

    if (updatedCustomer) {
      res.json(updatedCustomer);
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (err) {
    console.error('Error updating customer balance:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define API endpoint to create sales
app.post('/sales', async (req, res) => {
  const { salesId, customerId, items, totalBill } = req.body;

  try {
    // Create new sales document
    const newSales = new Sales({
      salesId,
      customerId,
      items,
      totalBill
    });

    // Save new sales document
    const savedSales = await newSales.save();

    res.status(201).json(savedSales);
  } catch (err) {
    console.error('Error creating sales:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define a catch-all route to serve the client-side application
app.use('*', function (req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server Running on ${process.env.DEV_MODE} ${PORT}`.bgCyan.white);
});
