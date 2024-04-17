import configuration from '../config';
import AddProductCommand from '../modules/ProductModule/commands/AddProductCommand';
import GetAllProductsCommand from '../modules/ProductModule/commands/GetAllProductsCommand';
import AddUserCommand from '../modules/UserModule/commands/AddUserCommand';
import GetUserByIDCommand from '../modules/UserModule/commands/GetUserByIDCommand';

type RouteHandlers = {
    [type: string]: {
        moduleName: string,
        handler: (payload: any) => void
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
            if(configuration[moduleName].protocol === 'InProcess'){
               return Promise.resolve().then(() => this.handlers[command.type].handler(payload));
            }else if(configuration[moduleName].protocol === 'HTTP'){
                fetch(configuration[moduleName].address + '/crossmodulecommunication?type=' + command.type, )
            } 
            // Or other protocols
        } else {
            return Promise.reject(new Error(`No handler registered for ${command.type}`));
        }
    }

    registerCommands() {
        commands.forEach(command => {
            this.handlers[command.type] = {
                moduleName: command.moduleName,
                handler: command.handler
            };
        });
    }
}

export default new Mediator(commands);
