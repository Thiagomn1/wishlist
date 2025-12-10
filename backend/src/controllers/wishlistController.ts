import { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { WishlistItem, Product } from '../types/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const wishlistPath = path.join(__dirname, '../../data/wishlist.json');
const productsPath = path.join(__dirname, '../../data/mock-products.json');

const ensureWishlistFileExists = async (): Promise<void> => {
  try {
    await fs.access(wishlistPath);
  } catch {
    await fs.writeFile(wishlistPath, JSON.stringify([], null, 2));
  }
};

export const getWishlist = async (req: Request, res: Response) => {
  try {
    await ensureWishlistFileExists();
    const data = await fs.readFile(wishlistPath, 'utf-8');
    const wishlist: WishlistItem[] = JSON.parse(data);
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({
      message: 'Falha ao ler lista de desejos.',
      error: error instanceof Error ? error.message : 'Erro desconhecido.',
    });
  }
};

export const addToWishlist = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;

    await ensureWishlistFileExists();

    const productsData = await fs.readFile(productsPath, 'utf-8');
    const products: Product[] = JSON.parse(productsData);

    const product = products.find((p) => p.code === code);
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    const data = await fs.readFile(wishlistPath, 'utf-8');
    const wishlist: WishlistItem[] = JSON.parse(data);

    const exists = wishlist.find((item) => item.code === code);
    if (exists) {
      return res
        .status(400)
        .json({ error: 'Produto já está na lista de desejos' });
    }

    wishlist.push(product);
    await fs.writeFile(wishlistPath, JSON.stringify(wishlist, null, 2));

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: 'Falha ao adicionar item na lista de desejos.',
      error: error instanceof Error ? error.message : 'Erro desconhecido.',
    });
  }
};

export const removeFromWishlist = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;

    await ensureWishlistFileExists();

    const data = await fs.readFile(wishlistPath, 'utf-8');
    let wishlist: WishlistItem[] = JSON.parse(data);

    const exists = wishlist.find((item) => item.code === code);
    if (!exists) {
      return res
        .status(400)
        .json({ error: 'Produto não encontrado na lista de desejos' });
    }

    wishlist = wishlist.filter((item) => item.code !== code);
    await fs.writeFile(wishlistPath, JSON.stringify(wishlist, null, 2));

    res
      .status(204)
      .send({ message: 'Item removido da lista de desejos com sucesso.' });
  } catch (error) {
    res.status(500).json({
      message: 'Falha ao remover item da lista de desejos.',
      error: error instanceof Error ? error.message : 'Erro desconhecido.',
    });
  }
};
