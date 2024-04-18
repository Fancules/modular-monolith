import axios from 'axios';
import configuration from '../config';
import AddProductCommand from '../modules/ProductModule/commands/AddProductCommand';
import GetAllProductsCommand from '../modules/ProductModule/commands/GetAllProductsCommand';
import AddUserCommand from '../modules/UserModule/commands/AddUserCommand';
import GetUserByIDCommand from '../modules/UserModule/commands/GetUserByIDCommand';
import GetProductsForTheUserCommand from '../modules/ProductModule/commands/GetProductsForTheUserCommand';


type RouteHandlers = {
    [type: string]: {
        moduleName: string,
        handler: (payload: IPayload | null) => string
    };
};

const commands: ICommand<IPayload>[] = [
    new AddProductCommand,
    new GetAllProductsCommand,
    new AddUserCommand,
    new GetUserByIDCommand,
    new GetProductsForTheUserCommand
];

class Mediator {
    private handlers: RouteHandlers;

    constructor(private commands: ICommand<IPayload>[]) {
        this.handlers = {};
    }

    async send(command: ICommand<IPayload>, payload: IPayload | null){      
        if(this.handlers[command.type]){
            const moduleName: string = this.handlers[command.type].moduleName; 
            switch(configuration[moduleName].protocol)  {
                case "InProcess":
                    return this.handlers[command.type].handler(payload);
                case "HTTP":
                    if(!payload){
                        payload = {}
                    }      
                    const response = await axios.post(`${configuration[moduleName].address}/crossmodulecommunication?type=${command.type}`, payload);
                    
                    return response.data;
                default:
                    return new Error(`Not available protocol!`);
            }   
            // Or other protocols
        } else {
            return new Error(`No handler registered for ${command.type}`);
        }
    }

    registerCommands() {
        this.commands.forEach(command => {
            this.handlers[command.type] = {
                moduleName: command.moduleName,
                handler: command.handler
            };
        });       
    }

    getCommandByType(type: string): ICommand<IPayload> | undefined {
        return this.commands.find(command => command.type == type);
    }
}

export default new Mediator(commands);
