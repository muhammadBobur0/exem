import express, { json } from 'express';
const app = express();
import {
	categoryGet,
	categoryGetparams,
	categoryPost,
	categoryPut,
	categoryDelete,
} from './controllers/constrolcategory.js';
import {
	subcategoryGet,
	subcategoryGetParams,
	subcategoryPost,
	subcategoryDelete,
	subcategoryPut,
} from './controllers/subconstrolcategory.js';

import {
	productGET,
	productGETparams, 
	productPOST, 
	productDelete, 
	productPUT
} from './controllers/controller.product.js'
import cors from 'cors';
app.use(express.json());
app.use(cors());
app.get('/categories', categoryGet);
app.get('/categories/:id', categoryGetparams);
app.post('/categories', categoryPost);
app.put('/categories/:id', categoryPut);
app.delete('/categories/:id', categoryDelete);
app.get('/subcategories', subcategoryGet);
app.get('/subcategories/:id', subcategoryGetParams);
app.post('/subcategories', subcategoryPost);
app.delete('/subcategories/:id', subcategoryDelete);
app.put('/subcategories/:id', subcategoryPut);
app.get('/products',  productGET)
app.get('/products/:id',  productGETparams)
app.post('/products', productPOST)
app.delete('/products/:id', productDelete)
app.put('/products/:id', productPUT)



app.listen(5000, () => console.log('http://localhost:5000'));
