import configuration from '../config';
import AddProductCommand from '../modules/ProductModule/commands/AddProductCommand';
import GetAllProductsCommand from '../modules/ProductModule/commands/GetAllProductsCommand';
import AddUserCommand from '../modules/UserModule/commands/AddUserCommand';
import GetUserByIDCommand from '../modules/UserModule/commands/GetUserByIDCommand';

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
    new GetUserByIDCommand
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
                    return Promise.resolve().then(() => this.handlers[command.type].handler(payload));
                case "HTTP":
                    if(!payload){
                        payload = {}
                    }                
                                       
                    const res = await fetch(`${configuration[moduleName].address}/crossmodulecommunication?type=${command.type}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(payload)
                    });
                    // console.log(res);
                    return res;
                default:
                    Promise.reject(new Error(`Not available protocol!`));
            }   
            // Or other protocols
        } else {
            return Promise.reject(new Error(`No handler registered for ${command.type}`));
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
