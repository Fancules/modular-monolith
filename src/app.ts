import express from 'express';
import cors from 'cors';
import swagger from './swagger';
import userRouter from './modules/UserModule/UserController';
import productRouter from './modules/ProductModule/ProductController';
import mediator from './core/mediator';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use('/users', userRouter);
app.use('/products', productRouter);

swagger(app);

mediator.registerCommands();

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});