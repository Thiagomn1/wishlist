import { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { Product } from '../types/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsPath = path.join(__dirname, '../../data/mock-products.json');

export const getProducts = async (req: Request, res: Response) => {
  try {
    const data = await fs.readFile(productsPath, 'utf-8');
    const products: Product[] = JSON.parse(data);

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: 'Falha ao ler produtos.',
      error: error instanceof Error ? error.message : 'Erro desconhecido.',
    });
  }
};
