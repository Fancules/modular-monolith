interface IConfig {
    [moduleName: string]: {
        protocol: string;
        address: string | null
    }
}

const productModuleConfig = JSON.parse(process.env.PRODUCT_MODULE ?? "");
const userModuleConfig = JSON.parse(process.env.USER_MODULE ?? "");

const configuration: IConfig =  {
    ProductModule: {
        protocol: productModuleConfig.protocol ?? "InProcess",
        address: productModuleConfig.address ?? null
    }, 
    UserModule: {
        protocol: userModuleConfig.protocol ?? "InProcess",
        address: userModuleConfig.address ?? null
    }
}

export default configuration;