
import express from 'express';
import cors from 'cors';
import carRouter from './routes/carRoutes.js';
import orderRouter from './routes/orderRoutes.js';
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running!');
});
app.use('/api/cars', carRouter);
app.use('/api/orders', orderRouter);

export default app;
