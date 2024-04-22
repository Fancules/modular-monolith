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
        handler: (payload: IPayload | null) => any
    };
};

const commands: ICommand<any>[] = [
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

    async send(command: ICommand<any>, payload: IPayload | null){      
        console.log("Received command - " + command.type);
        if(this.handlers[command.type]){
            const moduleName: string = this.handlers[command.type].moduleName; 
            console.log("For received command " + command.type + " handler module: " + moduleName);
                        
            switch(configuration[moduleName].protocol)  {
                case "InProcess":
                    console.log(moduleName + " accessability configured as in process. Message will be handled by current instance");
                    
                    return this.handlers[command.type].handler(payload);
                case "HTTP":
                    console.log(moduleName + " accessability configured as HTTP protocol with address " + configuration[moduleName].address);
                    console.log(`Message will be send to the following address ${configuration[moduleName].address}/crossmodulecommunication?type=${command.type}`);
                    
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
            console.log("For received command " + command.type + " handler was not found!");            
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
