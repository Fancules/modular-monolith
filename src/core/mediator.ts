type RouteHandlers = {
    [type: string]: {
        moduleName: string,
        handler: (payload: any) => void
    };
};

class Mediator {
    private handlers: RouteHandlers;

    constructor() {
        this.handlers = {};
    }

    async send(type: string, payload: any = null){
        if(this.handlers[type]){
            // const moduleName = this.handlers[type].moduleName;      
            // if(configuration[moduleName].protocol === 'InProcess'){
            //    return Promise.resolve().then(() => this.handlers[type].handler(payload));
            // }else if(configuration[moduleName].protocol === 'HTTP'){
            //     fetch(configuration[moduleName].address + '/crossmodulecommunication?type=' + type, )
            // } 
            // Or other protocols
        } else {
            return Promise.reject(new Error(`No handler registered for ${type}`));
        }
    }

    register(commandType: string, handler: (payload: any) => void) {
        this.handlers[commandType].handler = handler;
    }
}

export default new Mediator();
