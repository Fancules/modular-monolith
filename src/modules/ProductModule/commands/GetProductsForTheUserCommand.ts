import ProductModule from "../ProductClass";
import { GetProductsForTheUser } from "../ProductService";

class GetProductsForTheUserCommand extends ProductModule implements ICommand<IGetProductsForTheUserPayload>{
    type = "GetProductsForTheUser";
    handler = GetProductsForTheUser;
}

export default GetProductsForTheUserCommand;