interface IConfig {
    [moduleName: string]: {
        protocol: string;
        address: string | null
    }
}

const configuration: IConfig =  {
    ProductModule: {
        protocol: "InProcess",
        address: null
    }, 
    UserModule: {
        protocol: "InProcess",
        address: null
    }
}

export default configuration;