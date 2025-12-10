import { Router } from 'express';
import * as wishlistController from '../controllers/wishlistController.js';

const router = Router();

router.get('/', wishlistController.getWishlist);
router.post('/', wishlistController.addToWishlist);
router.delete('/:code', wishlistController.removeFromWishlist);

export default router;
