import express from 'express';
import cors from 'cors';
import swagger from './swagger';
import userRouter from './modules/UserModule/UserController';
import productRouter from './modules/ProductModule/ProductController';
import mediator from './core/mediator';
import { AddUser, GetUserByID } from './modules/UserModule/UserService';
import { AddProduct, GetProducts } from './modules/ProductModule/ProductService';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use('/users', userRouter);
app.use('/products', productRouter);

swagger(app);

mediator.register('AddUser', AddUser);
mediator.register('GetUserByID', GetUserByID);
mediator.register('AddProduct', AddProduct);
mediator.register('GetAllProducts', GetProducts);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});