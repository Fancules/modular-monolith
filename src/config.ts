interface IConfig {
    [moduleName: string]: {
        protocol: string;
        address: string | null
    }
}

const emptyConfigJSON = JSON.stringify({
    protocol: "InProcess",
    address: null
});

const productModuleConfig = JSON.parse(process.env.PRODUCT_MODULE || emptyConfigJSON);
const userModuleConfig = JSON.parse(process.env?.USER_MODULE || emptyConfigJSON);

const configuration: IConfig =  {
    ProductModule: {
        protocol: productModuleConfig.protocol,
        address: productModuleConfig.address
    }, 
    UserModule: {
        protocol: userModuleConfig.protocol,
        address: userModuleConfig.address
    }
}

export default configuration;