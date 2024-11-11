import express from 'express'
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controller/product.js';

const router = express.Router();

// add product
router.post('/add',addProduct)
// get product
router.get('/all',getProducts);
// get product by id
router.get('/:id',getProductById);
// update product by id 
router.put('/:id',updateProduct);
// delete product by id
router.delete('/:id',deleteProduct);

export default router;