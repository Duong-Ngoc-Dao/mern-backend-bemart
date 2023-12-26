import express from 'express';
dotenv.config();
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';

const port = process.env.PORT || 5000;

connectDB(); // Connect to MongoDB

const app = express();

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cokie parser middleware
app.use(cookieParser());


app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`sever running on port ${port}`));