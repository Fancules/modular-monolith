interface IConfig {
    [moduleName: string]: {
        protocol: string;
        address: string | null
    }
}

const configuration: IConfig =  {
    productModule: {
        protocol: "InProcess",
        address: null
    }, 
    userModule: {
        protocol: "InProcess",
        address: null
    }
}

export default configuration;