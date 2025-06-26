import dotenv from 'dotenv';
dotenv.config();
import express, { Application } from 'express';
import listRoutes from "./src/apis/list/routes";
import categoryRoutes from "./src/apis/categories/routes";
import cors from 'cors';
const app: Application = express();
app.use(cors());
app.use(express.json());
app.use('/api', listRoutes);
console.log('before categories in app file')
app.use('/api/categories', categoryRoutes);


export default app;