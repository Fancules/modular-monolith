import UserModule from "../UserClass";
import { GetUserByID } from "../UserService";

class GetUserByIDCommand extends UserModule implements ICommand<IGetUserByIDPayload>{
    type = "GetUserByID";
    handler = GetUserByID;
}

export default GetUserByIDCommand;