import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import wishlistRoutes from './routes/wishlistRoutes.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
  res.json({ message: 'Wishlist API - Luizalabs.' });
});

app.use('/api/products', productRoutes);
app.use('/api/wishlist', wishlistRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}.`);
});

export default app;
