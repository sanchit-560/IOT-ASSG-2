import dotenv from 'dotenv';
dotenv.config();
console.log('MONGO_URI:', process.env.MONGO_URI);

import connectDB from './config/db.js';
import app from './app.js';

const PORT = process.env.PORT ||  3000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
