import ProductModule from "../ProductClass";
import { GetProducts } from "../ProductService";

class GetAllProductsCommand extends ProductModule implements ICommand<IGetAllProductsPayload>{
    type = "GetAllProducts";
    handler = GetProducts;
}

export default GetAllProductsCommand;